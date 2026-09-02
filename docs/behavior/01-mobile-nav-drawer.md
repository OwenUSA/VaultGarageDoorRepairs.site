# 01 — Mobile nav drawer

Reference: `.open-menu` toggles `#mySidenav` from `left: -100%` to `left: 0`, body dimmed to
`rgba(0,0,0,.4)`. Measured at 390: `left: -390px -> 0px`, **81 links**. Ours carries three.

## Mechanism

`transform: translateX(-100%) -> translateX(0)` on the panel, driven by a `data-open`
attribute on the drawer element. The overlay is a sibling with `opacity: 0 -> 1`.

```css
[data-drawer]          { transform: translateX(-100%); transition: transform 260ms cubic-bezier(.2,.7,.3,1); }
[data-drawer][data-open="true"] { transform: translateX(0); }
[data-overlay]         { opacity: 0; pointer-events: none; transition: opacity 200ms linear; }
[data-overlay][data-open="true"] { opacity: 1; pointer-events: auto; }
```

**Do NOT use** — each of these has a named reason:

- `left`, the reference's own property. It is not compositor-accelerated and animating it
  triggers layout on every frame of a panel that contains the phone number.
- `display: none` / `display: block` to close it. Display is not animatable and it destroys
  focus position mid-transition.
- `width: 0`, `max-height`, or any size property. They reflow the links inside.
- A React state boolean as the *only* record of open-ness. The attribute is the source of
  truth because CSS, the close-on-route-change effect and the Playwright gate all read it.
- Any scroll-locking library. `overflow: hidden` plus a compensating `padding-right` for the
  scrollbar width is the whole requirement.

## Ratio and why

| | value | why |
|---|---|---|
| open | **260ms** | The panel travels the full viewport width. Below ~200ms a full-width slide reads as a cut and the eye loses where the panel came from; above ~320ms it feels like it is loading. |
| close | **200ms** | Asymmetric on purpose: the user has already decided. Slower closes feel like the UI is arguing. |
| overlay | **200ms linear** | Opacity has no spatial meaning, so easing it adds nothing. Matching the close duration keeps the two from separating on the way out. |
| easing | `cubic-bezier(.2,.7,.3,1)` | Fast start, long settle. A drawer that decelerates into place reads as physical; `ease-in-out` reads as mechanical over this distance. |

## Failure mode

**Focus escapes to the page behind the drawer.** The links under the overlay are still in
the tab order unless something removes them, so a keyboard or screen-reader user tabs out of
a visually-open drawer into content they cannot see. This is the single most common drawer
defect and it is invisible to a pixel diff.

Second: **the drawer survives a route change.** Next.js client navigation does not unmount
the layout, so a drawer opened, then navigated from, stays open over the new page with the
scroll lock still applied. The page then appears frozen.

Third: **scroll position jumps on close** if the lock is implemented by setting
`position: fixed` on `body` without restoring `scrollY`.

## Trigger

| event | result |
|---|---|
| click / Enter / Space on the toggle | toggles `data-open` |
| `Escape` anywhere while open | closes, focus returns to the toggle |
| click on the overlay | closes |
| **client-side route change** | **closes unconditionally.** `useEffect` keyed on `usePathname()`, which fires on every App Router navigation including a same-path anchor jump. Not optional — see failure mode 2. |
| viewport crosses to >= 768 | closes and releases the scroll lock, so a rotate-to-landscape does not leave a hidden locked body |

## Accessibility

- Toggle is a real `<button type="button">` with `aria-expanded` mirroring `data-open`, and
  `aria-controls` pointing at the drawer's `id`. Label is text, not an icon alone:
  `aria-label="Open menu"` / `"Close menu"`, swapped with state.
- The drawer is `role="dialog"` `aria-modal="true"` with `aria-label="Site menu"`.
- **Focus is trapped while open.** On open, focus moves to the first focusable element
  inside; `Tab` from the last wraps to the first, `Shift+Tab` from the first wraps to the
  last. On close, focus returns to the toggle — never to `<body>`.
- The rest of the page gets `inert` while the drawer is open. `inert` removes it from the
  tab order and the accessibility tree in one attribute; `aria-hidden` alone does not stop
  tabbing and is the reason the failure mode above is so common.
- `prefers-reduced-motion: reduce` — transition duration drops to `0ms` on both the panel
  and the overlay. The drawer still opens and closes; it just does not travel.
- The `tel:` link inside the drawer inherits the A-14 `min-height: 44px` rule.
- Every drawer link is at least 44x44 CSS px, checked by `rendertruth.mjs` at 390.
