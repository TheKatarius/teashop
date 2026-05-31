import { describe, expect, it } from 'vitest';
import type { QuizAnswer, QuizQuestion } from '@/types';
import { aggregateTagWeights, MATCH_THRESHOLD, rankProducts, type Scorable } from './scoring';

const questions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'mood',
    type: 'mood',
    order: 1,
    multiple: false,
    options: [
      { id: 'q1a', label: 'calm', icon: '', tagWeights: { relaks: 1 } },
      { id: 'q1b', label: 'wired', icon: '', tagWeights: { energia: 1 } },
    ],
  },
  {
    id: 'q2',
    text: 'pref',
    type: 'preference',
    order: 2,
    multiple: true,
    options: [
      { id: 'q2a', label: 'soft', icon: '', tagWeights: { relaks: 0.5 } },
      { id: 'q2b', label: 'strong', icon: '', tagWeights: { energia: 0.5 } },
    ],
  },
];

const products: Scorable[] = [
  { id: 'calm-tea', moodTags: [{ tag: 'relaks', weight: 1 }], isBestseller: true },
  { id: 'energy-tea', moodTags: [{ tag: 'energia', weight: 1 }], isBestseller: true },
  { id: 'neutral-tea', moodTags: [{ tag: 'fokus', weight: 1 }], isBestseller: false },
];

describe('aggregateTagWeights', () => {
  it('sums chosen option weights across questions', () => {
    const answers: QuizAnswer[] = [
      { questionId: 'q1', optionIds: ['q1a'] },
      { questionId: 'q2', optionIds: ['q2a'] },
    ];
    expect(aggregateTagWeights(answers, questions)).toEqual({ relaks: 1.5 });
  });

  it('ignores unknown questions and options', () => {
    const answers: QuizAnswer[] = [
      { questionId: 'nope', optionIds: ['x'] },
      { questionId: 'q1', optionIds: ['ghost'] },
    ];
    expect(aggregateTagWeights(answers, questions)).toEqual({});
  });
});

describe('rankProducts', () => {
  const calmAnswers: QuizAnswer[] = [{ questionId: 'q1', optionIds: ['q1a'] }];

  it('ranks the best-matching product first', () => {
    const { ranked, isFallback } = rankProducts(products, calmAnswers, questions, 'dopasuj');
    expect(isFallback).toBe(false);
    expect(ranked[0]?.id).toBe('calm-tea');
    expect(ranked[0]?.score).toBe(100);
    expect(ranked[0]?.rank).toBe(1);
  });

  it('falls back to bestsellers when nothing clears the threshold', () => {
    // Answer maps only to a tag no product carries strongly enough.
    const orphan: QuizQuestion[] = [
      {
        id: 'q1',
        text: '',
        type: 'mood',
        order: 1,
        multiple: false,
        options: [{ id: 'q1a', label: '', icon: '', tagWeights: { wieczor: 1 } }],
      },
    ];
    const { ranked, isFallback } = rankProducts(products, calmAnswers, orphan, 'dopasuj');
    expect(isFallback).toBe(true);
    expect(ranked.every((r) => products.find((p) => p.id === r.id)?.isBestseller)).toBe(true);
  });

  it('keeps fallback scores below the match threshold', () => {
    const orphan: QuizQuestion[] = [
      {
        id: 'q1',
        text: '',
        type: 'mood',
        order: 1,
        multiple: false,
        options: [{ id: 'q1a', label: '', icon: '', tagWeights: { wieczor: 1 } }],
      },
    ];
    const { ranked } = rankProducts(products, calmAnswers, orphan, 'dopasuj');
    expect(ranked[0]?.score).toBeLessThan(MATCH_THRESHOLD);
  });
});
