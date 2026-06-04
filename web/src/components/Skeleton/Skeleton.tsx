import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
}

/** Shimmer placeholder block (design.md §6.9) — never a spinner on listings. */
export function Skeleton({ width, height, radius, className }: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height,
    borderRadius: radius,
  };
  return <span className={cn(styles.skeleton, className)} style={style} aria-hidden />;
}
