# 🍵 TeaShop — Project Guide for Claude

E-commerce frontend for a tea shop with a mood-matching quiz, product catalog, cart, and guest checkout. **Focus is the frontend.** A small **.NET (ASP.NET Core minimal API)** project lives alongside it and serves seeded in-memory mock data — it stands in for a real backend so the UI can be built against a realistic HTTP contract without committing to a database or auth provider.

---

## Tech stack

### Frontend (`web/`)
- **Build**: Vite (React + TypeScript template)
- **UI**: React 18 + TypeScript (strict mode), React Router v6
- **State**:
  - Server state: TanStack Query (`@tanstack/react-query`)
  - Client state: Zustand (cart, favorites, quiz draft, toast queue)
  - Form state: React Hook Form + Zod
- **Styling**: CSS Modules + design tokens (`web/src/styles/tokens.css`). No Tailwind unless requested.
- **Testing**: Vitest + React Testing Library; Playwright for the few critical e2e flows.
- **Tooling**: ESLint (typescript-eslint, react, react-hooks, import), Prettier, Husky + lint-staged.

Package manager: `npm` (lockfile is `package-lock.json`).

### Mock backend (`api/TeaShop.Api/`)
- **Runtime**: .NET 8, ASP.NET Core **minimal API**.
- **Persistence**: **in-memory only** (`ConcurrentDictionary`-backed singleton repositories). No EF Core, no SQL, no migrations.
- **Seeding**: JSON files in `api/TeaShop.Api/SeedData/` deserialized on startup.
- **Auth**: dev-only fake JWT (`Microsoft.AspNetCore.Authentication.JwtBearer`) issued by a `/api/auth/login` endpoint. Any seeded user can log in with `password`.
- **CORS**: `AllowAnyOrigin` for `http://localhost:5173` in Development.
- **Docs**: Swagger UI at `https://localhost:5001/swagger`.
- **Latency simulation**: middleware adds 150–400ms jittered delay in Development to expose loading states.
- **Solution**: `TPF_Project_Teashop.sln` (already exists) includes the API project.

---

## Repository layout

```
TPF_Project_Teashop.sln
web/                          # Frontend (Vite + React + TS)
  src/
    app/                      # App shell: providers, router, error boundary
    pages/                    # Route components (one folder per page)
      Home/  Shop/  Product/  Quiz/  Cart/  Checkout/
      Profile/  Favorites/  Auth/  Static/   # (About, Terms, Privacy, Contact, 404)
    features/                 # Feature-scoped logic & UI
      cart/        # api.ts (query/mutation hooks), store.ts (zustand), components/, types.ts
      quiz/        # scoring.ts (pure, unit-tested), questions.ts, components/
      catalog/  favorites/  auth/  checkout/  reviews/
    components/               # Generic, reusable, presentational (Button, Modal, Toast, …)
    hooks/                    # Cross-cutting hooks (useDebounce, useMediaQuery, …)
    lib/                      # Framework-agnostic helpers (formatPrice, slugify, apiClient)
    styles/
      tokens.css              # Colors, spacing, radii, typography
      global.css
    types/                    # Shared domain types (Product, CartItem, Order, …)
    assets/
  public/
  .env.development            # VITE_API_BASE_URL=https://localhost:5001
api/
  TeaShop.Api/                # Mock backend (ASP.NET Core minimal API, .NET 8)
    Program.cs                # Composition root: services, middleware, endpoints
    Endpoints/                # One file per resource: ProductsEndpoints.cs, QuizEndpoints.cs, …
    Domain/                   # Records: Product, Category, MoodTag, CartItem, Order, …
    Repositories/             # In-memory stores (ConcurrentDictionary-backed singletons)
    Services/                 # QuizScoringService, CouponService, …
    Auth/                     # Fake JWT issuance + validation
    Middleware/               # LatencySimulationMiddleware
    SeedData/                 # products.json, categories.json, quiz.json, users.json, …
    TeaShop.Api.csproj
  TeaShop.Api.Tests/          # xUnit tests for endpoints + scoring service
```

Route → page mapping lives in `web/src/app/router.tsx`. The full sitemap is defined in `TeaShop_architektura_informacji_Version1.md` §1.

---

## Domain reference

The specs in this directory are the source of truth — read them before designing a feature:

