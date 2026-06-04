import { useMutation, useQuery } from '@tanstack/react-query';
import type { DeliveryMethod, Order } from '@/types';
import { apiClient } from '@/lib/apiClient';

export interface DeliveryOption {
  id: DeliveryMethod;
  name: string;
  price: number;
  eta: string;
}

export function useDeliveryOptions() {
  return useQuery({
    queryKey: ['delivery-options'],
    queryFn: () => apiClient.get<DeliveryOption[]>('/delivery-options'),
    staleTime: Infinity,
  });
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: (order: Record<string, unknown>) => apiClient.post<Order>('/orders', order),
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => apiClient.get<Order>(`/orders/${id}`),
    enabled: Boolean(id),
  });
}
