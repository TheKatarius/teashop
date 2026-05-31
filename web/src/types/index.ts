// Shared domain types — mirror of the (mock) backend HTTP contract.
// Kept in sync manually with api/TeaShop.Api Domain records and SeedData shapes.

export type CaffeineLevel = 'none' | 'low' | 'medium' | 'high';
export type Strength = 'delikatna' | 'średnia' | 'mocna';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface WeightOption {
  grams: number;
  price: number;
}

export interface BrewingInfo {
  tempC: number;
  /** [min, max] minutes */
  timeMin: [number, number];
  gramsPer: number;
  mlPer: number;
  maxSteeps: number;
  difficulty: Difficulty;
}

export interface MoodWeight {
  /** mood tag slug, e.g. 'relaks' */
  tag: string;
  /** 0.0 – 1.0 */
  weight: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  subcategory?: string;
  /** base price for the default (100g) weight option */
  price: number;
  weightOptions: WeightOption[];
  descriptionShort: string;
  descriptionLong: string;
  origin: string;
  brewing: BrewingInfo;
  caffeine: CaffeineLevel;
  strength: Strength;
  moodTags: MoodWeight[];
  flavorTags: string[];
  images: string[];
  isBestseller: boolean;
  isNew: boolean;
  isAvailable: boolean;
  stock: number;
  reviewsAvg: number;
  reviewsCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
}

export interface MoodTag {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  /** CSS custom property name from tokens.css, e.g. '--color-mint' */
  colorToken: string;
}

export interface FlavorTag {
  id: string;
  slug: string;
  name: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
}

// ─── Quiz ──────────────────────────────────────────────────────────────────
export type QuizQuestionType = 'mood' | 'preference' | 'goal';
export type QuizGoal = 'dopasuj' | 'popraw' | 'zaskocz';

export interface QuizOption {
  id: string;
  label: string;
  icon: string;
  /** mood-slug -> weight contributed when this option is chosen */
  tagWeights: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: QuizQuestionType;
  order: number;
  multiple: boolean;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  optionIds: string[];
}

export interface QuizSubmission {
  answers: QuizAnswer[];
  goal: QuizGoal;
}

export interface QuizRecommendation {
  product: Product;
  /** 0 – 100 match percent */
  score: number;
  rank: number;
}

export interface QuizResult {
  id: string;
  createdAt: string;
  /** dominant mood slugs, highest first */
  moodSummary: string[];
  goal: QuizGoal;
  recommendations: QuizRecommendation[];
  isFallback: boolean;
}

// ─── Cart / orders ───────────────────────────────────────────────────────────
export interface CartItem {
  /** stable key: `${productId}:${weightGrams}` */
  id: string;
  product: Product;
  weightGrams: number;
  unitPrice: number;
  quantity: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  weightGrams: number;
  quantity: number;
  unitPrice: number;
}

export type DeliveryMethod = 'inpost' | 'kurier' | 'poczta';

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  address: Address;
  email: string;
  couponCode?: string;
  status: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  type: 'percent' | 'amount';
  value: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  savedAddress?: Address;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
