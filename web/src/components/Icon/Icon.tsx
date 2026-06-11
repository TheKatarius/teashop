import {
  Ban,
  BatteryLow,
  Brain,
  Candy,
  Cherry,
  Coffee,
  CupSoda,
  Dices,
  Feather,
  Flame,
  Flower,
  Heart,
  Leaf,
  Moon,
  Scale,
  Smile,
  SmilePlus,
  Sun,
  Sunrise,
  Sunset,
  Target,
  Waves,
  Zap,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

// Registry for data-driven icons (quiz options come from the mock API as name
// strings, so they can't carry a component reference like the taxonomy meta does).
const ICONS: Record<string, LucideIcon> = {
  ban: Ban,
  'battery-low': BatteryLow,
  brain: Brain,
  candy: Candy,
  cherry: Cherry,
  coffee: Coffee,
  'cup-soda': CupSoda,
  dices: Dices,
  feather: Feather,
  flame: Flame,
  flower: Flower,
  heart: Heart,
  leaf: Leaf,
  moon: Moon,
  scale: Scale,
  smile: Smile,
  'smile-plus': SmilePlus,
  sun: Sun,
  sunrise: Sunrise,
  sunset: Sunset,
  target: Target,
  waves: Waves,
  zap: Zap,
};

interface IconProps extends LucideProps {
  name: string;
}

/** Renders a Lucide icon by name, falling back to a leaf if the name is unknown. */
export function Icon({ name, ...props }: IconProps) {
  const Glyph = ICONS[name] ?? Leaf;
  return <Glyph {...props} />;
}
