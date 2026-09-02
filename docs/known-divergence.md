# docs/known-divergence.md — permanent floors

Check this file before starting any fix. Nothing listed here is a divergence to close, and
no iteration may be spent on one. Opened at Prompt 1.

---

## 1. Colour is excluded from every measurement, permanently (A-8)

The palette is randomized at token-write time in Prompt 5, so **colour divergence from the
reference is intentional and is permanently excluded from every diff, every threshold and
every future iteration.**

Stripped from the structural comparator: resolved colour, background-colour, border-colour,
gradient stops, shadow colour. Kept: every geometric and typographic field, and the
non-colour parts of borders and shadows — widths, offsets, blur, spread, radii.

Consequence recorded once: no section on this site may be failed, or iterated on, for a
colour delta.

## 2. No font substitution floor is booked on this site

Both real text faces on the reference — **Roboto Condensed** (display) and **Rubik**
(paragraph) — are OFL 1.1, are served from Google Fonts, and both actually load
(HTTP 200 on their woff2). `next/font/google` reproduces them exactly, so D-11's
substitution clause does not fire.

Eleven further families are declared in the reference CSS with no file ever loaded —
Material Symbols Outlined, Roboto, Roboto Flex, Rajdhani, Racing Sans One, Heebo, Lato,
`slick`, `gform-icons-theme`, `gform-icons-common`. **They are phantoms.** A face with rules
but no loaded file must never book a substitution floor: doing so permanently excuses text
that should converge. Full table in `docs/profile.md` section 7.

**A heading that misses its metric target on this site has a real bug, not an excuse.**

## 3. The reference's carousel and tabbed bands render UNROLLED — heights are not a target

NitroPack defers every script on the reference into combined bundles, and those bundles do
not execute when the saved copy renders. Probed at all four widths, on all five pages:
`gsap:false ScrollTrigger:false lenis:false locomotive:false aos:false wow:false
swiper:false slick:false`.

So bands whose layout depends on a JS runtime render with every slide or panel stacked
vertically. Measured heights at 1440:

| route | band | ref h@1440 | why it is inflated |
|---|---|---|---|
| `/` | `s01-award-winning-tulsa-roofing-compan` (hero-new) | 5324 | slide rail unrolled |
| `/` | `s02-partnering-with-tulsa-s-best` (logos) | 1438 | logo carousel unrolled — DELETED anyway |
| `/` | `s08-premium-roofing-materials` (slatedroof-new) | 2318 | slick carousel unrolled |
| `/` | `s09-our-expertise-in-roofing-materials` (roofing-materials) | 7740 | slick carousel unrolled |
| `/` | `s06-our-roofing-services-in-tulsa-ok` (roofing-service) | 539 | both tab panels shown |
| `/` | `s11-best-exterior-services` (services) | 3189 | card set unrolled |
| `/` | `s16-we-love-hearing-from-our-customers` (testimonial) | 796 | unrolled — DELETED anyway |
| `/` | `s17-contact-form` (contact-new) | 4518 | unrolled |

**`box.h` on these bands is a known floor.** Measure them on the fields that are not
runtime-dependent — width, inner column geometry, type scale, weights, letter-spacing,
line-height, spacing rhythm, radii — and record `box.h` as blocked rather than iterating.
This is also why the reference home page is *taller* at 1440 (32213) than at 390 (30856),
which is the opposite of every other site in this programme.

Lazy images additionally resolve to a 1x1 GIF placeholder, so reference image slots
contribute no height.

## 4. Placeholder assets

Every photographic slot on this site is a `<Placeholder>` and stays one until the Prompt
10 image prompts are run through Nano Banana Pro and the files are handed back
(OVERRIDE 3). Placeholder-blocked sections are reported as known floors, not failures, with
the placeholder area excluded from the measurement.

The logo is a wordmark rendered in the display face, not an image, until the same drop-in.

