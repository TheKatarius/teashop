import { useMutation } from '@tanstack/react-query';
import type { AuthResponse } from '@/types';
import { apiClient } from '@/lib/apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      apiClient.post<AuthResponse>('/auth/login', { ...payload }),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      apiClient.post<AuthResponse>('/auth/register', { ...payload }),
  });
}
