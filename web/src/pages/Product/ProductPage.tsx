import { useState } from 'react';
import { Clock, Droplets, Flame, Heart, RefreshCw, ShoppingCart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { CaffeineLevel, Product } from '@/types';
import { categoryName } from '@/features/catalog/categoryMeta';
import { useProduct, useProductReviews, useRelatedProducts } from '@/features/catalog/api';
import { useCartStore } from '@/features/cart/store';
import { useCartDrawer } from '@/features/cart/uiStore';
import { useFavoritesStore } from '@/features/favorites/store';
import { toast } from '@/features/toast/store';
import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { MoodBadge } from '@/components/MoodBadge/MoodBadge';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { ProductThumb } from '@/components/ProductThumb/ProductThumb';
import { QuantityStepper } from '@/components/QuantityStepper/QuantityStepper';
import { Rating } from '@/components/Rating/Rating';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import styles from './ProductPage.module.css';

const CAFFEINE_LABELS: Record<CaffeineLevel, string> = {
  none: 'Bezkofeinowa',
  low: 'Niska',
  medium: 'Średnia',
  high: 'Wysoka',
};
const CAFFEINE_FILLED: Record<CaffeineLevel, number> = { none: 0, low: 1, medium: 2, high: 3 };
const DIFFICULTY_LABELS = { easy: 'łatwe', medium: 'średnie', hard: 'wymagające' };

function CaffeineScale({ level }: { level: CaffeineLevel }) {
  const filled = CAFFEINE_FILLED[level];
  return (
    <div className={styles.caffeine}>
      <div className={styles.caffeineBars} aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className={cn(styles.bar, i < filled && styles.barFilled)} />
        ))}
      </div>
      <span>{CAFFEINE_LABELS[level]}</span>
    </div>
  );
}

