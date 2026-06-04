import { clsx, type ClassValue } from 'clsx';

/** Conditional className join. Thin re-export so components import from one place. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