| Doc | Use it for |
|---|---|
| `TeaShop_diagram_funkcjonalnosci_Version1.md` | High-level module map and MVP/v2 scope |
| `TeaShop_slownik_funkcji_Version1.md` | Per-feature acceptance criteria (IDs like `Q-05`, `C-04`) |
| `TeaShop_architektura_informacji_Version1.md` | Sitemap, navigation, page wireframes, taxonomy |
| `TeaShop_schemat_powiazan_Version1.md` | ER diagram → mock data shape & API endpoints |
| `TeaShop_ankieta_*.md`, `Teashop_wywiad_pytania.md` | User research — pull from these when justifying UX choices |

When implementing a feature, **cite the function ID** in the PR description / commit message (e.g. "Implements Q-05 quiz scoring + Q-08 fallback").

Designs (Figma): https://www.figma.com/design/Cm5mXknRWG9UCxqU7OD0AB/TeaShop?node-id=0-1

**Visual contract: `design.md`** — design tokens, type scale, component visual specs, page-by-page layout notes. Read it before writing any UI. If a Figma value disagrees with `design.md`, the Figma wins — update `design.md` *and* `web/src/styles/tokens.css` in the same change.

---

## Mock backend (.NET)

The backend in `api/TeaShop.Api/` is real ASP.NET Core but **pretends** — it returns realistic shapes from in-memory stores so the frontend can develop against a stable HTTP contract.

- **Contract** mirrors `TeaShop_schemat_powiazan_Version1.md`. Endpoints (all under `/api`):
  - `GET /products?category=&mood=&flavor=&minPrice=&maxPrice=&caffeine=&sort=&page=`
  - `GET /products/{slug}`, `GET /products/{slug}/related`
  - `GET /categories`, `GET /mood-tags`, `GET /flavor-tags`
  - `GET /quiz/questions`, `POST /quiz/submit` → returns `QuizResult` with ranked recommendations
  - `GET /cart`, `POST /cart/items`, `PATCH /cart/items/{id}`, `DELETE /cart/items/{id}`
  - `GET /favorites`, `POST /favorites/{productId}`, `DELETE /favorites/{productId}`
  - `POST /orders`, `GET /orders`, `GET /orders/{id}`
  - `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
  - `GET /products/{slug}/reviews`
- **Persistence is in-memory.** Repositories are registered as singletons; data resets when the API restarts. Guest cart, favorites, and quiz draft are also mirrored to `localStorage` in the browser so refreshes don't lose state.
- **Auth**: `/api/auth/login` accepts any seeded user's email with password `password` and returns a signed JWT (HS256, dev secret in `appsettings.Development.json`). The frontend stores the token and sends `Authorization: Bearer …` for protected endpoints.
- **Latency / errors**: `LatencySimulationMiddleware` adds 150–400ms jitter in Development. Append `?_fail=1` to any request to force a `500` for testing error states.
- **CORS**: `AllowAnyOrigin` (Development only) so Vite at `http://localhost:5173` can call `https://localhost:5001`.
- **Validation** uses `Microsoft.AspNetCore.Http.HttpValidationProblemDetails` + minimal-API parameter binding; reject early with `Results.ValidationProblem`.

The frontend accesses everything through `web/src/lib/apiClient.ts` (a thin `fetch` wrapper that reads `VITE_API_BASE_URL` and attaches the auth header). Components never call `fetch` directly — they go through TanStack Query hooks in `features/<x>/api.ts`.

To add a new endpoint, use the `/add-mock-endpoint` skill — it scaffolds the C# endpoint + DTO + seed entry + the matching frontend query hook.

---

## Coding conventions

**General**
- TypeScript strict. No `any` — use `unknown` and narrow, or define a type.
- Prefer named exports. One component per file; filename matches the export (`ProductCard.tsx`).
- Imports ordered: node/builtin → external → `@/` aliases → relative. Lint enforces this.
- Path alias: `@/*` → `src/*` (configured in `vite.config.ts` + `tsconfig.json`).

**React**
- Function components only. Hooks at the top, early returns for loading/error, then the happy path.
- Co-locate component + styles + test: `ProductCard.tsx`, `ProductCard.module.css`, `ProductCard.test.tsx`.
- Server data fetched with TanStack Query hooks in `features/<x>/api.ts`. Components consume the hooks; they don't call `fetch` directly.
- Client-only state goes in Zustand stores (one slice per feature). Never store server data there — that's Query's job.
- Forms: React Hook Form + Zod resolver. Zod schemas live next to the form (`CheckoutForm.schema.ts`).

