# 04 — Service card hover and press

Applies to the five symptom cards on `/services`, the three on `/`, the door-style cards,
and the eight service anchors' CTAs. One behaviour, defined once.

## Mechanism

`transform: translateY()` and `box-shadow` on the card, `background-color` on the CTA
inside it. The whole card is made clickable by a stretched pseudo-element on the heading's
link — **not** by wrapping the card in an `<a>`.

```css
.card              { transform: translateY(0); box-shadow: var(--shadow-card);
                     transition: transform 140ms cubic-bezier(.2,.7,.3,1),
                                 box-shadow 140ms cubic-bezier(.2,.7,.3,1); }
@media (hover: hover) and (pointer: fine) {
  .card:hover      { transform: translateY(-4px); box-shadow: var(--shadow-card-raised); }
}
.card:active       { transform: translateY(-1px); transition-duration: 60ms; }
.card:focus-within { outline: var(--focus-ring); outline-offset: 3px; }
.card a::after     { content: ''; position: absolute; inset: 0; }
```

**Do NOT use:**

- A bare `:hover` rule with no `@media (hover: hover)` guard. On touch, `:hover` sticks after
  a tap and the card stays raised until the user taps elsewhere — which reads as "selected"
  on a card that is not selectable.
- `scale()`. It resamples the card's text and the placeholder image on every frame; at 1.02
  on a 14px label the difference is visible as a shimmer.
- Animating `top`, `margin`, `height`, `border-width` or `padding`. Every one of them
  reflows, and on the `/services` grid a reflow on hover moves the four cards next to it.
- Wrapping the card in `<a>`. It swallows the paragraph text into the link's accessible name
  — on our symptom cards that is a 400-character link label — and it makes any second link
  inside the card invalid HTML.
- `cursor: pointer` on the card element instead of the link. It promises a click target that
  does not exist for the keyboard.

## Ratio and why

| | value | why |
|---|---|---|
| hover in | **140ms** | Below ~100ms the lift is a jump; above ~180ms the card is still moving when the pointer has left. 140 is the point where a 4px travel reads as a response rather than an animation. |
| press | **60ms** | Press feedback must land inside the same perceptual moment as the finger. Anything above ~80ms is felt as lag rather than as a button. |
| lift | **-4px** | Enough to read against the card's own shadow at 390. 8px starts to look like a drag. |
| easing | `cubic-bezier(.2,.7,.3,1)` | Same curve as the drawer. One motion character across the site; a card that eases differently from the drawer reads as a different site. |

## Failure mode

**Sticky hover on touch.** Described above. It is the reason the `@media (hover: hover)`
guard is mandatory rather than tidy.

**The stretched pseudo-element eats the other link.** `::after { inset: 0 }` covers
everything in the card, including a second link such as "Call now". If a card has two
targets, the stretched link is dropped and both are ordinary links — a card is never
half-clickable.

**Focus is invisible.** Hovering styles the card but focusing styles only the inner `<a>`,
which may be the heading text tucked in a corner. `:focus-within` on the card is what makes
keyboard navigation legible, and it must be a real outline rather than the shadow change,
because a shadow does not meet the 3:1 non-text contrast requirement reliably against every
card background.

## Trigger

| event | result |
|---|---|
| pointer enter, fine pointer only | lift + raised shadow |
| pointer down | press state, 60ms |
| keyboard focus on any link inside | `:focus-within` outline on the card; **no lift**, because a transform on focus moves the element the user is reading |
| tap on touch | press state only; hover never applies |
| **client-side route change** | nothing persists — the cards unmount. Explicitly: no hover state is stored in React state, so there is nothing to leak across a navigation. |

## Accessibility

- Each card's link is the heading, so the accessible name is the symptom line, which is what
  a screen-reader user needs to choose between them.
- The card's `note` line ("Off-track and misaligned door correction…") is associated with
  the link via `aria-describedby`, not folded into the name.
- Focus ring is `outline`, never `box-shadow`, so Windows High Contrast Mode keeps it.
  3:1 against both the card and the page background (D-19), verified by `contrast.mjs`.
- `outline-offset: 3px` keeps the ring clear of the card's own border radius.
- `prefers-reduced-motion: reduce` — `transition-duration: 0ms` on transform and shadow.
  The hover state still *exists* (the shadow and the lift are applied), it just arrives
  instantly. Removing the state entirely would remove the affordance, which is not what a
  reduced-motion preference asks for.
- Minimum target 44x44 on the card's own link and on any CTA inside it, at 390.
