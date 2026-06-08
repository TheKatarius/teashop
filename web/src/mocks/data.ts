import type {
  Category,
  Coupon,
  FlavorTag,
  MoodTag,
  Product,
  QuizQuestion,
  Review,
  User,
  WeightOption,
} from '@/types';
import { MOOD_META } from '@/features/catalog/moodMeta';
import { CATEGORY_META } from '@/features/catalog/categoryMeta';

// In-memory seed data for the mock backend. Mirrors api/TeaShop.Api/SeedData shapes.

export const categories: Category[] = CATEGORY_META.map((c) => ({
  id: `cat-${c.slug}`,
  name: c.name,
  slug: c.slug,
}));

export const moodTags: MoodTag[] = Object.values(MOOD_META).map((m) => ({
  id: `mood-${m.slug}`,
  slug: m.slug,
  name: m.name,
  colorToken: m.colorToken,
}));

export const flavorTags: FlavorTag[] = [
  { id: 'fl-kwiatowa', slug: 'kwiatowa', name: 'kwiatowa' },
  { id: 'fl-owocowa', slug: 'owocowa', name: 'owocowa' },
  { id: 'fl-orzechowa', slug: 'orzechowa', name: 'orzechowa' },
  { id: 'fl-ziemista', slug: 'ziemista', name: 'ziemista' },
  { id: 'fl-trawiasta', slug: 'trawiasta', name: 'trawiasta' },
  { id: 'fl-przyprawowa', slug: 'przyprawowa', name: 'przyprawowa' },
  { id: 'fl-umami', slug: 'umami', name: 'umami' },
  { id: 'fl-slodowa', slug: 'slodowa', name: 'słodowa' },
  { id: 'fl-slodka', slug: 'slodka', name: 'słodka' },
  { id: 'fl-gorzka', slug: 'gorzka', name: 'gorzka' },
];

export const coupons: Coupon[] = [
  { code: 'HERBATA10', type: 'percent', value: 10 },
  { code: 'RELAKS20', type: 'amount', value: 20 },
  { code: 'WIOSNA', type: 'percent', value: 15 },
];

export const FREE_SHIPPING_THRESHOLD = 99;

export const deliveryOptions = [
  { id: 'inpost' as const, name: 'Paczkomat InPost', price: 9.99, eta: '1–2 dni robocze' },
  { id: 'poczta' as const, name: 'Poczta Polska', price: 12.99, eta: '2–4 dni robocze' },
  { id: 'kurier' as const, name: 'Kurier DPD', price: 14.99, eta: '1–2 dni robocze' },
];

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Anna Kowalska',
    email: 'anna@teashop.pl',
    savedAddress: {
      firstName: 'Anna',
      lastName: 'Kowalska',
      street: 'ul. Herbaciana 12/4',
      city: 'Kraków',
      postalCode: '30-001',
      phone: '600100200',
      email: 'anna@teashop.pl',
    },
  },
  { id: 'user-2', name: 'Marek Nowak', email: 'marek@teashop.pl' },
];

