# docs/profile.md — reference profile (Prompt 1)

REFERENCE = `https://africkerroofing.com/` (A. Fricker Roofing and Waterproofing, Tulsa OK).

**Profiled from the SAVED COPY, never the live site** (A-15). `reference/raw/*.html` is
served over HTTP by the shared harness and captured from there.

```bash
REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs     # from the site root
curl -s http://127.0.0.1:3198/ | grep -o '<title>[^<]*'           # -> A. Fricker Roofing
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/profile-reference.mjs
```

**PORT 3198, not the package default 3199.** When this was first profiled, 3199 was already
held by a sibling site's reference server and answered with *its* reference
(`<title>Privacy Policy | Family Tree Roofing`). Nothing errored — the pages came back 200
and looked entirely plausible. **Verify the title before trusting any capture.**

Raw output: `.harness/profile/ref-<page>-<bp>.json`, 20 passes (5 pages x 4 widths).

---

## 1. Height and section count per page, per breakpoint

Section count is outer bands as `segmentSections()` resolves them, header and footer
included. 430 is a geometry-only extra width and never carries a threshold.

| our route | reference path | 390 | 430 | 768 | 1440 | bands |
|---|---|---|---|---|---|---|
| `/` | `/` | 30856 | 30758 | 31460 | 32213 | 19 |
| `/about` | `/about-us/` | 6882 | 6760 | 6678 | 4371 | 6 |
| `/services` | `/commercial-roofing-services/` | 9693 | 9432 | 8407 | 6471 | 8 |
| `/contact` | `/contact-us/` | 4930 | 4767 | 4271 | 3092 | 4 |
| `/privacy` | `/privacy-policy/` | 12149 | 11115 | 7799 | 5987 | 4 |

