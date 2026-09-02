# 03 — Mobile sticky call bar

D-04 requires a `tel:` link in a mobile sticky call bar. The reference has no such bar; this
is ours, and it is the single highest-value interactive element on a phone-driven site.

## Mechanism

`position: fixed; bottom: 0; left: 0; right: 0` on a `<div>` containing one `<a href="tel:">`
and one link to `/contact`. Shown below 768 only, by media query — **not** by JavaScript.

```css
.call-bar { position: fixed; inset: auto 0 0 0; z-index: 60;
            padding-bottom: max(var(--space-3), env(safe-area-inset-bottom));
            transform: translateY(0); transition: transform 200ms cubic-bezier(.2,.7,.3,1); }
@media (min-width: 768px) { .call-bar { display: none; } }
body { padding-bottom: var(--call-bar-h); }
@media (min-width: 768px) { body { padding-bottom: 0; } }
```

**Do NOT use:**

- A JS breakpoint check to decide whether to render it. It produces a flash of the bar on
  desktop during hydration and it puts a resize listener on the page for something CSS
  already knows.
- `position: sticky`. The bar must sit over content that scrolls past it, not stick to the
  end of a container.
- Hiding it on scroll-down and revealing on scroll-up. Tempting, common, and wrong here: the
  entire purpose of the bar is that the phone number is reachable without thinking, and a
  bar that hides is a bar the user has to hunt for at exactly the moment they gave up
  reading. It never auto-hides.
- Omitting `env(safe-area-inset-bottom)`. On an iPhone with a home indicator the tap target
  ends up under the system gesture area, where roughly the bottom 20px of a 56px bar is
  unreachable.
- Forgetting the `body` padding. Without it the bar covers the last section on every page,
  which on `/contact` is the map and on `/` is the footer.

## Ratio and why

| | value | why |
|---|---|---|
| height | **56px** content box, 44px minimum on the `tel:` anchor itself | 44px is the WCAG 2.5.8 floor (A-14); 56 gives the label room without eating the viewport. |
| hide on drawer open | **200ms** `translateY(100%)` | The only motion this component has. When the nav drawer is open the bar would sit on top of the drawer's own call CTA; it leaves rather than stacking. 200ms matches the drawer's close so the two do not separate. |
| z-index | **60**, above the header's 50, below the drawer's 70 | Ordering is fixed here so no section can invent its own stacking. |

## Failure mode

**It covers the submit button on `/contact`.** The form's last field and its submit control
sit at the bottom of the page on a phone; without the `body` padding compensation the bar
lands on the button and the form becomes unusable. This is the defect that makes the bar a
net negative, and it is invisible above 768.

**The tap target is smaller than it looks.** A styled `<div>` with an `<a>` inside sized to
its text gives a 20px-tall link inside a 56px bar. The anchor is the flex item and carries
the height, not the wrapper.

**Two call CTAs visible at once.** With the drawer open, both the drawer's call button and
the bar are on screen, and a screen reader announces the phone number twice in a row. The
bar translating out solves both.

## Trigger

| event | result |
|---|---|
| viewport < 768 | rendered and visible. No JS. |
| nav drawer opens | `translateY(100%)`, and the bar becomes `inert` along with the rest of the page |
| nav drawer closes | returns |
| **client-side route change** | nothing. The bar lives in `layout.tsx` and does not remount, which is deliberate: it must not flicker between routes. Its `href` never changes. |
| `/contact` route | still rendered. It is redundant with the form but not with the *phone*, and a user who has decided to call should not have to scroll back up. |

## Accessibility

- The bar is `role="complementary"` `aria-label="Call Vault Garage Door Repairs"`, placed at
  the **end** of the DOM so it does not intercept the reading order of the page, and pulled
  into position by CSS only.
- The `tel:` anchor's accessible name includes the number as spoken digits, not just the
  word "Call": `Call (918) 555-0117`. A screen-reader user needs the number itself.
- Minimum 44x44 on every interactive element, enforced globally by A-14 and verified by
  `rendertruth.mjs` at the 390 breakpoint.
- The bar's `tel:` button is subject to the A-13 CTA salience rule, which is **chroma
  dominance**, not painted contrast: no other action on the page may be more saturated than
  the call CTA. `rendertruth.mjs` fails the build if one is. Its *legibility* is a separate
  check — the label against its own fill — and that is the one that catches the Atlas
  defect where a CTA was painted in exactly its own background colour.
- `prefers-reduced-motion: reduce` — the hide/show transform drops to `0ms`; the bar still
  gets out of the drawer's way, instantly.
- Focus order: because it is last in the DOM, `Tab` reaches it after the footer. That is
  correct for a persistent utility; it is also why the skip link and the header CTA exist.