**Styling**
- Use design tokens from `src/styles/tokens.css` (CSS custom properties). No magic colors or pixel values in component CSS.
- Mobile-first. Breakpoints: `--bp-tablet: 768px`, `--bp-desktop: 1024px`.

**Clean code rules (enforced in review)**
- Functions do one thing. Extract when a function exceeds ~30 lines or you feel the urge to comment a section.
- Names reveal intent: `recommendedTeas` not `result`, `isFreeShippingEligible` not `flag`.
- No dead code, no commented-out blocks, no `console.log` in committed code.
- For **shared helpers / business utilities**: no premature abstraction — wait for the third occurrence before extracting.
- For **UI components**: the opposite rule applies — extract a reusable presentational component on the **second** occurrence, not the third. The TeaShop UI has many repeating patterns (cards, badges, form fields, CTAs, empty states); duplicating JSX twice is the signal. Place generic reusables in `web/src/components/`, feature-scoped ones in `web/src/features/<x>/components/`. Use the `/add-component` skill so structure stays uniform.
- Props on reusable components must be minimal and intent-named (`<Button variant="primary-dark" size="lg">`) — never visual knobs like `color`/`bg`. Compose, don't configure.
- Comments explain *why*, not *what*. Well-named code doesn't need narration.
- Pure functions for business logic (e.g. quiz scoring, price calc, discount application) — unit-test them.
- Boundaries validate, internals trust. Validate at the form/API edge with Zod; inside the app, trust your types.

**Backend (.NET)**
- Minimal API style — endpoints in `Endpoints/*Endpoints.cs` registered as extension methods on `IEndpointRouteBuilder`. Keep `Program.cs` thin.
- Use `record` types for DTOs and domain entities; immutability by default.
- Endpoint handlers do one thing: validate input → call service/repo → return `Results.Ok(...)` / `Results.NotFound()` / `Results.ValidationProblem(...)`. No business logic in the handler.
- Business logic (scoring, pricing, discounts) lives in `Services/` as pure methods — unit-test these with xUnit.
- Repositories return domain types; map to DTOs in the endpoint, not deeper.
- Nullable reference types enabled; treat warnings as errors in `TeaShop.Api.csproj`.
- No EF Core, no async-for-async's-sake. If a method has no real I/O, don't make it `async`.

**Accessibility**
- Semantic HTML first. `<button>` for actions, `<a>` for navigation.
- All interactive elements keyboard-navigable; focus styles never removed.
- Images have meaningful `alt` (or `alt=""` if decorative).
- Forms: every input has a `<label>`. Errors associated via `aria-describedby`.
- Color contrast ≥ AA (4.5:1 text, 3:1 UI).

---

## Commands

### Frontend (run from `web/`)

```bash
npm run dev          # vite dev server on :5173
npm run build        # type-check + vite build
npm run preview      # serve the build locally
npm run test         # vitest run
npm run test:watch
npm run test:e2e     # playwright
npm run lint         # eslint .
npm run typecheck    # tsc --noEmit
```

A pre-commit hook runs `lint-staged` (eslint --fix, prettier --write) on staged files.

### Backend (run from `api/TeaShop.Api/`)

```bash
dotnet run                       # https://localhost:5001 (swagger at /swagger)
dotnet watch run                 # auto-reload on file changes
dotnet test ../TeaShop.Api.Tests # xUnit tests
dotnet format                    # run formatter
```

### Both at once

From repo root: `dotnet run --project api/TeaShop.Api & (cd web && npm run dev)` — or use Rider's compound run configuration.

---

## Definition of Done (per feature)

A feature is done when:
1. It matches the spec ID(s) it claims to implement.
2. It works keyboard-only and screen-reader-readable.
3. Loading, empty, and error states are handled — never a blank screen (cf. spec rule "Nigdy pusty ekran").
4. Unit tests cover business logic; component tests cover user-visible behavior.
5. Lint, typecheck, and tests pass.
6. Manually verified in the dev server (golden path + one edge case).

---

## Implementation roadmap

See `plan.md` for the phased delivery plan.
