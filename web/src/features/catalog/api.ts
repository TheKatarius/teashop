import { useQuery } from '@tanstack/react-query';
import type { Category, FlavorTag, MoodTag, Paged, Product, Review } from '@/types';
import { apiClient } from '@/lib/apiClient';

export interface ProductQuery {
  category?: string;
  mood?: string[];
  flavor?: string[];
  caffeine?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  q?: string;
  sort?: string;
  page?: number;
}

export function buildProductSearch(query: ProductQuery): string {
  const params = new URLSearchParams();
  if (query.category) params.set('category', query.category);
  query.mood?.forEach((m) => params.append('mood', m));
  query.flavor?.forEach((f) => params.append('flavor', f));
  query.caffeine?.forEach((c) => params.append('caffeine', c));
  if (query.minPrice !== undefined) params.set('minPrice', String(query.minPrice));
  if (query.maxPrice !== undefined) params.set('maxPrice', String(query.maxPrice));
  if (query.minRating !== undefined) params.set('minRating', String(query.minRating));
  if (query.q) params.set('q', query.q);
  if (query.sort) params.set('sort', query.sort);
  if (query.page) params.set('page', String(query.page));
  return params.toString();
}

export function useProducts(query: ProductQuery) {
  const search = buildProductSearch(query);
  return useQuery({
    queryKey: ['products', search],
    queryFn: () => apiClient.get<Paged<Product>>(`/products?${search}`),
  });
}

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => apiClient.get<Product>(`/products/${slug}`),
    enabled: Boolean(slug),
  });
}

export function useRelatedProducts(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug, 'related'],
    queryFn: () => apiClient.get<Product[]>(`/products/${slug}/related`),
    enabled: Boolean(slug),
  });
}

export function useProductReviews(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug, 'reviews'],
    queryFn: () => apiClient.get<Review[]>(`/products/${slug}/reviews`),
    enabled: Boolean(slug),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.get<Category[]>('/categories'),
    staleTime: Infinity,
  });
}

export function useMoodTags() {
  return useQuery({
    queryKey: ['mood-tags'],
    queryFn: () => apiClient.get<MoodTag[]>('/mood-tags'),
    staleTime: Infinity,
  });
}

export function useFlavorTags() {
  return useQuery({
    queryKey: ['flavor-tags'],
    queryFn: () => apiClient.get<FlavorTag[]>('/flavor-tags'),
    staleTime: Infinity,
  });
}
