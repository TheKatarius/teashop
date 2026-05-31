---
name: add-page
description: Scaffold a new route + page component in web/src/pages/ and wire it into the router. Use when the user asks to "add a page", "create a route", "add /some-route", or "/add-page".
---

# add-page

Scaffold a new route under `web/src/pages/<Name>/` and register it in `web/src/app/router.tsx`.

## When to invoke
- User asks to add / create a new page or route.
- User types `/add-page <Name> <urlPath>`.

## Args
`/add-page <PascalName> <urlPath>` — e.g. `/add-page Favorites /ulubione`.

If either is missing, ask one question to collect both. The URL path should match the spec sitemap in `TeaShop_architektura_informacji_Version1.md` §1 — if the user proposes a path that conflicts, point this out and confirm before proceeding.

## Procedure

1. **Verify** `web/src/pages/<Name>/` does not already exist. Refuse + confirm overwrite if it does.
2. **Create** the page folder with three files:

### `web/src/pages/<Name>/<Name>Page.tsx`
```tsx
import styles from './<Name>Page.module.css';

export function <Name>Page() {
  return (
    <main className={styles.root}>
      <h1><Name></h1>
    </main>
  );
}
```

### `web/src/pages/<Name>/<Name>Page.module.css`
```css
.root {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--space-6) var(--space-5);
}
```

### `web/src/pages/<Name>/<Name>Page.test.tsx`
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { <Name>Page } from './<Name>Page';

describe('<Name>Page', () => {
  it('renders heading', () => {
    render(
      <MemoryRouter>
        <<Name>Page />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: '<Name>' })).toBeInTheDocument();
  });
});
```

3. **Wire the router** — open `web/src/app/router.tsx` and add a route:
```tsx
{ path: '<urlPath>', element: <<Name>Page /> },
```
Place it next to neighbouring routes alphabetically by path. Import using the `@/` alias: `import { <Name>Page } from '@/pages/<Name>/<Name>Page';`.

4. **If the route is user-scoped** (e.g. `/profil`, `/ulubione`, `/zamowienie`), wrap with `<RequireAuth>` (already present in the router). Ask the user if unsure.

5. **Page-level visual rules** — section spacing and container width must come from `design.md` §5 / §11. If the page is one of the named pages in §11, mirror that layout (e.g. shop page has sidebar + grid).

6. **Report**: created files (absolute paths), the router line added, and a reminder to add the page to the header navigation if it's a top-level destination.

## Hard rules
- Page component name ends with `Page` (e.g. `FavoritesPage`).
- One default route element per page; nested children go in their own folder under the same page directory.
- No data fetching directly in the page — use TanStack Query hooks from `features/<x>/api.ts`.
- Don't add navigation links yourself — Header/Footer composition is owned by the layout file.
