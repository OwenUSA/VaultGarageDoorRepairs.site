# 08 — Scroll reveal

## The finding, stated plainly: there is nothing to clone

`docs/profile.md` §4 probed every page at every breakpoint:

```
gsap:false  ScrollTrigger:false  lenis:false  locomotive:false  aos:false
wow:false   swiper:false         slick:false
aosAttrs:3  parallaxAttrs:0      cssAnimatedEls:4  willChangeTransform:0
inlineOnScroll:false
```

**No motion library initialises anywhere on this reference.** The complete set of
scroll-driven behaviour on the site, read out of the theme's own unminified `script.js`
(`docs/04-behavior-profile.md`), is two handlers:

1. a boolean class toggle on the header at `scrollTop >= 50` — that is spec 02, not this one;
2. a number counter animating 0 -> `data-value` over 4000ms when `.feature` enters view —
   **forbidden**. It counts jobs completed and years in business, which are D-14 invented
   credentials. The numbers are deleted and the behaviour goes with them.

There is no parallax, no pinning, no stagger, no easing curve, no split text. Three
`data-aos="fade-up"` attributes exist in the markup; **the AOS library that would read them
is not present on any page**, so nothing has ever animated from them. They are dead
attributes in a theme, not evidence of a reveal.

## `framer-motion` is NOT justified

The dependency allowlist admits `framer-motion` "only if Prompt 1's profile finds real
choreography — the profile must say so explicitly." The profile says the opposite,
explicitly. **Do not install it.** Neither Lenis nor Locomotive nor GSAP nor AOS may be
installed either; the first two are banned outright and the last two have nothing to do.

## The no-motion baseline

This is the specification. It is short because the correct behaviour is nearly nothing.

**Mechanism:** content is rendered in its final position and its final opacity. There is no
entrance state, no `opacity: 0` initial, no `translateY(20px)` initial, and no observer
watching sections.

```css
/* There is no .reveal class, and no [data-reveal] attribute. Sections render as-is. */
```

The existing `components/ui/Reveal.tsx` from the pre-existing lineage is a **no-op wrapper
and must stay one** — or be deleted by the lead in the shell pass. It must not be given an
`IntersectionObserver`, and no section builder may add one (A-6: no section agent introduces
behaviour that is not in the shell).

**Do NOT use:**

- `opacity: 0` as an initial state anywhere. If the reveal never fires — observer error,
  script error, an old browser, a printed page, a bot — the content is permanently invisible.
  This is the single worst failure mode available on a page whose purpose is a phone number,
  and it is why a reveal that has not been asked for is a liability rather than polish.
- `IntersectionObserver` for appearance. It is the right tool for the map (spec 07), where
  the payoff is a deferred third-party request. There is no payoff here.
- `content-visibility: auto` on sections as a substitute. It changes scrollbar behaviour and
  in-page anchor accuracy, and `/services` is eight anchors.
- Any scroll-linked animation, `animation-timeline`, or `scroll()`-driven effect. Nothing in
  the reference has one.

## Ratio and why

Not applicable — there is no duration to specify, and that is the finding rather than an
omission. The one number worth recording is the one that is deliberately absent: the
reference's only timed scroll behaviour was **4000ms**, on the forbidden counter.

## Failure mode

**A reveal gets added anyway.** It is the most-added un-asked-for behaviour in this kind of
build, it arrives one section at a time during the build wave, and each instance looks
harmless. The counters are:

1. this document, which the build wave reads before it starts;
2. `Reveal.tsx` staying a pass-through, so there is no primitive to reach for;
3. the token conformance check — a `transition` or `animation` value that resolves to no
   Prompt 5 token is a violation on a NOVEL section and shows up as a number.

**A section is invisible in a screenshot** because a reveal never fired under the capture
harness. `capture.mjs` runs with `motion: 'reduce'` and freezes animations, so an
opacity-0-until-observed section can screenshot blank and be diffed as a 100% divergence
against a reference band that has content. The no-motion baseline makes this impossible by
construction.

## Trigger

Nothing. No scroll listener, no observer, no timer, no hydration-dependent appearance.

**Client-side route change:** because nothing has an entrance state, a route change renders
the new page complete. There is no first-paint flash, no re-trigger, and no observer to
re-register. This is the practical argument for the baseline: it is the only reveal
implementation that cannot break on navigation, because there is nothing to break.

## Accessibility

- `prefers-reduced-motion: reduce` is honoured **trivially and completely**: there is no
  motion to reduce. That is the strongest possible form of compliance with D-19 on this
  point, not an evasion of it.
- No content depends on script execution to become visible, so the page is complete for a
  screen reader, a text browser, a printer and a crawler at first paint.
- Nothing enters or leaves the accessibility tree on scroll, so nothing is announced twice
  and no live region is needed.
- Focus is never moved by scrolling.

## Recorded in `docs/known-divergence.md`

The reference's counter band (`s12`, `feature`) animates and ours does not. That difference
is **intentional and permanent** — the animation exists only to count invented facts — and
it is logged as a floor rather than as a divergence to close.
