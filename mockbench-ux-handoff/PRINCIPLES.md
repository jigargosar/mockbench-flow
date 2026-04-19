# Mockbench — Principles

Immutable rules. Break only with a thesis for why.

---

## 1. Wireframe = wire + frame

Every widget has a visible border. Content inside is either real (when the widget's purpose is a text label — Button, Title) or a minimal identifying placeholder (X-in-a-box for images, pipe-separated items for menus). Never decorative, never hachure-fill, never fake ipsum.

## 2. Widgets are atomic

Each widget is a hard-coded thing. Button is a Button. Header is a Header. If a user wants something the catalog doesn't provide, they compose from rect + image + menu items. Widgets are the fast path for common cases — not a parameter soup for every case.

## 3. All strokes 1px

Uniform stroke width everywhere. Visual hierarchy comes from layout (density, grouping, text size), never from stroke weight. This is what a real pen on real paper looks like — one ink, one nib.

## 4. Widget IS the label

No tile titles, no tooltips, no hover-to-reveal names. If a widget isn't recognizable from its sketch, fix the sketch. Viewport is precious. Users who need labels will ask; ship without until they do.

## 5. Chrome is strong or absent

No timid hover states. A barely-visible hover is noise pretending to be information. Commit (warm paper fill, accent background for active) or don't. Indiscernible chrome is worse than no chrome.

## 6. Never tight

Generous spacing everywhere. Tiles breathe. Widgets breathe. Empty space is the structure that carries a no-labels, no-borders UI — if the space collapses, the composition collapses.

## 7. Stable UI

No spooky action at a distance. A hover on widget A never causes a change in widget B, or in a far corner of the screen. If information needs to appear on hover, it appears *on the hovered element*, not somewhere else the eye must track.

## 8. No layout shift

Scrollbars are always reserved (`overflow-y: scroll`, not `auto`). Hover states use background/color changes, never border additions that reflow content. A UI that jumps around as it grows or as the user mouses over it is a UI that fights its user.

## 9. Proportions are doctrine; pixels are tuning

The ratio between Browser, Header, and Button heights is the design decision. The absolute pixel values are tuning — adjust for viewport scale, device density, future display targets. Never let pixel tweaks break the ratios.

## 10. Mode over modality

Modes (like stamp mode) persist across tool switches. Picking a different widget while in stamp mode swaps the tool — does not exit the mode. The *mode* is what the user committed to; the *tool* is a light switch inside it.
