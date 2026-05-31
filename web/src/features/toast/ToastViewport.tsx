import { useEffect } from 'react';
import { X } from 'lucide-react';
import { AUTO_DISMISS_MS, useToastStore } from './store';
import styles from './ToastViewport.module.css';

/** Renders the head of the toast queue (T-01..T-04). Mounted once in RootLayout. */
export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);
  const current = toasts[0];

  useEffect(() => {
    if (!current || current.variant === 'error') return; // errors require manual close (T-02)
    const timer = setTimeout(() => dismiss(current.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [current, dismiss]);

  if (!current) return null;

  return (
    <div className={styles.viewport}>
      <div
        className={styles[current.variant]}
        role={current.variant === 'error' ? 'alert' : 'status'}
      >
        <p className={styles.message}>{current.message}</p>
        {current.action && (
          <button
            type="button"
            className={styles.action}
            onClick={() => {
              current.action?.onClick();
              dismiss(current.id);
            }}
          >
            {current.action.label}
          </button>
        )}
        <button
          type="button"
          className={styles.close}
          onClick={() => dismiss(current.id)}
          aria-label="Zamknij powiadomienie"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
