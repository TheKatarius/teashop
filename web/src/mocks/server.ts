import { rankProducts } from '@/features/quiz/scoring';
import type {
  AuthResponse,
  Coupon,
  Order,
  Paged,
  Product,
  QuizRecommendation,
  QuizResult,
  QuizSubmission,
  User,
} from '@/types';
import {
  categories,
  coupons,
  deliveryOptions,
  flavorTags,
  FREE_SHIPPING_THRESHOLD,
  moodTags,
  products,
  quizQuestions,
  reviews,
  users,
} from './data';

// In-browser mock backend. Dispatches the same paths the real .NET API exposes,
// with simulated latency and a ?_fail=1 error switch, so the SPA runs standalone.

export interface MockRequest {
  method: string;
  /** path after the API base, may include a query string, e.g. '/products?page=2' */
  path: string;
  body?: unknown;
  token?: string | null;
}

export interface MockResponse {
  status: number;
  data: unknown;
}

const PAGE_SIZE = 9;
const ordersStore = new Map<string, Order>();
const sessionUsers = new Map<string, User>(users.map((u) => [`mock-token-${u.id}`, u]));

function rnd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

const delay = () => new Promise((r) => setTimeout(r, rnd(150, 400)));

function ok(data: unknown): MockResponse {
  return { status: 200, data };
}
function notFound(message = 'Nie znaleziono'): MockResponse {
  return { status: 404, data: { title: message } };
}

function matchesSearch(p: Product, q: string): boolean {
  const haystack = [
    p.name,
    p.origin,
    p.subcategory ?? '',
    categories.find((c) => c.slug === p.categorySlug)?.name ?? '',
    ...p.flavorTags,
    ...p.moodTags.map((m) => m.tag),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q.toLowerCase());
}

