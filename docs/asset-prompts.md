# docs/asset-prompts.md — Prompt 10, TEXT ONLY

**OVERRIDE 2 governs this file.** It contains image-generation prompts and nothing else.
No image was generated, sourced, downloaded or referenced from any URL while writing it,
and nothing in `public/` changed. The operator runs these through **Nano Banana Pro** and
hands the files back; drop-in is the terminal step (OVERRIDE 3), after which every affected
section is re-diffed.

Target generator: **Nano Banana Pro**. Output size is stated **as plain text pixel
dimensions inside the prompt body** for every slot. Do **not** substitute an aspect-ratio
flag — the slots below are measured boxes, not ratios, and three of the four hero bands
change ratio by more than a factor of four between the smallest and largest breakpoint.

---

## 1. The applied palette — seed 9611, read from `app/tokens.css`

Every hex below is copied from the token file, not remembered. `scripts/palette.mjs
--seed 9611 --emit` reprints them with the OKLCH each was derived from.

| token | hex | role in an image brief |
|---|---|---|
| `--color-primary` | `#023530` | deep teal. The dark band colour. Named in prompts as the *incidental* accent hue. |
| `--color-primary-deep` | `#012824` | darker teal, band-deep. The tone a type-over-image region must sit against. |
| `--color-accent` / `--color-cta` | `#983756` | crimson. **The call CTA and nothing else.** Never a photographic subject colour. |
| `--color-accent-deep` | `#771e3d` | crimson hover. Never in an image. |
| `--color-neutral-0` | `#ffffff` | page ground |
| `--color-neutral-200` | `#e0fffa` | surface, faint teal-tinted white |
| `--color-neutral-400` | `#cbece7` | border, pale teal |
| `--color-neutral-600` | `#1c3935` | muted ink, teal-tinted charcoal |
| `--color-neutral-900` | `#000d0a` | ink, near-black with a 184° tint |

Primary hue **184** (teal), accent hue **4** (crimson), complementary scheme, neutral tint
0.036. Winning seed **9611**; candidate seeds are in `docs/known-divergence.md`.

## 2. Constraints that go in EVERY prompt body, not just this preamble

These are written into each entry below verbatim. They are repeated per prompt on purpose:
a preamble does not travel with a copied prompt, and every one of these has a gate behind it.

1. **Chroma ceiling.** `rendertruth.mjs` scores CTA salience as *chroma dominance*: no
   element on a page may be more saturated than the call CTA (`#983756`, measured chroma
   **0.3804**, against primary **0.2000**). A photograph carrying a large saturated area
   would fail `cta-primacy` the moment it is dropped in — after acceptance, when nobody is
   looking. So every prompt asks for a **desaturated, low-chroma image**, and names the
   palette hue only as a **small incidental accent covering a few percent of frame** — a
   strip of tape, a glove cuff, a distant lamp, a painted line on a wall. Never a colour
   grade, never a wash, never a teal-and-orange look, never crimson anywhere.
2. **Type-over-image regions are underexposed.** The four hero slots carry white
   (`#ffffff`) headings and body over the image at every breakpoint, and `contrast.mjs`
   resolves a background image as a real layer and scores the **worst sample along it**. So
   each hero prompt specifies which part of the frame the text sits over and asks for that
   region to be held **dark and flat** — luminance under roughly 20%, no bright highlight,
   no busy detail. That is a legibility requirement, not a style preference.
3. **Nothing that resolves as a fact.** No readable branding, no company name, no license
   or certification marks, no badges, no star rows, no numbers, no vehicle plates, no
   identifiable faces, no rendered text of any kind — including on tools, boxes, van doors
   and workwear. D-14 and D-17 make a plausible-looking credential worse than an empty
   slot. Section 5 lists what was refused outright and why.
4. **Subject matter is ours.** Generic residential and commercial garage doors, torsion
   springs, openers, cables, rollers, track, panels, and a technician at work. The
   reference is a roofing company; nothing on a roof, no shingles, no gutters, no ladders
   against eaves.

## 3. Art direction, and where it comes from

`assets/INVENTORY.md` sampled the dominant colour of each reference slot. Those samples are
the art direction — not the reference's subject matter, which stays on their site (D-09).
Forty of the sixty-nine samples came back effectively white and are recorded there as
UNMEASURABLE; the ones below are the measured ones, and they are consistent: the reference
photographs are **cool, desaturated, overcast**, with the darker bands sitting in
blue-greys. That reads directly onto a 184° teal palette, so the brief is overcast daylight
throughout rather than golden hour.