function BuyBox({ product }: { product: Product }) {
  const weights = product.weightOptions;
  const [grams, setGrams] = useState(
    (weights.find((w) => w.grams === 100) ?? weights[0]).grams,
  );
  const [quantity, setQuantity] = useState(1);
  const add = useCartStore((s) => s.add);
  const openCart = useCartDrawer((s) => s.open);
  const isFavorite = useFavoritesStore((s) => s.ids.includes(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  const unitPrice = weights.find((w) => w.grams === grams)?.price ?? product.price;

  const handleAdd = () => {
    add(product, grams, quantity);
    openCart();
    toast.success(`Dodano „${product.name}" (${grams} g × ${quantity}) do koszyka`);
  };

  const handleFav = () => {
    const nowFav = toggleFavorite(product.id);
    toast.success(nowFav ? 'Dodano do ulubionych' : 'Usunięto z ulubionych');
  };

  return (
    <>
      <div className={styles.priceRow}>
        <span className={styles.price}>{formatPrice(unitPrice)}</span>
        <span className={styles.priceUnit}>/ {grams} g</span>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Gramatura</span>
        <div className={styles.weights}>
          {weights.map((w) => (
            <button
              key={w.grams}
              type="button"
              className={cn(styles.weight, w.grams === grams && styles.weightActive)}
              onClick={() => setGrams(w.grams)}
              aria-pressed={w.grams === grams}
            >
              {w.grams} g
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Ilość</span>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      <div className={styles.buyActions}>
        <Button onClick={handleAdd} size="lg" fullWidth>
          <ShoppingCart size={18} /> Dodaj do koszyka
        </Button>
        <button
          type="button"
          className={cn(styles.favBtn, isFavorite && styles.favActive)}
          onClick={handleFav}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="container">
      <div className={styles.layout}>
        <Skeleton height="420px" radius="var(--radius-xl)" />
        <div className={styles.infoSkeleton}>
          <Skeleton width="30%" height="14px" />
          <Skeleton width="70%" height="40px" />
          <Skeleton width="40%" height="20px" />
          <Skeleton width="100%" height="120px" />
        </div>
      </div>
    </div>
  );
}

export function ProductPage() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug);
  const related = useRelatedProducts(slug);
  const reviews = useProductReviews(slug);

  if (isLoading) return <ProductSkeleton />;

  if (isError || !product) {
    return (
      <div className="container">
        <EmptyState
          icon="🍵"
          title="Nie znaleźliśmy tej herbaty"
          description="Mogła zostać przeniesiona lub wyprzedana."
          actions={<Button to="/sklep">Wróć do sklepu</Button>}
        />
      </div>
    );
  }

  const b = product.brewing;

  return (
    <article className="container">
      <nav className={styles.breadcrumbs} aria-label="Ścieżka nawigacji">
        <Link to="/sklep">Sklep</Link>
        <span aria-hidden>›</span>
        <Link to={`/sklep/${product.categorySlug}`}>{categoryName(product.categorySlug)}</Link>
        <span aria-hidden>›</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <ProductThumb categorySlug={product.categorySlug} name={product.name} className={styles.mainImage} />
          <div className={styles.thumbs} aria-hidden>
            {Array.from({ length: 4 }, (_, i) => (
              <ProductThumb key={i} categorySlug={product.categorySlug} name="" className={styles.thumb} />
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <p className={styles.eyebrow}>{categoryName(product.categorySlug)}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <Rating value={product.reviewsAvg} count={product.reviewsCount} />
          <div className={styles.moods}>
            {product.moodTags.map((m) => (
              <MoodBadge key={m.tag} slug={m.tag} />
            ))}
          </div>
          <p className={styles.lead}>{product.descriptionShort}</p>

          <div className={styles.buyBox}>
            <BuyBox product={product} />
          </div>
        </div>
      </div>

      <section className={styles.section} aria-labelledby="brewing-heading">
        <h2 id="brewing-heading" className={styles.sectionTitle}>
          ☕ Parzenie
        </h2>
        <div className={styles.brewing}>
          <div className={styles.brewTile}>
            <Flame size={20} />
            <span className={styles.brewValue}>{b.tempC}°C</span>
            <span className={styles.brewLabel}>temperatura</span>
          </div>
          <div className={styles.brewTile}>
            <Clock size={20} />
            <span className={styles.brewValue}>
              {b.timeMin[0]}–{b.timeMin[1]} min
            </span>
            <span className={styles.brewLabel}>czas</span>
          </div>
          <div className={styles.brewTile}>
            <Droplets size={20} />
            <span className={styles.brewValue}>
              {b.gramsPer} g / {b.mlPer} ml
            </span>
            <span className={styles.brewLabel}>proporcje</span>
          </div>
          <div className={styles.brewTile}>
            <RefreshCw size={20} />
            <span className={styles.brewValue}>{b.maxSteeps}×</span>
            <span className={styles.brewLabel}>zaparzeń · {DIFFICULTY_LABELS[b.difficulty]}</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📝 Opis</h2>
        <p className={styles.body}>{product.descriptionLong}</p>
        <p className={styles.origin}>Pochodzenie: {product.origin}</p>
      </section>

      <div className={styles.metaGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🏷️ Profil smakowy</h2>
          <div className={styles.flavors}>
            {product.flavorTags.map((f) => (
              <Badge key={f} variant="flavor">
                {f}
              </Badge>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>☕ Kofeina</h2>
          <CaffeineScale level={product.caffeine} />
        </section>
      </div>

      <section className={styles.section} aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className={styles.sectionTitle}>
          💬 Recenzje ({product.reviewsCount})
        </h2>
        <ul className={styles.reviews}>
          {(reviews.data ?? []).map((r) => (
            <li key={r.id} className={styles.review}>
              <div className={styles.reviewHead}>
                <Rating value={r.rating} />
                <span className={styles.reviewAuthor}>{r.author}</span>
              </div>
              <p>{r.content}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🤝 Pasuje do</h2>
        <ProductGrid products={related.data ?? []} loading={related.isLoading} skeletonCount={3} />
      </section>
    </article>
  );
}
