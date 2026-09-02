# assets/INVENTORY.md — asset slots, provenance, status (Prompt 2)

**Generated. Do not hand-edit the tables.** The narrative around them lives in
`assets/INVENTORY.head.md` (this text) and `assets/INVENTORY.tail.md`; the tables come from
`../_shared/harness/src/write-inventory.mjs` reading `.harness/inventory.json`.

Regenerate with:

```bash
REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs     # verify the title first
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/assets.mjs --side ref
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/inventory.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/write-inventory.mjs
```

## Provenance, and why there is no TAKE column

D-09 draws the line: layout, spacing, type scale, grid and interaction are what we clone;
their files are not. Applied to this reference that leaves **nothing** to take as a file.

| provenance | what it means here | count |
|---|---|---|
| **TAKE** | licence verifiable in one step. **Two entries, both fonts, neither a file in this repo** — Roboto Condensed and Rubik, OFL, loaded through `next/font/google`. See "Fonts" below. | 2 (no files) |
| **REPLACE** | their photograph, logo, wordmark, vehicle, staff shot, badge or review image. Slot geometry is recorded; a placeholder is generated; **the reference file is never downloaded, not even temporarily.** | 69 |
| **DELETED** | inventoried so the tally is honest, then not built — the band is deleted (D-13 reviews, D-14 unearned credentials), the asset is third-party widget chrome, or it is a UI glyph that becomes a `lucide-react` icon rather than a file. | 24 |

**Reference bytes pulled into this repo: 0.** `public/placeholders/` holds 127 generated
SVGs and nothing else.

## The measurement caveat that shaped this pass

`docs/profile.md` §5 records that no JavaScript runtime initialises on the saved copy.
NitroPack also lazy-loads **220 of 220** `<img>` on the home page and 103 on `/contact`, so
the stock asset probe recorded the 1×1 placeholder for almost every slot and no geometry at
all. This pass forced every `nitro-lazy-src` into `src` before measuring, which took the
home page from 15 resolved images to 108 and from 3 CSS backgrounds to 21. **The dimensions
in the table below are therefore the real rendered boxes**, not placeholder boxes.

Two consequences that are recorded, not fixed:

1. **Carousel and tabbed bands render unrolled**, so a band background's *height* is the
   stacked height, not the runtime height — `hero-bg` measures 1440×2982 and
   `contact-band-bg` 1440×4518 at the canonical width. Widths and aspect ratios are honest;
   those two heights are not a target. See `docs/known-divergence.md`.
2. **The Prompt 1 section screenshots were taken before the un-lazy pass**, so 40 of the 69
   REPLACE slots sampled a dominant colour of effectively white. That is treated as
   UNMEASURABLE, not as a colour — see the tail section below.

## REPLACE — every slot, with the geometry a generator needs

