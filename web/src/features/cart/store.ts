import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Coupon, Product } from '@/types';

// Guest cart (C-01..C-08). Zustand is the source of truth, mirrored to localStorage
// so a refresh never loses the cart. Items are keyed by product + chosen weight.

function itemKey(productId: string, weightGrams: number): string {
  return `${productId}:${weightGrams}`;
}

function priceFor(product: Product, weightGrams: number): number {
  return product.weightOptions.find((w) => w.grams === weightGrams)?.price ?? product.price;
}

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  add: (product: Product, weightGrams: number, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  restore: (item: CartItem) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,
      add: (product, weightGrams, quantity = 1) =>
        set((state) => {
          const id = itemKey(product.id, weightGrams);
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          const item: CartItem = {
            id,
            product,
            weightGrams,
            unitPrice: priceFor(product, weightGrams),
            quantity,
          };
          return { items: [...state.items, item] };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      restore: (item) =>
        set((state) =>
          state.items.some((i) => i.id === item.id) ? state : { items: [...state.items, item] },
        ),
      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),
      clear: () => set({ items: [], coupon: null }),
    }),
    { name: 'teashop-cart' },
  ),
);

// ─── Derived selectors / helpers ─────────────────────────────────────────────
export const FREE_SHIPPING_THRESHOLD = 99;

export const selectCount = (s: CartState): number =>
  s.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (s: CartState): number =>
  s.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

/** Discount amount in zł from an applied coupon (C-05). Never exceeds the subtotal. */
export function computeDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon) return 0;
  const raw = coupon.type === 'percent' ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.min(Math.round(raw * 100) / 100, subtotal);
}
