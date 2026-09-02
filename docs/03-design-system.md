# STEP C — Design System (extracted once, site-wide)

Sources: `.harness/out/all.css` (1.40 MB, 16 sheets + 15 inline blocks),
`.harness/out/profile.json` (12 exemplars x 5 breakpoints, ~46k element dumps),
`.harness/out/analysis.json`. Plugin chrome (Gravity Forms, `accessibility-onetap`,
`addtoany`, Material Icons, `oklch()` values) is filtered out of every census below
— it is not part of the design system and must not be cloned.

## BREAKPOINTS — read from the CSS, not guessed

Media-query census over all stylesheets, by rule count:

| px | rules | verdict |
|---:|---:|---|
| **768** | 108 | **primary** — the theme's main desktop/mobile switch |
| 640 | 36 | vendor (Tailwind-ish plugin CSS) |
| 600 | 24 | slick responsive config |
| **1024** | 22 | **secondary** — theme, and the slick `responsive` breakpoint |
| 782 | 12 | WordPress admin bar — **ignore** |
| 992 / 1200 / 1400 | 8 / 6 / 6 | Bootstrap grid tiers |
| 575 / 576 / 481 | 11 | Bootstrap + minor theme |
| **1440** | 4 | theme max container tier |

**Harness breakpoints: `390, 640, 768, 1024, 1440`.** 768 and 1024 are the
authored theme switches; 640 is real vendor CSS; 390 and 1440 bound the range.
Every measurement in this repo is taken at all five.

## TYPE SCALE

Two families, both **OFL 1.1, both on Google Fonts** -> `next/font/google`
reproduces them exactly, no substitution needed.

- `--font: "Roboto Condensed", sans-serif` — headings, nav, buttons, UI, default
- `--paragraph-font: "Rubik", sans-serif` — body copy only
- `--p: 16px` base

| # | family | weight | size | letter-spacing | line-height | transform | instances | used by |
|---|---|---:|---:|---|---:|---|---:|---|
| 1 | Roboto Condensed | 400 | 16 | normal | 18.4 (1.15) | uppercase | 1440 | nav links, eyebrow labels, list items |
| 2 | Rubik | 500 | 16 | normal | 22.4 (1.4) | none | 1062 | **body paragraph** |
| 3 | Roboto Condensed | 700 | 16 | normal | 18.4 | capitalize | 750 | card titles, link lists |
| 4 | Roboto Condensed | 500 | 16 | normal | 18.4 | none | 480 | footer links |
| 5 | Roboto Condensed | 700 | 16 | normal | 18.4 | uppercase | 378 | **button label** |
| 6 | Roboto Condensed | 400 | 16 | normal | 18.4 | none | 362 | meta text |
| 7 | Roboto Condensed | 700 | 24 | normal | 27.6 (1.15) | none | 220 | h3 |
| 8 | Roboto Condensed | 700 | 24 | normal | 27.6 | uppercase | 176 | h3 emphatic |
| 9 | Roboto Condensed | 600 | 15 | normal | 17.25 | none | 172 | small nav |
| 10 | Roboto Condensed | 700 | 19 | normal | 26.6 (1.4) | uppercase | 144 | card heading |
| 11 | Roboto Condensed | 700 | 18 | normal | 20.7 | none | 121 | h4 |
| 12 | Roboto Condensed | 600 | 14 | normal | 16.1 | uppercase | 120 | badge / tag |
| 13 | Roboto Condensed | 600 | 24 | normal | 27.6 | none | 80 | h3 light |
| 14 | Roboto Condensed | 600 | 18 | normal | 20.7 | none | 79 | h4 light |
| 15 | Roboto Condensed | 700 | 32 | normal | 36.8 (1.15) | uppercase | 74 | **h2 — section heading** |
| 16 | Roboto Condensed | 400 | 28.327 | -0.287 | 38.327 | none | 71 | pull-quote (fluid `clamp()`) |
| 17 | Roboto Condensed | 400 | 18 | normal | 20.7 | uppercase | 60 | nav large |
| 18 | Rubik | 600 | 18 | normal | 25.2 (1.4) | none | 60 | lead paragraph |
| 19 | Rubik | 500 | 16 | normal | 22.4 | capitalize | 60 | body capitalized |
| 20 | Roboto Condensed | 700 | 28 | normal | 39.2 (1.4) | capitalize | 50 | h2 alt |
| 21 | Roboto Condensed | 500 | 20 | normal | 28 (1.4) | capitalize | 50 | subhead |
| 22 | Roboto Condensed | 400 | **60** | normal | 69 (1.15) | none | 48 | **h1 — hero** |
| 23 | Roboto Condensed | 700 | 24 | normal | 27.6 | capitalize | 44 | h3 cap |
| 24 | Roboto Condensed | 700 | 20 | normal | 28 | uppercase | 36 | h4 emphatic |
| 25 | Rubik | 700 | 16 | normal | 22.4 | uppercase | 32 | body bold label |
| 26 | Roboto Condensed | 700 | 20 | normal | 23 (1.15) | none | 25 | h4 tight |
| 27 | Roboto Condensed | 600 | 14 | 0.35 | 20 | uppercase | 25 | tracked label |
| 28 | Roboto Condensed | 600 | 14 | normal | 20 | none | 25 | fine print |
| 29 | Roboto Condensed | 700 | 21 | normal | 24.15 | uppercase | 20 | h4 |
| 30 | Rubik | 400 | 20 | normal | 26 (1.3) | capitalize | 20 | body large |
| 31 | Roboto Condensed | 700 | 32 | normal | 36.8 | capitalize | 20 | h2 cap |

