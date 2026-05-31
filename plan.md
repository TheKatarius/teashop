# 🍵 TeaShop — Frontend Implementation Plan

Phased delivery plan for the MVP scope defined in `TeaShop_slownik_funkcji_Version1.md`. Each phase ends in a runnable, demoable state. Feature IDs in parentheses map to the spec.

---

## Phase 0 — Foundations (1 day)

**Goal:** both projects boot, tooling green, design tokens applied, frontend can ping backend.

### Frontend (`web/`)
1. Scaffold with Vite into `web/`: `npm create vite@latest web -- --template react-ts`.
2. Install runtime deps: `react-router-dom`, `@tanstack/react-query`, `zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`, `clsx`.
3. Install dev deps: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`, `@playwright/test`, `eslint`, `prettier`, `eslint-config-prettier`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-import`, `@typescript-eslint/*`, `husky`, `lint-staged`.
4. Configure:
   - `tsconfig.json`: strict mode, `paths: { "@/*": ["src/*"] }`.
   - `vite.config.ts`: alias `@` → `src`, vitest config with jsdom env + setup file.
   - `.eslintrc.cjs`, `.prettierrc`, `.editorconfig`.
   - Husky pre-commit → `lint-staged`.
5. `.env.development` with `VITE_API_BASE_URL=https://localhost:5001/api`.
6. `src/lib/apiClient.ts` — fetch wrapper reading the env var, attaching JWT, throwing typed errors.
7. `src/styles/tokens.css` (colors from Figma, spacing scale, radii, fonts) + `global.css`.
8. App shell: `src/app/App.tsx` (QueryClientProvider + RouterProvider), Header / Outlet / Footer placeholders, 404 page, error boundary.

### Backend (`api/TeaShop.Api/`)
1. `dotnet new webapi -minimal -n TeaShop.Api -o api/TeaShop.Api --framework net8.0`.
2. `dotnet sln TPF_Project_Teashop.sln add api/TeaShop.Api/TeaShop.Api.csproj`.
3. `dotnet new xunit -n TeaShop.Api.Tests -o api/TeaShop.Api.Tests` and add to solution.
4. Add packages: `Microsoft.AspNetCore.Authentication.JwtBearer`, `Swashbuckle.AspNetCore`.
5. Enable nullable + warnings-as-errors in the csproj.
6. `Program.cs` composition:
   - `AddCors` (`"web"` policy → allow `http://localhost:5173`, any header/method).
   - `AddAuthentication(JwtBearer)` with dev secret from config.
   - `AddSwaggerGen`.
   - `app.UseMiddleware<LatencySimulationMiddleware>()` (Development only).
   - Empty endpoint group `app.MapGroup("/api")` ready for extension methods.
   - `GET /api/health` returning `{ status: "ok" }` as a smoke test.
7. `appsettings.Development.json` with JWT secret + issuer/audience.

**Exit criteria:** `dotnet run` exposes Swagger + `/api/health`. `npm run dev` boots Vite and a hello-world page successfully fetches `/api/health` through `apiClient`.

---

## Phase 1 — Domain model + seeded mock endpoints (1.5 days)

**Goal:** stable HTTP contract powering every later phase, with the frontend's typed mirror in place.

### Backend
1. Domain records in `Domain/`: `Product`, `Category`, `MoodTag`, `FlavorTag`, `BrewingInfo`, `WeightOption`, `CartItem`, `Order`, `OrderItem`, `QuizQuestion`, `QuizOption`, `QuizAnswer`, `QuizResult`, `QuizRecommendation`, `User`, `Review`. Match `TeaShop_schemat_powiazan_Version1.md`.
2. Seed JSON in `SeedData/`:
   - `categories.json` — 8 tea categories.
   - `mood-tags.json`, `flavor-tags.json` — taxonomy from `TeaShop_architektura_informacji_Version1.md` §4.
   - `products.json` — ≥30 products with mood weights, flavor tags, brewing data, ≥2 images, bestseller/new flags, prices, weight options.
   - `quiz.json` — 7 questions × 3–4 options, each option carrying `tagWeights`.
   - `users.json` — 2 demo users.
3. Repositories in `Repositories/` — `ConcurrentDictionary<Guid, T>` singletons hydrated from JSON in a startup `IHostedService`.
4. Endpoint groups in `Endpoints/`:
   - `ProductsEndpoints` — list (with filter/sort/paginate), get by slug, related.
   - `CatalogEndpoints` — categories, mood-tags, flavor-tags.
   - `QuizEndpoints` — `GET /quiz/questions`, `POST /quiz/submit` (calls `QuizScoringService`).
   - `CartEndpoints`, `FavoritesEndpoints`, `OrdersEndpoints`, `AuthEndpoints`, `ReviewsEndpoints`.