| slot ID | route | section | kind | 390 | 768 | 1440 | aspect | object-fit | dominant | aspect Δ | placeholder |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `about-band-bg` | / | about | bg | 390x1439 | 768x1727 | 1440x863 | 1.67:1 | 100% 100% | `#fefefe` | **yes** | `about-band-bg.svg + about-band-bg-alt.svg` |
| `about-gallery-1` | / | about | img | 180x113 | 360x225 | 280x175 | 8:5 | fill | `#fefefe` | **yes** | `about-gallery-1.svg + about-gallery-1-alt.svg` |
| `about-gallery-2` | / | about | img | 180x113 | 360x225 | 280x175 | 8:5 | fill | `#fefefe` | **yes** | `about-gallery-2.svg + about-gallery-2-alt.svg` |
| `about-gallery-3` | / | about | img | 180x113 | 360x225 | 280x175 | 8:5 | fill | `#fefefe` | **yes** | `about-gallery-3.svg + about-gallery-3-alt.svg` |
| `about-gallery-4` | / | about | img | 180x113 | 360x225 | 280x175 | 8:5 | fill | `#fefefe` | **yes** | `about-gallery-4.svg + about-gallery-4-alt.svg` |
| `about-gallery-5` | / | about | img | 180x113 | 360x225 | 280x175 | 8:5 | fill | `#fefefe` | **yes** | `about-gallery-5.svg + about-gallery-5-alt.svg` |
| `about-gallery-6` | / | about | img | 180x113 | 360x225 | 280x175 | 8:5 | fill | `#fefefe` | **yes** | `about-gallery-6.svg + about-gallery-6-alt.svg` |
| `about-gallery-7` | / | about | img | 180x113 | 360x225 | 280x175 | 8:5 | fill | `#fefefe` | **yes** | `about-gallery-7.svg + about-gallery-7-alt.svg` |
| `about-gallery-8` | / | about | img | 180x113 | 360x225 | 280x175 | 8:5 | fill | `#fefefe` | **yes** | `about-gallery-8.svg + about-gallery-8-alt.svg` |
| `how-band-bg` | /about | how | bg | — | — | 1440x412 | 3.50:1 | cover | `#7e7455` | no | `how-band-bg.svg` |
| `how-panel-1` | /about | how | bg | 360x115 | 738x115 | — | - | auto | `#ccb673` | **yes** | `how-panel-1.svg + how-panel-1-alt.svg` |
| `how-panel-2` | /about | how | bg | 360x304 | 738x304 | — | - | auto | `#ccb673` | **yes** | `how-panel-2.svg + how-panel-2-alt.svg` |
| `who-photo` | /about | who | img | 360x360 | 720x720 | 458x458 | 1:1 | fill | `#415082` | no | `who-photo.svg` |
| `approach-photo` | / | approach | img | 390x273 | 768x538 | 720x504 | 10:7 | fill | `#c8cee3` | **yes** | `approach-photo.svg + approach-photo-alt.svg` |
| `community-band-bg` | / | community | bg | 390x1004 | 768x1206 | 1440x712 | 2.02:1 | cover | `#fcfcfc` | **yes** | `community-band-bg.svg + community-band-bg-alt.svg` |
| `community-photo` | / | community | img | 360x375 | 720x751 | 535x558 | 0.96:1 | fill | `#fcfcfc` | **yes** | `community-photo.svg + community-photo-alt.svg` |
| `components-slide-1` | / | components | img | 390x340 | 768x666 | 1440x1245 | 1.16:1 | fill | `#ffffff` | **yes** | `components-slide-1.svg + components-slide-1-alt.svg` |
| `components-slide-2` | / | components | img | 390x340 | 768x666 | 1440x1245 | 1.16:1 | fill | `#ffffff` | **yes** | `components-slide-2.svg + components-slide-2-alt.svg` |
| `components-slide-3` | / | components | img | 390x340 | 768x666 | 1440x1245 | 1.16:1 | fill | `#ffffff` | **yes** | `components-slide-3.svg + components-slide-3-alt.svg` |
| `components-slide-4` | / | components | img | 390x340 | 768x666 | 1440x1245 | 1.16:1 | fill | `#ffffff` | **yes** | `components-slide-4.svg + components-slide-4-alt.svg` |
| `components-slide-5` | / | components | img | 390x340 | 768x666 | 1440x1245 | 1.16:1 | fill | `#ffffff` | **yes** | `components-slide-5.svg + components-slide-5-alt.svg` |
| `components-slide-6` | / | components | img | 390x340 | 768x666 | 1440x1245 | 1.16:1 | fill | `#ffffff` | **yes** | `components-slide-6.svg + components-slide-6-alt.svg` |
| `breadcrumb-bg` | /contact | breadcrumb | bg | 390x282 | 768x282 | 1440x232 | 6.21:1 | cover | `#35405b` | **yes** | `breadcrumb-bg.svg + breadcrumb-bg-alt.svg` |
| `breadcrumb-vehicle` | /contact | breadcrumb | img | — | — | 432x194 | 2.23:1 | contain | `#35405b` | no | `breadcrumb-vehicle.svg` |
| `doors-band-bg` | / | doors | bg | 390x2236 | 768x2236 | 1440x2318 | 0.62:1 | cover | `#fefbf1` | **yes** | `doors-band-bg.svg + doors-band-bg-alt.svg` |
| `doors-slide-1` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-1.svg + doors-slide-1-alt.svg` |
| `doors-slide-2` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-2.svg + doors-slide-2-alt.svg` |
| `doors-slide-3` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-3.svg + doors-slide-3-alt.svg` |
| `doors-slide-4` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-4.svg + doors-slide-4-alt.svg` |
| `doors-slide-5` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-5.svg + doors-slide-5-alt.svg` |
| `doors-slide-6` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-6.svg + doors-slide-6-alt.svg` |
| `doors-slide-7` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-7.svg + doors-slide-7-alt.svg` |
| `doors-slide-8` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-8.svg + doors-slide-8-alt.svg` |
| `doors-slide-9` | / | doors | bg | 193x400 | 382x400 | 718x400 | 1.79:1 | 100% 100% | `#fefbf1` | **yes** | `doors-slide-9.svg + doors-slide-9-alt.svg` |
| `emergency-band-bg` | / | emergency | bg | 390x852 | 768x764 | 1440x491 | 2.93:1 | cover | `#fffefc` | **yes** | `emergency-band-bg.svg + emergency-band-bg-alt.svg` |
| `emergency-vehicle` | / | emergency | img | 360x116 | 720x233 | 553x179 | 3.09:1 | fill | `#fffefc` | **yes** | `emergency-vehicle.svg + emergency-vehicle-alt.svg` |
| `hero-bg` | / | hero | bg | 390x3298 | 768x3089 | 1440x2982 | 0.48:1 | cover | `#cdcfd0` | **yes** | `hero-bg.svg + hero-bg-alt.svg` |
| `process-band-bg` | / | process | bg | 390x1055 | 768x598 | 1440x493 | 2.92:1 | cover | `#f4f4f2` | **yes** | `process-band-bg.svg + process-band-bg-alt.svg` |
| `services-card-1` | / | services | img | 360x250 | 738x250 | 317x503 | 0.63:1 | fill | `#19213a` | **yes** | `services-card-1.svg + services-card-1-alt.svg` |
| `services-card-2` | / | services | img | 360x250 | 738x250 | 317x503 | 0.63:1 | fill | `#19213a` | **yes** | `services-card-2.svg + services-card-2-alt.svg` |
| `services-card-3` | / | services | img | 360x250 | 738x250 | 317x503 | 0.63:1 | fill | `#19213a` | **yes** | `services-card-3.svg + services-card-3-alt.svg` |
| `service-detail-bg` | /services | service-detail | bg | — | — | 1440x631 | 2.28:1 | cover | `#94835e` | no | `service-detail-bg.svg` |
| `services-grid-bg` | /services | services | bg | 390x776 | 768x796 | 1440x818 | 1.76:1 | cover | `#dfe0e2` | **yes** | `services-grid-bg.svg + services-grid-bg-alt.svg` |
| `services-hero-bg` | /services | hero | bg | 390x1133 | 768x838 | 1440x594 | 2.42:1 | cover | `#4b5a8a` | **yes** | `services-hero-bg.svg + services-hero-bg-alt.svg` |
| `services-hero-photo` | /services | hero | img | 340x300 | 700x300 | 316x419 | 0.75:1 | fill | `#4b5a8a` | **yes** | `services-hero-photo.svg + services-hero-photo-alt.svg` |
| `services-tile-1` | /services | services | img | 197x196 | 197x196 | 197x196 | 1.01:1 | fill | `#dfe0e2` | no | `services-tile-1.svg` |
| `services-tile-2` | /services | services | img | 197x196 | 197x196 | 197x196 | 1.01:1 | fill | `#dfe0e2` | no | `services-tile-2.svg` |
| `services-tile-3` | /services | services | img | 197x196 | 197x196 | 197x196 | 1.01:1 | fill | `#dfe0e2` | no | `services-tile-3.svg` |
| `services-tile-4` | /services | services | img | 197x196 | 197x196 | 197x196 | 1.01:1 | fill | `#dfe0e2` | no | `services-tile-4.svg` |
| `services-tile-5` | /services | services | img | 197x196 | 197x196 | 197x196 | 1.01:1 | fill | `#dfe0e2` | no | `services-tile-5.svg` |
| `tabbed-panel-1` | / | tabbed | img | 370x190 | 730x190 | 280x384 | 0.73:1 | fill | `#dadee8` | **yes** | `tabbed-panel-1.svg + tabbed-panel-1-alt.svg` |
| `tabbed-panel-2` | / | tabbed | img | 370x190 | 730x190 | 280x383 | 0.73:1 | fill | `#dadee8` | **yes** | `tabbed-panel-2.svg + tabbed-panel-2-alt.svg` |
| `tabbed-panel-3` | / | tabbed | img | 370x190 | 730x190 | 280x385 | 8:11 | fill | `#dadee8` | **yes** | `tabbed-panel-3.svg + tabbed-panel-3-alt.svg` |
| `tabbed-panel-4` | / | tabbed | img | 370x190 | 730x190 | 280x385 | 8:11 | fill | `#101937` | **yes** | `tabbed-panel-4.svg + tabbed-panel-4-alt.svg` |
| `tabbed-panel-5` | / | tabbed | img | 370x190 | 730x190 | 280x385 | 8:11 | fill | `#101937` | **yes** | `tabbed-panel-5.svg + tabbed-panel-5-alt.svg` |
| `tabbed-panel-6` | / | tabbed | img | 370x190 | 730x190 | 280x385 | 8:11 | fill | `#101937` | **yes** | `tabbed-panel-6.svg + tabbed-panel-6-alt.svg` |
| `tabbed-panel-7` | / | tabbed | img | 370x190 | 730x190 | 280x385 | 8:11 | fill | `#dadee8` | **yes** | `tabbed-panel-7.svg + tabbed-panel-7-alt.svg` |
| `tabbed-panel-8` | / | tabbed | img | 370x190 | 730x190 | 280x385 | 8:11 | fill | `#101937` | **yes** | `tabbed-panel-8.svg + tabbed-panel-8-alt.svg` |
| `urgent-image` | / | urgent | bg | 390x562 | 750x445 | 1150x571 | 2.01:1 | cover | `#8f97ae` | **yes** | `urgent-image.svg + urgent-image-alt.svg` |
| `contact-band-bg` | all | contact | bg | 390x5168 | 768x5122 | 1440x4518 | 0.32:1 | cover | `#a7a8a9` | **yes** | `contact-band-bg.svg + contact-band-bg-alt.svg` |
| `contact-gallery-1` | all | contact | img | 511x341 | 720x480 | 511x341 | 1.50:1 | fill | `#a7a8a9` | **yes** | `contact-gallery-1.svg + contact-gallery-1-alt.svg` |
| `contact-gallery-2` | all | contact | img | 511x341 | 720x480 | 511x341 | 1.50:1 | fill | `#a7a8a9` | **yes** | `contact-gallery-2.svg + contact-gallery-2-alt.svg` |
| `contact-gallery-3` | all | contact | img | 511x341 | 720x480 | 511x341 | 1.50:1 | fill | `#a7a8a9` | **yes** | `contact-gallery-3.svg + contact-gallery-3-alt.svg` |
| `contact-gallery-4` | all | contact | img | 511x341 | 720x480 | 511x341 | 1.50:1 | fill | `#a7a8a9` | **yes** | `contact-gallery-4.svg + contact-gallery-4-alt.svg` |
| `contact-gallery-5` | all | contact | img | 511x341 | 720x480 | 511x341 | 1.50:1 | fill | `#a7a8a9` | **yes** | `contact-gallery-5.svg + contact-gallery-5-alt.svg` |
| `contact-gallery-6` | all | contact | img | 511x341 | 720x480 | 511x341 | 1.50:1 | fill | `#a7a8a9` | **yes** | `contact-gallery-6.svg + contact-gallery-6-alt.svg` |
| `hero-side-image` | all | hero | bg | 360x703 | 720x486 | 553x486 | 1.14:1 | cover | `#cdcfd0` | **yes** | `hero-side-image.svg + hero-side-image-alt.svg` |
| `logo-footer` | all | footer | img | 185x80 | 185x80 | 185x80 | 37:16 | fill | `#2b4182` | no | `logo-footer.svg` |
| `logo-wordmark` | all | header | img | 100x40 | 100x40 | 160x64 | 5:2 | fill | `#b98f99` | no | `logo-wordmark.svg` |