**Two line-height families and nothing else: 1.15 (Roboto Condensed display) and
1.4 (Rubik body).** Letter-spacing is `normal` everywhere except two entries
(-0.287px on the fluid pull-quote, 0.35px on the tracked label). Size ladder:
`14 / 15 / 16 / 18 / 19 / 20 / 21 / 24 / 28 / 32 / 60`.

## SPACING SCALE

**Section vertical padding @1440** (`padding-top / padding-bottom`):

| value | sections | |
|---|---:|---|
| **75 0 75 0** | 41 | the default rhythm |
| 0 0 0 0 | 21 | full-bleed / image-led |
| 50 0 0 0 | 12 | |
| 100 0 120 0 | 10 | hero-scale |
| 0 0 50 0 | 10 | |
| 0 0 40 0 | 5 | |
| 75 0 120 0 / 0 0 75 0 / 50 0 50 0 / 50 0 75 0 / 30 0 30 0 / 20 0 20 0 | 1-2 each | |

**Vertical rhythm: 75px base**, 120px hero-scale, 50/40/30/20 minor.

**Gap scale** (flex/grid `gap`, by instance): `10 (1043) / 15 (610) / 4 (165) /
16 (150) / 12 (129) / 20 (112) / 50 (104) / 25 (96) / 40 (50) / 30 (45) / 6 (24) / 100 (16)`

**Container max-width, measured inner width per breakpoint:**

| 390 | 640 | 768 | 1024 | 1440 |
|---:|---:|---:|---:|---:|
| 360 | 610 | 720 | 930 | **1120** |

## COLOR ROLES

Theme custom properties are the source of truth:
`--primary:#263e86` / `--primary-light:#093145` / `--secondary:#fecc32` /
`--white:#fff` / `--black:#000`

Clustered by measured element count, remapped through CONFIG PALETTE
(**COLOR_MODE = REMAP — these are token bindings, never divergences**):

