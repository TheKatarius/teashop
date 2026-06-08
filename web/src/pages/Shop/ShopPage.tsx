import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { categoryName } from '@/features/catalog/categoryMeta';
import { useProducts } from '@/features/catalog/api';
import { SORT_LABELS, useShopFilters, type SortOption } from '@/features/catalog/useShopFilters';
import { Button } from '@/components/Button/Button';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { ShopFilters } from './ShopFilters';
import styles from './ShopPage.module.css';

const PAGE_SIZE = 9;

export function ShopPage() {
  const { kategoria } = useParams();
  const controller = useShopFilters(kategoria);
  const { filters, query, setSort, setPage } = controller;
  const { data, isLoading, isError, refetch } = useProducts(query);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const heading = filters.q
    ? `Wyniki dla „${filters.q}"`
    : kategoria
      ? `Herbaty ${categoryName(kategoria).toLowerCase()}`
      : 'Wszystkie herbaty';

  const total = data?.total ?? 0;
  const pageCount = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="container">
      <header className={styles.head}>
        <h1 className={styles.title}>{heading}</h1>
        {kategoria && (
          <p className={styles.quizCta}>
            Nie wiesz, którą wybrać? <Button to="/quiz" variant="ghost">Zrób quiz nastroju →</Button>
          </p>
        )}
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <ShopFilters category={kategoria} controller={controller} />
        </aside>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <button
              type="button"
              className={styles.filterToggle}
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal size={18} /> Filtry
              {controller.activeCount > 0 && <span className={styles.count}>{controller.activeCount}</span>}
            </button>
            <span className={styles.results}>{total} produktów</span>
            <label className={styles.sortLabel}>
              <span className="visually-hidden">Sortuj</span>
              <select
                className={styles.sort}
                value={filters.sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
              >
                {Object.entries(SORT_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {isError ? (
            <EmptyState
              title="Nie udało się wczytać herbat"
              description="Spróbuj ponownie za chwilę."
              actions={<Button onClick={() => refetch()}>Spróbuj ponownie</Button>}
            />
          ) : !isLoading && total === 0 ? (
            <EmptyState
              icon={<Search size={48} />}
              title="Brak wyników"
              description="Nie znaleźliśmy herbat dla wybranych filtrów. Spróbuj quizu nastrojowego lub zobacz bestsellery."
              actions={
                <>
                  <Button to="/quiz">Zrób quiz</Button>
                  <Button to="/sklep" variant="secondary-outline">
                    Zobacz wszystkie
                  </Button>
                </>
              }
            />
          ) : (
            <ProductGrid products={data?.items ?? []} loading={isLoading} skeletonCount={6} />
          )}

          {pageCount > 1 && (
            <nav className={styles.pagination} aria-label="Paginacja">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={p === filters.page ? styles.pageActive : styles.page}
                  aria-current={p === filters.page ? 'page' : undefined}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className={styles.drawerBackdrop} onMouseDown={() => setFiltersOpen(false)}>
          <div className={styles.drawer} onMouseDown={(e) => e.stopPropagation()}>
            <div className={styles.drawerHead}>
              <span className={styles.drawerTitle}>Filtry</span>
              <button
                type="button"
                className={styles.drawerClose}
                onClick={() => setFiltersOpen(false)}
                aria-label="Zamknij filtry"
              >
                <X size={24} />
              </button>
            </div>
            <ShopFilters category={kategoria} controller={controller} />
            <Button fullWidth onClick={() => setFiltersOpen(false)}>
              Pokaż {total} produktów
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
