# docs/sections.md — the section contract

Route x section x class. **This file is the source of truth for how every section is
measured.** `diff.mjs` parses it; a section that is not in it defaults to FIDELITY and gets
pixel-diffed against adapted content, which is the most expensive failure mode in this
process.

## THE TWO TABLES MUST BE EDITED TOGETHER

There is a machine-readable table (section 3) and a human table (section 4). **They describe
the same rows and must never drift.** Only the machine table is parsed; only the human table
is readable. Changing one without the other produces a contract that looks right and
measures something else.

`diff.mjs` **throws** if this file mentions FIDELITY/ADAPTED/NOVEL/DELETED but matches zero
rows. Of five sites before this one, two parsed ZERO rows and a third parsed 5 of 88 — every
one of them looked fine, because the file was full of the word ADAPTED.

## 1. The row format — exact, no deviation

```
| /route | ref-section-id | our-section-id | CLASS | reason |
```

- **route** — one of `/`, `/about`, `/services`, `/contact`, `/privacy`. Nothing else.
- **ref-section-id** — the reference's section id **as the probe emits it at the canonical
  breakpoint (1440)**, e.g. `s04-tulsa-s-1-contractor-for-roofing`. Never an ordinal on its
  own beyond what the probe itself emits, because ordinals shift when a band splits. Empty
  where the reference has no counterpart.
- **our-section-id** — lowercase, digits and hyphens only. This is the value our component
  must declare as `data-section="..."`, which is what identity pairing (PASS 1) joins on.
- **CLASS** — FIDELITY | ADAPTED | NOVEL | DELETED, uppercase.
- **reason** — free text.

## 2. Classes, and how each is measured

| class | measured by | done at |
|---|---|---|
| FIDELITY | pixel diff (`fidelityMode: 'auto'` degrades solid-colour bands to colour-excluded structural) | < 2% |
| ADAPTED | structural metrics, colour excluded entirely (A-8), `innerCount`/`innerRows`/`innerCols`/`position` advisory only (A-12) | < 5% |
| NOVEL | token conformance against the Prompt 5 `@theme` block | 0 violations |
| DELETED | not built. Reported once as REMOVED, never measured. | n/a |

**There are no FIDELITY rows on this site.** Every retained band has its business name,
phone, hours, service list and copy swapped, and the palette is randomized at token-write
time (A-7), so a pixel diff on any of them measures the words and the hue rather than the
layout. Calling one FIDELITY would be the misclassification CLAUDE.md names as the single
most expensive failure mode. Recorded here deliberately, not by omission.

NOVEL and DELETED rows collapse to one pass at the canonical breakpoint (A-9).

## 3. THE CONTRACT — machine-readable

