---
name: add-component
description: Scaffold a new React component in web/src/ following TeaShop conventions — TS file + CSS Module + RTL test, named export, co-located, design-token-only styling. Use when the user asks to "add a component", "create a component", "scaffold X", or "/add-component".
---

# add-component

Scaffold a new React component under `web/src/` that conforms to TeaShop conventions.

## When to invoke
- User asks to add / create / scaffold a React component.
- User types `/add-component` (with or without args).
- **Proactively**, whenever you're about to write JSX for a UI pattern that already exists elsewhere in the codebase (Button, Badge, Card, FormField, Stepper, EmptyState, PriceTag, RatingStars, QuantityStepper, Toast, Modal/Drawer, ProgressBar, etc.) — extract on the **second** occurrence, not the third. Before invoking, grep `web/src/components/` and the relevant `features/*/components/` for an existing match to avoid duplicates.

## Args (free-form)
The user provides at least the component name. Optionally the destination folder. Examples:
- `/add-component ProductCard features/catalog/components`
- `/add-component CartDrawer features/cart/components`
- `/add-component Button components`

If the destination is missing, ask one clarifying question: **"Generic reusable (`web/src/components/`) or feature-scoped (`web/src/features/<feature>/components/`)?"** Default to `web/src/components/` only if the user says "generic".

## Procedure

1. **Resolve target path** — `web/src/<dest>/<PascalCaseName>/`.
2. **Refuse** if the folder already exists. Ask the user whether to overwrite before doing anything.
3. **Create exactly three files**, all using named exports:

### `<Name>.tsx`
```tsx
import clsx from 'clsx';
import styles from './<Name>.module.css';

export interface <Name>Props {
  className?: string;
}

export function <Name>({ className }: <Name>Props) {
  return (
    <div className={clsx(styles.root, className)}>
      <Name/>
    </div>
  );
}
```

### `<Name>.module.css`
```css
.root {
  /* Use design tokens from web/src/styles/tokens.css — no magic values. */
  padding: var(--space-3);
  color: var(--color-text);
}
```

### `<Name>.test.tsx`
```tsx
import { render, screen } from '@testing-library/react';
import { <Name> } from './<Name>';

describe('<Name>', () => {
  it('renders', () => {
    render(<<Name> />);
    expect(screen.getByText('<Name>')).toBeInTheDocument();
  });
});
```

4. **Do NOT** add a barrel `index.ts` unless the surrounding folder already has one. Check first.
5. **Do NOT** import from `react` for hooks the component doesn't use — keep the scaffold minimal.
6. **Report**: list the created files with absolute paths and remind the user to wire it into the consuming page/parent.

## Hard rules
- Filename = component name (PascalCase). One component per file.
- Named export only. No default exports.
- No inline styles, no magic colors / pixel values — design tokens only. Reference `design.md` for the available tokens and component visual spec; if a needed token is missing, add it to `design.md` + `tokens.css` first, then use it.
- No `any`. Props always typed via an exported interface `<Name>Props`.
- Don't generate Storybook files (not in the project's stack).