// ─── Quiz ────────────────────────────────────────────────────────────────────
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'Jak się dziś czujesz?',
    type: 'mood',
    order: 1,
    multiple: false,
    options: [
      { id: 'q1a', label: 'Spokojnie', icon: 'smile', tagWeights: { relaks: 1 } },
      { id: 'q1b', label: 'Zmęczony/a', icon: 'battery-low', tagWeights: { energia: 1, comfort: 0.5 } },
      { id: 'q1c', label: 'Energicznie', icon: 'smile-plus', tagWeights: { energia: 1, fokus: 0.5 } },
      { id: 'q1d', label: 'Zamyślony/a', icon: 'brain', tagWeights: { fokus: 1 } },
    ],
  },
  {
    id: 'q2',
    text: 'Jaka jest teraz pora dnia?',
    type: 'mood',
    order: 2,
    multiple: false,
    options: [
      { id: 'q2a', label: 'Poranek', icon: 'sunrise', tagWeights: { energia: 1, fokus: 0.5 } },
      { id: 'q2b', label: 'Południe', icon: 'sun', tagWeights: { fokus: 1 } },
      { id: 'q2c', label: 'Popołudnie', icon: 'sunset', tagWeights: { relaks: 0.5, comfort: 0.5 } },
      { id: 'q2d', label: 'Wieczór', icon: 'moon', tagWeights: { wieczor: 1, relaks: 0.5 } },
    ],
  },
  {
    id: 'q3',
    text: 'Czego teraz potrzebujesz?',
    type: 'mood',
    order: 3,
    multiple: false,
    options: [
      { id: 'q3a', label: 'Wyciszenia', icon: 'waves', tagWeights: { relaks: 1, wieczor: 0.5 } },
      { id: 'q3b', label: 'Pobudzenia', icon: 'zap', tagWeights: { energia: 1 } },
      { id: 'q3c', label: 'Skupienia', icon: 'target', tagWeights: { fokus: 1 } },
      { id: 'q3d', label: 'Otulenia', icon: 'heart', tagWeights: { comfort: 1 } },
    ],
  },
  {
    id: 'q4',
    text: 'Jakie smaki Cię kuszą? (możesz wybrać kilka)',
    type: 'preference',
    order: 4,
    multiple: true,
    options: [
      { id: 'q4a', label: 'Kwiatowe', icon: 'flower', tagWeights: { relaks: 0.5 } },
      { id: 'q4b', label: 'Owocowe', icon: 'cherry', tagWeights: { comfort: 0.5, energia: 0.3 } },
      { id: 'q4c', label: 'Ziołowe', icon: 'leaf', tagWeights: { detox: 0.6, relaks: 0.4 } },
      { id: 'q4d', label: 'Słodkie', icon: 'candy', tagWeights: { comfort: 0.6 } },
    ],
  },
  {
    id: 'q5',
    text: 'Jak mocną herbatę wolisz?',
    type: 'preference',
    order: 5,
    multiple: false,
    options: [
      { id: 'q5a', label: 'Delikatną', icon: 'feather', tagWeights: { relaks: 0.6, fokus: 0.3 } },
      { id: 'q5b', label: 'Średnią', icon: 'scale', tagWeights: { fokus: 0.4, comfort: 0.4 } },
      { id: 'q5c', label: 'Mocną', icon: 'flame', tagWeights: { energia: 0.8 } },
    ],
  },
  {
    id: 'q6',
    text: 'Ile kofeiny tolerujesz?',
    type: 'preference',
    order: 6,
    multiple: false,
    options: [
      { id: 'q6a', label: 'Sporo', icon: 'coffee', tagWeights: { energia: 1, fokus: 0.5 } },
      { id: 'q6b', label: 'Trochę', icon: 'cup-soda', tagWeights: { fokus: 0.5, relaks: 0.3 } },
      { id: 'q6c', label: 'Wcale', icon: 'ban', tagWeights: { wieczor: 0.8, relaks: 0.6, detox: 0.4 } },
    ],
  },
  {
    id: 'q7',
    text: 'Czego oczekujesz od tej herbaty?',
    type: 'goal',
    order: 7,
    multiple: false,
    options: [
      { id: 'dopasuj', label: 'Dopasuj do nastroju', icon: 'target', tagWeights: {} },
      { id: 'popraw', label: 'Popraw nastrój', icon: 'sun', tagWeights: {} },
      { id: 'zaskocz', label: 'Zaskocz mnie', icon: 'dices', tagWeights: {} },
    ],
  },
];

// ─── Products ────────────────────────────────────────────────────────────────
type ProductSeed = Omit<Product, 'weightOptions' | 'images' | 'isAvailable' | 'stock'> &
  Partial<Pick<Product, 'weightOptions' | 'images' | 'isAvailable' | 'stock'>>;

const round2 = (n: number) => Math.round(n * 100) / 100;

function defaultWeights(price: number): WeightOption[] {
  return [
    { grams: 50, price: round2(price * 0.55) },
    { grams: 100, price },
    { grams: 250, price: round2(price * 2.3) },
  ];
}

function build(seed: ProductSeed): Product {
  return {
    isAvailable: true,
    stock: 40,
    images: [],
    weightOptions: seed.weightOptions ?? defaultWeights(seed.price),
    ...seed,
  };
}

const D = (s: string) => `2026-${s}`;

