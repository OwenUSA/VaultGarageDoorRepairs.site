# STEP D — Behavior Profile

Source of truth: the theme's own `assets/js/script.js` (18.7 KB, unminified,
fetched direct from origin) plus the live state capture in
`.harness/out/state.json`. Nothing here is inferred from appearance.

## The harness-critical finding

**NitroPack defers every script until a trusted user-interaction event.**
`page.goto()` + `window.scrollTo()` in a loop does not qualify. Under those
conditions the page loads, jQuery loads, `slick.min.js` loads — and **not one
carousel ever initialises**. Every un-initialised slick track renders its slides
stacked vertically instead of overlaid.

Measured consequence on `/` at 1440:

| | page height | `.slick-initialized` |
|---|---:|---:|
| programmatic scroll only | **31832** | **0** |
| trusted `mouse.move` + `mouse.wheel` | **11800** | **9** |

Individual sections were off by up to **9.3x** (`roofing-materials` measured 7740px,
actual 557px; `hero-new` 5324px, actual 1168px). Height was *stable* across
repeated passes, so nothing about the bad numbers looked wrong — a settle-loop
retry would have confirmed the garbage.

The fix is in `.harness/lib.mjs` `prep()`: real CDP mouse input before anything
else, then wheel-scroll the page, then strip `.nitro-offscreen`. Every number in
this repo is post-fix. This was the single highest-leverage thing the harness did.

## Motion — per template class

| | |
|---|---|
| scroll-linked | **2 handlers, site-wide, all classes** |
| time-driven | 3 autoplay carousels |
| timeline library | **none** — no GSAP, no ScrollTrigger, no Lenis, no Locomotive, no AOS, no Barba |
| text-splitting | **none** — see below |

The complete set of scroll behaviour, quoted from `script.js`:

1. `$(window).scroll` — `scrollTop() >= 50` toggles `header.active`. Measured:
   header height does **not** change (170 -> 170 @1440, 110 -> 110 @1024 and
   below). It is a background/position state change, not a shrink.
2. `$(window).scroll` — when `.feature` enters the viewport, `.count` elements
   animate 0 -> `data-value` over 4000ms, jQuery `swing` easing.
   **This is a job-count / years-in-business counter — CONFIG FORBIDDEN.
   The behaviour is deleted along with the numbers.**

That is all of it. There is no parallax, no pinning, no stagger, no reveal.

**Text-effect check, run not assumed:** `h1, h2 span, [class*=char], [class*=word]`
returns 0 or 1 spans per heading across every exemplar, and every one is a
semantic colour-emphasis span (`<h2>Ensuring a <span class="text-secondary">Smooth
Roofing Experience</span> For You</h2>`). No visually-hidden duplicate text
anywhere. **No split-text library signature. Confirmed absent, not presumed.**

## Content — static or fetched

**Static** for every class. WordPress renders server-side; the page arrives whole.
One exception: `template-ascend`'s "Show 14 More" button (`loadmore.js`) XHRs the
next page of posts. That is the only fetch on the site.

## State — per template class

| state | selector | classes | captured |
|---|---|---|---|
| sticky header | `header.active` at `scrollTop>=50` | all | yes — rest + scrolled, 4 breakpoints |
| mobile drawer | `.open-menu` -> `#mySidenav` `left:-100% -> 0`, body dims to `rgba(0,0,0,.4)` | all | yes — measured `left: -390px -> 0px`, **81 links** |
| service tabs | `.roofing-service .main-tabs .item` -> `.main-content[data-id]` | home | yes — **2 tabs**: Residential, Commercial |
| area-map regions | `.service-areas .map-name` -> swaps `#img-N` + `#link-N` | service-areas, map-sec | yes |
| step tabs | `.nav-icon` -> `#step-N`; `.servicearea-inner-*` `.items-tabs` | service-inner | yes |
| accordion | `faq-two` | faqs | yes |
| carousels | 9 slick instances | home; 4 on inner classes | yes — slide 0/1/2 per instance |
| lightbox | `.popup-gallery` magnificPopup | gallery | not captured — gallery route is out of scope |
| review tabs | `.review-tabs .tab-link` | — | **not captured — FORBIDDEN** |
| form fields | rest / hover / focus | form classes | yes |

**Carousel inventory** (9 on home, from `script.js`):
`hero-new .inner .left` (autoplay, dots) / `marquee__content` (speed 4000,
autoplaySpeed 0, linear, variableWidth — a CSS-marquee substitute) /
`slatedroof-new .inner` / `roofing-materials .items` / `logos .logo-carousel` /
`services` x2 / `contact-new .slider-forone` + `.slider-navone` (asNavFor pair).
`vertical-carousel` + `slider-for` are an `asNavFor` pair that goes vertical
above 1024 and horizontal below.

## Axes that matter for THIS site — and what I skipped

**Captured: layout, density, responsive reflow, and state.**

This site's difficulty is not motion. It is 37 section archetypes, 20 of them on
one page, at five breakpoints, with heavy reflow — `contact-new` goes 677px ->
5168px from 1440 to 390 (7.7x), `logos` 5.1x, `serviceouter-two` 4.0x. Reflow
ratio, not animation, is what will break this clone.

**SKIPPED — requestAnimationFrame scroll sampling.** The prompt is right that
offset-stepping cannot see staggers and easing, and that is exactly why I checked
for them first rather than defaulting to the expensive capture. There are two
scroll handlers on this site: a boolean class toggle and a number counter that is
FORBIDDEN and will not be built. There is no timeline, no stagger and no easing
curve to sample, so rAF sampling would produce a large trace containing one bit
of information (`header.active` true/false) that a direct state capture gets
exactly. Skipped deliberately.

**SKIPPED — per-heading text-effect dumps.** Ran the detection query, got a
negative, so there is nothing to dump. The negative result is recorded above.

**SKIPPED — empty/loading states** for `template-ascend`. Reachable in principle,
but our build has no post archive; the pattern is being repurposed as a static
service grid.

Raw state trace: `.harness/out/state.json`. Drawer screenshot:
`.harness/out/state-drawer-390.png`.
