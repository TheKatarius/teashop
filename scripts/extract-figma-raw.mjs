#!/usr/bin/env node
// Walks every node in the Figma file and collects unique values actually used:
//   - fill / stroke colors (hex + frequency + sample node names)
//   - text style combinations (font + weight + size + line-height + frequency)
//   - effects (drop shadows etc., frequency)
//   - corner radii (frequency)
//   - page list with top-level frame names
//
// Output: docs/figma/raw.json
//
// Usage: FIGMA_TOKEN=xxx node scripts/extract-figma-raw.mjs

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY ?? 'Cm5mXknRWG9UCxqU7OD0AB';
if (!TOKEN) { console.error('FIGMA_TOKEN required'); process.exit(1); }

function rgbaToHex({ r, g, b, a = 1 }) {
  const to = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  const hex = `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
  return a < 1 ? `${hex}${to(a)}` : hex;
}

async function figma(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, { headers: { 'X-Figma-Token': TOKEN } });
  if (!res.ok) throw new Error(`Figma ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

const file = await figma(`/files/${FILE_KEY}`);

const colorMap = new Map(); // hex -> { count, samples: Set }
const textMap = new Map();  // key -> { count, samples, ...attrs }
const effectMap = new Map();
const radiusMap = new Map();

function bumpColor(hex, sampleName) {
  if (!hex) return;
  const e = colorMap.get(hex) ?? { count: 0, samples: new Set() };
  e.count++; if (e.samples.size < 5) e.samples.add(sampleName);
  colorMap.set(hex, e);
}

function bumpText(s, sampleName) {
  const key = `${s.fontFamily}|${s.fontWeight}|${s.fontSize}|${s.lineHeightPx ?? ''}|${s.letterSpacing ?? ''}`;
  const e = textMap.get(key) ?? { count: 0, samples: new Set(), ...s };
  e.count++; if (e.samples.size < 5) e.samples.add(sampleName);
  textMap.set(key, e);
}

function bumpEffect(effects, sampleName) {
  if (!Array.isArray(effects) || effects.length === 0) return;
  const layers = effects.map((e) => ({
    type: e.type, radius: e.radius, offset: e.offset, spread: e.spread,
    color: e.color ? rgbaToHex({ ...e.color, a: e.color.a ?? 1 }) : null,
  }));
  const key = JSON.stringify(layers);
  const v = effectMap.get(key) ?? { count: 0, samples: new Set(), layers };
  v.count++; if (v.samples.size < 5) v.samples.add(sampleName);
  effectMap.set(key, v);
}

function bumpRadius(r, sampleName) {
  if (typeof r !== 'number' || r === 0) return;
  const v = radiusMap.get(r) ?? { count: 0, samples: new Set() };
  v.count++; if (v.samples.size < 5) v.samples.add(sampleName);
  radiusMap.set(r, v);
}

const pages = [];

function visit(node, pagePath) {
  const name = `${pagePath}/${node.name}`;
  for (const paint of node.fills ?? []) {
    if (paint?.type === 'SOLID' && paint.visible !== false) {
      bumpColor(rgbaToHex({ ...paint.color, a: paint.opacity ?? 1 }), name);
    }
  }
  for (const paint of node.strokes ?? []) {
    if (paint?.type === 'SOLID' && paint.visible !== false) {
      bumpColor(rgbaToHex({ ...paint.color, a: paint.opacity ?? 1 }), name);
    }
  }
  if (node.style && node.type === 'TEXT') bumpText(node.style, name);
  bumpEffect(node.effects, name);
  bumpRadius(node.cornerRadius, name);
  if (Array.isArray(node.rectangleCornerRadii)) {
    for (const r of node.rectangleCornerRadii) bumpRadius(r, name);
  }
  for (const child of node.children ?? []) visit(child, name);
}

for (const page of file.document.children ?? []) {
  pages.push({
    name: page.name,
    topFrames: (page.children ?? []).map((c) => ({ name: c.name, type: c.type })),
  });
  for (const child of page.children ?? []) visit(child, page.name);
}

const colors = [...colorMap.entries()]
  .map(([hex, e]) => ({ hex, count: e.count, samples: [...e.samples] }))
  .sort((a, b) => b.count - a.count);

const texts = [...textMap.values()]
  .map((e) => ({
    fontFamily: e.fontFamily, fontWeight: e.fontWeight,
    fontSize: e.fontSize, lineHeightPx: e.lineHeightPx, letterSpacing: e.letterSpacing,
    count: e.count, samples: [...e.samples],
  }))
  .sort((a, b) => b.count - a.count);

const effects = [...effectMap.values()]
  .map((e) => ({ count: e.count, layers: e.layers, samples: [...e.samples] }))
  .sort((a, b) => b.count - a.count);

const radii = [...radiusMap.entries()]
  .map(([r, e]) => ({ radius: r, count: e.count, samples: [...e.samples] }))
  .sort((a, b) => b.count - a.count);

await mkdir(resolve(repoRoot, 'docs/figma'), { recursive: true });
await writeFile(
  resolve(repoRoot, 'docs/figma/raw.json'),
  JSON.stringify({ fileKey: FILE_KEY, fileName: file.name, lastModified: file.lastModified, pages, colors, texts, effects, radii }, null, 2),
);

console.log(`File: ${file.name} (modified ${file.lastModified})`);
console.log(`Pages: ${pages.length}`);
for (const p of pages) console.log(`  - ${p.name}  (${p.topFrames.length} top-level frames)`);
console.log(`Unique colors: ${colors.length}`);
console.log(`Unique text styles: ${texts.length}`);
console.log(`Unique effect sets: ${effects.length}`);
console.log(`Unique corner radii: ${radii.length}`);
console.log('→ docs/figma/raw.json');
