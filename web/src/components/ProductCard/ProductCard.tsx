import { Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { Badge } from '@/components/Badge/Badge';
import { MoodBadge } from '@/components/MoodBadge/MoodBadge';
import { ProductThumb } from '@/components/ProductThumb/ProductThumb';
import { Rating } from '@/components/Rating/Rating';
import { categoryName } from '@/features/catalog/categoryMeta';
import { useCartStore } from '@/features/cart/store';
import { useCartDrawer } from '@/features/cart/uiStore';
import { useFavoritesStore } from '@/features/favorites/store';
import { toast } from '@/features/toast/store';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  /** match percent shown on quiz result cards (Q-06) */
  matchScore?: number;
}

/** Quick-add uses the 100g option when present, else the first weight (P-02). */
function defaultWeight(product: Product): number {
  return (product.weightOptions.find((w) => w.grams === 100) ?? product.weightOptions[0]).grams;
}

export function ProductCard({ product, matchScore }: ProductCardProps) {
  const add = useCartStore((s) => s.add);
  const openCart = useCartDrawer((s) => s.open);
  const isFavorite = useFavoritesStore((s) => s.ids.includes(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  const handleQuickAdd = () => {
    add(product, defaultWeight(product), 1);
    openCart();
    toast.success(`Dodano „${product.name}" do koszyka`);
  };

  const handleFavorite = () => {
    const nowFav = toggleFavorite(product.id);
    toast.success(nowFav ? `Dodano „${product.name}" do ulubionych` : 'Usunięto z ulubionych');
  };

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Link to={`/produkt/${product.slug}`} className={styles.mediaLink} tabIndex={-1} aria-hidden>
          <ProductThumb categorySlug={product.categorySlug} name={product.name} />
        </Link>

        <div className={styles.flags}>
          {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {product.isNew && <Badge variant="new">Nowość</Badge>}
        </div>

        {matchScore !== undefined && <span className={styles.match}>{matchScore}% dopasowania</span>}

        <button
          type="button"
          className={cn(styles.fav, isFavorite && styles.favActive)}
          onClick={handleFavorite}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        <button
          type="button"
          className={styles.quickAdd}
          onClick={handleQuickAdd}
          aria-label={`Dodaj „${product.name}" do koszyka`}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>{categoryName(product.categorySlug)}</p>
        <h3 className={styles.name}>
          <Link to={`/produkt/${product.slug}`} className={styles.nameLink}>
            {product.name}
          </Link>
        </h3>
        <p className={styles.notes}>{product.flavorTags.slice(0, 3).join(', ')}</p>

        <div className={styles.moods}>
          {product.moodTags.slice(0, 2).map((m) => (
            <MoodBadge key={m.tag} slug={m.tag} />
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <Rating value={product.reviewsAvg} count={product.reviewsCount} />
        </div>
      </div>
    </article>
  );
}
