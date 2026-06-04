# 🍵 TeaShop — Design System (agent reference)

> **For agents:** treat this file as the source of truth when implementing or reviewing UI. Whenever a value here disagrees with the Figma, **the Figma wins** — re-run `scripts/extract-figma-raw.mjs`, reconcile the diff, update both the implementation **and** this doc. Never invent visual values not present here or in the Figma.
>
> Tokens defined here map 1-to-1 to CSS custom properties in `web/src/styles/tokens.css`. Reference tokens by name (e.g. `var(--color-brand-green)`), never raw values.
>
> **Provenance**: values below were extracted from the TeaShop Figma file (`Cm5mXknRWG9UCxqU7OD0AB`, modified 2026-05-29) by `scripts/extract-figma-raw.mjs`. Raw harvest is in `docs/figma/raw.json` (gitignored). Frequencies in parentheses indicate how many nodes use a value in the design — the most-used values define the system; rare values are likely one-offs and should not become tokens.

---

## 1. Brand & mood

- **Personality:** calm, natural, slow-craft. Warm cream backgrounds, deep forest-green ink, gold ceremony accents. The design avoids pure white and pure black — everything is tinted warm.
- **Voice:** Polish, second person singular, gentle imperatives. ALL-CAPS reserved for small eyebrow labels (12px, +1.2 letter-spacing).
- **Imagery:** flat-lay tea leaves, ceramics, steam, single-origin storytelling.
- **Motion:** subtle. `ease-out`, 150–250ms. No bounce.

---

## 2. Color tokens

All hex values verified from Figma. Frequencies are usage counts across the design.

### 2.1 Brand (forest-green family)
| Token | Hex | Notes / Figma usage |
|---|---|---|
| `--color-brand-ink` | `#032416` | (351×) Primary headline / display text. Near-black with a green undertone. |
| `--color-brand-dark` | `#1A3A2A` | (25×) Header nav links, "Quiz nastroju" eyebrow, dark CTA bg. |
| `--color-brand-green` | `#2D5A3D` | (30×) Solid CTA bg ("Czytaj więcej"), "ZIELONA" badge, free-shipping progress fill. |
| `--color-brand-green-mid` | `#456553` | (4×) Secondary card accents, contact links. |

### 2.2 Sage / mint (supporting greens)
| Token | Hex | Notes |
|---|---|---|
| `--color-mint` | `#ABCFB8` | (9×) "Relaks", "Cytrusowy" badges; quiz result hero highlight. |
| `--color-mint-soft` | `#C7EBD4` | (2×) Success icon tint, order-number callout. |
| `--color-sage-50` | `#D6E8D0` | (17×) Mood-card backgrounds, recommendation card surface, related-product cards. |
| `--color-sage-100` | `#EEF5EC` | (10×) Selected quiz card bg, Info-tip box bg, BLIK-selected state. |
| `--color-sage-divider` | `#C1C8C2` | (3×) Hairline divider inside dark green sections. |

### 2.3 Gold (ceremony accent)
| Token | Hex | Notes |
|---|---|---|
| `--color-gold` | `#C4974A` | (33×) Decorative vector icons in product cards and recommendation tiles. |
| `--color-rating` | `#F0BF6D` | (5×) Star rating fill. |

### 2.4 Functional
| Token | Hex | Notes |
|---|---|---|
| `--color-danger` | `#BA1A1A` | (8×) Error label, error border, remove-from-favorites icon. |
| `--color-info` | `#2563EB` | (1×) GDPR submit link (rare). |

### 2.5 Neutrals — warm cream surfaces
| Token | Hex | Notes |
|---|---|---|
| `--color-bg-page` | `#F5F2EC` | (54×) Page background; progress-bar track; secondary surface. |
| `--color-bg-canvas` | `#FAF9F6` | (75×) Default card / canvas surface (quiz, selection grids). |
| `--color-bg-cream` | `#FAF7F0` | (45×) Stats bar, hero quote bg, alt surface. |
| `--color-bg-sidebar` | `#F4F4F0` | (13×) Sidebar items, product-card alt bg. |
| `--color-bg-beige` | `#EEE8DC` | (47×) Section backgrounds, mood-card unselected. |
| `--color-bg-beige-warm` | `#EEE9DF` | (6×) Team / portrait cards. |
| `--color-bg-cool-cream` | `#EEEEEB` | (15×) Cart-item bg, favorites image bg. |
| `--color-surface` | `#FFFFFF` | (133×) Maximum-contrast surface; modals, on-image buttons. |

