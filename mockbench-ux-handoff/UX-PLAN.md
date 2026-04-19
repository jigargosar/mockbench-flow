# Mockbench — UX Plan (Phase 1)

This document specifies Phase 1 behavior. Phases beyond are intentionally unscoped here.

---

## What Phase 1 delivers

A canvas where a user can place sketched widgets from a palette, using either click-to-stamp or drag-to-place. That is the entire deliverable. No selection, no editing, no persistence.

---

## Palette

**Position.** Pinned to the left, floating inside a 16px inset (not flush to viewport edge). Rounded corners (14px). Subtle shadow. Above the canvas (z-index > canvas).

**Dimensions.** 108px wide. Full height minus the 16px top/bottom inset.

**Content.** A vertically scrolling list of tiles, one per widget instance. For Phase 1, each widget in the catalog is repeated enough times to make the scrollbar present and useful (~6 repeats of 3 widgets = 18 tiles).

**Scrollbar.** Always reserved (`overflow-y: scroll`). Styled quiet — 10px wide, rounded thumb in the same ink tone as the border. No arrows, no native OS chrome. Visible when there's overflow; reserved track means no layout shift when content grows or shrinks.

**Tile.** No border by default. No label. No title. The widget sketch fills the tile. Generous padding (12px × 6px) so tiles breathe.

**Tile states.**
- **Idle:** transparent background.
- **Hover:** warm paper fill (`oklch(0.93 0.012 75)`). No border, no motion, no shift.
- **Active (stamp mode):** terracotta fill (`oklch(0.8 0.11 35)`). Persistent until mode exits.

**Tile identity.** Each tile instance has a unique seed so the sketch strokes vary tile-to-tile. Repeated widgets must not look copy-pasted.

---

## Canvas

**Background.** Paper grid — dot pattern at 20px spacing in `oklch(0.84 0.005 80)` against a paper fill (`oklch(0.975 0.005 85)`).

**Placed widgets.** Rendered at absolute position. No selection UI, no move, no resize in Phase 1. Each placed instance has a unique seed.

---

## Placement interactions

Two paths for placing a widget: **click** (stamp mode) and **drag** (one-shot).

### Click path (rubber stamp)

1. User clicks a tile in the palette.
2. Tile becomes active (terracotta fill). Stamp mode entered.
3. User moves cursor over the canvas. A ghost preview of the widget (45% opacity, same sketch rendering as the stamped widget) follows the cursor, centered on the pointer.
4. User clicks on the canvas. Widget is placed at the click position (centered on cursor). Stamp mode continues — ghost still follows, user can keep clicking to place more.
5. Exit stamp mode by: pressing `Esc`, or clicking the same active tile again.

### Drag path

1. User mousedowns on a tile and moves the cursor past a 5px threshold.
2. Ghost preview follows the cursor anywhere on screen (not just canvas).
3. User releases. If released over the canvas, widget is placed at release point. If released over the palette, nothing happens (drag cancelled).
4. Drag does NOT enter stamp mode — it's a one-shot placement.

### Mode switching

While in stamp mode, clicking a *different* tile swaps the active widget. Stamp mode persists. The user is still in stamp mode; they just have a different stamp now.

### Threshold behavior

A mousedown on a tile is either a click or a drag — disambiguated by movement past 5px before mouseup. Under threshold = click (toggles stamp mode). Over threshold = drag (one-shot placement).

---

## Widget catalog (Phase 1)

Three widgets. Proportions are locked; absolute pixel sizes are tuning.

### Button
- **Size:** 96 × 30 px.
- **Chrome:** single rough rectangle.
- **Content:** centered text label, Kalam 400, 14px. Default text: "Button".

### Header
- **Size:** 640 × 44 px. (Fits inside Browser width with margin on each side.)
- **Chrome:** outer frame + X-in-a-box logo placeholder on the left + 4 short horizontal dashes on the right representing menu items.
- **Content:** none beyond the above. Real text goes in via the future text-edit flow.

### Browser
- **Size:** 680 × 440 px.
- **Chrome:** outer frame + top bar (at y=32) + three traffic-light circles + URL bar rectangle.
- **Content:** **none**. Browser is a container — its inside is meant to receive other widgets. Never pre-fill with fake page content.

### Proportion rules
- Header width ≈ Browser width × 0.94 (fits inside with small inset).
- Header height ≈ Button height × 1.5 (Header can comfortably hold a Button inside with breathing room).
- Browser height ≈ Header height × 10 (container is ~an order of magnitude taller than its header).

---

## Visual tokens

| Token        | Value                        | Purpose                          |
|--------------|------------------------------|----------------------------------|
| `--paper`    | `oklch(0.975 0.005 85)`      | Canvas background                |
| `--panel`    | `oklch(0.995 0.002 90)`      | Palette background               |
| `--fg`       | `oklch(0.22 0.01 80)`        | Ink — strokes, primary text      |
| `--fg-muted` | `oklch(0.5 0.008 80)`        | Secondary text                   |
| `--fg-subtle`| `oklch(0.65 0.006 80)`       | Tertiary text (status, hints)    |
| `--line`     | `oklch(0.88 0.005 80)`       | Panel borders                    |
| `--accent`   | `oklch(0.58 0.14 35)`        | Terracotta — active/focus only   |

**Fonts.**
- `--font-ui`: Inter Tight (UI chrome, status line, palette)
- `--font-sketch`: Kalam 400 (text *inside* sketched widgets)
- `--font-mono`: JetBrains Mono (small caps, kbd hints, technical marks)

**Sketch rendering.** rough.js 4.6.6. Default options: `roughness: 1.0, bowing: 1.1, strokeWidth: 1, stroke: var(--fg)`. Each widget instance seeded by a hash of a unique key (instance id) so repeated placements vary.

---

## Keyboard

- `Esc` — exits stamp mode (also cancels an in-progress drag).
- No other keyboard behavior in Phase 1.

---

## Status line

A small rounded pill centered at the bottom of the viewport, ~20px from the bottom. Text reflects current mode:
- Idle: "click a widget to stamp · drag a widget to place precisely"
- Stamping: "stamping **button** · click canvas to place · `esc` to stop"
- Dragging: "dragging **button** · release on canvas to place"

Not chrome the user interacts with — pure feedback.

---

## Explicitly deferred

These are intentionally not in Phase 1. Do not implement them without agreement on the spec:

- **Selection.** Clicking a placed widget does nothing yet.
- **Move / resize.** Placed widgets are static.
- **Delete.** No keyboard delete yet.
- **Text editing.** The Balsamiq-style double-click → pipe-separated text editor is planned. Not yet specified.
- **Undo / redo.**
- **Persistence / save / load / file format.**
- **Zoom / pan.** Canvas is fixed to viewport.
- **Widget catalog expansion.** Image, text block, input, card, modal, footer are all anticipated — not in Phase 1.
- **Multi-select, alignment guides, grouping.**
- **Collaboration / multi-user.**

---

## Reference

Three working prototype HTML files accompany this document:

1. `prototypes/01-widgets-at-rest.html` — the three widgets rendered side-by-side. Establishes the sketched visual vocabulary. No interaction.
2. `prototypes/02-palette.html` — the palette in isolation. Establishes chrome, scroll, and tile behavior.
3. `prototypes/03-rubber-stamp.html` — the full Phase 1 interaction: palette + canvas + click-stamp + drag + mode switching + Esc.

These are reference implementations, not production code. They are HTML + React + rough.js. Reimplement in whatever stack fits the target product; preserve the behavior and the principles.
