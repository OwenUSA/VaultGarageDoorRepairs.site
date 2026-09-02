# Ranked Table

## What this table is not

The COMPARISON step specifies two channels diffed against a build, ranked by the
gating channel (STRUCTURAL, per `COLOR_MODE = REMAP`). **There is no build yet.**
Prompt 1 profiles the reference; Prompts 3-4 produce the thing to diff against.
Reporting divergence percentages now would mean inventing them.

So: **structural divergence is undefined for every section until Prompt 4.** Both
channels are built and calibrated against the reference and will produce real
numbers the moment there is a second side.

What follows is the reference-side ranking that drives **dispatch order** —
ranked by measured build risk, descending, same shape and same purpose as the
gated table will have.

## Ranking

`reflow` = max/min section height across the five breakpoints. Risk weights
element count, reflow ratio, carousel count, form count and image count.

| # | section | pages | els | img | slick | form | reflow | h@1440 | h@390 | risk |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | `contact-new` | 10 | 45 | 24 | 2 | 1 | **7.69** | 677 | 5168 | **43.2** |
| 2 | `logos` | 6 | 73 | 28 | 1 | 0 | 5.14 | 306 | 1572 | 28.2 |
| 3 | `serviceouter-two` | 3 | 83 | 28 | 1 | 0 | 4.04 | 818 | 3101 | 25.2 |
| 4 | `template-ascend` | 6 | 169 | 25 | 0 | 1 | 2.88 | 2653 | 6908 | 24.1 |
| 5 | `services` | 1 | 95 | 22 | 2 | 0 | 2.15 | 790 | 624 | 22.3 |
| 6 | `hero-new` | 3 | 58 | 13 | 1 | 1 | 1.45 | 1168 | 1588 | 18.1 |
| 7 | `slatedroof-new` | 1 | 161 | 24 | 1 | 0 | 1.13 | 708 | 626 | 17.4 |
| 8 | `roofing-materials` | 1 | 88 | 16 | 1 | 0 | 1.57 | 557 | 536 | 14.9 |
| 9 | `blogs-one` | 2 | 39 | 3 | 0 | 0 | 3.45 | 724 | 1614 | 12.1 |
| 10 | `contact-one` | 1 | 36 | 1 | 0 | 1 | 1.80 | 1145 | 1985 | 11.6 |
| 11 | `about-us-new` | 1 | 29 | 11 | 0 | 0 | 2.25 | 863 | 1439 | 10.2 |
| 12 | `roofing-service` | 1 | 78 | 16 | 0 | 0 | 1.27 | 539 | 682 | 9.8 |
| 13 | `FOOTER` | 12 | 94 | 4 | 0 | 0 | 2.15 | 717 | 1538 | 9.8 |
| 14 | `testimonial` | 10 | 26 | 20 | 0 | 0 | 1.11 | 740 | 814 | 9.0 |
| 15 | `map-sec` | 10 | 126 | 0 | 0 | 0 | 1.74 | 939 | 1400 | 8.4 |
| 16 | `blankpage` | 1 | 90 | 0 | 0 | 0 | 2.05 | 5114 | 10491 | 8.4 |
| 17 | `steps` | 1 | 33 | 0 | 0 | 0 | 2.47 | 597 | 1473 | 8.2 |
| 18 | `marquee` | 1 | 15 | 0 | 1 | 0 | 1.27 | 90 | 71 | 8.2 |
| 19 | `giving` | 1 | 18 | 4 | 0 | 0 | 2.14 | 712 | 1004 | 7.9 |
| 20 | `feature` | 1 | 36 | 5 | 0 | 0 | 1.87 | 322 | 599 | 7.8 |
| 21 | `serviceinner-one` | 2 | 30 | 1 | 0 | 0 | 2.23 | 680 | 1347 | 7.7 |
| 22 | `serviceinner-three` | 2 | 32 | 4 | 0 | 0 | 1.95 | 492 | 958 | 7.6 |
| 23 | `HEADER` | 12 | 54 | 6 | 0 | 0 | 1.55 | 170 | 110 | 7.5 |
| 24 | `serviceouter-one` | 3 | 19 | 1 | 0 | 0 | 2.18 | 593 | 1113 | 7.3 |
| 25 | `emergency` | 1 | 24 | 2 | 0 | 0 | 1.85 | 491 | 852 | 6.7 |
| 26 | `serviceinner-four` | 2 | 11 | 1 | 0 | 0 | 1.89 | 530 | 844 | 6.2 |
| 27 | `team-one` | 1 | 14 | 1 | 0 | 0 | 1.88 | 711 | 1335 | 6.2 |
| 28 | `brand-logo` | 1 | 3 | 1 | 0 | 0 | 1.76 | 180 | 102 | 5.6 |
| 29 | `message-owner` | 1 | 12 | 1 | 0 | 0 | 1.64 | 658 | 1072 | 5.5 |
| 30 | `serviceareaouter-one` | 1 | 12 | 1 | 0 | 0 | 1.63 | 499 | 750 | 5.4 |
| 31 | `team-three` | 1 | 23 | 1 | 0 | 0 | 1.46 | 412 | 591 | 5.2 |
| 32 | `serviceinner-two` | 2 | 21 | 0 | 0 | 0 | 1.45 | 523 | 759 | 4.9 |
| 33 | `serviceouter-three` | 3 | 12 | 1 | 0 | 0 | 1.36 | 707 | 773 | 4.6 |
| 34 | `breadcrumb` | 1 | 14 | 2 | 0 | 0 | 1.22 | 232 | 282 | 4.5 |
| 35 | `waterproofing` | 1 | 18 | 0 | 0 | 0 | 1.31 | 646 | 612 | 4.4 |
| 36 | `faq-one` | 1 | 8 | 1 | 0 | 0 | 1.31 | 304 | 269 | 4.4 |
| 37 | `faq-two` | 1 | 20 | 0 | 0 | 0 | 1.18 | 701 | 759 | 4.0 |

