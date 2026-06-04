import { useMutation } from '@tanstack/react-query';
import type { Coupon } from '@/types';
import { apiClient } from '@/lib/apiClient';

/** Validates a discount code against the mock backend (C-05). */
export function useValidateCoupon() {
  return useMutation({
    mutationFn: (code: string) => apiClient.get<Coupon>(`/coupons/${encodeURIComponent(code)}`),
  });
}
