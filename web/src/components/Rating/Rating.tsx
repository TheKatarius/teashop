import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import styles from './Rating.module.css';

interface RatingProps {
  /** 0–5 */
  value: number;
  count?: number;
  className?: string;
}

/** Five-star rating with optional review count, e.g. "★★★★☆ (124)". */
export function Rating({ value, count, className }: RatingProps) {
  const rounded = Math.round(value);
  const label = `Ocena ${value.toFixed(1)} na 5${count !== undefined ? `, ${count} opinii` : ''}`;

  return (
    <span className={cn(styles.root, className)} aria-label={label}>
      <span className={styles.stars} aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rounded ? styles.filled : styles.empty}
            fill={i < rounded ? 'currentColor' : 'none'}
          />
        ))}
      </span>
      {count !== undefined && <span className={styles.count}>({count})</span>}
    </span>
  );
}
