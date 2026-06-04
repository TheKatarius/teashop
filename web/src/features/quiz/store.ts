import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizResult } from '@/types';

// Quiz draft answers survive refresh (Q-09). Keyed by question id -> chosen option ids.
interface QuizDraftState {
  answers: Record<string, string[]>;
  setAnswer: (questionId: string, optionIds: string[]) => void;
  reset: () => void;
}

export const useQuizDraft = create<QuizDraftState>()(
  persist(
    (set) => ({
      answers: {},
      setAnswer: (questionId, optionIds) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: optionIds } })),
      reset: () => set({ answers: {} }),
    }),
    { name: 'teashop-quiz-draft' },
  ),
);

// Last computed result, persisted for the guest (Q-09) and read by the results page.
interface QuizResultState {
  result: QuizResult | null;
  setResult: (result: QuizResult) => void;
  clear: () => void;
}

export const useQuizResult = create<QuizResultState>()(
  persist(
    (set) => ({
      result: null,
      setResult: (result) => set({ result }),
      clear: () => set({ result: null }),
    }),
    { name: 'teashop-quiz-result' },
  ),
);
