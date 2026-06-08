interface IconProps {
  name: string;
  size?: number;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function Icon({ name, size = 24, className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <span
      className={className}
      style={{ fontSize: size, lineHeight: 1, display: 'inline-block' }}
      aria-hidden={ariaHidden}
    >
      {name}
    </span>
  );
}
