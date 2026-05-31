import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
  /** optional inline action, e.g. "Cofnij" (undo) */
  action?: { label: string; onClick: () => void };
}

interface ToastState {
  /** queue — viewport shows the first, the rest wait (T-04: max 1 visible) */
  toasts: Toast[];
  push: (toast: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
}

export const AUTO_DISMISS_MS = 4000;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (toast) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    return id;
  },
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

/** Imperative helper so non-component code can raise toasts. */
export const toast = {
  success: (message: string, action?: Toast['action']) =>
    useToastStore.getState().push({ variant: 'success', message, action }),
  error: (message: string, action?: Toast['action']) =>
    useToastStore.getState().push({ variant: 'error', message, action }),
  info: (message: string, action?: Toast['action']) =>
    useToastStore.getState().push({ variant: 'info', message, action }),
};
