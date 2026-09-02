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

## 7. Palette seeds

Not yet generated. Prompt 5 records the winning seed and all five candidate seeds here.
Primary hues already taken by sibling sites and barred from selection: Atlas 332, Titan 217,
Ridge 270, Axel 252, Forge ~150 — re-roll on anything within ~30 degrees of those.

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