**Band count is identical at every width on every route, and so are the ordinals.** No band
splits between 390 and 1440 on this reference, which is why the canonical-id resolution
(harness defect #3) has nothing to correct here. That is a property of this reference, not
a licence to drop a breakpoint.

**The home page does not shrink at mobile — it grows at desktop.** That is the opposite of
every sibling site and it is an artefact, see section 5.

### Section inventory at the canonical width (1440)

Ordinal ids are the probe's own; `s00`/`s18` etc. are what `docs/sections.md` keys on.

| route | id | element | h@1440 |
|---|---|---|---|
| `/` | `s00` | `header.pc` | 170 |
| `/` | `s01-award-winning-tulsa-roofing-compan` | `section.hero-new.dark` | 5324 |
| `/` | `s02-partnering-with-tulsa-s-best` | `section.logos` | 1438 |
| `/` | `s03` | `section.brand-logo` | 180 |
| `/` | `s04-tulsa-s-1-contractor-for-roofing` | `section.about-us-new.dark` | 863 |
| `/` | `s05-ensuring-a-smooth-roofing-experien` | `section.steps` | 493 |
| `/` | `s06-our-roofing-services-in-tulsa-ok` | `section.roofing-service.dark` | 539 |
| `/` | `s07` | `section.marquee` | 269 |
| `/` | `s08-premium-roofing-materials` | `section.slatedroof-new` | 2318 |
| `/` | `s09-our-expertise-in-roofing-materials` | `section.roofing-materials` | 7740 |
| `/` | `s10-best-waterproofing-solutions-for-t` | `section.waterproofing.dark` | 646 |
| `/` | `s11-best-exterior-services` | `section.services.dark` | 3189 |
| `/` | `s12-roofing-done-with-integrity` | `section.feature` | 322 |
| `/` | `s13-storm-damage-roofing-experts-rea` | `section.emergency.dark` | 491 |
| `/` | `s14-we-believe-in-giving-back-to-the-c` | `section.giving.dark` | 712 |
| `/` | `s15-committed-to-preserving-our-hometo` | `section.message-owner` | 658 |
| `/` | `s16-we-love-hearing-from-our-customers` | `section.testimonial` | 796 |
| `/` | `s17-contact-form` | `section.contact-new.dark` | 4518 |
| `/` | `s18-service-areas` | `footer` | 703 |
| `/about` | `s01-about-a-fricker-roofing-and-water` | `section.team-one.dark` | 711 |
| `/about` | `s02-our-services` | `section.team-three` | 412 |
| `/about` | `s03-we-love-hearing-from-our-customers` | `section.testimonial` | 796 |
| `/about` | `s04-contact-form` | `section.contact-new.dark` | 677 |
| `/services` | `s01-commercial-roofing-services-in-tul` | `section.serviceouter-one.dark` | 594 |
| `/services` | `s02-partnering-with-tulsa-s-best` | `section.logos.bg-gray` | 306 |
| `/services` | `s03-our-commercial-roofing-services-in` | `section.serviceouter-two` | 818 |
| `/services` | `s04-let-us-handle-your-commercial-roof` | `section.serviceouter-three.dark` | 631 |
| `/services` | `s05-we-love-hearing-from-our-customers` | `section.testimonial` | 796 |
| `/services` | `s06-contact-form` | `section.contact-new.dark` | 677 |
| `/contact` | `s01-contact-us` | `section.breadcrumb` | 232 |
| `/contact` | `s02-contact-form` | `section.contact-one.dark` | 1145 |
| `/privacy` | `s00` | `section.onetap-container` | 1673 |
| `/privacy` | `s02-a-fricker-roofing-and-waterproofi` | `section.blankpage` | 5114 |

`header.pc` is `s00` and the footer is the last band on every route except `/privacy`,
where segmentation falls through (below).

---

## 2. Framework, segmentation and the two selector traps

The reference emits a `<meta name="generator" content="Elementor 4.2.4">` and a NitroPack
generator tag, but **no Elementor markup is present on any of the five saved pages** —
`.elementor-top-section` and `.e-con.e-parent` both count 0. It is a hand-built WordPress
theme whose bands are semantic `<section class="<band-name>">` elements directly under a
single `<main>`. NitroPack rewrites asset URLs and adds `nitro-lazy` / `nitro-offscreen`
classes; it does not touch the band class names. **The band-name class is the stable
identity here.**

`sectionCandidates: ['main > section', 'body > section', 'section']`. `main > section`
resolves on four of five routes.

**`/privacy` falls through to bare `section`** because its only band under `<main>` is
`blankpage`, and a candidate needs two outer bands to win. Bare `section` then also matches
`.onetap-container`, the third-party accessibility widget, which lands at `s00` ahead of the
header. That row is classified DELETED; it is not a band we ship.

Two selector defects were found and fixed here, both of the same family as harness defect
number 1:

1. **`chromeSelectors` ADDS bands, it does not exclude them.** `probe.mjs` pushes every
   outer chrome node into the section list. Listing `.onetap-container` as chrome therefore
   fabricated a 1673px band at `s01` on four routes and shifted every ordinal after it.
   Removed.
2. **A bare `header` selector matched the widget's own `<header class="onetap-header-top">`**
   once the widget itself was out of the chrome set — a fabricated 351px band, again at
   `s01`, again shifting every ordinal. `chromeSelectors` is now `['header.pc', 'footer']`,
   exact tag+class, no substring matcher anywhere.

Both were caught only because the ordinal ids visibly moved between profile runs. A
contract written against either intermediate state would have mislabelled every band on
four routes.

---

## 3. Breakpoints in the reference CSS

24 stylesheets, 729,397 bytes of CSS, mined for `@media (min|max-width)`. Occurrence counts:

| breakpoint | hits | | breakpoint | hits |
|---|---|---|---|---|
| `max-768` | **50** | | `min-641` | 4 |
| `max-640` | **19** | | `min-1200` | 3 |
| `min-600` | 8 | | `min-1400` | 3 |
| `max-1024` | 7 | | `min-1024` | 3 |
| `min-782` | 6 | | `max-576` / `max-575` | 3 / 3 |
| `min-992` | 5 | | `max-1440`, `max-1199`, `max-767`, `max-481` | 2 each |
| `min-768` | 4 | | `min-350`, `min-420`, `min-576`, `min-601`, `min-641`, `min-800`, `min-960`, `min-993`, `max-480`, `max-641`, `max-781`, `max-800`, `max-900`, `max-991`, `max-1280` | 1 each |
| `max-600` | 4 | | | |

`BP_SET = 390, 768, 1440` stands, plus 430 as a geometry-only extra. `max-768` is the
dominant rule by a factor of 2.6 over the next, and 768 sits exactly on it, so the tablet
width is where the restack resolves — that is the width A-9 refuses to drop.

**Breakpoints deliberately skipped, recorded here rather than measured** (CLAUDE.md cost
discipline: three widths, fixed): 480/481, 576, 600/601, 640/641, 800, 900, 960, 991/992,
1024, 1199/1200, 1280, 1400. `min-782` and `max-781` are the WordPress admin-bar rules and
are not site design breakpoints at all.

---

## 4. Motion — no library initialises. `framer-motion` is NOT justified.

Probed at every breakpoint, on every page:

```
gsap:false  ScrollTrigger:false  lenis:false  locomotive:false  aos:false
wow:false   swiper:false         slick:false
aosAttrs:3  parallaxAttrs:0      cssAnimatedEls:4  willChangeTransform:0
inlineOnScroll:false
```

Stated plainly, as the dependency allowlist requires: **there is no scroll-linked motion and
no timeline library on this reference. Motion is not choreographed. `framer-motion` is not
justified and must not be installed.** The only motion evidence is three `data-aos`
attributes (`fade-up`, with a delay) whose library is absent, four CSS-animated elements,
and a CSS marquee band. An IntersectionObserver one-shot reveal plus CSS transitions
reproduces everything present.

The single `lenis` string in the markup is `data-lenis-prevent` on the accessibility
widget's own panel — an attribute the widget sets defensively for sites that *do* run
Lenis. It is not evidence that this site runs it, and Lenis stays banned.

`slick` appears 10-11 times per page as CSS and markup classes, and `jquery` 14-26 times,
but neither runtime is present when the saved copy renders. See the next section.

---

## 5. Static vs fetched — and the one measurement caveat that matters

Every one of the five pages is **static server-rendered HTML**. Nothing is client-fetched
into a band; there is no JSON API, no hydration boundary, no content that appears only after
script execution.

**CAVEAT, load-bearing: no JavaScript runtime initialises on the saved copy.** NitroPack
defers all script into combined bundles, and those bundles do not execute in the capture.
Consequences, which must not be mistaken for reference geometry:

- Carousel bands render **unrolled**: every slide is stacked vertically instead of being
  collapsed into a single track. That is why `s09-our-expertise-in-roofing-materials` is
  7740px, `s01-award-winning-tulsa-roofing-compan` is 5324px, `s11-best-exterior-services`
  is 3189px and `s17-contact-form` is 4518px at 1440, and why the home page is *taller* at
  1440 than at 390.
- The tabbed band (`roofing-service`) shows all panels rather than one.
- Lazy images resolve to the 1x1 GIF placeholder, so image slots contribute no height.

**Therefore: heights on carousel and tabbed bands are not a target to converge on.** They
go to `docs/known-divergence.md` as a permanent measurement floor before any build work
starts. Bands with no JS dependency — `about-us-new`, `steps`, `waterproofing`, `feature`,
`emergency`, `giving`, `message-owner`, header and footer — are unaffected and carry real
numbers.

---

## 6. State inventory

| state | where | measured |
|---|---|---|
| header at top vs scrolled | `header.pc` | `position: sticky`, h 170 -> 170. **No shrink, no shadow, no transform, no background change.** The scrolled state is not visually distinct at all on the saved copy. |
| mobile drawer | `#mySidenav.sidenav` inside `.mobile-menu` | off-canvas sidenav, opened from the mobile bar |
| nav submenus | 36 `.menu-item-has-children` + 36 `.sub-menu` | hover-expanded dropdowns, 166 menu items total |
| carousels | `.slick-*` classes on `slatedroof-new`, `roofing-materials`, `testimonial` | markup present, runtime absent (section 5) |
| tabs | `roofing-service` | two panels |
| marquee | `section.marquee` | CSS ticker |
| forms | Gravity Forms `#gform_wrapper_6` and `#gform_wrapper_1` | 6 visible controls + 6 hidden: text, text, `type="tel"` with a `(999) 999-9999` mask, **`type="email"`**, select, textarea |
| accessibility widget | `.onetap-container` + `.onetap-container-toggle` | third-party off-canvas panel at x=1440, 580px wide, present on all five pages |

**The reference's form has an email field. Ours does not and cannot** — D-03 is absolute and
D-05 fixes our five fields as name, phone, service needed, preferred callback window,
message. That divergence is intentional and permanent.

---

## 7. Fonts — two real faces, and a phantom list to ignore

`@font-face` rules were enumerated AND cross-checked against what actually loaded over the
network. **A face with rules but no loaded file is a phantom and must never book a
substitution floor.**

| family | declared | loaded | verdict |
|---|---|---|---|
| Roboto Condensed | yes | **yes** — `ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQk6YvM.woff2`, 200 | REAL. Display face, bound to `var(--font)`. Body font-family resolves to `"Roboto Condensed", sans-serif`. |
| Rubik | yes | **yes** — `iJWKBXyIfDnIV7nBrXyw023e.woff2`, 200 | REAL. Paragraph face, bound to `var(--paragraph-font)`. |
| Material Icons | yes | **yes** — `flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2`, 200 | REAL, but an ICON font, not a text face. Matched by `iconFontFamilies`. |
| Material Symbols Outlined | yes | no file | phantom |
| Roboto | yes | no file | phantom |
| Roboto Flex | yes | no file | phantom |
| Rajdhani | yes | no file | phantom |
| Racing Sans One | yes | no file | phantom |
| Heebo | yes | no file | phantom |
| Lato | yes | no file | phantom |
| `slick` | yes | no file | phantom (carousel glyph font) |
| `gform-icons-theme`, `gform-icons-common` | yes | no file | phantom (Gravity Forms glyphs) |
| `impact`, `Arial`, `serif`, `system-ui`, `monospace`, `inherit`, `none` | n/a | n/a | not faces — CSS keywords and system stacks picked up by the family scrape |

**No substitution floor is booked for this site.** Both real text faces — Roboto Condensed
and Rubik — are OFL 1.1 and both are served from Google Fonts, so `next/font/google`
reproduces them exactly. D-11's substitution clause does not fire, `docs/known-divergence.md`
carries no font row, and a heading that misses its metric target has a real bug rather than
an excuse.

Eleven of the fourteen declared families are phantoms. Booking a floor against any of them
would permanently excuse text that should converge.

---

## 8. What Prompt 1 wrote into `harness.config.mjs`

```
referenceOrigin   http://127.0.0.1:3198   (saved copy; REF_ORIGIN overrides)
sectionCandidates ['main > section', 'body > section', 'section']
chromeSelectors   ['header.pc', 'footer']         exact tag+class, no [class*=]
headerSelector    header.pc
drawerSelector    #mySidenav
logoSelector      header.pc img
iconFontFamilies  /fontawesome|icomoon|material symbols|material icons|elementskit|awb-icons|slick/i
breakpoints       diff [390, 768, 1440], extra [430], canonical 1440
```

---

## 9. Loose ends recorded rather than chased

- `section.inlinks-section.bleed-content` exists in the `/services` markup but never
  segments: it is below `minBandHeight` at all four widths. Not in the contract.
- `/privacy`'s `<title>` on the saved copy is "A. Fricker Roofing and Waterproofing", while
  the page heading names the same business — no mismatch, but the sibling-site title
  collision described at the top of this file was found on exactly this page, so re-verify
  the origin before re-capturing it.
- The reference's own `/service-areas` city grid lives in the footer band
  (`s18-service-areas`, 703px, 15 `.city-list` items). D-02 deletes it; one `SERVICE_AREA`
  sentence survives.