5. `QuizScoringService` — pure C# implementation of `score = Σ (answerWeight × productTagWeight)`, with fallback when all scores below threshold (`Q-08`). Unit-test in `TeaShop.Api.Tests`.
6. Fake JWT in `Auth/` — `JwtIssuer.Create(user)` + extension `RequireUser()` for protected endpoints.

### Frontend
1. Mirror domain types in `src/types/` (kept in sync manually for now; consider OpenAPI codegen later).
2. TanStack Query hooks per feature in `features/*/api.ts` calling the endpoints above via `apiClient`.

**Exit criteria:** Every endpoint reachable via Swagger; the frontend renders the seed catalog in a debug route consuming the real query hooks.

---

## Phase 2 — Catalog & product page (2 days) — `S-01..S-09`, `P-01..P-07`, `SR-01..SR-05`

**Goal:** users can browse, filter, search, and view product details.

1. `Header` (with sticky behavior, search trigger, cart badge slot, profile slot) and `Footer`. Mobile hamburger with menu drawer.
2. Shop listing `/sklep`:
   - URL-synced filters (rodzaj, nastrój, smak, cena range, kofeina, ocena) via `useSearchParams`.
   - Sort dropdown (popularność / cena ↑↓ / nowości / ocena).
   - Responsive grid (3 / 2 / 1).
   - `ProductCard` with mood badges, Quick Add, rating, "Bestseller"/"Nowość" badges.
   - Pagination or infinite scroll (pick one — pagination is simpler).
3. Category route `/sklep/:kategoria` — pre-filtered listing + quiz CTA widget.
4. Product page `/sklep/:slug`:
   - Gallery (carousel + zoom), name, price, weight selector, quantity stepper, Add to Cart (sticky on mobile), Add to Favorites.
   - Brewing section (temp / time / amount / max steeps / difficulty) with icons.
   - Mood badges with tooltips, flavor tag chips, caffeine scale.
   - Reviews list (display only — `R-01`).
   - "Pasuje do" cross-sell — 3–4 related products by shared tags (`S-06`).
   - Breadcrumbs.
5. Search:
   - Header search overlay with input, debounced autocomplete (`SR-02`, 300ms).
   - Results route reuses shop filters.
   - Empty results → suggest quiz + popular products (`SR-05`).

**Exit criteria:** Full browse flow works. Lighthouse a11y ≥ 90 on shop & product pages.

---

## Phase 3 — Cart & favorites (1 day) — `C-01..C-08`, `F-01..F-04`, `T-01..T-04`

**Goal:** add / remove / persist cart and favorites.

1. Toast system first: `useToastStore` (zustand queue), `<ToastViewport />`, success / error / info variants, 4s auto-dismiss, max 1 + queue, manual close (`T-01..T-04`).
2. Cart store (zustand) — items keyed by `productId + weight`. Mirror to `localStorage.cart` and to mock API `POST /api/cart` on each change.
3. Cart drawer (`C-03`) — opens on Add to Cart, lists items + thumbnails + subtotal + "Do kasy" CTA.
4. Cart page `/koszyk` (`C-04`) — quantity edit, remove (with undo toast), free-shipping progress bar (`C-06`), coupon input (`C-05`, mock validation).
5. Favorites — heart toggle on cards & product page, `/ulubione` grid, persist to `localStorage.favorites` + mock API.

**Exit criteria:** Refresh preserves cart & favorites. Mood badges show in cart drawer.

---

## Phase 4 — Quiz (1.5 days) — `Q-01..Q-11`

**Goal:** functional mood quiz with scoring and recommendations.

1. Scoring lives on the **backend** (`QuizScoringService`, already unit-tested in Phase 1) — the frontend just POSTs answers and renders the ranked result. Adjust thresholds and goal modifiers ("Dopasuj / Popraw / Zaskocz") in service config.
2. Quiz flow `/quiz`:
   - One question per screen, progress bar, back button, keyboard navigation (1–4 keys + Enter).
   - Tile-style options with icons.
   - Draft answers in zustand store (survives refresh).
3. Results page `/quiz/wyniki`:
   - Top 3–5 products with score %, mood badges, Quick Add.
   - Post-quiz filter chips by tea type (`Q-07`).
   - Fallback section if all scores below threshold — "Najbliższe dopasowanie" + bestsellers (`Q-08`).
   - "Powtórz quiz" + "Przejdź do sklepu" CTAs.
   - Save result to `localStorage.quizResult` (guest) or `POST /api/quiz/results` (logged-in).
4. Home + shop quiz CTAs link in (`ST-01`, `S-07`).

**Exit criteria:** Quiz produces sensible recommendations across all seed answers. Scoring tests pass.

---

## Phase 5 — Auth & profile (1 day) — `U-01..U-08`

