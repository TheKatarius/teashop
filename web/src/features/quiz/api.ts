import { useMutation, useQuery } from '@tanstack/react-query';
import type { QuizQuestion, QuizResult, QuizSubmission } from '@/types';
import { apiClient } from '@/lib/apiClient';

export function useQuizQuestions() {
  return useQuery({
    queryKey: ['quiz', 'questions'],
    queryFn: () => apiClient.get<QuizQuestion[]>('/quiz/questions'),
    staleTime: Infinity,
  });
}

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: (submission: QuizSubmission) =>
      apiClient.post<QuizResult>('/quiz/submit', submission as unknown as Record<string, unknown>),
  });
}