| our slot | reference sample it inherits | sampled dominant | what it means here |
|---|---|---|---|
| `/` hero | `hero-bg` | `#cdcfd0` | flat cool grey, overcast, no sun |
| `/` about card | `approach-photo` | `#c8cee3` | pale blue-grey interior light |
| `/` community card | `community-photo` | `#fcfcfc` | high-key, near-white ground |
| `/about` hero | `who-photo` | `#415082` | deep blue-grey, dim |
| `/about` who card | `who-photo` | `#415082` | same |
| `/services` hero | `services-hero-bg` | `#4b5a8a` | blue-grey, dusk-adjacent but not warm |
| `/services` detail cards | `service-detail-bg` | `#94835e` | the one warm sample; muted khaki, held muted |
| `/contact` hero | `breadcrumb-bg` | `#35405b` | dark blue-grey, the darkest band sample |

---

## 4. The slots

Fifteen photographic slots. Boxes are the **rendered CSS pixel boxes measured on the built
site** at 390 / 768 / 1440 (`[data-placeholder]`, all five routes, scrolled to full height),
not the reference's boxes — the reference's are in `assets/INVENTORY.md` and are a
different layout. `/privacy` carries no image slot at any breakpoint.

**Deliver at 2× the largest box** so the slot is sharp on a 2-DPR phone; the browser
downscales. Every entry states the 1× boxes and the exact pixel size to generate.

### 4.1 Hero slots — four, each needing a second crop

The four hero bands are the only slots whose aspect actually moves between breakpoints, and
it moves a long way. One image cannot serve both ends: at 390 the box is portrait or square
and at 1440 it is a wide letterbox, so a single wide master centre-cropped to 390 loses
roughly two thirds of its width. Each hero therefore gets **two prompts — a landscape
master and a portrait crop** — and the measured spread is stated so the call can be checked
rather than trusted.

---

#### SLOT `home-hero`
- **route / section** — `/` · `hero`
- **boxes** — 390: **390×747** · 768: **768×539** · 1440: **1440×649**
- **aspect** — 0.52:1 → 1.43:1 → 2.22:1. **Measured spread 4.25×.** Second crop required.
- **object-fit** — `cover`, full-bleed band behind the h1, the lead paragraph, the
  `TODO(fact)` badge chips and both actions
- **applied hues** — incidental accent `#023530`; text region must sit against
  `#012824`-class darkness; `#983756` appears nowhere in the image
- **generate** — landscape master **2880×1298 px**, portrait crop **780×1494 px**

> **Landscape master — generate at exactly 2880 × 1298 pixels.**
> A photograph of a residential double garage door on an ordinary suburban house,
> photographed square-on from the driveway in flat overcast daylight. Steel sectional door
> with plain long panels, mid-grey, slightly weathered. A technician in unmarked dark work
> clothing stands at the left-hand vertical track with a hand on it, seen from behind and
> three-quarters — **no face visible, no name, no logo, no readable text anywhere in the
> frame, including on clothing, tools and the door itself**. Overall look is
> **desaturated and low in chroma**: cool neutral greys around `#cdcfd0`, muted throughout,
> **no colour grade of any kind** and no teal-and-orange treatment. Introduce the palette
> hue **`#023530` (deep teal)** only as a **small incidental accent covering no more than
> about three percent of the frame** — a strip of teal tape on a toolbox lid at the lower
> right, nothing more. **No crimson or red anywhere in the image.** The **left third of the
> frame must be held dark and flat, under about twenty percent luminance**, with no bright
> highlight and no busy detail, because white headline and body text is set over it. Deep
> depth of field, no bokeh, no lens flare, no vignette, no watermark, no border.

> **Portrait crop — generate at exactly 780 × 1494 pixels.**
> The same scene, recomposed vertically rather than cropped: the garage door fills the
> upper two thirds of the tall frame and the technician stands at the left track in the
> lower third, still seen from behind with **no face, no branding and no readable text**.
> Flat overcast daylight, **desaturated and low in chroma**, cool neutral greys around
> `#cdcfd0`, **no colour grade**. Palette hue **`#023530` (deep teal)** as a **small
> incidental accent of a few percent of frame only** — the same teal tape on a toolbox.
> **No crimson or red anywhere.** The **upper half must stay dark and flat, under about
> twenty percent luminance**, with no bright sky panel, because the headline and body text
> stack over it at this width. No text, no logos, no watermark, no border.

---

