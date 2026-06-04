import { categoryEmoji } from '@/features/catalog/categoryMeta';
import { cn } from '@/lib/cn';
import styles from './ProductThumb.module.css';

interface ProductThumbProps {
  categorySlug: string;
  name: string;
  className?: string;
}

/**
 * Placeholder product imagery: the category glyph on a warm-cream surface.
 * Stands in for CDN photography (P-04) until real assets land.
 */
export function ProductThumb({ categorySlug, name, className }: ProductThumbProps) {
  return (
    <div className={cn(styles.thumb, className)} role="img" aria-label={name}>
      <span aria-hidden>{categoryEmoji(categorySlug)}</span>
    </div>
  );
}
