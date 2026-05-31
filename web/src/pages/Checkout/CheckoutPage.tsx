import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { useDeliveryOptions, useCreateOrder, type DeliveryOption } from '@/features/checkout/api';
import {
  computeDiscount,
  FREE_SHIPPING_THRESHOLD,
  selectSubtotal,
  useCartStore,
} from '@/features/cart/store';
import { toast } from '@/features/toast/store';
import { Button } from '@/components/Button/Button';
import { TextField } from '@/components/TextField/TextField';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import { checkoutSchema, type CheckoutFormValues } from './CheckoutForm.schema';
import styles from './CheckoutPage.module.css';

const STEPS = ['Dane', 'Dostawa', 'Podsumowanie'];

export function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const coupon = useCartStore((s) => s.coupon);
  const clearCart = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const deliveryOptions = useDeliveryOptions();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [deliveryId, setDeliveryId] = useState<DeliveryOption['id']>('inpost');

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: user?.savedAddress
      ? {
          firstName: user.savedAddress.firstName,
          lastName: user.savedAddress.lastName,
          email: user.savedAddress.email,
          phone: user.savedAddress.phone,
          street: user.savedAddress.street,
          city: user.savedAddress.city,
          postalCode: user.savedAddress.postalCode,
        }
      : undefined,
  });

  if (items.length === 0 && !createOrder.isSuccess) {
    return <Navigate to="/koszyk" replace />;
  }

  const discount = computeDiscount(subtotal, coupon);
  const qualifiesFree = subtotal - discount >= FREE_SHIPPING_THRESHOLD;
  const selectedDelivery = deliveryOptions.data?.find((d) => d.id === deliveryId);
  const deliveryCost = qualifiesFree ? 0 : (selectedDelivery?.price ?? 0);
  const total = subtotal - discount + deliveryCost;

  const goToDelivery = form.handleSubmit(() => setStep(1));

  const placeOrder = () => {
    const values = form.getValues();
    createOrder.mutate(
      {
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          weightGrams: i.weightGrams,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        subtotal,
        deliveryCost,
        total,
        deliveryMethod: deliveryId,
        address: values,
        email: values.email,
        couponCode: coupon?.code,
      },
      {
        onSuccess: (order) => {
          clearCart();
          navigate(`/zamowienie/sukces/${order.id}`);
        },
        onError: () => toast.error('Płatność nie powiodła się. Spróbuj ponownie.'),
      },
    );
  };

  return (
    <div className="container">
      <ol className={styles.stepper} aria-label="Kroki zamówienia">
        {STEPS.map((label, i) => (
          <li key={label} className={cn(styles.step, i <= step && styles.stepActive)}>
            <span className={styles.stepCircle}>{i + 1}</span>
            <span className={styles.stepLabel}>{label}</span>
          </li>
        ))}
      </ol>

      <div className={styles.layout}>
        <div className={styles.panel}>
          {step === 0 && (
            <form className={styles.form} onSubmit={goToDelivery} noValidate>
              <h2 className={styles.heading}>Dane do dostawy</h2>
              <div className={styles.grid2}>
                <TextField label="Imię" {...form.register('firstName')} error={form.formState.errors.firstName?.message} />
                <TextField label="Nazwisko" {...form.register('lastName')} error={form.formState.errors.lastName?.message} />
              </div>
              <div className={styles.grid2}>
                <TextField label="E-mail" type="email" {...form.register('email')} error={form.formState.errors.email?.message} />
                <TextField label="Telefon" {...form.register('phone')} error={form.formState.errors.phone?.message} />
              </div>
              <TextField label="Adres" {...form.register('street')} error={form.formState.errors.street?.message} />
              <div className={styles.grid2}>
                <TextField label="Miasto" {...form.register('city')} error={form.formState.errors.city?.message} />
                <TextField label="Kod pocztowy" placeholder="00-000" {...form.register('postalCode')} error={form.formState.errors.postalCode?.message} />
              </div>
              <Button type="submit" size="lg">
                Dalej →
              </Button>
            </form>
          )}

          {step === 1 && (
            <div className={styles.form}>
              <h2 className={styles.heading}>Metoda dostawy</h2>
              <div className={styles.delivery}>
                {(deliveryOptions.data ?? []).map((opt) => (
                  <label
                    key={opt.id}
                    className={cn(styles.deliveryOption, deliveryId === opt.id && styles.deliverySelected)}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={opt.id}
                      checked={deliveryId === opt.id}
                      onChange={() => setDeliveryId(opt.id)}
                    />
                    <span className={styles.deliveryName}>{opt.name}</span>
                    <span className={styles.deliveryEta}>{opt.eta}</span>
                    <span className={styles.deliveryPrice}>
                      {qualifiesFree ? 'Darmowa' : formatPrice(opt.price)}
                    </span>
                  </label>
                ))}
              </div>
              <div className={styles.navRow}>
                <button type="button" className={styles.back} onClick={() => setStep(0)}>
                  ← Wróć
                </button>
                <Button size="lg" onClick={() => setStep(2)}>
                  Dalej →
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.form}>
              <h2 className={styles.heading}>Sprawdź zamówienie</h2>
              <ul className={styles.reviewItems}>
                {items.map((i) => (
                  <li key={i.id} className={styles.reviewItem}>
                    <span>
                      {i.product.name} · {i.weightGrams} g × {i.quantity}
                    </span>
                    <span>{formatPrice(i.unitPrice * i.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.address}>
                <strong>Dostawa:</strong> {selectedDelivery?.name} —{' '}
                {form.getValues('street')}, {form.getValues('postalCode')} {form.getValues('city')}
              </div>
              <div className={styles.navRow}>
                <button type="button" className={styles.back} onClick={() => setStep(1)}>
                  ← Wróć
                </button>
                <Button size="lg" variant="primary-dark" onClick={placeOrder} disabled={createOrder.isPending}>
                  {createOrder.isPending ? 'Przetwarzam…' : `Zamawiam i płacę — ${formatPrice(total)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Twoje zamówienie</h2>
          <dl className={styles.totals}>
            <div className={styles.row}>
              <dt>Produkty</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className={styles.row}>
                <dt>Rabat</dt>
                <dd className={styles.discount}>−{formatPrice(discount)}</dd>
              </div>
            )}
            <div className={styles.row}>
              <dt>Dostawa</dt>
              <dd>{deliveryCost === 0 ? 'Darmowa' : formatPrice(deliveryCost)}</dd>
            </div>
            <div className={styles.totalRow}>
              <dt>Razem</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
