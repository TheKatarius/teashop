import { useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductThumb } from '@/components/ProductThumb/ProductThumb';
import { Button } from '@/components/Button/Button';
import { formatPrice } from '@/lib/format';
import { selectCount, selectSubtotal, useCartStore } from '../store';
import { useCartDrawer } from '../uiStore';
import styles from './CartDrawer.module.css';

/** Cart preview drawer (C-03). Mounted once in RootLayout; opens on add-to-cart. */
export function CartDrawer() {
  const isOpen = useCartDrawer((s) => s.isOpen);
  const close = useCartDrawer((s) => s.close);
  const items = useCartStore((s) => s.items);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onMouseDown={close}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Koszyk"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className={styles.head}>
          <h2 className={styles.title}>Twój koszyk ({count})</h2>
          <button type="button" className={styles.close} onClick={close} aria-label="Zamknij koszyk">
            <X size={24} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingBag size={48} aria-hidden />
            <p>Twój koszyk jest pusty.</p>
            <Button to="/sklep" onClick={close}>
              Przejdź do sklepu
            </Button>
          </div>
        ) : (
          <>
            <ul className={styles.items}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <ProductThumb
                    categorySlug={item.product.categorySlug}
                    name={item.product.name}
                    className={styles.thumb}
                  />
                  <div className={styles.itemBody}>
                    <Link
                      to={`/produkt/${item.product.slug}`}
                      className={styles.itemName}
                      onClick={close}
                    >
                      {item.product.name}
                    </Link>
                    <span className={styles.itemMeta}>
                      {item.weightGrams} g × {item.quantity}
                    </span>
                  </div>
                  <span className={styles.itemPrice}>
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <footer className={styles.footer}>
              <div className={styles.subtotalRow}>
                <span>Suma częściowa</span>
                <span className={styles.subtotal}>{formatPrice(subtotal)}</span>
              </div>
              <Button
                fullWidth
                onClick={() => {
                  close();
                  navigate('/zamowienie');
                }}
              >
                Do kasy
              </Button>
              <Button to="/koszyk" variant="secondary-outline" fullWidth onClick={close}>
                Zobacz koszyk
              </Button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
