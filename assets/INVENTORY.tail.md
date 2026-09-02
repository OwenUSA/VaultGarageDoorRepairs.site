
## TAKE — the only two, and neither is a file we copy

Both are Google Fonts under the SIL Open Font License, verifiable in one step from
`fonts.google.com`. They are loaded with `next/font/google`, which self-hosts the subset at
build time. **No `woff2` is lifted from the reference's CDN.**

| family | role in the reference | evidence | how we take it |
|---|---|---|---|
| **Roboto Condensed** | primary. 5,335 rendered text nodes across the five pages; weights 400/500/600/700; 28 distinct rendered sizes from 12px to 60px | real `@font-face`, real `woff2` files, variable 100–900 | `next/font/google`, weights 400/500/700, `display: swap` |
| **Rubik** | secondary. 545 nodes; weights 400/500/600/700; sizes 14–25px | real `@font-face`, real `woff2` files, variable 300–900 | `next/font/google`, weights 400/500/700, `display: swap` |

### No font-substitution floor is booked, and none may be

D-11 books a permanent text-metric floor **only** when the reference self-hosts a licensed
font we cannot use. That is not this reference. Both families it actually renders are open,
both are on Google Fonts, and we load the same two. Any text-metric delta measured later is
a real defect, not a floor. Do not add one.

### Eleven further declared families that load nothing — phantoms

`usedFamilies` reports these on rendered text, and every one of them belongs to the
third-party `onetap` accessibility widget, not to the site design:

`system-ui` (1,485 nodes) · `Material Symbols Outlined` (456, `@font-face` declared with
**no `src` file at all**) · `Material Icons` (126) · `ui-serif` (39) · `Roboto Flex` (24) ·
`impact` (12) · plus `Roboto`, `slick`, and the widget's own fallbacks.

The widget is DELETED in `docs/sections.md`, so none of these is a slot, a token, or a
divergence. `slick` is declared as a `ttf` icon font for a carousel whose runtime never
initialises.

## Icons — `lucide-react`, matched on stroke and box, never on glyph

Every icon in the reference is a raster or SVG file. We ship none of them. The
build wave uses `lucide-react` at the **same box and stroke width**, choosing the nearest
sensible glyph rather than tracing theirs:

| where | reference box | count | lucide substitute |
|---|---|---|---|
| header nav chevron | 10×6 | 1 | `ChevronDown`, stroke 2 |
| header top bar | 22×22 | 1 | `ShieldCheck`, stroke 2 |
| home tabbed band | 25×25 at 390/768, **40×40 at 1440** | 8 | service-appropriate set, stroke 2 |
| home service grid | 50×50 | 3 | stroke 2 |
| home doors carousel | 69×55 | 5 | stroke 2 |
| emergency band phone | 36×42 | 1 | `Phone`, stroke 2 |
| /services bullets | 25×25 | 5 | `Check`, stroke 2 |
| footer social | 50×50 | 2 | **not shipped** — no social profiles exist (`TODO(fact)`) |

The tab icons are the only set that changes box across breakpoints; they must be sized by
token, not by a fixed `size` prop.

## Video — one, in a deleted band, so no poster slot survives

The reference renders exactly one `<video>`: a muted / autoplay / playsinline MP4, 535×535
at 1440 and absent below it, inside the `testimonial` band. Policy is poster-still-only —
but that band is DELETED under D-13, so there is no slot to hold a poster and none is
generated. Recorded here so the count is honest.

## Dominant colour: 40 of 69 REPLACE slots are UNMEASURABLE

The dominant-colour sample comes from the Prompt 1 reference section screenshots, which
were captured **before** the NitroPack lazy sources were forced. On any slot whose image had
not painted, the sample is the empty band, not the photo: 40 REPLACE slots came back at
luminance > 0.82, most of them at `#fefefe`, `#ffffff` or `#fefbf1`.

A near-white placeholder mounted into a band destroys that band's *painted* contrast
measurement — `rendertruth.mjs` samples near-white text on a near-white fill and cannot
distinguish a missing asset from a real A-13 contrast defect. A sibling site in this
programme hit exactly this and left such placeholders unmounted.

**The call here, made explicitly:**

- the honestly sampled hex stays in the `dominant` column above and in
  `.harness/inventory.json` — the record is wanted;
- the placeholder **file** is repainted to a single mountable mid-neutral, `#5c6169`
  (4.9:1 against white, 4.3:1 against `#111`), with the sampled hex printed on the tile;
- every affected slot carries `colourUnmeasurable: true` in `.harness/inventory.json`;
- **Prompt 10 must not name a hue for these 40 slots.** Their generator prompts take their
  palette from the Prompt 5 tokens for the band they sit in, never from this column.

The 40: `about-band-bg`, `about-gallery-1`…`-8`, `community-band-bg`, `community-photo`,
`components-slide-1`…`-6`, `doors-band-bg`, `doors-slide-1`…`-9`, `emergency-band-bg`,
`emergency-vehicle`, `process-band-bg`, `services-grid-bg`, `services-tile-1`…`-5`,
`tabbed-panel-1`, `-2`, `-3`, `-7`.

The 29 that **are** measurable carry a real sample and can be trusted: notably
`services-card-1..3` `#19213a`, `tabbed-panel-4..6,8` `#101937`, `breadcrumb-bg` `#35405b`,
`services-hero-bg` `#4b5a8a`, `who-photo` `#415082`, `how-panel-1/2` `#ccb673`,
`service-detail-bg` `#94835e`.

## Logo

`logo-wordmark` (160×64 at 1440, 100×40 at 390/768) and `logo-footer` (185×80 at every
breakpoint) are both `TODO(fact): logo asset`. Until a file exists the build renders the
business name as a **wordmark in the display font** — no icon, no lockup, no invented
emblem. Prompt 10 writes one generator entry covering the wordmark-plus-icon lockup with
the display font and the applied Prompt 5 hues named.

## Standing rules for the build wave

1. **Never fetch a reference asset.** Not to inspect it, not to sample it, not temporarily.
   Everything needed is already in this file.
2. Mount placeholders from `public/placeholders/` by slot ID. The file name **is** the slot
   ID, so a missing asset is legible on the page and in a screenshot.
3. A slot whose aspect changes across breakpoints has a second `-alt` placeholder. Use it;
   do not stretch the primary.
4. Placeholder-blocked sections are **known floors**, not divergences (`ITERATION_CAP`
   never applies to them). They are listed in `docs/known-divergence.md`.