**Prompt 2 numbers.** 93 slots inventoried across the five reference pages: **69 REPLACE**
(built, placeholder generated), **24 DELETED** (inventoried, deliberately not built), **0
files downloaded from the reference**. 127 placeholder SVGs in `public/placeholders/`; the
file name is the slot ID. Full table and per-slot geometry in `assets/INVENTORY.md`.

### 4a. Dominant colour is UNMEASURABLE on 40 of the 69 REPLACE slots

The Prompt 1 reference section screenshots were captured **before** the NitroPack lazy
image sources were forced, so on any slot whose image had not painted, the "dominant
colour" sample is the empty band rather than the photo. 40 REPLACE slots sampled at
luminance > 0.82, most at `#fefefe`, `#ffffff` or `#fefbf1`.

A near-white placeholder mounted into a band makes that band's **painted** contrast
unmeasurable: `rendertruth.mjs` samples near-white text on a near-white fill and cannot
separate a missing asset from a real A-13 contrast defect. A sibling site hit this and left
such placeholders unmounted; the same call is made here, explicitly:

- the honestly sampled hex is kept in `assets/INVENTORY.md` and `.harness/inventory.json`;
- the placeholder **file** is repainted to one mountable mid-neutral, `#5c6169`, with the
  sampled hex printed on the tile;
- each affected row carries `colourUnmeasurable: true` in `.harness/inventory.json`;
- **Prompt 10 must not name a hue for these 40 slots.** Their generator prompts take their
  palette from the Prompt 5 tokens for the band they sit in.

This is a floor on the *sample*, not on the slot. It is not re-derivable without re-running
the full Prompt 1 capture with lazy sources forced, which is not worth a breakpoint sweep.

### 4b. Two REPLACE slots carry a JS-unrolled height

`hero-bg` measures 1440x2982 and `contact-band-bg` 1440x4518 at the canonical width,
because the carousels inside those bands never initialise on the saved copy (section 3
above). Their **widths and aspect ratios are honest; those two heights are not a target.**

## 5. The reference form has an email field. Ours cannot.

`#gform_wrapper_6` / `#gform_wrapper_1` carry six visible controls including
`<input type="email">`. D-03 bans it absolutely and D-05 fixes our five fields as name,
phone, service needed, preferred callback window, message. The control count, the field
order and the resulting band height therefore differ from the reference by construction.
Never closed.

## 6. Rows deleted by the decision register

Six contract rows are DELETED and are never measured: two partnership/brand logo strips on
`/` and one on `/services` (D-14, invented credentials), the testimonial band on `/`,
`/about` and `/services` (D-13, reviews), and the third-party accessibility widget that
segmentation picks up on `/privacy`. See `docs/sections.md`.

The reference's own service-area city grid lives in its footer band and is deleted by D-02;
one `SERVICE_AREA` sentence survives.

## 7. Palette seeds — GENERATED, Prompt 5+9

Reproduce any of it exactly:

```bash
node ../_shared/harness/src/palette.mjs                  # regenerate, gate, auto-select
node ../_shared/harness/src/palette.mjs --seed 9611      # the winner on its own
node ../_shared/harness/src/palette.mjs --seed 9611 --emit
```

**masterSeed 3126 · winning seed 9611 · complementary (+180 deg) · primary hue 184 ·
accent hue 4 · neutral tint 0.036 · CTA contrast 6.96:1.**

All five candidates were generated and gated programmatically, **0 of 5 rejected**, and the
selection rule is untouched: highest CTA contrast against its own fill, ties to the lowest
seed.

| seed | scheme | primary hue | accent hue | neutral C | CTA contrast | CTA chroma (OKLCH) | |
|---|---|---:|---:|---:|---:|---:|---|
| 772491 | analogous | 223 | 253 | 0.058 | 6.49 | 0.1337 | |
| 207130 | split-complementary | 342 | 132 | 0.038 | 6.17 | 0.1339 | |
| 377747 | split-complementary | 354 | 144 | 0.032 | 6.08 | 0.1341 | |
| **9611** | **complementary** | **184** | **4** | **0.036** | **6.96** | **0.1326** | **WINNER** |
| 529870 | split-complementary | 254 | 44 | 0.045 | 6.84 | 0.1333 | |