#### SLOT `about-hero`
- **route / section** — `/about` · `hero`
- **boxes** — 390: **390×457** · 768: **768×316** · 1440: **1440×341**
- **aspect** — 0.85:1 → 2.43:1 → 4.22:1. **Measured spread 4.96×.** Second crop required.
- **object-fit** — `cover`, full-bleed band behind the h1 and one paragraph
- **applied hues** — incidental accent `#023530`; text region against `#012824`-class
  darkness; no `#983756`
- **generate** — landscape master **2880×682 px**, portrait crop **780×914 px**

> **Landscape master — generate at exactly 2880 × 682 pixels.**
> A wide, quiet interior photograph looking along the inside of a residential garage
> towards a closed sectional door, in dim ambient light with the overhead opener and its
> rail visible at the top of the frame. Torsion spring and shaft across the header, cables
> running down each side. Empty of people. Look is **dim, desaturated and low in chroma**,
> deep blue-greys around `#415082`, **no colour grade, no warm cast, no teal-and-orange
> treatment**. Palette hue **`#023530` (deep teal)** only as a **small incidental accent of
> around two percent of frame** — a single teal-shaded work lamp glowing at the far end.
> **No crimson or red anywhere in the frame.** The **left half must be held dark and flat,
> under about twenty percent luminance**, with no bright highlight, because white heading
> and body text is set over it. **No readable text, no branding, no logos, no numbers, no
> labels on any box or tool.** Deep depth of field, no flare, no watermark, no border.

> **Portrait crop — generate at exactly 780 × 914 pixels.**
> The same garage interior recomposed as a tall frame: the closed sectional door fills the
> lower two thirds, the opener rail and torsion shaft run across the upper third. No
> people. **Dim, desaturated, low chroma**, deep blue-greys around `#415082`, **no colour
> grade**. Palette hue **`#023530` (deep teal)** as a **small incidental accent of a few
> percent only** — the same teal-shaded lamp. **No crimson or red.** The **upper half must
> stay dark and flat under about twenty percent luminance** for the heading that sits over
> it. **No text, no branding, no logos, no watermark, no border.**

---

#### SLOT `services-hero`
- **route / section** — `/services` · `hero`
- **boxes** — 390: **390×719** · 768: **768×525** · 1440: **1440×531**
- **aspect** — 0.54:1 → 1.46:1 → 2.71:1. **Measured spread 5.02×.** Second crop required.
- **object-fit** — `cover`, full-bleed band behind the h1, the lead, the badge chips and
  both actions
- **applied hues** — incidental accent `#023530`; text region against `#012824`-class
  darkness; no `#983756`
- **generate** — landscape master **2880×1062 px**, portrait crop **780×1438 px**

> **Landscape master — generate at exactly 2880 × 1062 pixels.**
> A wide photograph of a row of commercial roll-up doors along the back of a small light
> industrial unit, shot square-on in flat overcast daylight. Corrugated slat curtains,
> plain painted steel, one door part-raised showing the guide track and the barrel above.
> Empty of people and vehicles. **Desaturated and low in chroma**, cool blue-greys around
> `#4b5a8a`, **no colour grade, no warm cast, no teal-and-orange treatment**. Palette hue
> **`#023530` (deep teal)** only as a **small incidental accent of around three percent of
> frame** — a teal painted bay line on the concrete apron in the foreground. **No crimson
> or red anywhere.** The **left third must be held dark and flat under about twenty percent
> luminance**, with no bright sky and no specular highlight, because white heading, body
> text and buttons sit over it. **No signage, no bay numbers, no company names, no readable
> text of any kind, no plates, no logos.** Deep depth of field, no flare, no watermark, no
> border.

> **Portrait crop — generate at exactly 780 × 1438 pixels.**
> The same commercial frontage recomposed vertically: one roll-up door part-raised fills
> the lower two thirds, the barrel and header fill the upper third. No people, no vehicles.
> **Desaturated, low chroma**, cool blue-greys around `#4b5a8a`, **no colour grade**.
> Palette hue **`#023530` (deep teal)** as a **small incidental accent of a few percent** —
> the same painted bay line. **No crimson or red.** The **upper half must stay dark and
> flat under about twenty percent luminance** for the stacked heading and buttons. **No
> signage, no numbers, no readable text, no logos, no watermark, no border.**

---

