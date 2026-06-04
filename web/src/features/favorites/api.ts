import { useQuery } from '@tanstack/react-query';
import type { Paged, Product } from '@/types';
import { apiClient } from '@/lib/apiClient';

/** Resolves favorite product ids (F-02) to full products via the catalog endpoint. */
export function useFavoriteProducts(ids: string[]) {
  return useQuery({
    queryKey: ['favorites', [...ids].sort()],
    queryFn: () => apiClient.get<Paged<Product>>(`/products?ids=${ids.join(',')}`),
    enabled: ids.length > 0,
  });
}
