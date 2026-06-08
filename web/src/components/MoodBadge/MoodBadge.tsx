import { MOOD_META } from '@/features/catalog/moodMeta';
import { cn } from '@/lib/cn';
import styles from './MoodBadge.module.css';

interface MoodBadgeProps {
  slug: string;
  /** show only the icon (compact rows in cart / quiz lists) */
  iconOnly?: boolean;
  className?: string;
}

/** Mood tag pill (P-05). Tinted by the mood's color token from design.md §2.9. */
export function MoodBadge({ slug, iconOnly = false, className }: MoodBadgeProps) {
  const mood = MOOD_META[slug];
  if (!mood) return null;

  const { Icon } = mood;
  const style = { '--mood-color': `var(${mood.colorToken})` } as React.CSSProperties;

  if (iconOnly) {
    return (
      <span className={cn(styles.icon, className)} title={mood.name} role="img" aria-label={mood.name}>
        <Icon size={16} aria-hidden />
      </span>
    );
  }

  return (
    <span className={cn(styles.badge, className)} style={style}>
      <Icon size={14} aria-hidden />
      {mood.name}
    </span>
  );
}