#### SLOT `contact-hero`
- **route / section** — `/contact` · `hero`
- **boxes** — 390: **390×394** · 768: **768×307** · 1440: **1440×344**
- **aspect** — 0.99:1 → 2.50:1 → 4.19:1. **Measured spread 4.23×.** Second crop required.
- **object-fit** — `cover`, full-bleed band behind the h1 and one paragraph
- **applied hues** — incidental accent `#023530`; text region against `#012824`-class
  darkness; no `#983756`
- **generate** — landscape master **2880×688 px**, portrait crop **780×788 px**

> **Landscape master — generate at exactly 2880 × 688 pixels.**
> A wide photograph of a plain white panel van parked on a residential driveway at dusk,
> side-on, with the rear doors open and shelving of coiled cables, rollers and springs
> faintly visible inside. A closed garage door on the house behind, out of focus. **The van
> is completely unmarked: no livery, no company name, no phone number, no website, no
> decals, and no licence plate — the plate area must be plain, not blurred.** No people, no
> faces. **Desaturated and low in chroma**, dark blue-greys around `#35405b`, **no colour
> grade, no warm street-lamp cast, no teal-and-orange treatment**. Palette hue **`#023530`
> (deep teal)** only as a **small incidental accent of about two percent of frame** — a
> distant teal porch lamp on the house. **No crimson or red anywhere, including tail
> lights — show them unlit.** The **left half must be held dark and flat under about twenty
> percent luminance** for the white heading and paragraph set over it. **No text of any
> kind, no logos, no watermark, no border.**

> **Portrait crop — generate at exactly 780 × 788 pixels.**
> The same unmarked white van at dusk, recomposed to a near-square frame: rear doors open
> facing camera, shelved cables and rollers just readable as shapes inside, the house and
> its closed garage door behind and out of focus. **No livery, no company name, no phone
> number, no decals, no licence plate, no people, no faces.** **Desaturated, low chroma**,
> dark blue-greys around `#35405b`, **no colour grade**. Palette hue **`#023530` (deep
> teal)** as a **small incidental accent of a few percent** — the distant porch lamp. **No
> crimson or red, tail lights unlit.** The **upper half must stay dark and flat under about
> twenty percent luminance** for the heading. **No text, no logos, no watermark, no
> border.**

---

### 4.2 The 4:3 card slots — eleven, one prompt each, no second crop

- **boxes, identical for all eleven** — 390: **360×270** · 768: **720×540** ·
  1440: **535×401**
- **aspect** — 1.333:1 → 1.333:1 → 1.334:1. **Measured spread 0.08%**, which is rounding of
  a fractional grid column and not a ratio change. **No second crop.** Stated so the call
  can be checked: the widest and narrowest of the three differ by less than half a pixel of
  height at the 1440 box.
- **object-fit** — `cover` inside a rounded 12 px frame
- **type over image** — **none.** All copy in these bands sits beside the card, not on it,
  so the underexposure rule in §2.2 does **not** apply here and these images may be evenly
  lit.
- **generate, every card** — **1440×1080 px** (2× the 720×540 box, the largest of the
  three)

Every prompt below inherits this paragraph, which must be **included in the prompt body**
each time it is run:

> *Shared tail, append to each card prompt:* Flat overcast daylight or even indoor work
> light. **Desaturated and low in chroma throughout, no colour grade, no teal-and-orange
> treatment, no golden hour.** Introduce the palette hue **`#023530` (deep teal)** only as
> a **small incidental accent covering no more than about three percent of the frame** —
> one of: a strip of teal tape, a teal glove cuff, a teal-handled tool, a distant teal
> lamp. **No crimson, red or magenta anywhere in the image.** **No readable text, no
> branding, no logos, no part numbers, no labels, no certification marks, no faces.** Deep
> depth of field, no bokeh, no flare, no vignette, no watermark, no border. **Generate at
> exactly 1440 × 1080 pixels.**