| /route | ref-section-id | our-section-id | CLASS | reason |
|---|---|---|---|---|
| / | s00 | header | ADAPTED | shared shell; 5-route nav replaces a 166-item menu, NAP swapped |
| / | s01-award-winning-tulsa-roofing-compan | hero | ADAPTED | hero band kept, business/copy/CTA swapped; ref height is JS-unrolled |
| / | s02-partnering-with-tulsa-s-best | logos-strip | DELETED | manufacturer partnership logos are invented credentials (D-14) |
| / | s03 | brand-logo-strip | DELETED | second partnership/brand strip, same reason (D-14) |
| / | s04-tulsa-s-1-contractor-for-roofing | about | ADAPTED | split feature kept, copy written fresh (D-10) |
| / | s05-ensuring-a-smooth-roofing-experien | process | ADAPTED | four-step process row, our own steps |
| / | s06-our-roofing-services-in-tulsa-ok | tabbed | ADAPTED | two-tab grid kept, residential/commercial garage door work |
| / | s07 | marquee | ADAPTED | CSS ticker kept, phrases swapped |
| / | s08-premium-roofing-materials | doors | ADAPTED | carousel kept, door styles replace roof materials |
| / | s09-our-expertise-in-roofing-materials | components | ADAPTED | second carousel, garage door components |
| / | s10-best-waterproofing-solutions-for-t | urgent | ADAPTED | dark list+CTA band, our own urgency copy, no response-time claim |
| / | s11-best-exterior-services | services | ADAPTED | service grid, our eight services from lib/site.ts |
| / | s12-roofing-done-with-integrity | facts | ADAPTED | counters removed (job counts and years are D-14); row survives with hours, area, phone |
| / | s13-storm-damage-roofing-experts-rea | emergency | ADAPTED | phone-led dark band; no 24/7 or dispatch claim (D-06) |
| / | s14-we-believe-in-giving-back-to-the-c | community | ADAPTED | reversed split kept, service-area sentence replaces the giving-back copy |
| / | s15-committed-to-preserving-our-hometo | approach | ADAPTED | owner portrait and signature removed, layout survives in company voice |
| / | s16-we-love-hearing-from-our-customers | testimonial | DELETED | reviews and ratings are forbidden outright (D-13) |
| / | s17-contact-form | contact | ADAPTED | form band kept; email field removed, five D-05 fields, no backend |
| / | s18-service-areas | footer | ADAPTED | city grid deleted (D-02), one SERVICE_AREA sentence survives |
| / | | map | NOVEL | D-08 requires a home map; the reference has no map band on any saved page |
| /about | s00 | header | ADAPTED | shared shell |
| /about | s01-about-a-fricker-roofing-and-water | who | ADAPTED | about band kept; no named people, no staff portraits (D-17) |
| /about | s02-our-services | how | ADAPTED | second about band becomes our how-we-work step row |
| /about | s03-we-love-hearing-from-our-customers | testimonial | DELETED | reviews and ratings (D-13) |
| /about | s04-contact-form | contact | ADAPTED | shared contact band |
| /about | s05-service-areas | footer | ADAPTED | shared shell, city grid deleted |
| /about | | hero | NOVEL | the reference /about opens on a band with no h1; ours needs one |
| /about | | facts | NOVEL | hours, service area and phone, replacing nothing |
| /about | | about-cta | NOVEL | bridges into the shared tail so the page does not end on a step row |
| /about | | map | NOVEL | shared tail carries the coordinate map (D-08) |
| /services | s00 | header | ADAPTED | shared shell |
| /services | s01-commercial-roofing-services-in-tul | hero | ADAPTED | service-outer hero, our copy |
| /services | s02-partnering-with-tulsa-s-best | logos-strip | DELETED | partnership logos (D-14) |
| /services | s03-our-commercial-roofing-services-in | services | ADAPTED | service grid, our eight services |
| /services | s04-let-us-handle-your-commercial-roof | service-detail | ADAPTED | the per-service detail band; ours repeats it eight times, one per anchor |
| /services | s05-we-love-hearing-from-our-customers | testimonial | DELETED | reviews and ratings (D-13) |
| /services | s06-contact-form | contact | ADAPTED | shared contact band |
| /services | s07-service-areas | footer | ADAPTED | shared shell |
| /services | s04-let-us-handle-your-commercial-roof | spring-repair | ADAPTED | repeat of s04-let-us-handle-your-commercial-roof, anchor 1 of 8 |
| /services | s04-let-us-handle-your-commercial-roof | opener-repair | ADAPTED | repeat of s04, anchor 2 of 8 |
| /services | s04-let-us-handle-your-commercial-roof | cable-roller-track | ADAPTED | repeat of s04, anchor 3 of 8 |
| /services | s04-let-us-handle-your-commercial-roof | panel-replacement | ADAPTED | repeat of s04, anchor 4 of 8 |
| /services | s04-let-us-handle-your-commercial-roof | off-track-correction | ADAPTED | repeat of s04, anchor 5 of 8 |
| /services | s04-let-us-handle-your-commercial-roof | new-door-installation | ADAPTED | repeat of s04, anchor 6 of 8 |
| /services | s04-let-us-handle-your-commercial-roof | commercial-roll-up | ADAPTED | repeat of s04, anchor 7 of 8 |
| /services | s04-let-us-handle-your-commercial-roof | maintenance-tune-up | ADAPTED | repeat of s04, anchor 8 of 8 |
| /services | | faq | NOVEL | the FAQ route is deleted (D-01); it lives here in-page and has no reference band |
| /services | | services-cta | NOVEL | bridges the accordion into the shared tail |
| /services | | map | NOVEL | shared tail coordinate map (D-08) |
| /contact | s00 | header | ADAPTED | shared shell |
| /contact | s01-contact-us | breadcrumb | ADAPTED | breadcrumb band, our two-level trail |
| /contact | s02-contact-form | contact | ADAPTED | standalone form band; email field removed, five D-05 fields, no backend |
| /contact | s03-service-areas | footer | ADAPTED | shared shell |
| /contact | | hero | NOVEL | the mapped trio emits zero h1; the page hero supplies the only one |
| /contact | | next-steps | NOVEL | what happens after you get in touch; process only, no claims |
| /contact | | map | NOVEL | D-08 requires the contact map at zoom 15, beside the form |
| /privacy | s00 | onetap-widget | DELETED | third-party accessibility widget; not shipped, and not a band we clone |
| /privacy | s01 | header | ADAPTED | shared shell |
| /privacy | s02-a-fricker-roofing-and-waterproofi | privacy-body | ADAPTED | the blankpage container is kept; the policy text is entirely ours (D-16) |
| /privacy | s03-service-areas | footer | ADAPTED | shared shell |

Totals: 62 rows — 0 FIDELITY, 47 ADAPTED, 9 NOVEL, 6 DELETED, across 5 routes.

## 4. The same rows, human-readable

### `/` — home, 19 reference bands + 1 of ours

**Prompt 3 reordered three of them.** Our render order is header, hero, **services**,
about, process, **emergency**, tabbed, marquee, doors, components, **facts**, urgent,
community, approach, map, contact, footer. Relative to the reference that moves `services`
from 11th to 2nd, `emergency` from 13th to 5th, and `facts` ahead of `urgent`. Reordering
is **not** a class change and none of these rows was reclassified.