## DELETED — inventoried, deliberately not filled

| slot ID | route | section | 1440 | why |
|---|---|---|---|---|
| `badge-signature-strip` | / | about | 252x60 | 252x60 credential/signature lockup. D-14. |
| `brand-mark-inline` | / | about | 176x73 | their logo repeated inside the about band, 176x73. D-09. |
| `brand-rule-facts` | / | facts | 50x22 | 50x22 decorative divider. CSS, not a file. |
| `brand-shape` | / | doors | 431x216 | 431x216 decorative brand shape. Prompt 5 token gradient, not a file. |
| `icon-doors-carousel` | / | doors | 69x55 | 69x55 carousel chips. lucide set. No files. |
| `icon-phone` | / | emergency | 36x42 | phone glyph, 36x42 box. lucide Phone. No file. |
| `icon-service-set` | / | services | 50x50 | 50x50 service-grid icons. lucide set, stroke 2. No files. |
| `icon-tab-set` | / | tabbed | 40x40 | 8 tab icons, 25x25 at 390/768 and 40x40 at 1440. lucide set, stroke 2. No files. |
| `review-screenshot-set` | / | hero | 1402x910 | 5 Google review screenshots, 1402x910. D-13: no reviews, no ratings, no review markup. |
| `review-star-logos` | / | community | 100x43 | Google / Facebook 5-star rating lockups, 100x43 and 100x38. D-13. |
| `brand-rule-services` | /services | service-detail | 356x58 | 356x58 decorative divider. CSS, not a file. |
| `icon-services-bullets` | /services | services | 26x25 | 25x25 bullet glyphs on the /services grid. lucide Check. No files. |
| `testimonial-video` | / | testimonial | 535x535 | the reference's only video, 535x535 at 1440, absent below 1440. Testimonial band, DELETED (D-13); no poster slot survives. |
| `badge-bbb` | all | footer | 200x42 | BBB accreditation seal, 200x42. D-14: we hold no accreditation to show. TODO(fact) chip at the same box. |
| `header-topbar-texture` | all | header | 1440x78 | 1440x78 top-bar texture. Prompt 5 token gradient, not a file. |
| `icon-chevron` | all | header | 10x6 | nav chevron. lucide ChevronDown in the same 10x6 box, stroke 2. No file. |
| `icon-social` | all | footer | 50x50 | Yelp / Facebook marks at 50x50. Third-party trademarks, and we publish no social profiles (TODO(fact)). |
| `icon-topbar-claim` | all | header | 22x22 | top-bar glyph, 22x22. lucide ShieldCheck. No file, and no insurance-claim claim in our copy (D-14). |
| `partner-logo-strip` | all | logos-strip | 1120x116 | 13 manufacturer / association marks, 150x100 each. Third-party trademarks AND unearned credentials (D-14). |
| `review-avatar-set` | all | testimonial | 135x135 | 10 Google reviewer avatars, 135x135. D-13, and the whole testimonial band is DELETED. |
| `review-google-mark` | all | testimonial | 32x32 | D-13. |
| `review-rating-strip` | all | hero | 424x60 | rating strips, 300x39 / 424x60 / 284x56. D-13; the geometry survives as a TODO(fact) chip row. |
| `testimonial-band-bg` | all | testimonial | 1440x796 | testimonial band background; the whole band is DELETED (D-13). |
| `widget-onetap` | all | (third-party) | 58x58 | onetap accessibility widget chrome, 45 language flags plus its own mark. Not shipped; the whole widget is DELETED in docs/sections.md. |

