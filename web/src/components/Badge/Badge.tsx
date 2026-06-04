import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Badge.module.css';

export type BadgeVariant = 'category' | 'flavor' | 'bestseller' | 'new';

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

/** Small label chip: category ("ZIELONA"), flavor tag, or product flags. */
export function Badge({ variant, children, className }: BadgeProps) {
  return <span className={cn(styles.badge, styles[variant], className)}>{children}</span>;
}