**Goal:** register / login (mocked) and view profile data.

1. Auth pages `/logowanie`, `/rejestracja` — RHF + Zod, inline validation, mock API.
2. Auth store: current user + token, hydrated from `localStorage`.
3. Profile `/profil` with tabs: dane, adres, zmiana hasła, zamówienia (`U-05`), ulubione (link), historia quizów (v2 placeholder).
4. Header profile dropdown + mobile menu entries (`U-07`).
5. Migration on register/login: merge guest `cart`, `favorites`, `quizResult` into account (`Q-11`, `C-08`, `F-04`).
6. Route guard for `/profil`.

**Exit criteria:** Register → cart persists → relogin on another "device" (different mock token) restores cart from server.

---

## Phase 6 — Checkout (1 day) — `CH-01..CH-07`

**Goal:** 3-step guest-friendly checkout ending in mock success page.

1. Stepper component (Dane → Dostawa → Podsumowanie).
2. Step 1 form: imię, nazwisko, adres, miasto, kod, telefon, e-mail (guest); prefilled for logged-in users (`CH-02`).
3. Step 2: delivery selector (InPost / Kurier / Poczta) with prices, free shipping ≥ 99 zł (`CH-03`).
4. Step 3: order summary + coupon field + "Zamawiam i płacę" → mock `POST /api/orders` (`CH-04`, `CH-05`).
5. Success route `/zamowienie/sukces/:orderId` (`CH-06`) — order number, summary, "Załóż konto" CTA for guests.
6. Inline validation on every step, blocked "Dalej" while invalid (`CH-07`).

**Exit criteria:** Guest checkout golden path works end-to-end from product page to success screen.

---

## Phase 7 — Static pages + polish (½ day) — `ST-01..ST-07`

1. Home page assembly (`ST-01`): hero + CTA quiz, category tiles, bestseller carousel, quiz CTA section, new products, social proof, newsletter signup (mock submit → toast).
2. `O nas`, `Regulamin`, `Polityka prywatności`, `Kontakt` (form → mock submit), `404` with CTAs.
3. Loading skeletons replace spinners on listing & product pages.
4. Empty-state components (empty cart, empty favorites, empty search) — never blank.
5. Lighthouse pass: perf, a11y, best practices each ≥ 90 on home / shop / product / checkout.

---

## Phase 8 — Tests & QA (1 day)

1. **Backend (xUnit, `TeaShop.Api.Tests`)** — `QuizScoringService` (perfect/partial/fallback/goal modifier), coupon logic, free-shipping threshold, products filter+sort, auth login happy/sad paths. Use `WebApplicationFactory<Program>` for endpoint integration tests.
2. **Frontend unit (Vitest)** — `features/cart/store.ts` (add/remove/merge), `lib/price.ts`, form Zod schemas.
3. **Frontend component (RTL)** — `ProductCard`, `CartDrawer`, `QuizStep`, `CheckoutStepper`.
4. **Playwright e2e** — run against `dotnet run` + `npm run preview` started in CI/script:
   - Browse → add to cart → checkout (guest) → success.
   - Quiz → result → add recommended to cart.
   - Search → no results → suggested quiz CTA.
5. Manual cross-browser smoke (Chrome, Firefox, Safari, mobile Chrome).

---

## Out of scope for MVP (deferred to v2)

OAuth (`U-03`), review writing (`R-02`), gift sets (`G-*`), abandoned-cart emails (`C-10`), quiz history widget (`Q-12`, `Q-13`), blog (`ST-06`), admin panel (`A-*`).

---

## Risk register

| Risk | Mitigation |
|---|---|
| Quiz scoring tuning takes longer than 1 day | Unit-test early with synthetic answer sets; tune thresholds in `quiz.json`, not code. |
| Filter combinations slow with 30+ products | Filter is in-memory in the mock; acceptable for MVP. Document where to move to server-side. |
| In-memory store resets between API restarts during a long test session | Add a `POST /api/dev/reseed` endpoint (Development only) and call it from Playwright `beforeEach`. |
| Frontend / backend DTOs drift | Single source of truth = JSON contract documented in Swagger. Optionally introduce NSwag codegen later — out of scope for MVP. |
| Design tokens drift from Figma | Single `tokens.css` file; review against Figma before each phase. |

---

## Workflow rules

- One phase = one PR (or a tight stack). Don't merge a phase until its exit criteria are met.
- Reference spec IDs in commits: `feat(quiz): scoring + fallback (Q-05, Q-08)`.
- Before pushing:
  - Frontend: `npm run lint && npm run typecheck && npm run test`.
  - Backend: `dotnet build -warnaserror && dotnet test`.
- For new files, use the project skills (`/add-component`, `/add-page`, `/add-mock-endpoint`) to keep structure consistent across both projects.