## Tally

| | count |
|---|---|
| slots inventoried | 93 |
| REPLACE | 69 |
| DELETED | 24 |
| placeholders generated | 127 |
| REPLACE assets downloaded | **0** |


## TAKE — the only two, and neither is a file we copy

Both are Google Fonts under the SIL Open Font License, verifiable in one step from
`fonts.google.com`. They are loaded with `next/font/google`, which self-hosts the subset at
build time. **No `woff2` is lifted from the reference's CDN.**

| family | role in the reference | evidence | how we take it |
|---|---|---|---|
| **Roboto Condensed** | primary. 5,335 rendered text nodes across the five pages; weights 400/500/600/700; 28 distinct rendered sizes from 12px to 60px | real `@font-face`, real `woff2` files, variable 100–900 | `next/font/google`, weights 400/500/700, `display: swap` |
| **Rubik** | secondary. 545 nodes; weights 400/500/600/700; sizes 14–25px | real `@font-face`, real `woff2` files, variable 300–900 | `next/font/google`, weights 400/500/700, `display: swap` |

### No font-substitution floor is booked, and none may be

D-11 books a permanent text-metric floor **only** when the reference self-hosts a licensed
font we cannot use. That is not this reference. Both families it actually renders are open,
both are on Google Fonts, and we load the same two. Any text-metric delta measured later is
a real defect, not a floor. Do not add one.

