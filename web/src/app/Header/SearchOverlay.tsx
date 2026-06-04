import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categoryName } from '@/features/catalog/categoryMeta';
import { useProducts } from '@/features/catalog/api';
import { ProductThumb } from '@/components/ProductThumb/ProductThumb';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './SearchOverlay.module.css';

interface SearchOverlayProps {
  onClose: () => void;
}

/** Header search (SR-01..SR-04): overlay input + debounced autocomplete. */
export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [term, setTerm] = useState('');
  const debounced = useDebounce(term, 300);
  const navigate = useNavigate();
  const active = debounced.trim().length >= 2;
  const { data } = useProducts(active ? { q: debounced.trim() } : {});
  const suggestions = active ? (data?.items.slice(0, 6) ?? []) : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const goToResults = () => {
    if (!term.trim()) return;
    navigate(`/sklep?q=${encodeURIComponent(term.trim())}`);
    onClose();
  };

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Wyszukiwarka"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form
          className={styles.bar}
          onSubmit={(e) => {
            e.preventDefault();
            goToResults();
          }}
        >
          <Search size={20} className={styles.searchIcon} aria-hidden />
          <input
            type="search"
            className={styles.input}
            placeholder="Szukaj herbaty, smaku, nastroju…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            aria-label="Szukaj produktów"
            autoFocus
          />
          <button type="button" className={styles.close} onClick={onClose} aria-label="Zamknij wyszukiwarkę">
            <X size={20} />
          </button>
        </form>

        {active && (
          <ul className={styles.results}>
            {suggestions.length === 0 ? (
              <li className={styles.empty}>
                Brak wyników dla „{debounced}". Spróbuj <a href="/quiz">quizu nastrojowego</a>.
              </li>
            ) : (
              suggestions.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className={styles.suggestion}
                    onClick={() => {
                      navigate(`/produkt/${p.slug}`);
                      onClose();
                    }}
                  >
                    <ProductThumb categorySlug={p.categorySlug} name={p.name} className={styles.thumb} />
                    <span className={styles.suggestionText}>
                      <span className={styles.suggestionName}>{p.name}</span>
                      <span className={styles.suggestionCat}>{categoryName(p.categorySlug)}</span>
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
