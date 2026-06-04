import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary-solid'
  | 'primary-dark'
  | 'secondary-outline'
  | 'ghost'
  | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { to?: never };
type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & { to: string };

/** Solid/outline/ghost button. Pass `to` to render a styled router link instead. */
export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = 'primary-solid', size = 'md', fullWidth, className, children } = props;
  const classes = cn(
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth && styles.full,
    className,
  );

  if ('to' in props) {
    const { to, variant: _v, size: _s, fullWidth: _f, className: _c, children: _ch, ...rest } =
      props as LinkButtonProps;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, fullWidth: _f, className: _c, children: _ch, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