const seeds: Product[] = [
  build({
    id: 'p-sencha-uji', name: 'Sencha Uji', slug: 'sencha-uji', categorySlug: 'zielona',
    subcategory: 'Japońska', price: 32, descriptionShort: 'Klasyczna japońska zielona herbata o świeżym, trawiastym profilu.',
    descriptionLong: 'Sencha z regionu Uji to esencja japońskiej tradycji — parzona w niskiej temperaturze odsłania nuty umami i świeżo skoszonej trawy. Idealna na poranne skupienie.',
    origin: 'Uji, Japonia', brewing: { tempC: 70, timeMin: [1, 2], gramsPer: 3, mlPer: 200, maxSteeps: 3, difficulty: 'medium' },
    caffeine: 'medium', strength: 'średnia',
    moodTags: [{ tag: 'fokus', weight: 0.8 }, { tag: 'detox', weight: 0.6 }, { tag: 'relaks', weight: 0.4 }],
    flavorTags: ['trawiasta', 'umami'], isBestseller: true, isNew: false, reviewsAvg: 4.7, reviewsCount: 124, createdAt: D('01-10'),
  }),
  build({
    id: 'p-gyokuro', name: 'Gyokuro Cienista', slug: 'gyokuro-cienista', categorySlug: 'zielona',
    subcategory: 'Japońska', price: 58, descriptionShort: 'Cieniowana zielona herbata premium o głębokim umami.',
    descriptionLong: 'Gyokuro dojrzewa w cieniu, co podnosi poziom teaniny i nadaje jej jedwabistą słodycz. To herbata na chwilę uważności.',
    origin: 'Yame, Japonia', brewing: { tempC: 60, timeMin: [2, 3], gramsPer: 4, mlPer: 150, maxSteeps: 3, difficulty: 'hard' },
    caffeine: 'medium', strength: 'średnia',
    moodTags: [{ tag: 'relaks', weight: 0.7 }, { tag: 'fokus', weight: 0.7 }, { tag: 'detox', weight: 0.4 }],
    flavorTags: ['umami', 'trawiasta', 'slodka'], isBestseller: false, isNew: false, reviewsAvg: 4.9, reviewsCount: 47, createdAt: D('02-02'),
  }),
  build({
    id: 'p-long-jing', name: 'Long Jing', slug: 'long-jing', categorySlug: 'zielona',
    subcategory: 'Chińska', price: 38, descriptionShort: 'Smażona chińska zielona herbata o orzechowym posmaku.',
    descriptionLong: 'Long Jing (Smocza Studnia) to jedna z najsłynniejszych chińskich herbat — płaskie, prażone listki dają łagodny, orzechowy napar.',
    origin: 'Hangzhou, Chiny', brewing: { tempC: 80, timeMin: [2, 3], gramsPer: 3, mlPer: 200, maxSteeps: 3, difficulty: 'easy' },
    caffeine: 'low', strength: 'delikatna',
    moodTags: [{ tag: 'fokus', weight: 0.6 }, { tag: 'relaks', weight: 0.6 }, { tag: 'detox', weight: 0.5 }],
    flavorTags: ['orzechowa', 'trawiasta'], isBestseller: true, isNew: false, reviewsAvg: 4.6, reviewsCount: 88, createdAt: D('01-18'),
  }),
  build({
    id: 'p-assam-malty', name: 'Assam Malty', slug: 'assam-malty', categorySlug: 'czarna',
    subcategory: 'Klasyczna', price: 28, descriptionShort: 'Mocna indyjska czarna herbata o słodowym charakterze.',
    descriptionLong: 'Assam z dolin Brahmaputry to esencja poranka — mocny, słodowy napar, który świetnie znosi dodatek mleka.',
    origin: 'Assam, Indie', brewing: { tempC: 95, timeMin: [3, 5], gramsPer: 3, mlPer: 200, maxSteeps: 2, difficulty: 'easy' },
    caffeine: 'high', strength: 'mocna',
    moodTags: [{ tag: 'energia', weight: 0.9 }, { tag: 'comfort', weight: 0.5 }],
    flavorTags: ['slodowa', 'ziemista'], isBestseller: true, isNew: false, reviewsAvg: 4.5, reviewsCount: 156, createdAt: D('01-05'),
  }),
  build({
    id: 'p-earl-grey', name: 'Earl Grey Imperial', slug: 'earl-grey-imperial', categorySlug: 'czarna',
    subcategory: 'Aromatyzowana', price: 30, descriptionShort: 'Czarna herbata z olejkiem bergamotki i kwiatem chabra.',
    descriptionLong: 'Ponadczasowa klasyka — cytrusowa bergamotka spotyka mocną bazę cejlońską. Elegancja w filiżance o każdej porze.',
    origin: 'Cejlon, Sri Lanka', brewing: { tempC: 95, timeMin: [3, 4], gramsPer: 3, mlPer: 200, maxSteeps: 2, difficulty: 'easy' },
    caffeine: 'high', strength: 'mocna',
    moodTags: [{ tag: 'energia', weight: 0.7 }, { tag: 'fokus', weight: 0.5 }, { tag: 'comfort', weight: 0.4 }],
    flavorTags: ['kwiatowa', 'owocowa'], isBestseller: true, isNew: false, reviewsAvg: 4.7, reviewsCount: 203, createdAt: D('01-12'),
  }),
  build({
    id: 'p-darjeeling', name: 'Darjeeling First Flush', slug: 'darjeeling-first-flush', categorySlug: 'czarna',
    subcategory: 'Klasyczna', price: 42, descriptionShort: 'Lekka „szampańska" czarna herbata z pierwszego zbioru.',
    descriptionLong: 'First flush z Himalajów zbierany wiosną — kwiatowy, muskatelowy i zaskakująco lekki jak na czarną herbatę.',
    origin: 'Darjeeling, Indie', brewing: { tempC: 90, timeMin: [2, 3], gramsPer: 3, mlPer: 200, maxSteeps: 2, difficulty: 'medium' },
    caffeine: 'medium', strength: 'średnia',
    moodTags: [{ tag: 'fokus', weight: 0.6 }, { tag: 'energia', weight: 0.5 }, { tag: 'relaks', weight: 0.4 }],
    flavorTags: ['kwiatowa', 'owocowa'], isBestseller: false, isNew: false, reviewsAvg: 4.6, reviewsCount: 64, createdAt: D('02-20'),
  }),
  build({
    id: 'p-bai-mu-dan', name: 'Bai Mu Dan', slug: 'bai-mu-dan', categorySlug: 'biala',
    subcategory: 'Biała', price: 36, descriptionShort: 'Delikatna biała herbata o nutach miodu i melona.',
    descriptionLong: 'Białe Piwonie — minimalnie przetworzone listki i pąki dają subtelny, słodkawy napar idealny na spokojny wieczór.',
    origin: 'Fujian, Chiny', brewing: { tempC: 85, timeMin: [3, 4], gramsPer: 4, mlPer: 200, maxSteeps: 3, difficulty: 'easy' },
    caffeine: 'low', strength: 'delikatna',
    moodTags: [{ tag: 'relaks', weight: 0.8 }, { tag: 'wieczor', weight: 0.6 }, { tag: 'detox', weight: 0.4 }],
    flavorTags: ['kwiatowa', 'slodka', 'owocowa'], isBestseller: false, isNew: false, reviewsAvg: 4.8, reviewsCount: 72, createdAt: D('02-08'),
  }),
  build({
    id: 'p-silver-needle', name: 'Silver Needle', slug: 'silver-needle', categorySlug: 'biala',
    subcategory: 'Biała', price: 64, descriptionShort: 'Najszlachetniejsza biała herbata z samych pąków.',
    descriptionLong: 'Bai Hao Yin Zhen — wyłącznie srebrzyste pąki zbierane wiosną. Czysty, miodowy i kojący napar.',
    origin: 'Fujian, Chiny', brewing: { tempC: 80, timeMin: [4, 5], gramsPer: 4, mlPer: 200, maxSteeps: 3, difficulty: 'medium' },
    caffeine: 'low', strength: 'delikatna',
    moodTags: [{ tag: 'relaks', weight: 0.9 }, { tag: 'wieczor', weight: 0.5 }, { tag: 'detox', weight: 0.5 }],
    flavorTags: ['kwiatowa', 'slodka'], isBestseller: false, isNew: true, reviewsAvg: 4.9, reviewsCount: 31, createdAt: D('05-22'),
  }),
  build({
    id: 'p-oolong-wuyi', name: 'Oolong Wuyi Rock', slug: 'oolong-wuyi-rock', categorySlug: 'oolong',
    subcategory: 'Ciemny', price: 46, descriptionShort: 'Prażony górski oolong o mineralnym, palonym profilu.',
    descriptionLong: 'Yan Cha z gór Wuyi — skaliste terroir nadaje mu charakterystyczną mineralność i nuty palonego karmelu.',
    origin: 'Wuyi, Chiny', brewing: { tempC: 95, timeMin: [1, 2], gramsPer: 5, mlPer: 150, maxSteeps: 5, difficulty: 'medium' },
    caffeine: 'medium', strength: 'średnia',
    moodTags: [{ tag: 'comfort', weight: 0.7 }, { tag: 'fokus', weight: 0.5 }, { tag: 'energia', weight: 0.4 }],
    flavorTags: ['przyprawowa', 'orzechowa', 'slodowa'], isBestseller: true, isNew: false, reviewsAvg: 4.7, reviewsCount: 91, createdAt: D('01-25'),
  }),
  build({
    id: 'p-dong-ding', name: 'Oolong Dong Ding', slug: 'oolong-dong-ding', categorySlug: 'oolong',
    subcategory: 'Jasny', price: 44, descriptionShort: 'Kremowy tajwański oolong o nutach masła i orchidei.',
    descriptionLong: 'Lekko utleniony oolong z gór Tajwanu — gładki, kwiatowo-maślany i niezwykle aromatyczny przy kolejnych zaparzeniach.',
    origin: 'Nantou, Tajwan', brewing: { tempC: 90, timeMin: [1, 2], gramsPer: 5, mlPer: 150, maxSteeps: 5, difficulty: 'medium' },
    caffeine: 'medium', strength: 'średnia',
    moodTags: [{ tag: 'relaks', weight: 0.6 }, { tag: 'comfort', weight: 0.6 }, { tag: 'fokus', weight: 0.4 }],
    flavorTags: ['kwiatowa', 'slodka', 'orzechowa'], isBestseller: false, isNew: false, reviewsAvg: 4.8, reviewsCount: 58, createdAt: D('02-14'),
  }),
  build({
    id: 'p-puerh-sheng', name: 'Pu-erh Sheng 2019', slug: 'puerh-sheng-2019', categorySlug: 'puerh',
    subcategory: 'Surowy', price: 52, descriptionShort: 'Surowy pu-erh dojrzewający o ziemisto-owocowym profilu.',
    descriptionLong: 'Prasowany surowy pu-erh z Yunnanu — z każdym rokiem łagodnieje, oferując złożony, leśny i lekko słodki napar.',
    origin: 'Yunnan, Chiny', brewing: { tempC: 95, timeMin: [1, 2], gramsPer: 5, mlPer: 150, maxSteeps: 6, difficulty: 'hard' },
    caffeine: 'medium', strength: 'mocna',
    moodTags: [{ tag: 'detox', weight: 0.8 }, { tag: 'fokus', weight: 0.5 }, { tag: 'comfort', weight: 0.3 }],
    flavorTags: ['ziemista', 'owocowa'], isBestseller: false, isNew: false, reviewsAvg: 4.5, reviewsCount: 39, createdAt: D('03-01'),
  }),
  build({
    id: 'p-puerh-shou', name: 'Pu-erh Shou Dojrzały', slug: 'puerh-shou-dojrzaly', categorySlug: 'puerh',
    subcategory: 'Dojrzały', price: 48, descriptionShort: 'Dojrzały pu-erh o głębokim, ziemistym i kojącym smaku.',
    descriptionLong: 'Shou pu-erh przechodzi przyspieszoną fermentację — daje gładki, ciepły i okrywający napar bez goryczy. Idealny po posiłku.',
    origin: 'Yunnan, Chiny', brewing: { tempC: 95, timeMin: [1, 2], gramsPer: 5, mlPer: 150, maxSteeps: 6, difficulty: 'medium' },
    caffeine: 'medium', strength: 'mocna',
    moodTags: [{ tag: 'detox', weight: 0.7 }, { tag: 'comfort', weight: 0.6 }, { tag: 'wieczor', weight: 0.4 }],
    flavorTags: ['ziemista', 'slodowa'], isBestseller: false, isNew: false, reviewsAvg: 4.4, reviewsCount: 45, createdAt: D('03-10'),
  }),
  build({
    id: 'p-matcha-ceremonial', name: 'Matcha Ceremonialna', slug: 'matcha-ceremonialna', categorySlug: 'matcha',
    subcategory: 'Ceremonialna', price: 72, descriptionShort: 'Sproszkowana zielona herbata premium o intensywnym umami.',
    descriptionLong: 'Kamieniem mielona matcha klasy ceremonialnej z Uji — żywa zieleń, kremowa piana i czysty zastrzyk skupionej energii.',
    origin: 'Uji, Japonia', brewing: { tempC: 80, timeMin: [1, 1], gramsPer: 2, mlPer: 70, maxSteeps: 1, difficulty: 'medium' },
    caffeine: 'high', strength: 'mocna',
    moodTags: [{ tag: 'energia', weight: 0.8 }, { tag: 'fokus', weight: 0.9 }, { tag: 'detox', weight: 0.5 }],
    flavorTags: ['umami', 'trawiasta', 'slodka'], isBestseller: true, isNew: false, reviewsAvg: 4.8, reviewsCount: 167, createdAt: D('01-08'),
  }),
  build({
    id: 'p-matcha-latte', name: 'Matcha Latte Blend', slug: 'matcha-latte-blend', categorySlug: 'matcha',
    subcategory: 'Kulinarna', price: 39, descriptionShort: 'Matcha kulinarna idealna do latte i wypieków.',
    descriptionLong: 'Łagodniejsza matcha stworzona z myślą o mleku — kremowa, lekko słodka i wybaczająca przy ubijaniu.',
    origin: 'Kagoshima, Japonia', brewing: { tempC: 80, timeMin: [1, 1], gramsPer: 3, mlPer: 200, maxSteeps: 1, difficulty: 'easy' },
    caffeine: 'medium', strength: 'średnia',
    moodTags: [{ tag: 'comfort', weight: 0.7 }, { tag: 'energia', weight: 0.6 }, { tag: 'fokus', weight: 0.5 }],
    flavorTags: ['slodka', 'trawiasta'], isBestseller: false, isNew: true, reviewsAvg: 4.5, reviewsCount: 53, createdAt: D('05-18'),
  }),
  build({
    id: 'p-rumianek', name: 'Rumianek Łąkowy', slug: 'rumianek-lakowy', categorySlug: 'ziolowa',
    subcategory: 'Ziołowa', price: 18, descriptionShort: 'Bezkofeinowy napar z kwiatów rumianku na dobry sen.',
    descriptionLong: 'Całe główki rumianku zbierane na polskich łąkach — miodowo-jabłkowy, kojący napar, który wycisza przed snem.',
    origin: 'Polska', brewing: { tempC: 100, timeMin: [5, 7], gramsPer: 3, mlPer: 250, maxSteeps: 1, difficulty: 'easy' },
    caffeine: 'none', strength: 'delikatna',
    moodTags: [{ tag: 'relaks', weight: 0.9 }, { tag: 'wieczor', weight: 0.9 }, { tag: 'comfort', weight: 0.5 }],
    flavorTags: ['kwiatowa', 'slodka'], isBestseller: true, isNew: false, reviewsAvg: 4.6, reviewsCount: 142, createdAt: D('01-15'),
  }),
  build({
    id: 'p-mieta', name: 'Mięta Marokańska', slug: 'mieta-marokanska', categorySlug: 'ziolowa',
    subcategory: 'Ziołowa', price: 16, descriptionShort: 'Orzeźwiający napar z mięty pieprzowej.',
    descriptionLong: 'Intensywnie chłodząca mięta pieprzowa — wspiera trawienie i odświeża umysł o każdej porze dnia.',
    origin: 'Maroko', brewing: { tempC: 100, timeMin: [5, 6], gramsPer: 3, mlPer: 250, maxSteeps: 1, difficulty: 'easy' },
    caffeine: 'none', strength: 'średnia',
    moodTags: [{ tag: 'detox', weight: 0.8 }, { tag: 'relaks', weight: 0.5 }, { tag: 'fokus', weight: 0.4 }],
    flavorTags: ['trawiasta'], isBestseller: false, isNew: false, reviewsAvg: 4.4, reviewsCount: 76, createdAt: D('02-25'),
  }),
  build({
    id: 'p-rooibos-wanilia', name: 'Rooibos Wanilia', slug: 'rooibos-wanilia', categorySlug: 'ziolowa',
    subcategory: 'Rooibos', price: 22, descriptionShort: 'Słodki, bezkofeinowy rooibos z prawdziwą wanilią.',
    descriptionLong: 'Czerwonokrzew z RPA wzbogacony laską wanilii — naturalnie słodki, ciepły i otulający napar bez kofeiny.',
    origin: 'Cederberg, RPA', brewing: { tempC: 100, timeMin: [5, 7], gramsPer: 3, mlPer: 250, maxSteeps: 1, difficulty: 'easy' },
    caffeine: 'none', strength: 'delikatna',
    moodTags: [{ tag: 'comfort', weight: 0.8 }, { tag: 'relaks', weight: 0.6 }, { tag: 'wieczor', weight: 0.5 }],
    flavorTags: ['slodka', 'orzechowa'], isBestseller: true, isNew: false, reviewsAvg: 4.7, reviewsCount: 118, createdAt: D('01-20'),
  }),
  build({
    id: 'p-owocowy-raj', name: 'Owocowy Raj', slug: 'owocowy-raj', categorySlug: 'ziolowa',
    subcategory: 'Owocowe', price: 20, descriptionShort: 'Soczysty napar owocowy z hibiskusem i jabłkiem.',
    descriptionLong: 'Mieszanka hibiskusa, jabłka, dzikiej róży i kawałków truskawki — rubinowy, kwaskowo-słodki i orzeźwiający na zimno i gorąco.',
    origin: 'Mieszanka', brewing: { tempC: 100, timeMin: [6, 8], gramsPer: 4, mlPer: 250, maxSteeps: 1, difficulty: 'easy' },
    caffeine: 'none', strength: 'średnia',
    moodTags: [{ tag: 'comfort', weight: 0.6 }, { tag: 'relaks', weight: 0.4 }, { tag: 'detox', weight: 0.3 }],
    flavorTags: ['owocowa', 'slodka'], isBestseller: false, isNew: true, reviewsAvg: 4.3, reviewsCount: 64, createdAt: D('05-26'),
  }),
  build({
    id: 'p-chai-masala', name: 'Chai Masala', slug: 'chai-masala', categorySlug: 'blendy',
    subcategory: 'Korzenny', price: 26, descriptionShort: 'Korzenna czarna herbata z kardamonem i imbirem.',
    descriptionLong: 'Indyjski chai z mieszanką kardamonu, cynamonu, imbiru i goździków — rozgrzewający, korzenny i stworzony do mleka.',
    origin: 'Indie', brewing: { tempC: 95, timeMin: [4, 6], gramsPer: 4, mlPer: 200, maxSteeps: 2, difficulty: 'easy' },
    caffeine: 'high', strength: 'mocna',
    moodTags: [{ tag: 'comfort', weight: 0.9 }, { tag: 'energia', weight: 0.6 }, { tag: 'wieczor', weight: 0.3 }],
    flavorTags: ['przyprawowa', 'slodowa'], isBestseller: true, isNew: false, reviewsAvg: 4.8, reviewsCount: 189, createdAt: D('01-03'),
  }),
  build({
    id: 'p-sencha-sakura', name: 'Sencha Sakura', slug: 'sencha-sakura', categorySlug: 'blendy',
    subcategory: 'Kwiatowy', price: 34, descriptionShort: 'Zielona sencha z płatkami wiśni i nutą truskawki.',
    descriptionLong: 'Wiosenny blend senchy z kwiatem i aromatem wiśni — delikatnie słodki, kwiatowy i pełen lekkości.',
    origin: 'Japonia / blend', brewing: { tempC: 75, timeMin: [1, 2], gramsPer: 3, mlPer: 200, maxSteeps: 2, difficulty: 'easy' },
    caffeine: 'medium', strength: 'delikatna',
    moodTags: [{ tag: 'relaks', weight: 0.6 }, { tag: 'fokus', weight: 0.5 }, { tag: 'comfort', weight: 0.4 }],
    flavorTags: ['kwiatowa', 'owocowa', 'trawiasta'], isBestseller: false, isNew: true, reviewsAvg: 4.6, reviewsCount: 41, createdAt: D('05-20'),
  }),
  build({
    id: 'p-genmaicha', name: 'Genmaicha', slug: 'genmaicha', categorySlug: 'zielona',
    subcategory: 'Japońska', price: 26, descriptionShort: 'Zielona herbata z prażonym ryżem o nucie popcornu.',
    descriptionLong: 'Bancha z prażonym brązowym ryżem — orzechowy, ciepły i niskokofeinowy napar nazywany „herbatą ludu".',
    origin: 'Japonia', brewing: { tempC: 85, timeMin: [1, 2], gramsPer: 3, mlPer: 200, maxSteeps: 2, difficulty: 'easy' },
    caffeine: 'low', strength: 'delikatna',
    moodTags: [{ tag: 'comfort', weight: 0.7 }, { tag: 'relaks', weight: 0.6 }, { tag: 'fokus', weight: 0.3 }],
    flavorTags: ['orzechowa', 'slodowa', 'trawiasta'], isBestseller: false, isNew: false, reviewsAvg: 4.5, reviewsCount: 83, createdAt: D('02-12'),
  }),
  build({
    id: 'p-lapsang', name: 'Lapsang Souchong', slug: 'lapsang-souchong', categorySlug: 'czarna',
    subcategory: 'Wędzona', price: 35, descriptionShort: 'Wędzona dymem sosnowym czarna herbata.',
    descriptionLong: 'Listki suszone nad ogniem sosnowym dają niezwykły, wędzony aromat ogniska — herbata dla odważnych podniebień.',
    origin: 'Wuyi, Chiny', brewing: { tempC: 95, timeMin: [3, 4], gramsPer: 3, mlPer: 200, maxSteeps: 2, difficulty: 'medium' },
    caffeine: 'high', strength: 'mocna',
    moodTags: [{ tag: 'comfort', weight: 0.6 }, { tag: 'energia', weight: 0.6 }, { tag: 'wieczor', weight: 0.4 }],
    flavorTags: ['przyprawowa', 'ziemista'], isBestseller: false, isNew: false, reviewsAvg: 4.2, reviewsCount: 37, createdAt: D('03-05'),
  }),
  build({
    id: 'p-jasmine-pearls', name: 'Jaśminowe Perły', slug: 'jasminowe-perly', categorySlug: 'zielona',
    subcategory: 'Aromatyzowana', price: 40, descriptionShort: 'Ręcznie zwijane perły zielonej herbaty z jaśminem.',
    descriptionLong: 'Zielone listki wielokrotnie przesycane kwiatem jaśminu i zwijane w perełki — intensywnie kwiatowy, kojący aromat.',
    origin: 'Fujian, Chiny', brewing: { tempC: 80, timeMin: [2, 3], gramsPer: 3, mlPer: 200, maxSteeps: 3, difficulty: 'easy' },
    caffeine: 'low', strength: 'delikatna',
    moodTags: [{ tag: 'relaks', weight: 0.8 }, { tag: 'wieczor', weight: 0.4 }, { tag: 'fokus', weight: 0.4 }],
    flavorTags: ['kwiatowa', 'slodka'], isBestseller: true, isNew: false, reviewsAvg: 4.8, reviewsCount: 96, createdAt: D('01-28'),
  }),
];

export const products: Product[] = seeds;

// ─── Reviews ─────────────────────────────────────────────────────────────────
const reviewAuthors = ['Anna K.', 'Marek N.', 'Julia W.', 'Piotr Z.', 'Kasia M.', 'Tomek L.'];
const reviewSnippets = [
  'Świetna poranna herbata, parzy się idealnie.',
  'Aromat obłędny, wracam po kolejną paczkę.',
  'Delikatna i kojąca — dokładnie czego szukałam.',
  'Dobra, choć dla mnie odrobinę za delikatna.',
  'Najlepsza jaką piłem w tej kategorii.',
  'Pięknie zapakowana, smak pierwsza klasa.',
];

export const reviews: Review[] = products.flatMap((product, pi) =>
  Array.from({ length: Math.min(3, Math.max(1, product.reviewsCount % 4 || 2)) }, (_, i) => ({
    id: `${product.id}-r${i}`,
    productId: product.id,
    author: reviewAuthors[(pi + i) % reviewAuthors.length],
    rating: Math.max(3, Math.round(product.reviewsAvg) - (i % 2)),
    content: reviewSnippets[(pi + i) % reviewSnippets.length],
    createdAt: D('04-0' + ((i % 9) + 1)),
  })),
);
