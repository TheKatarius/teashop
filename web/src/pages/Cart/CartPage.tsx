import { ShoppingCart, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { CartItem } from '@/types';
import { Button } from '@/components/Button/Button';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { ProductThumb } from '@/components/ProductThumb/ProductThumb';
import { QuantityStepper } from '@/components/QuantityStepper/QuantityStepper';
import { CouponField } from '@/features/cart/components/CouponField';
import { FreeShippingBar } from '@/features/cart/components/FreeShippingBar';
import {
  computeDiscount,
  FREE_SHIPPING_THRESHOLD,
  selectCount,
  selectSubtotal,
  useCartStore,
} from '@/features/cart/store';
import { toast } from '@/features/toast/store';
import { formatPrice } from '@/lib/format';
import styles from './CartPage.module.css';

export function CartPage() {
  const items = useCartStore((s) => s.items);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const coupon = useCartStore((s) => s.coupon);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);
  const restore = useCartStore((s) => s.restore);
  const navigate = useNavigate();

  const discount = computeDiscount(subtotal, coupon);
  const qualifiesFreeShipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD;
  const total = subtotal - discount;

  const handleRemove = (item: CartItem) => {
    remove(item.id);
    toast.info(`Usunięto „${item.product.name}"`, {
      label: 'Cofnij',
      onClick: () => restore(item),
    });
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <EmptyState
          icon={<ShoppingCart size={48} />}
          title="Twój koszyk jest pusty"
          description="Dobierz herbatę do nastroju albo przejrzyj nasze bestsellery."
          actions={
            <>
              <Button to="/sklep">Przejdź do sklepu</Button>
              <Button to="/quiz" variant="secondary-outline">
                Zrób quiz
              </Button>
            </>
          }
        />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className={styles.title}>Twój koszyk ({count})</h1>

      <div className={styles.layout}>
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <ProductThumb
                categorySlug={item.product.categorySlug}
                name={item.product.name}
                className={styles.thumb}
              />
              <div className={styles.itemMain}>
                <Link to={`/produkt/${item.product.slug}`} className={styles.itemName}>
                  {item.product.name}
                </Link>
                <span className={styles.itemMeta}>{item.weightGrams} g</span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item)}
                >
                  <Trash2 size={15} /> Usuń
                </button>
              </div>
              <div className={styles.qtyCell}>
                <QuantityStepper
                  value={item.quantity}
                  onChange={(q) => setQuantity(item.id, q)}
                  size="sm"
                />
              </div>
              <span className={styles.itemPrice}>
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Podsumowanie</h2>
          <FreeShippingBar subtotal={subtotal - discount} />
          <CouponField />

          <dl className={styles.totals}>
            <div className={styles.row}>
              <dt>Produkty</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className={styles.row}>
                <dt>Rabat {coupon ? `(${coupon.code})` : ''}</dt>
                <dd className={styles.discount}>−{formatPrice(discount)}</dd>
              </div>
            )}
            <div className={styles.row}>
              <dt>Dostawa</dt>
              <dd>{qualifiesFreeShipping ? 'Darmowa' : 'od 9,99 zł'}</dd>
            </div>
            <div className={styles.totalRow}>
              <dt>Razem</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          <Button fullWidth size="lg" onClick={() => navigate('/zamowienie')}>
            Do kasy
          </Button>
          <Link to="/sklep" className={styles.continue}>
            ← Kontynuuj zakupy
          </Link>
        </aside>
      </div>
    </div>
  );
}
