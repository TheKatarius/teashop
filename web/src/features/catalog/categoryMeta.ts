// Category taxonomy (TeaShop_architektura_informacji §4.1). Single source of truth for
// name + icon so the mock seed and the UI (nav, thumbnails, tiles) never drift.

import { Blend, Coffee, Flower, Flower2, Layers, Leaf, Sprout, Wind, type LucideIcon } from 'lucide-react';

export interface CategoryMeta {
  slug: string;
  name: string;
  Icon: LucideIcon;
}

export const CATEGORY_META: CategoryMeta[] = [
  { slug: 'czarna', name: 'Czarna', Icon: Coffee },
  { slug: 'zielona', name: 'Zielona', Icon: Leaf },
  { slug: 'biala', name: 'Biała', Icon: Flower },
  { slug: 'oolong', name: 'Oolong', Icon: Wind },
  { slug: 'puerh', name: 'Pu-erh', Icon: Layers },
  { slug: 'matcha', name: 'Matcha', Icon: Sprout },
  { slug: 'ziolowa', name: 'Ziołowa', Icon: Flower2 },
  { slug: 'blendy', name: 'Blendy', Icon: Blend },
];

const bySlug = new Map(CATEGORY_META.map((c) => [c.slug, c]));

export const categoriesBySlug: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORY_META.map((c) => [c.slug, c]),
);

export function categoryName(slug: string): string {
  return bySlug.get(slug)?.name ?? slug;
}
