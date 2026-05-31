import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Guest favorites (F-01..F-04): an array of product ids, mirrored to localStorage.

interface FavoritesState {
  ids: string[];
  toggle: (productId: string) => boolean; // returns the new "is favorite" state
  has: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const isFav = get().ids.includes(productId);
        set((state) => ({
          ids: isFav
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        }));
        return !isFav;
      },
      has: (productId) => get().ids.includes(productId),
    }),
    { name: 'teashop-favorites' },
  ),
);
