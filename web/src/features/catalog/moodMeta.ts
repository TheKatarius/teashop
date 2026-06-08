// Presentation metadata for the six mood tags (P-05). Single source of truth so the
// mock seed and the UI badges never drift. Color tokens per design.md §2.9.

import { Droplets, Heart, Moon, Target, Waves, Zap, type LucideIcon } from 'lucide-react';

export interface MoodMeta {
  slug: string;
  name: string;
  Icon: LucideIcon;
  colorToken: string;
}

export const MOOD_META: Record<string, MoodMeta> = {
  relaks: { slug: 'relaks', name: 'Relaks', Icon: Waves, colorToken: '--color-mint' },
  energia: { slug: 'energia', name: 'Energia', Icon: Zap, colorToken: '--color-gold' },
  fokus: { slug: 'fokus', name: 'Fokus', Icon: Target, colorToken: '--color-brand-green-mid' },
  comfort: { slug: 'comfort', name: 'Comfort', Icon: Heart, colorToken: '--color-rating' },
  wieczor: { slug: 'wieczor', name: 'Wieczór', Icon: Moon, colorToken: '--color-brand-dark' },
  detox: { slug: 'detox', name: 'Detox', Icon: Droplets, colorToken: '--color-sage-50' },
};

export const MOOD_ORDER = Object.keys(MOOD_META);
