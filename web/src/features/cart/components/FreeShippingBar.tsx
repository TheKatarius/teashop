import { Leaf, PartyPopper } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { FREE_SHIPPING_THRESHOLD } from '../store';
import styles from './FreeShippingBar.module.css';

/** Progress toward free delivery (C-06). */
export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const qualifies = remaining === 0;

  return (
    <div className={styles.root}>
      <p className={styles.label}>
        <Leaf size={16} aria-hidden />
        {qualifies ? (
          <span>
            Masz darmową dostawę! <PartyPopper size={16} aria-hidden />
          </span>
        ) : (
          <span>
            Dodaj jeszcze <strong>{formatPrice(remaining)}</strong> do darmowej dostawy
          </span>
        )}
      </p>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