The reference home page is 19 bands. Sixteen are retained and adapted, three are deleted
(two partnership-logo strips and the testimonial band), and one band of ours has no
counterpart at all: the coordinate map D-08 requires. Two of the deletions are D-14
(invented credentials) and one is D-13 (reviews).

The heaviest bands in the reference — hero 5324, `roofing-materials` 7740, `services` 3189,
`contact-new` 4518 — are all JS-unrolled carousels or repeated cards whose runtime never
initialises on the saved copy. Their heights are not a convergence target; see
`docs/profile.md` section 5 and `docs/known-divergence.md`.

### `/about` — 6 reference bands, 4 of ours added

The reference `/about` is unusually thin: it opens straight into `team-one` with no hero
band, then `team-three`, testimonial, contact, footer. We add a page hero (nothing else
emits an h1), a facts row, a CTA band and the shared-tail map. The two team bands are
retained structurally but carry no named people and no staff portraits — inventing either
is a D-17 violation, not a content gap.

### `/services` — 8 reference bands, 11 of ours

This route absorbs everything the pre-existing build spread across nine per-service routes
plus a separate FAQ page. D-01 permits sections inside a page but not extra routes, so each
service is an in-page anchor and the FAQ is an in-page accordion. The single reference
detail band `serviceouter-three` is repeated eight times, once per service anchor; each
repeat is measured against the same reference band. **Prompt 3 filled in that band's id on
all eight rows** — they previously carried an empty ref-section-id, which left them paired
against nothing and silently exempt from both the structural comparison and the length rule.
That is a contract correction, not a reclassification: the class on all eight was and
remains ADAPTED.

The grid above them is regrouped by **symptom** rather than by system or material, into
**five cards — the same card count the reference grid already has** (Roof Repair,
Replacement, New Installation, Coating, Inspection), so the regrouping costs nothing
geometrically. All eight CONSTANTS services appear exactly once, each under one symptom
group and each with its own anchor section below:

| symptom card | services it covers |
|---|---|
| It will not close | off-track and misaligned door correction; cable, roller and track repair |
| It came down hard and now it will not lift | spring repair and replacement |
| The opener runs but the door does not | opener repair and installation |
| Something hit it | panel replacement; new residential door installation |
| It is loud, it is slow, or the bay door has stopped | annual maintenance and tune-up; commercial and roll-up doors |

The home `services` grid shows **three of those five symptom cards** as a teaser and
enumerates no services of its own, which is why the eight still appear exactly once.

### `/contact` — 4 reference bands, 3 of ours

Breadcrumb and the standalone form band are retained. We add the page hero (the mapped trio
emits no h1), a next-steps row, and the zoom-15 map D-08 requires beside the form. The
reference form carries a `type="email"` control; ours cannot and does not.

### `/privacy` — 4 bands

`blankpage` is retained as a container with our own policy text. The accessibility widget
that segmentation picks up here (because `main > section` yields only one band on this
route and segmentation falls through to bare `section`) is DELETED.

## 5. What the build wave owes this file

Every component that stands in for a reference band **must declare
`data-section="<our-section-id>"`** using the exact id in the machine table. Identity
pairing (PASS 1) joins on that attribute; without it every row falls through to the
page-progress join, which mispairs precisely where the build deliberately reorders or drops
a band — which is what this build is required to do on 6 of the 62 rows.

As of Prompt 1 no component declares it yet. That is the first task of the build wave, and
it is a shared-shell edit for header and footer, so the lead makes it.


---

## 6. Prompt 3 — what changed in this file, and what deliberately did not

**Reclassifications: zero.** Every retained band still has a structurally comparable
counterpart, and `process.md` names ADAPTED -> NOVEL as the move to avoid. The candidates
were checked one at a time and all were rejected:

| row | why it looked like a candidate | why it stays ADAPTED |
|---|---|---|
| `/` `facts` | reference counters (job counts, years) are gone under D-14; ours carries hours, area and phone | still a short heading-only row of the same shape; the geometry is fully comparable |
| `/` `community` | "giving back" copy replaced by the service-area sentence | the reversed split is retained intact; only the words moved |
| `/` `approach` | owner portrait and signature removed under D-17 | the band, its split and its type scale survive; a portrait is an asset slot, not a class |
| `/` `doors` | roof materials become door styles | same carousel, same card count, same measurement |
| `/about` `how` | a service list becomes a how-we-work step row | same step row, same item count; ADAPTED is exactly what "content deliberately swapped" means |
| `/services` `services` | five service cards become five symptom cards | card count and grid geometry unchanged; the regrouping is content, not class |

**One contract correction**, described above: the eight `/services` anchor rows now carry
`s04-let-us-handle-your-commercial-roof` as their ref-section-id in both tables.

Reordering (3 rows), dropping (`logos-strip`, `brand-logo-strip`, `testimonial`) and
regrouping the services by symptom are content and layout decisions. **None of them is a
class change**, and none of them was used as a reason to move a row out of ADAPTED.

Totals are unchanged: 62 rows, 0 FIDELITY, 47 ADAPTED, 9 NOVEL, 6 DELETED.
