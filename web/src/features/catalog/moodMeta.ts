// Presentation metadata for the six mood tags (P-05). Single source of truth so the
// mock seed and the UI badges never drift. Color tokens per design.md §2.9.

export interface MoodMeta {
  slug: string;
  name: string;
  emoji: string;
  colorToken: string;
}

export const MOOD_META: Record<string, MoodMeta> = {
  relaks: { slug: 'relaks', name: 'Relaks', emoji: '😌', colorToken: '--color-mint' },
  energia: { slug: 'energia', name: 'Energia', emoji: '⚡', colorToken: '--color-gold' },
  fokus: { slug: 'fokus', name: 'Fokus', emoji: '🧠', colorToken: '--color-brand-green-mid' },
  comfort: { slug: 'comfort', name: 'Comfort', emoji: '🤗', colorToken: '--color-rating' },
  wieczor: { slug: 'wieczor', name: 'Wieczór', emoji: '🌙', colorToken: '--color-brand-dark' },
  detox: { slug: 'detox', name: 'Detox', emoji: '🌿', colorToken: '--color-sage-50' },
};

export const MOOD_ORDER = Object.keys(MOOD_META);
