import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { toast } from '@/features/toast/store';
import { useValidateCoupon } from '../api';
import { useCartStore } from '../store';
import styles from './CouponField.module.css';

/** Discount-code input with inline validation (C-05). Reads/writes the cart coupon. */
export function CouponField() {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const coupon = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const validate = useValidateCoupon();

  const handleApply = () => {
    if (!code.trim()) return;
    setError(null);
    validate.mutate(code.trim(), {
      onSuccess: (result) => {
        applyCoupon(result);
        setCode('');
        toast.success(`Zastosowano kod ${result.code}`);
      },
      onError: () => setError('Nieprawidłowy lub nieaktywny kod rabatowy'),
    });
  };

  if (coupon) {
    return (
      <div className={styles.applied}>
        <span className={styles.appliedLabel}>
          <Check size={16} aria-hidden /> Kod <strong>{coupon.code}</strong> aktywny
        </span>
        <button type="button" className={styles.remove} onClick={removeCoupon} aria-label="Usuń kod rabatowy">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.root}
      onSubmit={(e) => {
        e.preventDefault();
        handleApply();
      }}
    >
      <div className={styles.row}>
        <label htmlFor="coupon" className="visually-hidden">
          Kod rabatowy
        </label>
        <input
          id="coupon"
          className={styles.input}
          placeholder="Kod rabatowy"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'coupon-error' : undefined}
        />
        <Button type="submit" size="md" disabled={validate.isPending}>
          {validate.isPending ? '…' : 'Zastosuj'}
        </Button>
      </div>
      {error && (
        <p id="coupon-error" className={styles.error}>
          {error}
        </p>
      )}
    </form>
  );
}
