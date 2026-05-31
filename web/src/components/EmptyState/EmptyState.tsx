import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  /** primary + optional secondary CTA */
  actions?: ReactNode;
}

/** "Nigdy pusty ekran" — every empty/error state has copy + a way forward. */
export function EmptyState({ icon, title, description, actions }: EmptyStateProps) {
  return (
    <div className={styles.root} role="status">
      {icon && <div className={styles.icon}>{icon}</div>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