function filterAndSort(query: URLSearchParams): Paged<Product> {
  const category = query.get('category');
  const moods = query.getAll('mood');
  const flavors = query.getAll('flavor');
  const caffeines = query.getAll('caffeine');
  const minPrice = query.get('minPrice');
  const maxPrice = query.get('maxPrice');
  const minRating = query.get('minRating');
  const q = query.get('q');
  const sort = query.get('sort') ?? 'popularnosc';
  const page = Math.max(1, Number(query.get('page') ?? '1'));

  // Resolve a specific set of ids (favorites) — returns them all, unpaginated.
  const ids = query.get('ids');
  if (ids !== null) {
    const idSet = new Set(ids.split(',').filter(Boolean));
    const items = products.filter((p) => idSet.has(p.id));
    return { items, total: items.length, page: 1, pageSize: items.length };
  }

  let list = products.filter((p) => p.isAvailable);
  if (category) list = list.filter((p) => p.categorySlug === category);
  if (moods.length) list = list.filter((p) => p.moodTags.some((m) => moods.includes(m.tag)));
  if (flavors.length) list = list.filter((p) => flavors.some((f) => p.flavorTags.includes(f)));
  if (caffeines.length) list = list.filter((p) => caffeines.includes(p.caffeine));
  if (minPrice) list = list.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
  if (minRating) list = list.filter((p) => p.reviewsAvg >= Number(minRating));
  if (q) list = list.filter((p) => matchesSearch(p, q));

  switch (sort) {
    case 'cena-asc':
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case 'cena-desc':
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case 'nowosci':
      list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case 'ocena':
      list = [...list].sort((a, b) => b.reviewsAvg - a.reviewsAvg);
      break;
    default:
      list = [...list].sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  const total = list.length;
  const start = (page - 1) * PAGE_SIZE;
  return { items: list.slice(start, start + PAGE_SIZE), total, page, pageSize: PAGE_SIZE };
}

function related(slug: string): Product[] {
  const base = products.find((p) => p.slug === slug);
  if (!base) return [];
  return products
    .filter((p) => p.id !== base.id)
    .map((p) => {
      const sharedFlavors = p.flavorTags.filter((f) => base.flavorTags.includes(f)).length;
      const sharedMoods = p.moodTags.filter((m) => base.moodTags.some((bm) => bm.tag === m.tag)).length;
      const sameCategory = p.categorySlug === base.categorySlug ? 1 : 0;
      return { p, score: sharedFlavors * 2 + sharedMoods + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.p);
}

function submitQuiz(submission: QuizSubmission): QuizResult {
  const outcome = rankProducts(products, submission.answers, quizQuestions, submission.goal);
  const recommendations: QuizRecommendation[] = outcome.ranked
    .map((r) => {
      const product = products.find((p) => p.id === r.id);
      return product ? { product, score: r.score, rank: r.rank } : null;
    })
    .filter((r): r is QuizRecommendation => r !== null);

  return {
    id: `quiz-${Date.now()}`,
    createdAt: new Date().toISOString(),
    moodSummary: outcome.moodSummary,
    goal: submission.goal,
    recommendations,
    isFallback: outcome.isFallback,
  };
}

function createOrder(body: Record<string, unknown>): Order {
  const id = crypto.randomUUID();
  const seq = String(ordersStore.size + 1041).padStart(6, '0');
  const order: Order = {
    id,
    orderNumber: `TS-2026-${seq}`,
    items: (body.items as Order['items']) ?? [],
    subtotal: Number(body.subtotal ?? 0),
    deliveryCost: Number(body.deliveryCost ?? 0),
    total: Number(body.total ?? 0),
    deliveryMethod: (body.deliveryMethod as Order['deliveryMethod']) ?? 'inpost',
    address: body.address as Order['address'],
    email: String(body.email ?? ''),
    couponCode: body.couponCode as string | undefined,
    status: 'paid',
    createdAt: new Date().toISOString(),
  };
  ordersStore.set(id, order);
  return order;
}

function login(body: Record<string, unknown>): MockResponse {
  const email = String(body.email ?? '').toLowerCase();
  const password = String(body.password ?? '');
  const user = users.find((u) => u.email.toLowerCase() === email);
  if (!user || password !== 'password') {
    return { status: 401, data: { title: 'Nieprawidłowy e-mail lub hasło' } };
  }
  const token = `mock-token-${user.id}`;
  sessionUsers.set(token, user);
  return ok({ token, user } satisfies AuthResponse);
}

function register(body: Record<string, unknown>): MockResponse {
  const email = String(body.email ?? '').toLowerCase();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    return { status: 409, data: { title: 'Konto z tym adresem już istnieje' } };
  }
  const user: User = { id: `user-${crypto.randomUUID()}`, name: String(body.name ?? 'Gość'), email };
  users.push(user);
  const token = `mock-token-${user.id}`;
  sessionUsers.set(token, user);
  return ok({ token, user } satisfies AuthResponse);
}

function route(req: MockRequest): MockResponse {
  const [rawPath, queryString] = req.path.split('?');
  const path = rawPath.replace(/\/$/, '') || '/';
  const query = new URLSearchParams(queryString ?? '');
  const body = (req.body ?? {}) as Record<string, unknown>;
  const seg = path.split('/').filter(Boolean); // e.g. ['products','sencha-uji','related']

  if (path === '/health') return ok({ status: 'ok', service: 'mock', timestamp: new Date().toISOString() });
  if (path === '/categories') return ok(categories);
  if (path === '/mood-tags') return ok(moodTags);
  if (path === '/flavor-tags') return ok(flavorTags);
  if (path === '/delivery-options') return ok(deliveryOptions);
  if (path === '/config') return ok({ freeShippingThreshold: FREE_SHIPPING_THRESHOLD });

  if (path === '/quiz/questions' && req.method === 'GET') return ok(quizQuestions);
  if (path === '/quiz/submit' && req.method === 'POST') return ok(submitQuiz(body as unknown as QuizSubmission));

  if (seg[0] === 'products') {
    if (seg.length === 1) return ok(filterAndSort(query));
    const slug = seg[1];
    if (seg[2] === 'related') return ok(related(slug));
    if (seg[2] === 'reviews') return ok(reviews.filter((r) => r.productId === productIdBySlug(slug)));
    const product = products.find((p) => p.slug === slug);
    return product ? ok(product) : notFound('Nie znaleziono produktu');
  }

  if (seg[0] === 'coupons' && seg[1]) {
    const coupon = coupons.find((c) => c.code.toLowerCase() === seg[1].toLowerCase());
    return coupon ? ok(coupon satisfies Coupon) : notFound('Nieprawidłowy kod rabatowy');
  }

  if (path === '/orders' && req.method === 'POST') return { status: 201, data: createOrder(body) };
  if (seg[0] === 'orders' && seg[1] && req.method === 'GET') {
    const order = ordersStore.get(seg[1]);
    return order ? ok(order) : notFound('Nie znaleziono zamówienia');
  }

  if (path === '/auth/login' && req.method === 'POST') return login(body);
  if (path === '/auth/register' && req.method === 'POST') return register(body);
  if (path === '/auth/me' && req.method === 'GET') {
    const user = req.token ? sessionUsers.get(req.token) : undefined;
    return user ? ok(user) : { status: 401, data: { title: 'Brak autoryzacji' } };
  }

  return notFound(`Mock: brak trasy ${req.method} ${path}`);
}

function productIdBySlug(slug: string): string | undefined {
  return products.find((p) => p.slug === slug)?.id;
}

export async function mockRequest(req: MockRequest): Promise<MockResponse> {
  await delay();
  const [, queryString] = req.path.split('?');
  if (new URLSearchParams(queryString ?? '').get('_fail') === '1') {
    return { status: 500, data: { title: 'Symulowany błąd serwera' } };
  }
  return route(req);
}
