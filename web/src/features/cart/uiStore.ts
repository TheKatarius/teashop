import { create } from 'zustand';

// Ephemeral UI state for the cart drawer (C-03). Not persisted.
interface CartUiState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCartDrawer = create<CartUiState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
