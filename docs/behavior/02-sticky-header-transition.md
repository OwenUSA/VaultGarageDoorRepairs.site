# 02 — Sticky header transition

Reference: `$(window).scroll` toggles `header.active` at `scrollTop >= 50`. Measured across
four breakpoints, **the header height does not change**: 170 -> 170 at 1440, 110 -> 110 at
1024 and below. It is a background and elevation change, not a shrink.

## Mechanism

`position: sticky; top: 0` for the stick itself — no JavaScript is involved in holding the
header in place. A single boolean `data-scrolled` attribute on the header element carries
the *appearance* change, set by an `IntersectionObserver` watching a zero-height sentinel
placed at 50px from the top of the document.

```css
header[data-sticky]                      { position: sticky; top: 0; z-index: 50;
                                           transition: background-color 180ms linear,
                                                       box-shadow 180ms linear; }
header[data-sticky][data-scrolled="true"]{ background-color: var(--surface-raised);
                                           box-shadow: var(--shadow-header); }
```

**Do NOT use:**

- A `scroll` event listener. It fires on every frame of a fling scroll on mobile and this
  needs one bit of information. `IntersectionObserver` on a sentinel gives the same bit for
  free, off the main thread.
- `position: fixed` plus a spacer div. It duplicates the header height into a second element
  that then has to be kept in sync, and it is the usual cause of a 1px jump at the toggle.
- **Any height, padding or font-size change.** The reference does not shrink and neither do
  we. A header that resizes on scroll reflows the whole document under the user's finger
  and moves the tap target for the phone number while they are reaching for it.
- `will-change: transform` on the header. It promotes a layer that is repainted anyway and
  on iOS it has been observed to detach the sticky.

## Ratio and why

| | value | why |
|---|---|---|
| threshold | **50px**, matching the reference | Far enough that the toggle never fires from a one-notch trackpad nudge, close enough that it has happened before the hero heading leaves. |
| transition | **180ms linear** | Colour and shadow have no spatial component; easing a colour is invisible. 180ms is long enough that the change is not a flash and short enough that it is finished before the next scroll tick. |
| hysteresis | none | A single sentinel at 50px gives natural hysteresis of one intersection boundary. Adding an explicit dead band was considered and rejected: with a 0-height sentinel there is nothing to oscillate against. |

## Failure mode

**Flicker at the boundary.** With a scroll listener and a bare `>= 50` comparison, a scroll
that rests exactly at 50px toggles the class on every sub-pixel event. The sentinel makes
the boundary a single element crossing rather than a repeated numeric comparison.

**The header covers the anchor target.** `/services` is eight in-page anchors; without
`scroll-margin-top` on every `[id]` target the sticky header lands on top of the heading the
user just jumped to. Set `scroll-margin-top: calc(var(--header-h) + var(--space-4))`
globally on `[id]`, in the shell, once — not per section.

**Sticky silently dies.** `position: sticky` stops working if any ancestor has
`overflow: hidden`, `overflow: clip` or a `transform`. The header's ancestors are `body` and
`html` only, and nothing in the shell may introduce a clipping ancestor above it. A section
that needs `overflow: hidden` clips itself, never a wrapper around the header.

## Trigger

| event | result |
|---|---|
| sentinel leaves the viewport | `data-scrolled="true"` |
| sentinel re-enters | `data-scrolled="false"` |
| **client-side route change** | the new page mounts at `scrollY = 0`, so the sentinel is in view and the header resets. **Verify this**, because App Router restores scroll position on back-navigation, and a restored deep scroll must leave the header in its scrolled state rather than its rest state. Recomputing from the observer on mount handles both. |
| resize | nothing. Height does not change, so there is nothing to recompute. |

## Accessibility

- The header is a `<header>` landmark containing a `<nav aria-label="Primary">`. The
  scrolled state changes appearance only; no element enters or leaves the accessibility
  tree, and nothing is announced.
- Contrast is checked in **both** states. `contrast.mjs` resolves the layered background,
  and the rest state — where the header sits over the hero image — is the one that fails
  first. Both states must read 0 FAIL, and the rest state is not exempt because it is
  transient.
- The skip link (`SkipLink`) is the first focusable element in the document and must render
  **above** the sticky header's `z-index` when focused, or it becomes a link the user can
  hear but not see.
- `prefers-reduced-motion: reduce` — the colour and shadow transition drops to `0ms`. The
  header still sticks; stickiness is layout, not motion, and removing it would be a
  different layout rather than a reduced one.
- The `tel:` CTA in the header keeps `min-height: 44px` (A-14) in both states, and must
  remain the most saturated action on the page in both — A-13 scores CTA salience as
  **chroma dominance**, not painted contrast. Its own label-against-fill legibility is
  checked separately by `rendertruth.mjs`, and the rest state, over the hero image, is where
  it fails first.
