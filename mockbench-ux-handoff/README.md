# Mockbench — Handoff bundle

This folder is the Phase 1 handoff to the builder.

## Contents

- `PRINCIPLES.md` — the design principles. Immutable; break only with a thesis for why.
- `UX-PLAN.md` — Phase 1 scope: palette, canvas, placement interactions, widget catalog, tokens.
- `prototypes/` — three working HTML references, each with a reasoning-header comment block:
  - `01-widgets-at-rest.html` — visual vocabulary baseline (no interaction).
  - `02-palette.html` — palette chrome, scroll, and tile behavior.
  - `03-rubber-stamp.html` — full Phase 1: palette + canvas + click-stamp + drag + mode switching.

## How to read this bundle

1. Start with `PRINCIPLES.md`. Ten rules, ~1 page.
2. Then `UX-PLAN.md` for Phase 1 scope and the widget catalog.
3. Open the prototypes in a browser. The reasoning-header comments at the top of each file explain what was locked in that iteration and what was deferred.

## What the builder writes

- `CLAUDE.md` (stack-specific context for Claude-in-the-repo)
- `PLAN.md` (execution order across phases)
- All production code

## What's deferred

Phase 2+ is intentionally unscoped here. The "Explicitly deferred" section of `UX-PLAN.md` lists what is *not* in Phase 1 — do not implement those without agreement on the spec.