| role | target value | elements | binds to |
|---|---|---:|---|
| accent / dark band bg | `#263e86` (38,62,134) | 1254 bg + 673 ink | **vault-navy** `#14213D` |
| secondary / CTA | `#fecc32` (254,204,50) | 606 bg + 360 ink | **signal-amber** `#F59E0B` |
| page-bg, elevated | `#ffffff` | 484 bg + 4156 ink | **paper** `#FFFFFF` |
| ink | `#000000` | 1618 ink | **vault-ink** `#0B1220` |
| surface | `#f7f7f7` / `#f5f5f5` / `#f4f5f9` | 114 | **steel-50** `#F1F5F9` |
| border | `#e4e4e4` / `#e5e5e5` / `#dfdfdf` | 115 | **steel-200** `#E2E8F0` |
| accent-hover | `#3d58a9` (61,88,169) | 34 | **vault-blue-deep** `#1739A8` |
| ink-muted | `#333333` / `#131313` | 40 | **steel-500** `#64748B` |
| deep surface | `#08090e` / `#222b46` / `#0b2434` | 85 | **vault-ink** `#0B1220` |
| overlay | `rgba(0,0,0,.2)` | 64 | `vault-ink / 20%` |

`#dd1f1f` (60), all `oklch()` values, and `#f9bc11` are plugin chrome — **not
bound, not cloned.** `vault-blue #1D4ED8` has no direct target analog; it takes
the link / primary-button role that `--primary` serves in interactive contexts.

## RADII / SHADOWS / GRADIENTS

**Radii** (instances): `20px (750)` / `50% (302)` / `5px 20px 5px 5px (251)` —
the signature asymmetric card corner — / `10px (213)` / `8px (185)` / `4px (150)` /
`100% (140)` / `5px (75)` / `12px (72)` / `30px (71)` / `32px (64)` / `15px (45)`.
**Buttons are `border-radius: 0`** — square, every variant.

**Shadows:**
1. `0 0 10px rgba(0,0,0,.1)` — 251 — default card
2. `-1px 1px 4px rgba(0,0,0,.1), 4px 4px 50px rgba(0,0,0,.25)` — 92 — elevated card
3. `4px 4px 24px rgba(0,0,0,.25)` — 50 — floating
4. `-4px -4px 15px rgba(0,0,0,.15)` — 40 — inverse-lit
5. `4px 4px 15px rgba(0,0,0,.1)` — 20
6. `0 4px 54px rgba(0,0,0,.05)` — 15 — diffuse

**Gradients:** the site uses gradients as *tints*, not as color transitions —
`linear-gradient(0deg, rgba(255,255,255,.1), rgba(255,255,255,.1))` over a solid
(100 uses) and `linear-gradient(0deg, rgba(0,0,0,.2), rgba(0,0,0,.2))` over an
image (60 uses). Two real gradients exist: the hero overlay
`linear-gradient(275deg, transparent 16.36%, rgba(0,0,0,.65) 41.38%, #001658 100%)`
and the amber button sheen `linear-gradient(100.63deg, #ffd144 -12.75%, #fff320 ...)`.

## UI PRIMITIVES

**Button — one shape, two fills, square corners.**

| variant | bg | color | radius | font | padding | height |
|---|---|---|---:|---|---|---:|
| **primary** (36 uses) | `#fecc32` | `#263e86` | 0 | RC 700 16px uppercase | `10 30` | 38 |
| **inverse** (9) | `#263e86` | `#fecc32` | 0 | RC 700 16px uppercase | `10 30` | 38 |
| **phone CTA** (3) | `#fecc32` | `#000` | 0 | RC 700 16px uppercase | `10 30` | 44 |
| **submit** (3) | `#fecc32` | `#000` | 0 | RC 700 16px | `12 12` | 42 |
| **large** (1) | `#fecc32` | `#fff` | 0 | RC 700 20px uppercase | `10 30` | 50 |
| **carousel arrow** (2) | `#263e86` | — | 50% | — | `5 5` | 40 |

**Links:** inherit color; nav links RC 400 16px uppercase; footer links RC 500
16px. **Icon sizing:** 24px (Material Icons, replaced by lucide-react), 42px
logo-strip images, 16px inline bullets.

**Form field anatomy** (Gravity Forms — we reimplement, we do not clone):
label RC 600 14px uppercase / input 1px solid border, radius 4px, padding
`12 12` / submit as above.

