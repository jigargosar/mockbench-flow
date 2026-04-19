# CLAUDE.md — Mockbench

Repo context for Claude sessions. Read this first before editing.

## What this is

A Balsamiq-style low-fidelity wireframing tool. Sketched widgets on a paper-grid canvas. Project name: `mockbench-flow`. Long-horizon feature scope is in `/root/.claude/plans/i-want-to-build-resilient-scone.md` (v3 plan); the current shippable slice is defined in `PLAN.md` (Phase 1).

## Source of truth

1. **`mockbench-ux-handoff/PRINCIPLES.md`** — ten design principles. Immutable unless broken with a thesis.
2. **`mockbench-ux-handoff/UX-PLAN.md`** — authoritative Phase 1 spec (palette, canvas, interactions, tokens, catalog).
3. **`mockbench-ux-handoff/prototypes/*.html`** — reference implementations. Not production code; reimplement preserving behavior + principles.
4. **`PLAN.md`** — execution plan reconciling the handoff with this repo.

When a handoff doc and code disagree, the handoff wins. When the v3 long-horizon plan and the current handoff disagree, the current handoff wins — the v3 plan is future horizon only.

## Stack

- Vite + React 18 + TypeScript.
- **@xyflow/react** as canvas host. **Locked in Phase 1** — no pan, no zoom, no selection, no node drag, no edges, no Controls, no MiniMap. Placed widgets are RF nodes of `type: "widget"`.
- **roughjs 4.6.x** via `rough.svg`. Always pass `seed` for determinism.
- Fonts: Inter Tight (UI), Kalam 400 (text *inside* sketched widgets — 700 reads as shouty), JetBrains Mono (small caps, kbd).

## Principles you must not violate without explicit user approval

(Summarized — full text in `PRINCIPLES.md`.)

1. Widgets have visible borders. Content is real text or a minimal identifying placeholder. Never decorative fill, never fake ipsum.
2. Widgets are atomic. No parameter soup. Compose complex things from primitives.
3. **All strokes 1px, uniform.** Hierarchy comes from layout, not stroke weight.
4. Widget IS the label. No tile titles, no tooltips, no hover-to-reveal names.
5. Chrome is strong or absent. No timid hover states.
6. Never tight. Generous spacing. Empty space is the structure.
7. Stable UI. No spooky action at a distance.
8. No layout shift. `overflow-y: scroll`, never `auto`. Hover changes background/color only, never border additions.
9. Proportions are doctrine; pixels are tuning.
10. Mode over modality. Stamp mode persists across tool switches.

## Visual tokens (Phase 1)

```
--paper      oklch(0.975 0.005 85)     canvas background
--panel      oklch(0.995 0.002 90)     palette background
--fg         oklch(0.22 0.01 80)       ink — strokes, primary text
--fg-muted   oklch(0.5 0.008 80)       secondary text
--fg-subtle  oklch(0.65 0.006 80)      tertiary text
--line       oklch(0.88 0.005 80)      panel borders
--accent     oklch(0.58 0.14 35)       terracotta — active/focus only

--font-ui      'Inter Tight', system-ui, sans-serif
--font-sketch  'Kalam', cursive
--font-mono    'JetBrains Mono', monospace
```

Rough defaults: `roughness: 1.0, bowing: 1.1, strokeWidth: 1, stroke: var(--fg)`.

## Conventions

- **Determinism:** every rendered rough widget MUST receive a stable `seed` (via `hashSeed(instanceId)`). Never rely on rough's random seed.
- **No toolbars in Phase 1.** Palette + status pill are the only chrome.
- **No "helpful" additions beyond the spec.** If the UX plan says "no selection in Phase 1", placed widgets don't respond to clicks — full stop.
- **No layout-shift hover states.** Background color only.
- **Scrollbar always reserved:** CSS `overflow-y: scroll`, not `auto`, anywhere it might ever scroll.
- **When adding a new widget:** register in `src/widgets/registry.ts`, provide `Full` (canvas size) and `Tile` (palette preview) components, provide size, use `useMemo(hashSeed(seedKey))` for seed.

## Development

```
pnpm install
pnpm dev     # Vite at http://localhost:5173 (or similar)
pnpm build   # production build to dist/
pnpm preview # preview production build
```

## Branch

All work on `claude/wireframe-clone-react-flow-eXojz` until told otherwise. Never push to `main` without explicit permission.
