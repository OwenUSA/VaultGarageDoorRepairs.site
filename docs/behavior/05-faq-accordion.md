# 05 — FAQ accordion

In-page on `/services` only (D-01: the FAQ route is deleted). Reference counterpart is the
`faq-two` accordion on the deleted `/faqs` template; ours is a NOVEL section measured on
token conformance.

## Mechanism

Native `<details>` / `<summary>`, one per question, with the panel height animated by
`grid-template-rows: 0fr -> 1fr` on an inner wrapper.

```html
<details class="faq-item">
  <summary>Why does my garage door reverse before it reaches the floor?</summary>
  <div class="faq-panel"><div class="faq-panel-inner"><p>…</p></div></div>
</details>
```

```css
.faq-panel        { display: grid; grid-template-rows: 0fr;
                    transition: grid-template-rows 220ms cubic-bezier(.2,.7,.3,1); }
details[open] .faq-panel { grid-template-rows: 1fr; }
.faq-panel-inner  { overflow: hidden; min-height: 0; }
summary::-webkit-details-marker { display: none; }
```

**Do NOT use:**

- `height: auto` in a transition. It does not animate, so the panel snaps.
- A measured pixel height from `scrollHeight` set in JS. It goes stale when the font loads,
  when the viewport is resized, and when a long answer rewraps — and it is a layout read on
  every open.
- `max-height: 9999px`. The transition then runs for the full 9999px worth of duration and
  the panel appears to hang open before it moves, with the tail of the easing wasted on
  height that does not exist.
- A custom `role="button"` div. `<summary>` is already a button to every assistive
  technology, already keyboard-operable, and already has the disclosure semantics.
- Forcing single-open (an "accordion" that closes its siblings). Our answers are short and
  independent; auto-closing the question a user just read to open the next one is a
  usability cost with no layout benefit. All items open independently.

## Ratio and why

| | value | why |
|---|---|---|
| expand | **220ms** | The panels vary from two lines to six. 220ms is slow enough that the longest panel does not appear to teleport and fast enough that the shortest is not padded out. |
| collapse | **180ms** | Slightly faster, same reasoning as the drawer: closing is a completed decision. |
| chevron | **220ms** `rotate(0 -> 180deg)` | Matched to the panel so the two read as one gesture. `rotate`, not a swapped glyph, so there is nothing to preload. |
| easing | `cubic-bezier(.2,.7,.3,1)` | Site-wide curve. |

## Failure mode

**Content is unreachable when JS is off or has not hydrated.** This is why `<details>` is
the mechanism: with no JavaScript at all, every question still opens. A React-state
accordion renders eight collapsed panels that nothing can open until hydration completes,
and on a slow phone that is a real window.

**Find-in-page cannot see closed answers.** Chrome's `hidden="until-found"` and its
`beforematch` event handle this for `<details>` automatically in supporting browsers;
nothing extra is required, and nothing may be done that breaks it — in particular the panel
must not be `display: none` when closed. `grid-template-rows: 0fr` with
`overflow: hidden` keeps the text in the box tree and findable.

**The transition does not run on the very first open** if `grid-template-rows` is only
declared inside `details[open]`. The closed value has to exist on `.faq-panel` itself, or
there is no start value to interpolate from.

## Trigger

| event | result |
|---|---|
| click / Enter / Space on `<summary>` | native toggle of `open`; CSS does the rest |
| deep link `/services#faq-3` | the browser scrolls to it. **A `<details>` containing the target auto-opens** in current browsers; where it does not, a small `hashchange` handler sets `open` on the nearest ancestor `<details>`. Without this, an anchor into a closed answer scrolls to a collapsed row. |
| **client-side route change** | items remount closed. Deliberate: an accordion that remembers state across navigations disagrees with the back button. |
| resize / font load | nothing to recompute. This is the whole reason no pixel height is stored. |

## Accessibility

- `<summary>` carries the semantics; no `role`, `aria-expanded` or `tabindex` is added. The
  browser maps `open` to expanded state already, and hand-written ARIA on `<summary>` has a
  long history of overriding it incorrectly.
- The default disclosure triangle is removed visually and replaced by a chevron marked
  `aria-hidden="true"` — it duplicates state that is already announced.
- Each `<summary>` is a heading-level landmark for navigation: `<h3><summary>` is invalid, so
  the heading wraps *inside* the summary (`<summary><h3>…</h3></summary>`), keeping both the
  disclosure semantics and the heading outline.
- Focus ring on `<summary>` is an `outline` at 3:1 against the panel and the page (D-19).
- `prefers-reduced-motion: reduce` — `transition-duration: 0ms` on both the panel and the
  chevron. Open and close still work; they are instant.
- Tap target: `<summary>` is full-row width with `min-height: 44px` at 390.
- Answers contain no response-time, pricing, warranty or credential claims (CLAUDE.md
  pre-answered list); the content is in `lib/site.ts` `faqs` and is technical only.
