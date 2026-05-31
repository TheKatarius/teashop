import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './FilterChip.module.css';

interface FilterChipProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}

/** Toggle chip for filters (design.md §6.7). Selected state also shows a check (a11y). */
export function FilterChip({ selected, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      className={cn(styles.chip, selected && styles.selected)}
      onClick={onClick}
      aria-pressed={selected}
    >
      {selected && <Check size={14} aria-hidden />}
      {children}
    </button>
  );
}
