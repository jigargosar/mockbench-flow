# Mockbench — Execution plan

Living doc. Reconciles the designer handoff (`mockbench-ux-handoff/`) with the code we ship.

## Stack

- **Vite + React 18 + TypeScript**
- **@xyflow/react** — canvas host. Configured locked in Phase 1 (no pan, no zoom, no selection, no node-drag, no edges, no Controls, no MiniMap). Unlocks incrementally in later phases.
- **roughjs 4.6.x** — sketch rendering via `rough.svg`.
- Fonts via Google Fonts `<link>`: Inter Tight, Kalam, JetBrains Mono.

## Why React Flow (even though Phase 1 doesn't need it)

The project is `mockbench-flow` and the foundation was chosen up front. Phase 1 surfaces none of RF's features but uses RF as the node host so that Phases 2+ (selection, move, resize, zoom, frames, links) don't require a canvas rewrite. The designer's prototypes are plain-DOM reference implementations and are stack-agnostic by design.

## Phase 1 — Rubber stamp

Authoritative spec: `mockbench-ux-handoff/UX-PLAN.md`. Summary:

- **Palette.** Left-pinned, 16px inset, 108px wide, always-reserved 10px scrollbar, 18 tiles (3 widgets × 6 reps). Idle transparent / hover warm paper / active terracotta. No labels on tiles (Principle §4).
- **Canvas.** Paper grid (20px dot pattern). Fixed — no pan, no zoom.
- **Placement.** Click tile → stamp mode. Click canvas → place at cursor center, mode persists. Click same tile again → exit. Click other tile while in stamp mode → swap tool, keep mode (Principle §10). Mousedown + 5px threshold = drag, one-shot placement anywhere over canvas, cancelled over palette. Drag does NOT enter stamp mode.
- **Ghost.** 45% opacity, follows cursor in stamp mode (over canvas only) and during drag (anywhere).
- **Esc.** Exits stamp mode, cancels drag.
- **Status line.** Centered pill at bottom reflecting mode.
- **Widgets.** Button (96×30), Header (640×44), Browser (680×440). Each instance gets a unique seed.

### Phase 1 widget rendering contract

- All rough options: `roughness: 1.0, bowing: 1.1, strokeWidth: 1, stroke: var(--fg)` (Principle §3 — uniform 1px).
- Each widget has two renderings: `*Full` (canvas size) and `*Tile` (palette size, ~72×44 max).
- Seed derived from a deterministic hash of the instance id. Re-stamping produces a new instance id → new seed → visually distinct strokes.

### Phase 1 file layout

```
src/
  main.tsx
  App.tsx
  styles/
    tokens.css            // :root CSS vars (colors, fonts)
    base.css              // reset, body, canvas-bg, palette, tile, status, ghost
  lib/
    hashSeed.ts
  sketch/
    Rough.tsx             // <Rough w h seed draw /> host
  widgets/
    registry.ts           // id → { Full, Tile, size }
    Button.tsx
    Header.tsx
    Browser.tsx
  editor/
    Editor.tsx            // orchestrates palette + canvas + ghost + status
    Palette.tsx
    Canvas.tsx            // React Flow host, locked
    StatusLine.tsx
    useStampDrag.ts       // unified mousedown → click/drag handler
```

### Phase 1 explicitly out-of-scope (deferred)

Per `UX-PLAN.md`:
- Selection, move, resize, delete of placed widgets
- Text editing (double-click → pipe editor)
- Undo / redo, persistence, file format
- Zoom / pan
- Widget catalog expansion (image, text block, input, card, modal, footer, …)
- Multi-select, alignment guides, grouping
- Collaboration

Per my v3 scope doc (`/root/.claude/plans/i-want-to-build-resilient-scone.md`), the following are additionally out of Phase 1 — kept there as a long-horizon reference only:
- Pages + frames
- Presentation mode, HTML prototype, share-link
- Design tokens beyond Phase 1 set
- Cloud-ready storage adapter

## Phase 2+ (sketched, unscoped)

- Selection + delete + basic keyboard nav
- Text editing (Balsamiq pipe-editor)
- Move and resize (unlock RF draggable + NodeResizer)
- Undo / redo
- IndexedDB persistence
- Zoom / pan (unlock RF)
- Widget catalog expansion
- Pages + frames
- Prototype links + Presentation + HTML prototype export
- Share-link snapshots
- Local-first cloud-ready sync adapter

Each phase will get its own `UX-PLAN` from the designer before engineering starts.

## Verification (Phase 1)

1. `pnpm install && pnpm dev` → paper-grid canvas, palette pinned top-left with 16px inset, status pill at bottom.
2. Palette has 18 tiles, scrollbar present and always reserved.
3. Hover a tile → warm paper fill only, no motion, no border.
4. Click a tile → terracotta fill persists, ghost follows cursor over canvas, status reads "stamping <widget>".
5. Click canvas → widget placed at cursor-center; ghost still visible; status unchanged; another click places another.
6. Click same tile again → exits stamp mode; or press Esc → exits.
7. In stamp mode with Button active, click Header tile → ghost swaps to Header, still stamping.
8. Mousedown on tile + move >5px → drag ghost follows cursor anywhere; release over canvas places; release over palette cancels; dragging does not enter stamp mode.
9. Repeated stamps of the same widget produce visually distinct sketches (different seeds).
10. No layout shift anywhere (scrollbar reserved, hover changes background only).