### 2.6 Borders & rules
| Token | Hex | Notes |
|---|---|---|
| `--color-border` | `#DDD5C4` | (217×) **Default** warm-beige hairline — header, articles, cards. |
| `--color-border-soft` | `#E3E3E0` | (18×) Cool variant — cart card, free-shipping progress base. |
| `--color-border-neutral` | `#DADAD7` | (5×) Cool gray border — image-column cards, alt cards. |

### 2.7 Text
| Token | Hex | Notes |
|---|---|---|
| `--color-text` | `#1C1C1C` | (55×) Alt headline / strong dark text. Use only when sitting on a green-tinted surface; default headings use `--color-brand-ink`. |
| `--color-text-body` | `#424843` | (30×) Body copy, form labels — warm dark gray. |
| `--color-text-muted` | `#6B6B6B` | (295×) **Default muted** — sub-titles, captions, link rest state. |
| `--color-text-input` | `#6B7280` | (28×) Filled input value, placeholder. |
| `--color-text-disabled` | `#727973` | (7×) Disabled button label, disabled control text. |
| `--color-text-on-brand` | `#FFFFFF` | Text on `--color-brand-*` solid surfaces. |

### 2.8 Translucent / overlay tokens
Used for hero overlays and frosted glass. Match Figma exactly.

| Token | Hex (8-digit) | Notes |
|---|---|---|
| `--color-ink-overlay-80` | `#03241680` | Hero image overlay (50% over imagery). |
| `--color-ink-overlay-66` | `#1A3A2A66` | Hero darken on mission section. |
| `--color-brand-link` | `#032416CC` | Footer link rest. |
| `--color-canvas-frost` | `#FAF9F6CC` | Header sticky bg (with backdrop-blur 12px). |
| `--color-cream-frost` | `#FAF7F0CC` | Stats-bar text-on-image bg. |
| `--color-white-glass-80` | `#FFFFFF80` | Quick-add button bg on product card. |
| `--color-white-glass-cc` | `#FFFFFFCC` | "Dodaj do ulubionych" floating button. |
| `--color-mint-overlay-30` | `#ABCFB84D` | Mood pill bg (mint, 30% opacity). |
| `--color-gold-overlay-10` | `#C4974A1A` | Product buy-box halo. |
| `--color-gold-overlay-30` | `#C4974A4D` | Product buy-box border. |

> ⚠️ A bare `#A0522D` "clay" hue mentioned in earlier drafts of this doc is **not in the Figma** — do not introduce it. The closest real accent is `--color-gold`.

### 2.9 Mood-tag swatches
Mood-tag visual styling is not yet broken out as distinct swatches in the Figma — the design ships only with a generic mint badge style (`--color-mint` text over `--color-mint-overlay-30` bg). For the spec's six mood categories, until the Figma adds them, use the following pragmatic assignments (and update both this doc and the Figma together once finalized):

| Mood | Color token (proposed) |
|---|---|
| 😌 Relaks | `--color-mint` (confirmed in design) |
| ⚡ Energia | `--color-gold` |
| 🧠 Fokus | `--color-brand-green-mid` |
| 🤗 Comfort | `--color-rating` |
| 🌙 Wieczór | `--color-brand-dark` |
| 🌿 Detox | `--color-sage-50` text on `--color-brand-green` |

