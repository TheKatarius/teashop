import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ProductQuery } from './api';

export type SortOption = 'popularnosc' | 'cena-asc' | 'cena-desc' | 'nowosci' | 'ocena';

export const SORT_LABELS: Record<SortOption, string> = {
  popularnosc: 'Popularność',
  'cena-asc': 'Cena: od najniższej',
  'cena-desc': 'Cena: od najwyższej',
  nowosci: 'Nowości',
  ocena: 'Najwyżej oceniane',
};

export interface ShopFilters {
  moods: string[];
  flavors: string[];
  caffeines: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort: SortOption;
  page: number;
  q?: string;
}

const num = (v: string | null): number | undefined => (v === null ? undefined : Number(v));

/**
 * URL-synced shop filters (S-03, S-04). `category` is fixed by the route param on
 * /sklep/:kategoria, so it lives outside the search params here.
 */
export function useShopFilters(category?: string) {
  const [params, setParams] = useSearchParams();

  const filters: ShopFilters = useMemo(
    () => ({
      moods: params.getAll('mood'),
      flavors: params.getAll('flavor'),
      caffeines: params.getAll('caffeine'),
      minPrice: num(params.get('minPrice')),
      maxPrice: num(params.get('maxPrice')),
      minRating: num(params.get('minRating')),
      sort: (params.get('sort') as SortOption) ?? 'popularnosc',
      page: Number(params.get('page') ?? '1'),
      q: params.get('q') ?? undefined,
    }),
    [params],
  );

  const query: ProductQuery = {
    category,
    mood: filters.moods,
    flavor: filters.flavors,
    caffeine: filters.caffeines,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minRating: filters.minRating,
    sort: filters.sort,
    page: filters.page,
    q: filters.q,
  };

  function commit(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(params);
    mutate(next);
    next.delete('page'); // any filter change resets pagination
    setParams(next, { replace: true });
  }

  function toggleMulti(key: 'mood' | 'flavor' | 'caffeine', value: string) {
    commit((p) => {
      const current = p.getAll(key);
      p.delete(key);
      const nextValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      nextValues.forEach((v) => p.append(key, v));
    });
  }

  function setParam(key: string, value?: string) {
    commit((p) => {
      if (value === undefined || value === '') p.delete(key);
      else p.set(key, value);
    });
  }

  function setSort(sort: SortOption) {
    const next = new URLSearchParams(params);
    next.set('sort', sort);
    setParams(next, { replace: true });
  }

  function setPage(page: number) {
    const next = new URLSearchParams(params);
    next.set('page', String(page));
    setParams(next, { replace: true });
  }

  function reset() {
    setParams(new URLSearchParams(), { replace: true });
  }

  const activeCount =
    filters.moods.length +
    filters.flavors.length +
    filters.caffeines.length +
    (filters.minPrice !== undefined ? 1 : 0) +
    (filters.maxPrice !== undefined ? 1 : 0) +
    (filters.minRating !== undefined ? 1 : 0);

  return { filters, query, toggleMulti, setParam, setSort, setPage, reset, activeCount };
}