Rows **2, 14, 27, 28, 31** (`logos`, `testimonial`, `team-one`, `brand-logo`,
`team-three`) are CONFIG FORBIDDEN and will not be built. Dropping them, the
top of the real dispatch queue is:

`contact-new` -> `serviceouter-two` -> `template-ascend` -> `services` ->
`hero-new` -> `slatedroof-new` -> `roofing-materials`

`contact-new` is the correct first dispatch by a wide margin: it appears on 10 of
12 routes, carries the only real form, holds two `asNavFor` carousels, and reflows
7.7x between 1440 and 390. It is also a shared-tail section, so the lead builds it
once and 10 routes inherit it.

## Comparison method, calibrated and ready

- **STRUCTURAL (gates).** Diffs the per-element property dumps in
  `.harness/out/profile.json` — box, position, z-order, overflow, resolved
  font-family/weight/size/letter-spacing/line-height, opacity, border, radius,
  shadow, gradient stops, padding, gap. Colour-blind by construction. Outputs
  max box delta px, elements over BOX_TOLERANCE, typography mismatches and
  divergent area % per section per breakpoint.
- **PERCEPTUAL (advisory under REMAP).** SSIM against the reference recoloured
  through the token map in `docs/03-design-system.md`.
- Screenshots are taken at matched **section-relative** progress. Absolute
  `scrollY` is meaningless here — home is 11800px at 1440 and 16720px at 390,
  and our build will differ again once FORBIDDEN sections are removed. Each
  section carries its own `prog` value (`sectionTop / pageHeight`) in the trace.

## Raw traces

| file | contents |
|---|---|
| `.harness/out/inventory.json` | 25-page crawl, 430 discovered URLs, full network log |
| `.harness/out/profile.json` | 12 exemplars x 5 breakpoints, ~46k element property dumps |
| `.harness/out/analysis.json` | type / spacing / colour / radii / shadow / gradient censuses |
| `.harness/out/state.json` | header rest+scrolled x4bp, drawer, tabs, carousel slides, field states |
| `.harness/out/ranked.json` | this table, machine-readable |
| `.harness/out/all.css` | 1.40 MB concatenated stylesheets, for breakpoint + token re-derivation |
| `.harness/out/asset-manifest.json` | 29 harvested SVGs |
| `.harness/out/placeholder-inventory.json` | 268 slots, 213 placeholders, 55 FORBIDDEN removals |
| `.harness/theme.js` | the target's own behaviour source |

Harness scripts: `crawl.mjs`, `css.mjs`, `profile.mjs`, `state.mjs`,
`analyze.mjs`, `lib.mjs`. **HARNESS_CAP = 1 pass, consumed. No refinement.**
