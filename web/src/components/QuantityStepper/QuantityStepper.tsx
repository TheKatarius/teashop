import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import styles from './QuantityStepper.module.css';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  label?: string;
}

/** Decrement / value / increment control (P-02, C-04). */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  label = 'Ilość',
}: QuantityStepperProps) {
  return (
    <div className={cn(styles.stepper, styles[size])} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Zmniejsz ilość"
      >
        <Minus size={16} />
      </button>
      <span className={styles.value} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={styles.btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Zwiększ ilość"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
