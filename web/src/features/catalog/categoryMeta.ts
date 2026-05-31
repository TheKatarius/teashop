// Category taxonomy (TeaShop_architektura_informacji §4.1). Single source of truth for
// name + emoji so the mock seed and the UI (nav, thumbnails, tiles) never drift.

export interface CategoryMeta {
  slug: string;
  name: string;
  emoji: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  { slug: 'czarna', name: 'Czarna', emoji: '☕' },
  { slug: 'zielona', name: 'Zielona', emoji: '🍵' },
  { slug: 'biala', name: 'Biała', emoji: '🤍' },
  { slug: 'oolong', name: 'Oolong', emoji: '🌀' },
  { slug: 'puerh', name: 'Pu-erh', emoji: '🪵' },
  { slug: 'matcha', name: 'Matcha', emoji: '🍵' },
  { slug: 'ziolowa', name: 'Ziołowa', emoji: '🌿' },
  { slug: 'blendy', name: 'Blendy', emoji: '🎨' },
];

const bySlug = new Map(CATEGORY_META.map((c) => [c.slug, c]));

export function categoryName(slug: string): string {
  return bySlug.get(slug)?.name ?? slug;
}

export function categoryEmoji(slug: string): string {
  return bySlug.get(slug)?.emoji ?? '🍵';
}