### Eleven further declared families that load nothing — phantoms

`usedFamilies` reports these on rendered text, and every one of them belongs to the
third-party `onetap` accessibility widget, not to the site design:

`system-ui` (1,485 nodes) · `Material Symbols Outlined` (456, `@font-face` declared with
**no `src` file at all**) · `Material Icons` (126) · `ui-serif` (39) · `Roboto Flex` (24) ·
`impact` (12) · plus `Roboto`, `slick`, and the widget's own fallbacks.

The widget is DELETED in `docs/sections.md`, so none of these is a slot, a token, or a
divergence. `slick` is declared as a `ttf` icon font for a carousel whose runtime never
initialises.

## Icons — `lucide-react`, matched on stroke and box, never on glyph

Every icon in the reference is a raster or SVG file. We ship none of them. The
build wave uses `lucide-react` at the **same box and stroke width**, choosing the nearest
sensible glyph rather than tracing theirs:

| where | reference box | count | lucide substitute |
|---|---|---|---|
| header nav chevron | 10×6 | 1 | `ChevronDown`, stroke 2 |
| header top bar | 22×22 | 1 | `ShieldCheck`, stroke 2 |
| home tabbed band | 25×25 at 390/768, **40×40 at 1440** | 8 | service-appropriate set, stroke 2 |
| home service grid | 50×50 | 3 | stroke 2 |
| home doors carousel | 69×55 | 5 | stroke 2 |
| emergency band phone | 36×42 | 1 | `Phone`, stroke 2 |
| /services bullets | 25×25 | 5 | `Check`, stroke 2 |
| footer social | 50×50 | 2 | **not shipped** — no social profiles exist (`TODO(fact)`) |

