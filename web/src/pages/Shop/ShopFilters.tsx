import { Link } from 'react-router-dom';
import { CATEGORY_META } from '@/features/catalog/categoryMeta';
import { MOOD_META } from '@/features/catalog/moodMeta';
import { useFlavorTags } from '@/features/catalog/api';
import type { useShopFilters } from '@/features/catalog/useShopFilters';
import { FilterChip } from '@/components/FilterChip/FilterChip';
import styles from './ShopFilters.module.css';

interface ShopFiltersProps {
  category?: string;
  controller: ReturnType<typeof useShopFilters>;
}

const CAFFEINE_OPTIONS = [
  { value: 'none', label: 'Bezkofeinowa' },
  { value: 'low', label: 'Niska' },
  { value: 'medium', label: 'Średnia' },
  { value: 'high', label: 'Wysoka' },
];

const RATING_OPTIONS = [
  { value: '4', label: '4★ i więcej' },
  { value: '3', label: '3★ i więcej' },
];

export function ShopFilters({ category, controller }: ShopFiltersProps) {
  const { filters, toggleMulti, setParam, reset, activeCount } = controller;
  const flavors = useFlavorTags();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filtry</h2>
        {activeCount > 0 && (
          <button type="button" className={styles.reset} onClick={reset}>
            Wyczyść ({activeCount})
          </button>
        )}
      </div>

      <section className={styles.group}>
        <h3 className={styles.groupTitle}>Kategorie</h3>
        <div className={styles.chips}>
          {CATEGORY_META.map((c) => (
            <Link key={c.slug} to={`/sklep/${c.slug}`} className={styles.catLink}>
              <FilterChip selected={category === c.slug} onClick={() => undefined}>
                <c.Icon size={14} aria-hidden /> {c.name}
              </FilterChip>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h3 className={styles.groupTitle}>Nastrój</h3>
        <div className={styles.chips}>
          {Object.values(MOOD_META).map((m) => (
            <FilterChip
              key={m.slug}
              selected={filters.moods.includes(m.slug)}
              onClick={() => toggleMulti('mood', m.slug)}
            >
              <m.Icon size={14} aria-hidden /> {m.name}
            </FilterChip>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h3 className={styles.groupTitle}>Profil smakowy</h3>
        <div className={styles.chips}>
          {(flavors.data ?? []).map((f) => (
            <FilterChip
              key={f.slug}
              selected={filters.flavors.includes(f.slug)}
              onClick={() => toggleMulti('flavor', f.slug)}
            >
              {f.name}
            </FilterChip>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h3 className={styles.groupTitle}>Cena (zł)</h3>
        <div className={styles.priceRow}>
          <label className={styles.priceField}>
            <span className="visually-hidden">Cena od</span>
            <input
              type="number"
              min={0}
              placeholder="od"
              className={styles.priceInput}
              value={filters.minPrice ?? ''}
              onChange={(e) => setParam('minPrice', e.target.value)}
            />
          </label>
          <span aria-hidden>–</span>
          <label className={styles.priceField}>
            <span className="visually-hidden">Cena do</span>
            <input
              type="number"
              min={0}
              placeholder="do"
              className={styles.priceInput}
              value={filters.maxPrice ?? ''}
              onChange={(e) => setParam('maxPrice', e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className={styles.group}>
        <h3 className={styles.groupTitle}>Kofeina</h3>
        <div className={styles.chips}>
          {CAFFEINE_OPTIONS.map((c) => (
            <FilterChip
              key={c.value}
              selected={filters.caffeines.includes(c.value)}
              onClick={() => toggleMulti('caffeine', c.value)}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h3 className={styles.groupTitle}>Ocena</h3>
        <div className={styles.chips}>
          {RATING_OPTIONS.map((r) => (
            <FilterChip
              key={r.value}
              selected={filters.minRating === Number(r.value)}
              onClick={() =>
                setParam('minRating', filters.minRating === Number(r.value) ? undefined : r.value)
              }
            >
              {r.label}
            </FilterChip>
          ))}
        </div>
      </section>
    </div>
  );
}