| # | slot ID | route · section | subject prompt (prepend to the shared tail above) |
|---|---|---|---|
| 1 | `home-about-card` | `/` · `about` | Close three-quarter view of a technician's gloved hands winding a torsion spring on the shaft above a closed residential garage door, winding bars in both hands, spring anchor and centre bearing plate clearly visible. Hands and forearms only — no face in frame. |
| 2 | `home-community-card` | `/` · `community` | A quiet suburban street of ordinary single-storey houses seen from the pavement, three closed sectional garage doors of different plain styles receding down the row, overcast morning, no people, no vehicles in the foreground. High-key and pale, near-white ground around `#fcfcfc`. |
| 3 | `about-who-card` | `/about` · `who` | A technician in unmarked dark workwear kneeling at the bottom bracket of a residential garage door with a socket wrench, photographed from behind and slightly above so **no face is visible**, the lower door panel and the bottom roller in sharp focus. Dim interior light, deep blue-greys around `#415082`. |
| 4 | `service-spring-repair` | `/services` · `spring-repair` | A torsion spring assembly across the header above a closed garage door: two springs on a shaft, centre bearing plate between them, one spring visibly broken with a clean gap in the coil. Shot square-on, close. |
| 5 | `service-opener-repair` | `/services` · `opener-repair` | A chain-drive garage door opener unit mounted to the ceiling joists, rail running away from camera toward the door header, trolley and emergency release cord hanging. Wiring visible and tidy. Muted khaki-grey interior light around `#94835e`, held muted. |
| 6 | `service-cable-roller-track` | `/services` · `cable-roller-track` | Close view of a vertical garage door track with a nylon roller seated in it and the lift cable running down to the bottom bracket drum, one cable frayed near the drum. Gloved hand entering frame at the edge, no face. |
| 7 | `service-panel-replacement` | `/services` · `panel-replacement` | A residential sectional garage door with one middle panel visibly dented and creased from an impact, the panels above and below intact, photographed square-on from the driveway in flat daylight. Plain, unbranded door. |
| 8 | `service-off-track-correction` | `/services` · `off-track-correction` | A garage door sitting visibly off-track: the door section skewed in the opening, one roller jumped clear of the vertical track and the track itself bowed outward, seen from inside the garage. No people. |
| 9 | `service-new-door-installation` | `/services` · `new-door-installation` | Two technicians in unmarked workwear lifting a fresh garage door section into the opening of a house, both seen from behind so **no faces are visible**, the remaining sections stacked flat on the driveway beside them, hinges and rollers laid out on a cloth. |
| 10 | `service-commercial-roll-up` | `/services` · `commercial-roll-up` | The inside of a commercial roll-up door: slat curtain half-wound onto the barrel above the opening, guide channels each side, a chain hoist hanging at the right. Empty warehouse bay behind, no goods, no signage, no bay numbers. |
| 11 | `service-maintenance-tune-up` | `/services` · `maintenance-tune-up` | Gloved hands applying lubricant to a hinge on a sectional garage door panel with a small applicator, a torque wrench and a coil of replacement rollers laid on a cloth on the garage floor in the foreground. No face in frame. |

---

### 4.3 SLOT `logo` — wordmark plus icon lockup

- **route / section** — every route · `header` (and the JSON-LD `image` field, which
  currently points at `/placeholders/logo-wordmark.svg` and carries a `TODO(fact)` in
  `lib/schema.ts`)
- **boxes** — header wordmark 390: **100×40** · 768: **100×40** · 1440: **160×64**;
  footer lockup **185×80** at all three
- **aspect** — 2.5:1 header, 2.31:1 footer. The two are close enough to come from one
  master; deliver the master plus a footer-padded variant.
- **object-fit** — `fill` inside a fixed box; the SVG must have its own padding baked in
- **display font** — **Roboto Condensed**, the site's `--font-display`, loaded through
  `next/font/google` (OFL). The wordmark must be set in it, not in a lookalike.
- **applied hues** — mark and wordmark in `#023530` on light; a second file with both in
  `#ffffff` for the dark band and the footer. **The crimson `#983756` must not appear in
  the logo** — it is reserved for the one filled chromatic action on the page, and a
  crimson mark would compete with the call button for chroma dominance and fail
  `cta-primacy`.
- **generate** — **1600×640 px** master on transparent ground, plus the same at
  **1480×640 px** for the footer box, plus a **512×512 px** icon-only file

