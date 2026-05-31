import { CheckCircle2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { useOrder } from '@/features/checkout/api';
import { Button } from '@/components/Button/Button';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { formatPrice } from '@/lib/format';
import styles from './OrderSuccessPage.module.css';

export function OrderSuccessPage() {
  const { orderId } = useParams();
  const { data: order, isLoading, isError } = useOrder(orderId);
  const user = useAuthStore((s) => s.user);

  if (isLoading) {
    return (
      <div className="container">
        <div className={styles.hero}>
          <Skeleton width="200px" height="32px" />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container">
        <EmptyState
          title="Nie znaleźliśmy tego zamówienia"
          actions={<Button to="/sklep">Wróć do sklepu</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <section className={styles.hero}>
        <CheckCircle2 size={64} className={styles.icon} aria-hidden />
        <h1 className={styles.title}>Dziękujemy za zamówienie!</h1>
        <p className={styles.lead}>Potwierdzenie wysłaliśmy na {order.email}.</p>
        <span className={styles.orderNumber}>Numer zamówienia: {order.orderNumber}</span>
      </section>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Szczegóły zamówienia</h2>
          <ul className={styles.items}>
            {order.items.map((i) => (
              <li key={`${i.productId}-${i.weightGrams}`} className={styles.item}>
                <span>
                  {i.name} · {i.weightGrams} g × {i.quantity}
                </span>
                <span>{formatPrice(i.unitPrice * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className={styles.totalRow}>
            <span>Razem</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Dostawa</h2>
          <p className={styles.address}>
            {order.address.firstName} {order.address.lastName}
            <br />
            {order.address.street}
            <br />
            {order.address.postalCode} {order.address.city}
            <br />
            {order.address.phone}
          </p>
        </div>
      </div>

      <div className={styles.ctas}>
        {user ? (
          <Button to="/profil">Zobacz moje zamówienia</Button>
        ) : (
          <Button to="/rejestracja">Załóż konto jednym kliknięciem</Button>
        )}
        <Button to="/sklep" variant="secondary-outline">
          Kontynuuj zakupy
        </Button>
      </div>
    </div>
  );
}