## SECTION PATTERNS — the build vocabulary

SYNTHESIZE routes may use **only** these. Geometry is `h@390 / 640 / 768 / 1024 / 1440`.
A dash means the pattern does not occur on a page profiled at that breakpoint;
the full matrix for every section is in `.harness/out/profile.json`.

| pattern | archetype | h@390 | 640 | 768 | 1024 | 1440 |
|---|---|---:|---:|---:|---:|---:|
| `hero-new` | hero, split, carousel + form | 1588 | 1695 | 1448 | 1652 | **1168** |
| `hero-new.inner-form` | hero, compact modifier | — | — | — | — | 423 |
| `about-us-new` | split, image + copy, dark | 1439 | 1590 | 1727 | 1945 | 863 |
| `steps` | stat-row / numbered process | 1473 | 874 | 807 | 807 | 597 |
| `roofing-service` | **tabbed** grid-of-N, dark | 682 | 641 | 641 | 641 | 539 |
| `marquee` | band, infinite ticker | 71 | 71 | 71 | 71 | 90 |
| `slatedroof-new` | grid-of-N carousel | 626 | 626 | 626 | 626 | 708 |
| `roofing-materials` | grid-of-N carousel | 536 | 706 | 486 | 449 | 557 |
| `waterproofing` | band, dark, CTA | 612 | 495 | 495 | 502 | 646 |
| `services` | grid-of-N, dark, 2 carousels | 624 | 602 | 579 | 367 | 790 |
| `feature` | **stat-row with counters** | 599 | 576 | 576 | 320 | 322 |
| `emergency` | band, dark, CTA | 852 | 758 | 764 | 460 | 491 |
| `giving` | split, dark | 1004 | 1113 | 1206 | 563 | 712 |
| `map-sec` | interactive SVG map + link grid | 1400 | 1168 | 1141 | 803 | 903 |
| `message-owner` | split, portrait + copy | 1072 | 986 | 1076 | 1042 | 658 |
| `contact-new` | **form-block**, dark, 2 carousels | 5168 | — | 1447 | 1645 | 677 |
| `contact-one` | form-block, dark, standalone | 1985 | — | — | — | 1145 |
| `breadcrumb` | band, thin | 282 | — | — | — | 232 |
| `serviceouter-one` | hero, compact | 1113 | — | — | — | 593 |
| `serviceouter-two` | split, image + copy | 3101 | — | — | — | 818 |
| `serviceouter-three` | grid-of-N cards | 773 | — | — | — | 707 |
| `serviceinner-one` | hero, compact | 1347 | — | — | — | 680 |
| `serviceinner-two` | split | 759 | — | — | — | 523 |
| `serviceinner-three` | split, reversed | 958 | — | — | — | 492 |
| `serviceinner-four` | band, CTA | 844 | — | — | — | 530 |
| `serviceareaouter-one` | hero + map intro | 750 | — | — | — | 499 |
| `blogs-one` | grid-of-3 cards | 1614 | — | — | — | 724 |
| `template-ascend` | **listing grid + load-more** | 6908 | — | — | — | 2653 |
| `faq-one` | band, intro | 269 | — | — | — | 304 |
| `faq-two` | **accordion** | 759 | — | — | — | 701 |
| `blankpage` | generic content column | 10491 | — | — | — | 5114 |
| `HEADER` | 3-bar chrome -> 1 bar | 110 | 110 | 110 | 110 | **170** |
| `FOOTER` | 4-col link grid | 1538 | 1452 | 1430 | 936 | 703 |

**FORBIDDEN — removed, never built:** `testimonial` (reviews), `logos` +
`brand-logo` (manufacturer partnerships / awards), `team-one` + `team-three`
(staff photos, bios, named people), and the `.count` counters inside `feature`
(job counts / years-in-business claims). See `docs/05-route-map.md`.

Full per-breakpoint element dumps: `.harness/out/profile.json`.