> **Generate at exactly 1600 × 640 pixels, transparent background.**
> A flat two-dimensional vector logo lockup, icon at the left and wordmark at the right,
> optically centred with even padding. The **icon** is a simple geometric mark reading as a
> **closed garage door inside a rounded-square vault outline**: a squared arch or shield
> silhouette containing three or four evenly spaced horizontal bars that read as door
> panels, the lowest bar slightly thicker as a threshold. Solid single-colour fill, no
> gradient, no bevel, no drop shadow, no 3D, no perspective, no outline glow. The
> **wordmark** reads exactly **"VAULT GARAGE DOOR REPAIRS"**, set in **Roboto Condensed**,
> uppercase, bold, tight tracking, on two lines — "VAULT" on the first line at a larger
> size, "GARAGE DOOR REPAIRS" on the second at roughly forty percent of that height. Both
> the mark and the type are a **single flat colour, deep teal `#023530`**, on a fully
> transparent background. **Low chroma by construction — one hue only. No crimson, red or
> magenta anywhere: that colour is reserved for the call button and a crimson mark would
> out-saturate it.** No tagline, no phone number, no address, no year of founding, no
> "licensed", "insured", "certified", "family owned", "since", no star, no ribbon, no seal,
> no laurel, no shield-with-a-tick — **nothing that reads as a credential or an award.**
> No registered or trademark symbol. Clean vector edges suitable for tracing to SVG.
>
> **Second file — generate at exactly 1480 × 640 pixels, transparent background,** the same
> lockup with slightly wider side padding for the footer box.
>
> **Third file — generate at exactly 512 × 512 pixels, transparent background,** the icon
> alone, no wordmark, same flat `#023530`, centred with even margin, for the favicon and
> the JSON-LD `image` field.
>
> **Fourth file — repeat all three in flat `#ffffff`** for placement on the `#023530` and
> `#012824` bands.

---

## 5. Refused — prompts that were not written, and why

These are asked for by the reference's layout and by the slots inventoried in
`assets/INVENTORY.md`. **Each is refused as an image and resolved as a fact, or not at
all.** Writing a prompt for any of them would manufacture the exact claim the decision
register exists to prevent — and an image is worse than a sentence, because nobody
proof-reads a badge.

| refused slot | what it would have been | why refused |
|---|---|---|
| `badge-bbb` | BBB accreditation seal, 200×42 in the footer | **D-14.** We hold no accreditation. A generated seal that merely *looks* like BBB's is a false claim and a trademark problem at once. Resolved as `TODO(fact)` in `docs/facts-needed.md`; the chip holds the box at the right dimensions until a real accreditation exists. |
| `badge-signature-strip` | 252×60 credential and signature lockup in the home about band | **D-14 + D-17.** A signature implies a named owner we do not have, and the strip implies certifications we have not earned. Not an image gap — two unresolved facts. |
| certification / manufacturer chips | the two reference partnership-logo strips, `logos-strip` and `brand-logo-strip` | **D-14.** Manufacturer partnership marks are earned relationships. The bands are DELETED in `docs/sections.md`, not filled with invented logos. |
| `review-star-logos` | Google / Facebook five-star rating lockups, 100×43 | **D-13.** A star row is a review claim rendered as art. No ratings, no review counts, no `AggregateRating` markup anywhere on the site. |
| `review-screenshot-set` | five Google review screenshots, 1402×910, in the home hero | **D-13.** Fabricated review screenshots are the most legally exposed asset on the list. Refused outright. |
| `testimonial-video` + testimonial portraits | 535×535 customer video poster and headshots | **D-13.** The three testimonial bands are DELETED on `/`, `/about` and `/services`. Generating a face to attach to an invented quote is fabrication twice over. |
| "years in business" / "jobs completed" number art | the reference `facts` band counters | **D-14.** Both are numbers we do not have. The band survives carrying hours, service area and phone — all of which are in CONSTANTS. |
| liveried van, plated van, uniformed named staff | a branded vehicle shot for `/contact` | **D-09 + D-17.** The van in `contact-hero` is explicitly unmarked and unplated. Livery would either copy the reference's identity or invent ours before the logo exists. |
| identifiable faces anywhere | staff portraits, customer shots | **D-17.** A face implies a real person on the team. Every human in every prompt above is seen from behind, cropped to hands, or absent. |

---

## 6. Drop-in checklist for the operator

When the files come back (OVERRIDE 3, terminal step):

1. Place them, replace the `<Placeholder>` call in each slot, keep the box geometry — the
   frames are already fixed-ratio, so nothing should shift.
2. Rebuild, then **kill the server before rebuilding and confirm exactly one PID holds
   3105** — see `docs/known-divergence.md` §10.6. Then
   `node ../_shared/harness/src/capture.mjs --side ours`.
3. Re-run `contrast.mjs` — the hero text now sits on a real image and the gate resolves it
   as a background layer. Any hero returning `UNMEASURABLE` means the image is translucent
   or the overlay was dropped; fix the overlay, do not exempt the row.
4. Re-run `rendertruth.mjs` and check `cta-primacy` specifically. If a photograph out-
   saturates the crimson CTA, the image is wrong, not the gate — regenerate it lower in
   chroma rather than raising the CTA's saturation.
5. Re-run `diff.mjs` with no filters and report the final table.