The tab icons are the only set that changes box across breakpoints; they must be sized by
token, not by a fixed `size` prop.

## Video — one, in a deleted band, so no poster slot survives

The reference renders exactly one `<video>`: a muted / autoplay / playsinline MP4, 535×535
at 1440 and absent below it, inside the `testimonial` band. Policy is poster-still-only —
but that band is DELETED under D-13, so there is no slot to hold a poster and none is
generated. Recorded here so the count is honest.

## Dominant colour: 40 of 69 REPLACE slots are UNMEASURABLE

The dominant-colour sample comes from the Prompt 1 reference section screenshots, which
were captured **before** the NitroPack lazy sources were forced. On any slot whose image had
not painted, the sample is the empty band, not the photo: 40 REPLACE slots came back at
luminance > 0.82, most of them at `#fefefe`, `#ffffff` or `#fefbf1`.

A near-white placeholder mounted into a band destroys that band's *painted* contrast
measurement — `rendertruth.mjs` samples near-white text on a near-white fill and cannot
distinguish a missing asset from a real A-13 contrast defect. A sibling site in this
programme hit exactly this and left such placeholders unmounted.

**The call here, made explicitly:**

- the honestly sampled hex stays in the `dominant` column above and in
  `.harness/inventory.json` — the record is wanted;
- the placeholder **file** is repainted to a single mountable mid-neutral, `#5c6169`
  (4.9:1 against white, 4.3:1 against `#111`), with the sampled hex printed on the tile;
- every affected slot carries `colourUnmeasurable: true` in `.harness/inventory.json`;
- **Prompt 10 must not name a hue for these 40 slots.** Their generator prompts take their
  palette from the Prompt 5 tokens for the band they sit in, never from this column.

The 40: `about-band-bg`, `about-gallery-1`…`-8`, `community-band-bg`, `community-photo`,
`components-slide-1`…`-6`, `doors-band-bg`, `doors-slide-1`…`-9`, `emergency-band-bg`,
`emergency-vehicle`, `process-band-bg`, `services-grid-bg`, `services-tile-1`…`-5`,
`tabbed-panel-1`, `-2`, `-3`, `-7`.

The 29 that **are** measurable carry a real sample and can be trusted: notably
`services-card-1..3` `#19213a`, `tabbed-panel-4..6,8` `#101937`, `breadcrumb-bg` `#35405b`,
`services-hero-bg` `#4b5a8a`, `who-photo` `#415082`, `how-panel-1/2` `#ccb673`,
`service-detail-bg` `#94835e`.

## Logo

`logo-wordmark` (160×64 at 1440, 100×40 at 390/768) and `logo-footer` (185×80 at every
breakpoint) are both `TODO(fact): logo asset`. Until a file exists the build renders the
business name as a **wordmark in the display font** — no icon, no lockup, no invented
emblem. Prompt 10 writes one generator entry covering the wordmark-plus-icon lockup with
the display font and the applied Prompt 5 hues named.

## Standing rules for the build wave

1. **Never fetch a reference asset.** Not to inspect it, not to sample it, not temporarily.
   Everything needed is already in this file.
2. Mount placeholders from `public/placeholders/` by slot ID. The file name **is** the slot
   ID, so a missing asset is legible on the page and in a screenshot.
3. A slot whose aspect changes across breakpoints has a second `-alt` placeholder. Use it;
   do not stretch the primary.
4. Placeholder-blocked sections are **known floors**, not divergences (`ITERATION_CAP`
   never applies to them). They are listed in `docs/known-divergence.md`.
