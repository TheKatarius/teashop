import { beforeEach, describe, expect, it } from 'vitest';
import type { Product } from '@/types';
import {
  computeDiscount,
  selectCount,
  selectSubtotal,
  useCartStore,
} from './store';

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'p1',
    name: 'Sencha Uji',
    slug: 'sencha-uji',
    categorySlug: 'zielona',
    price: 32,
    weightOptions: [
      { grams: 50, price: 18 },
      { grams: 100, price: 32 },
      { grams: 250, price: 74 },
    ],
    descriptionShort: '',
    descriptionLong: '',
    origin: '',
    brewing: { tempC: 70, timeMin: [1, 2], gramsPer: 3, mlPer: 200, maxSteeps: 3, difficulty: 'easy' },
    caffeine: 'medium',
    strength: 'średnia',
    moodTags: [],
    flavorTags: [],
    images: [],
    isBestseller: false,
    isNew: false,
    isAvailable: true,
    stock: 10,
    reviewsAvg: 4.5,
    reviewsCount: 10,
    createdAt: '2026-01-01',
    ...overrides,
  };
}

describe('cart store', () => {
  beforeEach(() => useCartStore.getState().clear());

  it('adds an item with the price of the chosen weight', () => {
    useCartStore.getState().add(makeProduct(), 50, 2);
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].unitPrice).toBe(18);
    expect(selectCount(state)).toBe(2);
    expect(selectSubtotal(state)).toBe(36);
  });

  it('merges quantity when the same product+weight is added twice', () => {
    const p = makeProduct();
    useCartStore.getState().add(p, 100, 1);
    useCartStore.getState().add(p, 100, 2);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(selectCount(useCartStore.getState())).toBe(3);
  });

  it('keeps different weights of the same product as separate lines', () => {
    const p = makeProduct();
    useCartStore.getState().add(p, 50, 1);
    useCartStore.getState().add(p, 100, 1);
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it('removes a line when quantity drops to zero', () => {
    const p = makeProduct();
    useCartStore.getState().add(p, 100, 1);
    const id = useCartStore.getState().items[0].id;
    useCartStore.getState().setQuantity(id, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

describe('computeDiscount', () => {
  it('applies a percentage coupon', () => {
    expect(computeDiscount(100, { code: 'X', type: 'percent', value: 10 })).toBe(10);
  });

  it('applies a fixed-amount coupon', () => {
    expect(computeDiscount(100, { code: 'X', type: 'amount', value: 20 })).toBe(20);
  });

  it('never discounts more than the subtotal', () => {
    expect(computeDiscount(15, { code: 'X', type: 'amount', value: 20 })).toBe(15);
  });

  it('returns zero with no coupon', () => {
    expect(computeDiscount(100, null)).toBe(0);
  });
});