### 2.10 Contrast rules
- Body text on cream backgrounds: `--color-text-body` (#424843) — verified ≥ 7:1 on `--color-bg-page`.
- Muted text (`--color-text-muted` #6B6B6B) is borderline 4.5:1 on `--color-bg-canvas`; **never** use it for paragraph copy, only short labels.
- Primary CTA: `#FFFFFF` on `--color-brand-green` (#2D5A3D) → ≈ 7.6:1 (AA pass).

---

## 3. Typography

Two families only (both Google Fonts, served via `@fontsource`):

- **Display / headings:** **Playfair Display** (serif, variable).
- **Body / UI:** **Inter** (variable).
- **Numeric (price columns):** **Inter** with `font-variant-numeric: tabular-nums`.

### 3.1 Display & heading scale (Playfair Display)
| Token | Size / line-height | Weight | Letter-spacing | Figma usage |
|---|---|---|---|---|
| `--text-display` | 72 / 79.2 | 800 | −1.44 | (10×) Hero "Herbata, która pasuje…", page H1 "Wszystkie herbaty", "Sencha Uji". |
| `--text-h1` | 42 / 50.4 | 700 | 0 | (26×) Section heading "Odkryj kategorie", "Bestsellery", "Nowości", quiz Q. |
| `--text-h2` | 32 / 38.4 | 700 | 0 | (2×) Form headings "Dane osobowe", "Sprawdź swoje zamówienie". |
| `--text-h3` | 26 / 33.8 | 600 | 0 | (55×) Wordmark "TeaShop", side headings "Metoda dostawy", "Twoje zamówienie". |
| `--text-h3-alt` | 22 / 33 | 400 | 0 | (5×) Product card title on hero "Oolong Wuyi Rock", total row. |
| `--text-h4` | 20 / 30 | 400 | 0 | (3×) Component breakdown headings "Sencha Uji". |
| `--text-h5` | 20 / 28 | 400 | 0 | (4×) Brewing calculator outputs "75-80°C", "2-3 min". |
| `--text-card-title` | 18 / 27 | 400 | 0 | (5×) Bestseller card name "Sencha Sakura", "Earl Grey Imperial". |
| `--text-category` | 17 / 25.5 | 400 | 0 | (5×) Category link "Zielone", "Czarne", "Oolong". |

### 3.2 Body / UI scale (Inter)
| Token | Size / line-height | Weight | Letter-spacing | Figma usage |
|---|---|---|---|---|
| `--text-body-lead` | 16 / 25.6 | 400 | 0 | (89×) Lead intro paragraph. Default body. |
| `--text-body-emphasis` | 16 / 25.6 | 500 | 0 | (14×) Price "65,00 zł" inline, list-item title. |
| `--text-body-bold` | 16 / 25.6 | 600 | 0 | (5×) Cart line price "129,00 zł", read-only product name. |
| `--text-body-strong` | 16 / 25.6 | 700 | 0 | (10×) Delivery option name "Paczkomat InPost". |
| `--text-input` | 16 / 19.36 | 400 | 0 | (12×) Form input value text. |
| `--text-select` | 16 / 24 | 400 | 0 | (15×) Select option, quantity stepper buttons. |
| `--text-summary` | 15 / 22.5 | 400 | 0 | (4×) Summary rows "Suma częściowa", "Dostawa". |
| `--text-meta` | 14 / 20 | 400 | 0 | (71×) Footer text, delivery sub-label, totals. |
| `--text-label` | 14 / 14 | 500 | 0 | (58×) UI label "Zrób krótki quiz", "Precyzyjny wynik". |
| `--text-nav` | 14 / 14 | 500 | 0.7 | (12×) Header nav links "Sklep", "Quiz nastroju". |
| `--text-button` | 14 / 14 | 700 | 1.12 | (4×) Solid CTA "DODAJ DO KOSZYKA", "Zastosuj". |
| `--text-link` | 13 / 19.5 | 400 | 0 | (15×) Inline link "Zobacz kolekcję", star rows. |
| `--text-caption` | 12 / 18 | 400 | 0 | (7×) Card meta "(124)" reviews, tasting notes "Rumianek, lawenda". |
| `--text-caption-tight` | 12 / 16 | 400 | 0 | (6×) Sticky-summary caption "Pochodzenie: Uji, Japonia". |
| `--text-tag` | 11 / 16.5 | 400 | 0.55 | (6×) Product flavor chip "Umami", "Morski". |
| `--text-eyebrow` | 12 / 12 | 600 | 1.2 | (122×) **Most-used.** ALL-CAPS eyebrow "NOWA KOLEKCJA WIOSNA 2025", "QUIZ NASTROJU", "KROK 2 Z 3". |
| `--text-button-sm` | 12 / 12 | 600 | 0.96 | (14×) Smaller solid CTA "ZRÓB QUIZ", "ODKRYJ KOLEKCJĘ". |
| `--text-eyebrow-sm` | 12 / 12 | 600 | 0.6 | (8×) Tighter eyebrow "Krok 3 z 3", filter section heading. |
| `--text-badge` | 10 / 15 | 400 | 1 | (4×) Product badge "NOWOŚĆ", "Bestseller". |
| `--text-badge-sm` | 10 / 15 | 400 | 0.5 | (3×) Tiny chip "3 PYTANIA", "30 SEKUND". |
| `--text-badge-cat` | 10 / 15 | 400 | 0 | (12×) Category badge "ZIELONA", "BIAŁA", flavor "TRAWIASTA". |

### 3.3 Mobile down-shift
The Figma only ships desktop frames (1920w). For mobile (until designs land), down-shift the display scale one step:
- `--text-display` → `--text-h1` (72 → 42)
- `--text-h1` → 32
- `--text-h2` → 26
- Body sizes stay ≥ 16px; never go below.

---

## 4. Spacing, radius, shadow

### 4.1 Spacing scale (4px base)
Spacing tokens are not yet first-class in the Figma; the harvest didn't capture container padding directly. Use this scale for all new code — confirm specific paddings against Figma frames as you build each page.

| Token | px |
|---|---|
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 24 |
| `--space-6` | 32 |
| `--space-7` | 48 |
| `--space-8` | 64 |
| `--space-9` | 96 |
| `--space-10` | 128 |

### 4.2 Radius (real values from Figma)
The Figma uses **only these four corner-radius values** (130 + 47 + 28 + 8 = 213 occurrences total):

| Token | px | Use (per Figma) |
|---|---|---|
| `--radius-sm` | 2 | (47×) Inputs, terms checkboxes, cart-preview thumbnails, small chips. |
| `--radius-md` | 4 | (28×) Quiz selection buttons, section bgs. |
| `--radius-lg` | 8 | (8×) Order details card, delivery info card, cross-sell card, price-range input. |
| `--radius-xl` | 12 | (130×) **Default radius** — buttons, cards, articles, overlays, "add to cart" buttons. |
| `--radius-pill` | 999 | Mood badges, filter chips (use sparingly; Figma uses radius-xl on most chips). |
| `--radius-circle` | 50% | Avatars, icon buttons. |

### 4.3 Shadow (real values from Figma)
| Token | Spec | Use |
|---|---|---|
| `--shadow-card` | `0 2px 8px #0000000D` | (58×) **Default elevated card** — recommendation cards, alternative cards, summary panels, brewing parameters. |
| `--shadow-card-soft` | `0 2px 8px #00000005` | (3×) Lighter quiz-card resting shadow. |
| `--shadow-cta` | `0 1px 2px #0000000D` | (1×) Primary CTA on dark CTA banner. |
| `--shadow-hero` | `0 25px 50px -12px #00000040` | (1×) Hero product photo only — do not reuse without reason. |
| `--backdrop-blur-sm` | `blur(4px)` | (8×) Frosted "favorite" button, frosted hero overlay. |
| `--backdrop-blur-md` | `blur(8px)` | (3×) Frosted card buttons. |
| `--backdrop-blur-lg` | `blur(12px)` | (1×) Sticky header glass. |

Avoid more than 2 elevation steps on one screen.

---

## 5. Layout & grid

- **Design canvas:** 1920px desktop (all Figma frames are `1920w light`). Build to the same content width but cap responsively.
- **Max content width:** `1200px`, centered, with `--space-5` side padding on tablet+.
- **Breakpoints** (mobile-first, inferred — Figma has no mobile frames yet):
  - `--bp-mobile` < 480px (single column)
  - `--bp-tablet` ≥ 768px
  - `--bp-desktop` ≥ 1024px
  - `--bp-wide` ≥ 1440px
- **Grids in the design:**
  - Shop listing: 3 cols desktop (Product Grid: cards 1/2/3 visible).
  - Checkout: 63 / 37 split (form left, sticky summary right).
  - Cart: form-style left column, sticky summary right.
  - Recommendation: 58 / 42 left-imagery / right-details.
  - Categories on home: 5–6 link tiles in a row.
- **Container gutter:** `--space-5` mobile, `--space-6` tablet+.
- **Sticky header** uses `--color-canvas-frost` + `--backdrop-blur-lg`. Height ~80px desktop.

---

## 6. Components

### 6.1 Button
| Variant | Spec |
|---|---|
| `primary-solid` | bg `--color-brand-green`, text `--color-text-on-brand`, `--text-button` or `--text-button-sm`. Hover bg `--color-brand-dark`. Radius `--radius-xl`. Shadow `--shadow-cta` on dark surfaces. |
| `primary-dark` | bg `--color-brand-dark` (#1A3A2A). Used for "Rozpocznij quiz", "Czytaj więcej". |
| `secondary-outline` | 1.5px border `--color-brand-green`, transparent bg, text `--color-brand-green`. |
| `ghost` | Text-only, underline on hover ("Zobacz wszystkie herbaty"). `--text-label` muted (`--color-text-muted`). |
| `danger` | `--color-danger`, used for remove. |
| `disabled` | bg `--color-text-disabled` (#727973), text on it — never grey-out via opacity alone. |

Sizes (height × inner padding):
- `sm` — 32 × 12 16, text `--text-button-sm`.
- `md` — 44 × 16 24, text `--text-button` (default — used by Inpost/DPD selectors).
- `lg` — 56 × 20 32, hero CTAs.

Focus: 2px outline `--color-brand-green` with 2px offset — never remove.

### 6.2 Input / TextField
- Height 44px, radius `--radius-sm` (2px), 1.5px border `--color-border` or `--color-border-soft`.
- Label `--text-label`, color `--color-text-body`.
- Filled text `--text-input`, color `--color-text-input`.
- Error: border `--color-danger`, helper text `--color-danger`, `--text-meta` weight 400. Pair with the error icon.

### 6.3 Mood / flavor badge
- Pill (`--radius-pill`) or rounded chip (`--radius-xl` to match Figma).
- Padding `--space-1 --space-3`. Text `--text-tag` (mood) or `--text-badge-cat` (category like "ZIELONA").
- Mood badge: text `--color-mint`, bg `--color-mint-overlay-30`.
- Category badge: text `--color-brand-green` or `--color-brand-ink`, bg `--color-sage-50`.

### 6.4 Product card
- Surface: `--color-bg-canvas`, 1px `--color-border`, radius `--radius-xl`. Shadow `--shadow-card` on hover (or always for "featured").
- Image area: 4:3 or 1:1, bg `--color-bg-cool-cream` so transparent product cutouts sit cleanly.
- Hierarchy: image → category eyebrow (`--text-badge-cat`) → name (`--text-card-title`, Playfair) → tasting notes (`--text-caption`, muted) → price row (`--text-body-emphasis`) + rating stars `--color-rating`.
- Quick-add: floating circular button bottom-right of image, bg `--color-white-glass-80` + `--backdrop-blur-sm`.
- Favorite: same floating-button pattern, bg `--color-white-glass-cc`. Active = `--color-danger` heart.
- Bestseller / Nowość badge: absolute top-left, `--text-badge`, bg `--color-brand-dark` (Bestseller) or `--color-bg-cream` border `--color-brand-green` (Nowość).

### 6.5 Toast
- Position: top-right desktop (24px), top-center mobile.
- Width 360px desktop, full minus 32px mobile.
- 4px left border colored by variant (`--color-brand-green` success / `--color-info` info / `--color-danger` error).
- Body bg `--color-bg-canvas`. Shadow `--shadow-card`.
- Auto-dismiss 4s except danger. Max 1 visible, queue extras. `role="status"` (success/info) / `role="alert"` (danger).

### 6.6 Drawer
- Slides from right (cart, menu) or bottom (mobile filters), 320–400px / 80vh.
- Backdrop: `rgba(3,36,22,.45)` — derived from `--color-brand-ink`.
- Header sticky, `--text-h4`, close × 44px tap target.
- Focus trap; Esc closes.

### 6.7 Filter chip
- Rounded `--radius-xl`, 32px height, `--text-meta`.
- Unselected: `--color-bg-canvas` bg, `--color-border` border, text `--color-text-body`.
- Selected: `--color-brand-green` bg, `--color-text-on-brand` text.

### 6.8 Checkout stepper
- Horizontal desktop, vertical mobile.
- Step circles 24px, bg `--color-brand-green` (active/complete) or `--color-border` (upcoming).
- Active number: `--text-button`, `--color-text-on-brand`.

### 6.9 Empty / loading / error states
- **Loading:** skeleton blocks `--color-bg-cool-cream` with shimmer 1.4s — no centered spinners on listings.
- **Empty:** illustration + `--text-h3-alt` headline + sub-text `--text-body-lead` muted + primary CTA.
- **Error:** `--color-danger` icon + recovery action — always recoverable.

---

## 7. Iconography

- Library: **Lucide** (`lucide-react`), 1.5px stroke.
- Sizes: 20px UI, 24px header, 16px inline with `--text-meta`.
- Color: `currentColor` (never hardcoded). Decorative gold glyphs in the design use `--color-gold` — these come from the Figma vector exports, not Lucide.
- Replace generic icons with emoji **only** where the spec uses them: category tiles, mood badges, quiz options.

---

## 8. Motion

| Token | ms | Easing | Use |
|---|---|---|---|
| `--motion-fast` | 120 | `ease-out` | Hover color, underline |
| `--motion-base` | 200 | `cubic-bezier(.2,.7,.3,1)` | Button, badge, focus halo |
| `--motion-slow` | 320 | `cubic-bezier(.2,.7,.3,1)` | Drawer / modal slide |
| `--motion-page` | 240 | `ease-out` | Route fade (no slide) |

- Honor `prefers-reduced-motion: reduce` — fall back to instant state changes.
- Animate `transform` / `opacity`, never layout properties.

---

## 9. Imagery & illustration

- Product images: 1:1 master, served at 600 / 1200px (`srcset`). Background `--color-bg-cool-cream` for transparent products.
- Hero: 16:9 desktop, 4:5 mobile. Use `--color-ink-overlay-80` gradient over imagery to land text contrast.
- Empty-state and 404 illustrations: line drawings in `--color-brand-ink` on transparent.

---

## 10. Accessibility commitments

- Every interactive element reachable by Tab; no positive `tabindex`.
- Global focus ring `--color-brand-green` 2px / 2px offset — never removed.
- Modals/drawers trap focus, restore on close, Esc closes.
- Color is never the only signal — selected chips also show a check; error inputs show an icon.
- `<label>` always rendered; `aria-invalid` + `aria-describedby` on errors.
- Live region for toasts (`role="status"` or `role="alert"`).

---

## 11. Page-specific notes (matched to Figma frames)

The Figma file contains 23 desktop frames. Mapping (left to right by build order):
Home (Hero + Kategorie + Bestsellery + Quiz CTA + Nowości + Stats + Newsletter) · Shop listing · Product detail · Quiz intro · Quiz step (4-card grid) · Quiz step (3-card vertical) · Quiz result hero · Quiz recommendation block · Cart · Checkout step 1 (Dane osobowe) · Checkout step 2 (Metoda dostawy) · Checkout step 3 (Sprawdź zamówienie) · Order success · Favorites grid · Brewing calculator · About / Mission · Origin map · Team portraits · Gift sets listing · Gift set detail · Contact · Empty state.

### 11.1 Home
- Hero: ~70vh, full-bleed cream bg, headline `--text-display`, sub `--text-body-lead` `--color-text-muted`, two CTAs (primary-dark "ZRÓB QUIZ" + ghost "Zobacz wszystkie herbaty"). Right side: large product hero photo with `--shadow-hero`.
- Category tiles: 5–6 columns desktop, image with cream bg, title `--text-category` (Playfair) below.
- Bestsellers: row of 4 product cards (see §6.4).
- Quiz CTA section: full-bleed `--color-bg-cream`, headline `--text-h1`, "ZRÓB QUIZ" primary-dark button.
- Stats bar: `--color-bg-cream` with vertical dividers `--color-sage-divider`, big numbers in `--text-h1`, captions in `--text-eyebrow`.

### 11.2 Shop `/sklep`
- Left aside 280px: filter sections each with `--text-eyebrow-sm` heading ("Kategorie", "Profil Smakowy", "Cena"). Items are pill chips.
- Grid 3 columns. Header has H1 `--text-display` "Wszystkie herbaty" + sort dropdown.
- Pagination: pill buttons, current selected = `--color-brand-green`.

### 11.3 Product detail
- Two columns: imagery (~58%) left, info (~42%) right.
- Right column header: `--text-eyebrow` category, `--text-display` product name, gold rating, price `--text-body-bold`.
- Flavor chips `--text-tag` border style.
- Sticky right Buy Box has gold border halo (`--color-gold-overlay-30`) on highlighted state.
- Brewing calculator: 4-tile grid, each tile `--color-bg-canvas`, `--radius-lg`, value `--text-h5` (Playfair).

### 11.4 Quiz `/quiz` & results
- Centered card, max 720px wide, `--color-bg-canvas`, `--radius-xl`, `--shadow-card`.
- Progress: `--text-eyebrow-sm` "KROK 2 Z 3", thin bar `--color-bg-page` track / `--color-brand-green` fill.
- Question: `--text-h1` (Playfair 42).
- Options: either 2×2 grid of square buttons (radius `--radius-md`) or vertical stack of horizontal cards. Selected = `--color-sage-100` bg + `--color-brand-green` border + `--shadow-cta` ring.
- Info tip box: `--color-sage-100` bg, `--color-mint` icon, `--text-meta`.
- Results hero: dark green band (`--color-brand-ink`) with eyebrow "TWÓJ WYNIK", mint mood tags, then below the recommendation block (image left, details right, score %).

### 11.5 Cart / Checkout
- Cart layout: 63% left items / 37% right sticky summary.
- Items list: each row 1px `--color-border-soft` divider, qty stepper buttons radius `--radius-sm`.
- Free-shipping progress: `--color-border-soft` track, `--color-brand-green` fill, with leaf icon.
- Discount code: input + "Zastosuj" primary button.
- Checkout summary header `--text-h3` "Twoje zamówienie", totals `--text-summary`.
- Step 3 submit button: full-width primary-dark, label `--text-button-sm` "ZŁÓŻ ZAMÓWIENIE — 201,95 ZŁ".

### 11.6 Order success
- Hero `--color-bg-cream` with `--color-mint-soft` accent. Order number callout pill.
- Below: order details card + delivery info card (both `--radius-lg`).

### 11.7 Favorites grid
- 4-column product cards on `--color-bg-canvas`, `--text-h5` for price (Inter 18/27 600). Heart button uses `--color-danger`.

### 11.8 404 / Empty
- Centered illustration, `--text-h2` headline, sub `--text-body-lead`, two CTAs ("Wróć do sklepu" primary + "Zrób quiz" outline).

---

## 12. `web/src/styles/tokens.css` — copy this verbatim

```css
:root {
  /* ─── Color: brand ─────────────────────────────────────────── */
  --color-brand-ink:        #032416;
  --color-brand-dark:       #1A3A2A;
  --color-brand-green:      #2D5A3D;
  --color-brand-green-mid:  #456553;

  /* ─── Color: sage / mint ───────────────────────────────────── */
  --color-mint:             #ABCFB8;
  --color-mint-soft:        #C7EBD4;
  --color-sage-50:          #D6E8D0;
  --color-sage-100:         #EEF5EC;
  --color-sage-divider:     #C1C8C2;

  /* ─── Color: gold accent ───────────────────────────────────── */
  --color-gold:             #C4974A;
  --color-rating:           #F0BF6D;

  /* ─── Color: functional ────────────────────────────────────── */
  --color-danger:           #BA1A1A;
  --color-info:             #2563EB;

  /* ─── Color: neutrals (warm cream) ─────────────────────────── */
  --color-bg-page:          #F5F2EC;
  --color-bg-canvas:        #FAF9F6;
  --color-bg-cream:         #FAF7F0;
  --color-bg-sidebar:       #F4F4F0;
  --color-bg-beige:         #EEE8DC;
  --color-bg-beige-warm:    #EEE9DF;
  --color-bg-cool-cream:    #EEEEEB;
  --color-surface:          #FFFFFF;

  /* ─── Color: borders ───────────────────────────────────────── */
  --color-border:           #DDD5C4;
  --color-border-soft:      #E3E3E0;
  --color-border-neutral:   #DADAD7;

  /* ─── Color: text ──────────────────────────────────────────── */
  --color-text:             #1C1C1C;
  --color-text-body:        #424843;
  --color-text-muted:       #6B6B6B;
  --color-text-input:       #6B7280;
  --color-text-disabled:    #727973;
  --color-text-on-brand:    #FFFFFF;

  /* ─── Color: overlays / glass ──────────────────────────────── */
  --color-ink-overlay-80:   #03241680;
  --color-ink-overlay-66:   #1A3A2A66;
  --color-brand-link:       #032416CC;
  --color-canvas-frost:     #FAF9F6CC;
  --color-cream-frost:      #FAF7F0CC;
  --color-white-glass-80:   #FFFFFF80;
  --color-white-glass-cc:   #FFFFFFCC;
  --color-mint-overlay-30:  #ABCFB84D;
  --color-gold-overlay-10:  #C4974A1A;
  --color-gold-overlay-30:  #C4974A4D;

  /* ─── Typography: families ─────────────────────────────────── */
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body:    'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* ─── Typography: display & headings (Playfair) ────────────── */
  --text-display-size: 72px;   --text-display-lh: 79.2px;  --text-display-weight: 800; --text-display-ls: -1.44px;
  --text-h1-size:      42px;   --text-h1-lh:      50.4px;  --text-h1-weight:      700;
  --text-h2-size:      32px;   --text-h2-lh:      38.4px;  --text-h2-weight:      700;
  --text-h3-size:      26px;   --text-h3-lh:      33.8px;  --text-h3-weight:      600;
  --text-h3-alt-size:  22px;   --text-h3-alt-lh:  33px;    --text-h3-alt-weight:  400;
  --text-h4-size:      20px;   --text-h4-lh:      30px;    --text-h4-weight:      400;
  --text-h5-size:      20px;   --text-h5-lh:      28px;    --text-h5-weight:      400;
  --text-card-title-size: 18px; --text-card-title-lh: 27px; --text-card-title-weight: 400;
  --text-category-size: 17px;  --text-category-lh: 25.5px; --text-category-weight: 400;

  /* ─── Typography: body / UI (Inter) ────────────────────────── */
  --text-body-lead-size:     16px; --text-body-lead-lh:     25.6px; --text-body-lead-weight:     400;
  --text-body-emphasis-size: 16px; --text-body-emphasis-lh: 25.6px; --text-body-emphasis-weight: 500;
  --text-body-bold-size:     16px; --text-body-bold-lh:     25.6px; --text-body-bold-weight:     600;
  --text-body-strong-size:   16px; --text-body-strong-lh:   25.6px; --text-body-strong-weight:   700;
  --text-input-size:         16px; --text-input-lh:         19.36px; --text-input-weight:        400;
  --text-select-size:        16px; --text-select-lh:        24px;   --text-select-weight:        400;
  --text-summary-size:       15px; --text-summary-lh:       22.5px; --text-summary-weight:       400;
  --text-meta-size:          14px; --text-meta-lh:          20px;   --text-meta-weight:          400;
  --text-label-size:         14px; --text-label-lh:         14px;   --text-label-weight:         500;
  --text-nav-size:           14px; --text-nav-lh:           14px;   --text-nav-weight:           500; --text-nav-ls: 0.7px;
  --text-button-size:        14px; --text-button-lh:        14px;   --text-button-weight:        700; --text-button-ls: 1.12px;
  --text-link-size:          13px; --text-link-lh:          19.5px; --text-link-weight:          400;
  --text-caption-size:       12px; --text-caption-lh:       18px;   --text-caption-weight:       400;
  --text-caption-tight-size: 12px; --text-caption-tight-lh: 16px;   --text-caption-tight-weight: 400;
  --text-tag-size:           11px; --text-tag-lh:           16.5px; --text-tag-weight:           400; --text-tag-ls: 0.55px;
  --text-eyebrow-size:       12px; --text-eyebrow-lh:       12px;   --text-eyebrow-weight:       600; --text-eyebrow-ls: 1.2px;
  --text-button-sm-size:     12px; --text-button-sm-lh:     12px;   --text-button-sm-weight:     600; --text-button-sm-ls: 0.96px;
  --text-eyebrow-sm-size:    12px; --text-eyebrow-sm-lh:    12px;   --text-eyebrow-sm-weight:    600; --text-eyebrow-sm-ls: 0.6px;
  --text-badge-size:         10px; --text-badge-lh:         15px;   --text-badge-weight:         400; --text-badge-ls: 1px;
  --text-badge-sm-size:      10px; --text-badge-sm-lh:      15px;   --text-badge-sm-weight:      400; --text-badge-sm-ls: 0.5px;
  --text-badge-cat-size:     10px; --text-badge-cat-lh:     15px;   --text-badge-cat-weight:     400;

  /* ─── Spacing (4px base) ───────────────────────────────────── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  96px;
  --space-10: 128px;

  /* ─── Radii (Figma uses only these four) ───────────────────── */
  --radius-sm:     2px;
  --radius-md:     4px;
  --radius-lg:     8px;
  --radius-xl:     12px;
  --radius-pill:   999px;
  --radius-circle: 50%;

  /* ─── Shadows ──────────────────────────────────────────────── */
  --shadow-card:      0 2px 8px #0000000D;
  --shadow-card-soft: 0 2px 8px #00000005;
  --shadow-cta:       0 1px 2px #0000000D;
  --shadow-hero:      0 25px 50px -12px #00000040;
  --backdrop-blur-sm: blur(4px);
  --backdrop-blur-md: blur(8px);
  --backdrop-blur-lg: blur(12px);

  /* ─── Motion ───────────────────────────────────────────────── */
  --motion-fast: 120ms ease-out;
  --motion-base: 200ms cubic-bezier(.2, .7, .3, 1);
  --motion-slow: 320ms cubic-bezier(.2, .7, .3, 1);
  --motion-page: 240ms ease-out;

  /* ─── Layout ───────────────────────────────────────────────── */
  --container-max: 1200px;
  --bp-mobile:     480px;
  --bp-tablet:     768px;
  --bp-desktop:    1024px;
  --bp-wide:       1440px;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-fast: 0ms;
    --motion-base: 0ms;
    --motion-slow: 0ms;
    --motion-page: 0ms;
  }
}
```

---

## 13. Anti-patterns (do not ship)

- Hardcoded hex / px values in component CSS (add a token here first).
- Removing the focus ring on any interactive element.
- More than one `primary-solid`/`primary-dark` button visible on a screen.
- Using `--color-text-muted` (#6B6B6B) for paragraph copy — it's borderline contrast.
- Introducing `clay`, `spice-orange`, `Fraunces`, or other tokens not present in the Figma.
- Spinners on full-page or listing loads — skeletons only.
- Empty screens — every empty state has copy + CTA.
- Mood badges on non-product surfaces.
- New corner radii beyond {2, 4, 8, 12} without updating Figma + this doc together.

---

## 14. When the Figma changes

1. Run `FIGMA_TOKEN=… node scripts/extract-figma-raw.mjs` — overwrites `docs/figma/raw.json`.
2. Diff `raw.json` against the previous run; identify which colors / text styles / radii / shadows changed or were added.
3. Update this file (`design.md`) first — it's the contract.
4. Update `web/src/styles/tokens.css` to match the §12 block.
5. Grep `web/src/` for any literal hex / px value that slipped in; replace with the corresponding token.
6. Note the change in the PR description so reviewers can spot regressions.
