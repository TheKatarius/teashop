import type { MoodWeight, QuizAnswer, QuizGoal, QuizQuestion } from '@/types';

// Pure quiz scoring (Q-05) + fallback (Q-08). No I/O — unit-tested in scoring.test.ts.
// score(product) = Σ_tag (answerTagTotal[tag] × productMoodWeight[tag])

/** Below this match percent, no recommendation is considered a real match (Q-08). */
export const MATCH_THRESHOLD = 20;

export interface Scorable {
  id: string;
  moodTags: MoodWeight[];
  isBestseller: boolean;
}

export interface RankedScore {
  id: string;
  /** 0–100 match percent */
  score: number;
  rank: number;
}

export interface ScoringOutcome {
  ranked: RankedScore[];
  isFallback: boolean;
  /** dominant mood slugs from the answers, strongest first */
  moodSummary: string[];
}

/** Sums the chosen options' tag weights across all answered questions. */
export function aggregateTagWeights(
  answers: QuizAnswer[],
  questions: QuizQuestion[],
): Record<string, number> {
  const totals: Record<string, number> = {};
  const byId = new Map(questions.map((q) => [q.id, q]));

  for (const answer of answers) {
    const question = byId.get(answer.questionId);
    if (!question) continue;
    for (const optionId of answer.optionIds) {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) continue;
      for (const [tag, weight] of Object.entries(option.tagWeights)) {
        totals[tag] = (totals[tag] ?? 0) + weight;
      }
    }
  }
  return totals;
}

/** Goal (Q-04) reshapes the answer weights before scoring. */
function applyGoal(totals: Record<string, number>, goal: QuizGoal): Record<string, number> {
  if (goal === 'dopasuj') return totals;

  const adjusted = { ...totals };
  if (goal === 'popraw') {
    // "Popraw nastrój" — lean toward uplifting / restorative moods.
    for (const tag of ['energia', 'relaks', 'comfort']) {
      if (adjusted[tag] !== undefined) adjusted[tag] *= 1.4;
    }
  }
  return adjusted;
}

/** Deterministic 0–1 jitter from an id, for the "Zaskocz mnie" goal. */
function jitter(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  }
  return hash / 1000;
}

function rawScore(product: Scorable, totals: Record<string, number>): number {
  const byTag = new Map(product.moodTags.map((m) => [m.tag, m.weight]));
  let score = 0;
  for (const [tag, total] of Object.entries(totals)) {
    score += total * (byTag.get(tag) ?? 0);
  }
  return score;
}

export function rankProducts(
  products: Scorable[],
  answers: QuizAnswer[],
  questions: QuizQuestion[],
  goal: QuizGoal,
  limit = 5,
): ScoringOutcome {
  const baseTotals = aggregateTagWeights(answers, questions);
  const totals = applyGoal(baseTotals, goal);

  // Normalize against the best score a perfectly-aligned product could reach.
  const maxPossible = Object.values(totals).reduce((sum, w) => sum + w, 0) || 1;

  const scored = products.map((product) => {
    let percent = (rawScore(product, totals) / maxPossible) * 100;
    if (goal === 'zaskocz') {
      // Nudge ordering so surprising picks can surface, but keep it deterministic.
      percent = percent * 0.6 + jitter(product.id) * 40;
    }
    return { id: product.id, score: Math.round(Math.min(100, percent)) };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, limit);
  const isFallback = (top[0]?.score ?? 0) < MATCH_THRESHOLD;

  const ranked: RankedScore[] = isFallback
    ? products
        .filter((p) => p.isBestseller)
        .slice(0, limit)
        .map((p, i) => ({ id: p.id, score: top[i]?.score ?? 0, rank: i + 1 }))
    : top.map((s, i) => ({ ...s, rank: i + 1 }));

  const moodSummary = Object.entries(baseTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([tag]) => tag);

  return { ranked, isFallback, moodSummary };
}
