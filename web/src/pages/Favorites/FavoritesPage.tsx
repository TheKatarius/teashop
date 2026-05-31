import { Button } from '@/components/Button/Button';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { useFavoriteProducts } from '@/features/favorites/api';
import { useFavoritesStore } from '@/features/favorites/store';
import styles from './FavoritesPage.module.css';

export function FavoritesPage() {
  const ids = useFavoritesStore((s) => s.ids);
  const { data, isLoading } = useFavoriteProducts(ids);

  if (ids.length === 0) {
    return (
      <div className="container">
        <EmptyState
          icon="❤️"
          title="Brak ulubionych herbat"
          description="Klikaj serduszko na produktach, by zapisać je tutaj na później."
          actions={<Button to="/sklep">Przeglądaj herbaty</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className={styles.title}>Ulubione ({ids.length})</h1>
      <ProductGrid products={data?.items ?? []} loading={isLoading} skeletonCount={ids.length} />
    </div>
  );
}
