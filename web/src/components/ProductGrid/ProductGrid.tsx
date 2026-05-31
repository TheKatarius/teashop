import type { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { cn } from '@/lib/cn';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  /** number of skeleton cards while loading */
  skeletonCount?: number;
  className?: string;
}

/** Responsive product grid (3 / 2 / 1 columns) shared by shop, home, favorites, quiz. */
export function ProductGrid({ products, loading, skeletonCount = 6, className }: ProductGridProps) {
  if (loading) {
    return (
      <div className={cn(styles.grid, className)} aria-busy="true">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <Skeleton height="220px" radius="var(--radius-xl)" />
            <Skeleton width="40%" height="12px" />
            <Skeleton width="80%" height="18px" />
            <Skeleton width="55%" height="14px" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(styles.grid, className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