### 7.1 The seed was STEERED. The selection rule was not.

Hues already taken across this programme: Atlas 332 plum, Ridge 270 violet-slate, Axel 252
navy, Titan 217 teal, Forge ~150 green, 46 amber. **22 master seeds were tried** before a
winner whose primary AND accent hues both cleared ~30 degrees of every one of them. Nearest
neighbours on the winner: **33 degrees** (primary 184 against Titan's 217) and **32 degrees**
(accent 4 against Atlas's 332) — and the roles differ as well as the angles, Atlas being
plum-DOMINANT where ours is a teal band with a crimson call CTA.

A stricter search at >=40 degrees does terminate — masterSeed 5378, seed 49048, primary hue
109, accent 79 — but 2274 master seeds in, and the >=40 window left on this fleet is only
hue 82-114 wide: an olive band with an analogous bronze CTA 30 degrees from it, a weaker
hierarchy than a complementary pair. Recorded, not taken. **The spread really is running out
of room; the next site should expect to move its master seed further than this one did.**

### 7.2 The applied ramp, verified equal to the generated one

| slot | applied hex | generated OKLCH | role |
|---|---|---|---|
| primary | `#023530` | `oklch(29.63% 0.0510 184.60)` | dark band |
| primary-deep | `#012824` | `oklch(24.93% 0.0431 184.70)` | deeper band |
| accent | `#983756` | `oklch(48.26% 0.1326 3.71)` | **the call CTA fill** |
| accent-deep | `#771e3d` | `oklch(38.92% 0.1248 4.01)` | CTA hover / pressed |
| neutral-0 | `#ffffff` | `oklch(100.00% 0.0000 89.88)` | page |
| neutral-200 | `#e0fffa` | `oklch(97.64% 0.0327 184.93)` | tinted surface |
| neutral-400 | `#cbece7` | `oklch(91.79% 0.0351 185.49)` | hairline border |
| neutral-600 | `#1c3935` | `oklch(32.04% 0.0359 184.20)` | ink-muted, strong edge |
| neutral-900 | `#000d0a` | `oklch(14.25% 0.0258 180.19)` | ink |
| focus | `#60082c` | `oklch(32.10% 0.1205 3.92)` | focus ring |
| error / success / warning | `#b3261e` / `#1b7f4b` / `#8a5200` | EXEMPT from the rotation | semantic |

All 13 slots were re-generated from seed 9611 and compared against `app/tokens.css`:
**13 MATCH, 0 mismatches.**

`app/tokens.css` declares these as literal hex rather than `oklch()`, and that is not
cosmetic. `diff.mjs` builds the token-conformance set by reading the `--color-*`, `--text-*`,
`--font-weight-*` and `--spacing-*` declarations out of `@theme` and normalising them to the
`rgb()` form the browser reports. A token declared as `var(--something)` normalises to the
literal string `"var(--something)"` and can never match a computed value. Before the flip,
`header` reported 4 token violations and `footer` 5 on every route — every one of them the
instrument failing to resolve an alias, none of them a real hard-coded value. **After the
flip: 0 and 0.** `TOKEN_THRESHOLD = 0` is unreachable for NOVEL sections unless the theme
block holds literals, so the build wave now inherits a check that measures something.
`@theme static` is required alongside it: Tailwind v4 tree-shakes theme variables no utility
references, and the `:root` primitives now alias UP to them.

### 7.3 The CTA slot does NOT take the reference's CTA colour, and why

The reference CTA fill is `#fecc32`, a light amber at OKLCH L 0.87. The rotation holds L
exactly, so a CTA at that L measures **1.51:1 against a white page at every hue** and the
hard constraint "the CTA fill separates from the page (>=3:1)" is unsatisfiable for every
candidate — verified: **800 of 800 rolls rejected** before the slot was reassigned. The
reference gets away with it by placing its amber almost exclusively on its own dark navy
band; our gate scores the CTA on the page surface, which is where a customer meets it.

So the CTA slot takes the reference's most chromatic INTERACTIVE value — `#3d58a9`, its
measured accent-hover, 34 uses — and the label goes white. The L/C STRUCTURE of the ramp is
still held exactly; what moved is which measured value fills which slot, and it moved once,
before any component was written. **Intentional and permanent. Not a colour divergence to
close** — and section 1 excludes colour from every measurement regardless.

### 7.4 The focus ring is TWO layers, and the pair model says so

Gating a single focus token against the CTA fill directly is unsatisfiable at every hue —
both are mid-dark by construction — and it rejected 800 of 800 rolls until it was modelled
correctly. The construction that works, and that `globals.css` paints: a **page-coloured
halo** (`box-shadow`) immediately outside the element, then the **dark ring** (`outline` at a
matching offset) outside the halo. `pairsInUse` therefore gates `focus-ring-on-page`
(13.39:1), `focus-halo-on-cta` (6.96:1), `focus-halo-on-band` (13.51:1) and
`focus-halo-on-deep` (15.79:1) — never ring-against-fill, a pair that never touches in the
rendered page.

### 7.5 sRGB chroma ordering — MEASURED, and the rule it forces on the build wave

`rendertruth.mjs` scores CTA salience as **chroma dominance in sRGB terms**, `(max-min)/255`
on an element's painted fill — not as painted contrast. Measured on the applied palette:

| token | hex | sRGB chroma |
|---|---|---:|
| **accent (call CTA)** | `#983756` | **0.3804** |
| accent-deep (hover only, never at rest) | `#771e3d` | 0.3490 |
| primary | `#023530` | 0.2000 |
| primary-deep | `#012824` | 0.1529 |
| neutral-400 | `#cbece7` | 0.1294 |
| neutral-200 | `#e0fffa` | 0.1216 |
| neutral-600 | `#1c3935` | 0.1137 |
| neutral-900 | `#000d0a` | 0.0510 |

**The call CTA is the loudest paintable action by 0.18, against the 0.02 the gate needs.**
The ordering is the right way round here. Volta's was not — its primary out-saturated its own
accent and a primary-filled button failed `cta-primacy` on all five routes — so the margin is
a property of this palette, not a licence.

**THE RULE, written into the shell so the wave inherits it instead of rediscovering it:**

> **EXACTLY ONE FILLED CHROMATIC ACTION PER PAGE — the call CTA.**
> Every other action is filled NEUTRAL: `solid` (neutral-900) on light bands, `solid-band`
> (neutral-200) on dark ones. There is no primary-filled button variant and
> `components/ui/Button.tsx` no longer offers one. `Actions()` in `Sections.tsx` chooses the
> variant from `href.startsWith('tel:')` — by WHAT THE ACTION IS, never by its position in
> the list — so a section cannot opt out of the rule by reordering its buttons.

### 7.6 AA on the pairs actually in use — 25 of 25 PASS

Gated by `palette.mjs` against `harness.config.mjs` `pairsInUse`, which describes what the
shell RENDERS rather than the ramp in theory. The hero band is declared as ONE gradient pair
and scored on its worst sample, never as two flat rows — a flat model of a ramp is how Atlas
shipped an invisible CTA that "passed AA".

| pair | fg | bg | ratio | min |
|---|---|---|---:|---:|
| ink-on-page | `#000d0a` | `#ffffff` | 19.77 | 4.5 |
| ink-muted-on-page | `#1c3935` | `#ffffff` | 12.46 | 4.5 |
| ink-on-surface | `#000d0a` | `#e0fffa` | 18.70 | 4.5 |
| ink-muted-on-surface | `#1c3935` | `#e0fffa` | 11.78 | 4.5 |
| on-band | `#ffffff` | `#023530` | 13.51 | 4.5 |
| on-band-muted | `#e0fffa` | `#023530` | 12.77 | 4.5 |
| on-band-deep | `#ffffff` | `#012824` | 15.79 | 4.5 |
| on-band-deep-muted | `#e0fffa` | `#012824` | 14.92 | 4.5 |
| hero-overlay-text (gradient, worst sample) | `#ffffff` | primary -> primary-deep | 13.51 | 4.5 |
| **cta-label** | `#ffffff` | `#983756` | **6.96** | 4.5 |
| cta-hover-label | `#ffffff` | `#771e3d` | 10.31 | 4.5 |
| solid-label | `#ffffff` | `#000d0a` | 19.77 | 4.5 |
| solid-band-label | `#000d0a` | `#e0fffa` | 18.70 | 4.5 |
| link-on-page | `#983756` | `#ffffff` | 6.96 | 4.5 |
| link-hover-on-page | `#771e3d` | `#ffffff` | 10.31 | 4.5 |
| link-on-surface | `#983756` | `#e0fffa` | 6.58 | 4.5 |
| input-border-on-page | `#1c3935` | `#ffffff` | 12.46 | 3 |
| input-border-on-surface | `#1c3935` | `#e0fffa` | 11.78 | 3 |
| focus-ring-on-page | `#60082c` | `#ffffff` | 13.39 | 3 |
| focus-halo-on-cta | `#ffffff` | `#983756` | 6.96 | 3 |
| focus-halo-on-band | `#ffffff` | `#023530` | 13.51 | 3 |
| focus-halo-on-deep | `#ffffff` | `#012824` | 15.79 | 3 |
| error-on-page | `#b3261e` | `#ffffff` | 6.54 | 4.5 |
| success-on-page | `#1b7f4b` | `#ffffff` | 5.02 | 4.5 |
| warning-on-page | `#8a5200` | `#ffffff` | 6.39 | 4.5 |

Independently confirmed in the BUILT page, not the stylesheet: `contrast.mjs` scored 420
elements across five routes and three breakpoints at **0 FAIL, 0 UNMEASURABLE**, and the
painted values match the declared ones exactly — the call CTA measures 6.96:1 painted, nav on
band 13.51:1, footer copy on band-deep 14.92:1. A sibling's dark-surface CSS keyed on a class
while its markup used a data attribute and shipped a 1.16:1 CTA on all five routes; this one
was checked against the rendered page for that reason.

## 8. Not a floor — recorded so nobody books it as one

- **The reference header does not change on scroll.** Measured: `position: sticky`,
  h 170 -> 170, background, shadow and transform all unchanged between `headerAtTop` and
  `headerScrolled`. Our shell currently adds a shadow on scroll. That is a divergence we
  introduced and it is closable, not a floor.
- **`section.inlinks-section.bleed-content`** exists in the `/services` markup but never
  segments — it is below `minBandHeight` at all four widths. It is absent from the contract
  because it is not a band, not because it is blocked.


---

## 9. Prompt 3 and Prompt 4 additions

### 9.1 Two length exemptions, both shared-shell, both register-driven

`harness.config.mjs` `lengthExempt` carries exactly two entries, applied to header and
footer on all five routes. They are reported **EXEMPT, never PASS**:

| row | ref chars | ours | register |
|---|---|---|---|
| `*::header` | 2,177 | 55 | D-01 + D-02 — a 166-item mega menu over 158 list items, covering routes D-01 forbids and a `/locations` city tree D-02 deletes |
| `*::footer` | 781 | 169 | D-02 — 744 of those chars are the service-area city grid, 30 paragraphs of place names; one `SERVICE_AREA` sentence is its only survivor |

Both rows are still measured **structurally** against `STRUCT_THRESHOLD`. Four further rows
where an exemption was available were refused and rewritten instead; the list is in
`docs/content-divergence.md` section 4.

### 9.2 The counter animation is deleted along with its numbers

The reference's only content-bearing scroll behaviour animates `.count` from 0 to
`data-value` over 4000ms on the `feature` band. Those values are jobs completed and years in
business — D-14 invented credentials — so the numbers are gone and the animation with them.
Our `facts` row carries hours, service area and phone instead. **Intentional and permanent;
never book it as a motion divergence.** See `docs/behavior/08-scroll-reveal.md`.

### 9.3 No scroll reveal exists on either side

The profile found no motion library initialising anywhere on the reference
(`gsap/ScrollTrigger/lenis/locomotive/aos/wow/swiper/slick` all false). `framer-motion` is
**not justified** and must not be installed. Ours has no entrance animation either, so this
is a match rather than a floor — recorded here only so nobody adds one and calls it fidelity.

---

## 10. Prompt 6+7 — floors booked by the build wave

Measured after the wave: **177 rows · 55 FAIL · 62 PASS · 26 BLOCKED**, against 119 rows /
12 FAIL when the five routes were stubs. Every NOVEL row (10) is at **0 token violations**.
`ITERATION_CAP = 1` was spent once, on the pass described in 10.2.

### 10.1 The three structural fields that carry almost every residual

These are floors. They are BLOCKING fields (A-12 keeps `innerCount` / `innerRows` /
`innerCols` / `position` advisory, and those are not counted here), but each of them is a
consequence of building clean semantic markup against a hand-built WordPress theme, and
none is closable without imitating that theme's wrapper tree — which `process.md` and A-12
both forbid.

| field | FAIL rows | mean deviation | why it is floored |
|---|---|---|---|
| `box.h` | 46 | 44.8% | Section height. Our copy is written to the reference's *character count* (Prompt 3, +/-10%), not to its rendered height, and the reference's heaviest bands are JS-unrolled carousels and repeated cards whose runtime never initialises on the saved copy — see section 3 above. Chasing height means padding sections with air or cutting copy to fit, and Prompt 3 forbids rewriting copy to close a metric. |
| `display` | 31 | 100% | The reference band wrapper is a mix of `block` and `flex` (row). Ours is uniformly `block`. **Measured both ways** — see 10.2. |
| `buttons` / `cards` | 27 / 14 | 87.5% / 100% | Element *counts* inside the band. `buttons` diverges because our bands carry the call CTA the decision register requires and the reference band often carried none; `cards` diverges because our grid items are `Card` components where the theme used bare divs. Both are content and component-vocabulary decisions, not geometry. |

### 10.2 The one fix attempt, and what it bought

Spent as a single pass over the shared section shell, since every residual was shared:

1. **Per-band vertical padding, read individually from the reference appearance capture.**
   The default rhythm was correct on most bands and wrong on seven: the home hero (ref
   75/75 @1440 and 50/50 below, not 120/75), the marquee (10/10, not 20/30), the breadcrumb
   (20/20, not 50/50), the contact band (0 top on every route, 50 bottom @1440), the home
   `about` band (50 top @1440), `urgent` (0 top) and `emergency` (0 bottom). No blanket
   patch and no new tokens — every value lands on one of Prompt 5's nine spacing steps.
   **Result: `padTop` FAIL rows 17 -> 3, `padBottom` 13 -> 3.**
2. **`display: flex` on the band wrapper — measured, regressed, reverted.** The first
   comparator read showed `display` ref=flex ours=block on 37 rows, which looked like one
   mechanical fix. Applying `flex flex-col` moved the total the wrong way: 61 FAIL -> 64,
   because the reference's flex bands are `flex-ROW` (61 new `flexDir` mismatches) and 24 of
   its bands are genuinely `block`. There is no single value that matches both sets.
   Reverted — reverting your own regression is not a second attempt — and the band stays
   `block`. **Floored: `display`, 31 rows.** Do not re-attempt without per-band reference
   reads, which is exactly the wrapper-tree imitation A-12 rules out.

Net across the pass: **61 FAIL -> 55 FAIL, 53 PASS -> 62 PASS.**

### 10.3 Render-truth: one finding, and it is an instrument artifact

`rendertruth.mjs` finishes at **1 finding**, down from 174:

```
text-legibility  /  1440  sep 0 (need 3)  "Full-view aluminium and glass"
```

That string is the fourth card in the home `doors` **carousel** — a horizontally
scrollable, keyboard- and scroll-reachable `overflow-x: auto` track showing three of five
cards at 1440. The card is not invisible; it is not currently scrolled into view, so its
screenshot is one flat tone. The check cannot distinguish "off-track in a scroller" from
"painted in its own background colour", which is the defect it exists to catch.

**Not fixed, deliberately.** The only ways to clear it are to delete the carousel — which is
the reference's own `slatedroof-new` / `roofing-materials` pattern — or to show all five
cards at once, which is a different band. Booked here rather than closed. Every other
finding in the run was a real defect and every one of them was fixed (10.4).

### 10.4 Real defects the render-truth gates caught, all fixed (A-13, not capped)

These were latent in the frozen shell and could not fire until the routes carried content.
All are the Atlas invisible-CTA failure class: a value that is *declared* correctly and
*paints* wrong.

1. **`text-on-band` is not a token class.** The section patterns painted dark-band text with
   `text-on-band` / `text-on-band-muted`; the tokens are `--color-ink-on-band` /
   `--color-ink-on-band-muted`, so the utilities are `text-ink-on-band` /
   `text-ink-on-band-muted`. The non-existent class did nothing, the text inherited
   `text-ink`, and near-black copy painted on the teal band at **1.46:1** across every dark
   band on all five routes. The shell passed at Prompt 5 only because `SiteHeader` and
   `SiteFooter` happened to spell it correctly and no other band carried text yet.
   **198 contrast FAILs.**
2. **The eyebrow was the CTA accent on dark bands.** `text-cta` (#983756) on `--color-band`
   (#023530) measures **1.94:1**. The eyebrow on a band is now `text-ink-on-band`; the
   accent stays reserved for the one filled chromatic action, which is what it is for.
3. **Form labels painted white on white.** `labelCls` set no colour, so a label inside the
   elevated form card inherited `text-ink-on-band` from the dark `ContactBlock` band it sits
   in: **1:1, 120 rows**. Fixing 1 and 2 is what exposed it — before that the same bug was
   accidentally invisible because the inherited colour was also wrong. `labelCls` now states
   `text-ink` on the element that needs it.
4. **`Reveal` shipped an `opacity: 0` IntersectionObserver, against its own spec.**
   `docs/behavior/08` says in as many words that the reference initialises no motion library
   on any page, that `Reveal` "is a no-op wrapper and must stay one", and that `opacity: 0`
   as an initial state is the single worst failure mode available on a page whose purpose is
   a phone number. The shell shipped the observer anyway. `rendertruth.mjs` measured the
   consequence: **165 text boxes reading "box is effectively one flat tone: no visible
   text"**. `Reveal` is now a plain pass-through and the `.reveal` rules are gone from
   `globals.css`. Do not reintroduce an entrance state.
5. **Nine WCAG 2.5.8 tap-target findings** at 390: the "Get directions" link in
   `BusinessMap` (360x22), both breadcrumb crumbs (40x18), and the two tab controls
   (146x38). Each now carries the minimum on the anchor or button itself, per A-14's rule
   that the element — not its wrapper — is what has to have the height.

`contrast.mjs` finishes **PASS: 0 FAIL**, with 3 `UNMEASURABLE` rows — all three the
carousel's *disabled* arrow button (`disabled:opacity-50`, no text). A disabled icon control
with an empty accessible name is genuinely unmeasurable rather than failing; recorded, not
chased.

### 10.5 Rows the instrument cannot score on this run

- **26 BLOCKED** — `/contact` and `/privacy` at 390 and 768, plus several `/services`
  anchors at 768. The reference side has no capture at those widths for those bands, so
  there is nothing to compare against. Pre-existing instrument state, not a build result.
- **7 UNPAIRED DELETED** rows — the two partnership-logo strips, the three testimonial
  bands and the `/privacy` accessibility widget. Correct: they are deleted by D-13 / D-14 /
  D-15 and reported once as REMOVED, never measured.
- **1 UNPAIRED ADAPTED** row — `/privacy` `s02-a-fricker-roofing-and-waterproofi` does not
  join to our `privacy-body`, whose `data-section` is declared and correct. The
  ref-section-id in `docs/sections.md` looks truncated relative to what the probe emits.
  Contract-side, predates this wave, and worth one look before the acceptance sweep.
