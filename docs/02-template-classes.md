# STEP B — Template Classes

The theme names its own sections by template class (`serviceouter-*`,
`serviceinner-*`, `team-*`, `faq-*`, `contact-one`, `blankpage`). Clustering by
section sequence therefore lands on hard boundaries, not inferred ones.

## The universal skeleton

Every page except `/privacy-policy` is:

```
HEADER  >  [ class-specific body ]  >  SHARED TAIL  >  FOOTER
```

**SHARED TAIL** = `map-sec` → `testimonial` → `contact-new`. It is byte-identical
across 10 of 12 exemplars (heights 903 / 702 / 677 at 1440 on every page).
`testimonial` is CONFIG FORBIDDEN and is deleted site-wide, so our tail is
`map-sec` → `contact-new`.

## Page-level chrome (fixed across all classes)

| | value |
|---|---|
| container inner width | 360 @390 · 610 @640 · 720 @768 · 930 @1024 · **1120 @1440** |
| grid | Bootstrap 12-col (`.row` / `.col-md-*`), `--bs-gutter-x` 30px |
| header variant | **one variant only.** 3 stacked bars: emergency ribbon (41px) + contact bar (78px) + nav (46px) = 170px @1440; collapses to a single 110px bar @≤1024 |
| footer variant | **one variant only.** 703px @1440, 4-column link grid + `footer-bottom` copyright strip. 717px on `serviceinner` (one extra link row) |

## The 5 classes

### 1. `home` — 1 member
- Members: `/` — **canonical exemplar** (only member, and the richest page on the site)
- Sequence (20): `HEADER > hero-new > logos > brand-logo > about-us-new > steps > roofing-service > marquee > slatedroof-new > roofing-materials > waterproofing > services > feature > emergency > giving > map-sec > message-owner > testimonial > contact-new > FOOTER`
- Fixed: all. Varies: nothing (single member).
- Contributes 11 section patterns found nowhere else. This is the design-system source page.

### 2. `service-outer` (listing / index) — 7 members
- Members: `/residential-roofing-services`, `/residential-roofing-material`, `/commercial-roofing-services`, `/commercial-roofing-material`, `/emergency-services`, `/exteriors`†, `/premium-roofs`†  († discovered, not profiled — cap)
- **Canonical exemplar: `/residential-roofing-material`** — richest; its `logos` band is fully populated (306px vs 55px on thin members) and its `serviceouter-three` grid carries the most cards.
- Sequence (10): `HEADER > serviceouter-one > logos > serviceouter-two > serviceouter-three > template-ascend > SHARED TAIL > FOOTER`
- **Fixed:** sequence, all 10 slots, in order. **Varies:** card count in `serviceouter-three` (4–6), `logos` populated vs empty, `serviceouter-two` body length.

### 3. `service-inner` (detail) — 15 members
- Members: every leaf under `/residential-roofing-material/*`, `/residential-roofing-services/*`, `/commercial-roofing-material/*`, `/commercial-roofing-services/*`
- **Canonical exemplar: `/residential-roofing-material/asphalt-shingle-roof`** — richest; only member where all four `serviceinner-*` blocks and `blogs-one` are fully populated.
- Sequence (13): `HEADER > serviceinner-one > hero-new(inner-form) > logos > serviceinner-two > serviceinner-three > serviceinner-four > blogs-one > template-ascend > SHARED TAIL > FOOTER`
- **Fixed:** all 13 slots. **Varies:** `serviceinner-two/three` body height (433–523), `blogs-one` post count (3), FOOTER 703 vs 717.
- Note this class reuses `hero-new` from `home` in an `inner-form` variant — 423px, not 1168px. Same pattern, different modifier.

### 4. `form-page` — 1 member
- Members: `/contact-us` — **canonical exemplar**
- Sequence (5): `HEADER > breadcrumb > contact-one > map-sec > FOOTER`
- The only class that drops `testimonial` and `contact-new` from the tail — because `contact-one` *is* the form. The only class using `breadcrumb`.

### 5. `generic-content` — 5 members, 4 variants
One bespoke block between chrome and the shared tail.

| member | body | note |
|---|---|---|
| `/about-us` | `team-one > team-three` | **entirely FORBIDDEN** (staff photos, bios, named people) |
| `/faqs` | `faq-one > faq-two` | accordion class |
| `/service-areas` | `serviceareaouter-one` | interactive SVG county map |
| `/blogs` | `template-ascend` (2653px) | listing variant — the grid *is* the page |
| `/privacy-policy` | `blankpage` | **degenerate case: no tail at all.** `HEADER > blankpage > FOOTER` |

## SITE_CLASS — resolved

**`marketing`.** CONFIG says `auto`; the evidence:
- No cart, no SKU, no price, no basket → not commerce
- No routed panes, no client-side router, no auth → not app
- No persistent sidebar nav, no content column, no doc tree → not docs
- 20 distinct section archetypes on one page, each a full-bleed band with its own background treatment → marketing, decisively

## Decomposition unit — **the section**

The `main > section.<name>` element. This is the right unit because:
1. The theme already decomposes this way — each section is a semantically-named, self-contained, full-bleed band with its own padding (`75px 0` dominant) and its own background role.
2. Sections are **the reuse unit across classes**: `map-sec`, `contact-new`, `logos`, `template-ascend`, `hero-new` each appear verbatim on 3–10 pages.
3. Sections nest at most 3 levels (`section > .container > .row > .col`), so one agent can own one section end-to-end without touching a sibling.

**One agent owns one `section.<name>`.** 37 distinct sections exist; after
FORBIDDEN removal, **31** are buildable.
