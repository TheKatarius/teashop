import { mockRequest } from '@/mocks/server';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export class ApiError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(status: number, url: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
  }
}

type Json = Record<string, unknown> | unknown[];

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: Json;
  token?: string | null;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, token, headers, ...rest } = options;
  const url = `${BASE_URL}${path}`;

  if (USE_MOCK) {
    const { status, data } = await mockRequest({
      method: rest.method ?? 'GET',
      path,
      body,
      token,
    });
    if (status >= 400) {
      const message =
        data && typeof data === 'object' && 'title' in data
          ? String((data as { title: unknown }).title)
          : `Request failed (${status})`;
      throw new ApiError(status, url, message);
    }
    if (status === 204) return undefined as T;
    return data as T;
  }

  const response = await fetch(url, {
    ...rest,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new ApiError(response.status, url, text || response.statusText);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: Json, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),
  patch: <T>(path: string, body?: Json, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  put: <T>(path: string, body?: Json, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
