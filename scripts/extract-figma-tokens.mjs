#!/usr/bin/env node
// Pulls color, text, and effect styles from a Figma file via the REST API
// and writes:
//   - docs/figma/styles.json       (raw, machine-readable)
//   - docs/figma/tokens.draft.css  (CSS custom properties draft)
//
// Usage:
//   FIGMA_TOKEN=xxxxx node scripts/extract-figma-tokens.mjs
//
// Defaults to TeaShop file Cm5mXknRWG9UCxqU7OD0AB. Override with FIGMA_FILE_KEY.

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY ?? 'Cm5mXknRWG9UCxqU7OD0AB';

if (!TOKEN) {
  console.error('FIGMA_TOKEN is required. Generate one at https://www.figma.com/settings → Personal access tokens.');
  process.exit(1);
}

const headers = { 'X-Figma-Token': TOKEN };

async function figma(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, { headers });
  if (!res.ok) {
    throw new Error(`Figma ${path} → ${res.status} ${await res.text()}`);
  }
  return res.json();
}

function rgbaToHex({ r, g, b, a = 1 }) {
  const to = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  const hex = `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
  return a < 1 ? `${hex}${to(a)}` : hex;
}

function slug(name) {
  return name
    .toLowerCase()
    .replace(/[\/]/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Pull the whole file. Works with file_content:read scope.
const file = await figma(`/files/${FILE_KEY}`);
const styleMeta = file.styles ?? {};

// Walk the document; for each node, if it references a style via node.styles.{fill|text|effect|stroke},
// capture the actual resolved value (fill paint, text style, effects, stroke paint) from that node.
const fillByStyleId = {};
const textByStyleId = {};
const effectByStyleId = {};

function visit(node) {
  const refs = node.styles ?? {};
  if (refs.fill && !fillByStyleId[refs.fill]) {
    const paint = (node.fills ?? []).find((f) => f.visible !== false);
    if (paint?.type === 'SOLID') {
      fillByStyleId[refs.fill] = rgbaToHex({ ...paint.color, a: paint.opacity ?? 1 });
    }
  }
  if (refs.stroke && !fillByStyleId[refs.stroke]) {
    const paint = (node.strokes ?? []).find((f) => f.visible !== false);
    if (paint?.type === 'SOLID') {
      fillByStyleId[refs.stroke] = rgbaToHex({ ...paint.color, a: paint.opacity ?? 1 });
    }
  }
  if (refs.text && node.style && !textByStyleId[refs.text]) {
    const s = node.style;
    textByStyleId[refs.text] = {
      fontFamily: s.fontFamily,
      fontWeight: s.fontWeight,
      fontSize: s.fontSize,
      lineHeight: s.lineHeightPx ?? null,
      letterSpacing: s.letterSpacing ?? null,
    };
  }
  if (refs.effect && Array.isArray(node.effects) && !effectByStyleId[refs.effect]) {
    effectByStyleId[refs.effect] = node.effects.map((e) => ({
      type: e.type,
      radius: e.radius,
      offset: e.offset,
      color: e.color ? rgbaToHex({ ...e.color, a: e.color.a ?? 1 }) : null,
      spread: e.spread,
    }));
  }
  for (const child of node.children ?? []) visit(child);
}
visit(file.document);

const colors = [];
const texts = [];
const effects = [];

for (const [styleId, meta] of Object.entries(styleMeta)) {
  const name = meta.name;
  if (meta.styleType === 'FILL') {
    const hex = fillByStyleId[styleId];
    if (hex) colors.push({ name, slug: slug(name), hex, styleId });
  } else if (meta.styleType === 'TEXT') {
    const t = textByStyleId[styleId];
    if (t) texts.push({ name, slug: slug(name), ...t, styleId });
  } else if (meta.styleType === 'EFFECT') {
    const e = effectByStyleId[styleId];
    if (e) effects.push({ name, slug: slug(name), layers: e, styleId });
  }
}

await mkdir(resolve(repoRoot, 'docs/figma'), { recursive: true });

const stylesJson = { fileKey: FILE_KEY, colors, texts, effects };
await writeFile(
  resolve(repoRoot, 'docs/figma/styles.json'),
  JSON.stringify(stylesJson, null, 2),
);

const tokenLines = [
  '/* Auto-generated from Figma. Reconcile with design.md before committing. */',
  ':root {',
  '  /* Colors */',
  ...colors.map((c) => `  --color-${c.slug}: ${c.hex};`),
  '',
  '  /* Type styles (font-size / line-height) */',
  ...texts.map(
    (t) =>
      `  --text-${t.slug}-size: ${t.fontSize}px;` +
      (t.lineHeight ? ` /* line-height ${t.lineHeight}px, ${t.fontFamily} ${t.fontWeight} */` : ` /* ${t.fontFamily} ${t.fontWeight} */`),
  ),
  '}',
  '',
].join('\n');

await writeFile(resolve(repoRoot, 'docs/figma/tokens.draft.css'), tokenLines);

console.log(`✓ ${colors.length} colors, ${texts.length} text styles, ${effects.length} effects`);
console.log('  docs/figma/styles.json');
console.log('  docs/figma/tokens.draft.css');
console.log('\nNext: review the draft, then port real values into design.md + web/src/styles/tokens.css.');
