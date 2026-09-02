# docs/content-divergence.md — Prompt 3

The copy is in `content/copy.ts`. This file records the gates it passes and the four
structural changes required of it. **Regenerate the table, never hand-edit it:**

```bash
REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs   # verify the title first
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/refcopy.mjs      # -> .harness/refcopy.json
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/similarity.mjs
```

## 1. Result

| gate | rule | result |
|---|---|---|
| 5-gram | zero shared 5-grams against the **entire** reference corpus, not just the paired band | **58 / 58 pass** |
| trigram | Jaccard <= 0.15 against the paired reference section, stopwords and industry allowlist stripped | **58 / 58 pass** |
| length | every measured block within +/-10% of its reference slot's character count | **32 / 32 pass**, 10 EXEMPT |

Two genuine lifts were caught by the 5-gram gate on the first run. Both were rewritten:

| where | the shared 5-gram | fix |
|---|---|---|
| `/contact` `breadcrumb` | `contact us home contact us` | heading became "Get in touch"; the trail is Home / Contact. 25 chars against a 26-char reference band. |
| `/privacy` `privacy-body` | `we do not knowingly collect` | boilerplate that reads generic and is not. Rewritten as "nothing here is deliberately gathered from anybody under the age of thirteen". |

The second is the exact failure a sibling site hit in the same place. A privacy policy is
the highest-risk block in this build for accidental lifting, because the boilerplate really
is shared across thousands of sites and none of it feels copied while you are writing it.

## 2. Per-section overlap table

```
route | section | ref | our chars | ref chars | Δ% | 5-grams | trigram | status
------|---------|-----|-----------|-----------|----|---------|---------|-------
/ | header | s00 | 55 | 2177 | -97.5 | 0 | 0.000 | PASS (EXEMPT)
/ | hero | s01-award-winning-tuls | 611 | 675 | -9.5 | 0 | 0.000 | PASS
/ | services | s11-best-exterior-serv | 2015 | 2239 | -10 | 0 | 0.000 | PASS
/ | about | s04-tulsa-s-1-contract | 665 | 658 | +1.1 | 0 | 0.000 | PASS
/ | process | s05-ensuring-a-smooth- | 622 | 636 | -2.2 | 0 | 0.000 | PASS
/ | emergency | s13-storm-damage-roofi | 402 | 425 | -5.4 | 0 | 0.000 | PASS
/ | tabbed | s06-our-roofing-servic | 507 | 554 | -8.5 | 0 | 0.000 | PASS
/ | marquee | s07 | 103 | 104 | -1 | 0 | 0.000 | PASS
/ | doors | s08-premium-roofing-ma | 974 | 1063 | -8.4 | 0 | 0.000 | PASS
/ | components | s09-our-expertise-in-r | 137 | 134 | +2.2 | 0 | 0.000 | PASS
/ | facts | s12-roofing-done-with- | 141 | 155 | -9 | 0 | 0.000 | PASS
/ | urgent | s10-best-waterproofing | 388 | 358 | +8.4 | 0 | 0.000 | PASS
/ | community | s14-we-believe-in-givi | 476 | 448 | +6.3 | 0 | 0.000 | PASS
/ | approach | s15-committed-to-prese | 694 | 735 | -5.6 | 0 | 0.000 | PASS
/ | map | - | 179 | - | - | 0 | 0.000 | PASS
/ | contact | s17-contact-form | 480 | 507 | -5.3 | 0 | 0.000 | PASS
/ | footer | s18-service-areas | 169 | 781 | -78.4 | 0 | 0.000 | PASS (EXEMPT)
/ | (metadata) | metadata | 302 | - | - | 0 | 0.001 | PASS
/about | header | s00 | 55 | 2177 | -97.5 | 0 | 0.000 | PASS (EXEMPT)
/about | hero | - | 155 | - | - | 0 | 0.000 | PASS
/about | who | s01-about-a-fricker-ro | 1202 | 1290 | -6.8 | 0 | 0.000 | PASS
/about | how | s02-our-services | 141 | 131 | +7.6 | 0 | 0.000 | PASS
/about | facts | - | 99 | - | - | 0 | 0.000 | PASS
/about | about-cta | - | 77 | - | - | 0 | 0.000 | PASS
/about | map | - | 72 | - | - | 0 | 0.000 | PASS
/about | contact | s04-contact-form | 480 | 511 | -6.1 | 0 | 0.000 | PASS
/about | footer | s05-service-areas | 169 | 781 | -78.4 | 0 | 0.000 | PASS (EXEMPT)
/about | (metadata) | metadata | 271 | - | - | 0 | 0.002 | PASS
/services | header | s00 | 55 | 2177 | -97.5 | 0 | 0.000 | PASS (EXEMPT)
/services | hero | s01-commercial-roofing | 777 | 807 | -3.7 | 0 | 0.000 | PASS
/services | services | s03-our-commercial-roo | 3085 | 3089 | -0.1 | 0 | 0.000 | PASS
/services | spring-repair | s04-let-us-handle-your | 822 | 785 | +4.7 | 0 | 0.000 | PASS
/services | opener-repair | s04-let-us-handle-your | 816 | 785 | +3.9 | 0 | 0.000 | PASS
/services | cable-roller-track | s04-let-us-handle-your | 819 | 785 | +4.3 | 0 | 0.000 | PASS
/services | panel-replacement | s04-let-us-handle-your | 844 | 785 | +7.5 | 0 | 0.000 | PASS
/services | off-track-correction | s04-let-us-handle-your | 840 | 785 | +7 | 0 | 0.000 | PASS
/services | new-door-installation | s04-let-us-handle-your | 851 | 785 | +8.4 | 0 | 0.000 | PASS
/services | commercial-roll-up | s04-let-us-handle-your | 831 | 785 | +5.9 | 0 | 0.000 | PASS
/services | maintenance-tune-up | s04-let-us-handle-your | 809 | 785 | +3.1 | 0 | 0.000 | PASS
/services | service-detail | s04-let-us-handle-your | 845 | 785 | +7.6 | 0 | 0.000 | PASS
/services | faq | - | 142 | - | - | 0 | 0.000 | PASS
/services | services-cta | - | 89 | - | - | 0 | 0.000 | PASS
/services | map | - | 78 | - | - | 0 | 0.000 | PASS
/services | contact | s06-contact-form | 480 | 511 | -6.1 | 0 | 0.000 | PASS
/services | footer | s07-service-areas | 169 | 781 | -78.4 | 0 | 0.000 | PASS (EXEMPT)
/services | (metadata) | metadata | 308 | - | - | 0 | 0.001 | PASS
/contact | header | s00 | 55 | 2177 | -97.5 | 0 | 0.000 | PASS (EXEMPT)
/contact | hero | - | 147 | - | - | 0 | 0.000 | PASS
/contact | breadcrumb | s01-contact-us | 25 | 26 | -3.8 | 0 | 0.000 | PASS
/contact | contact | s02-contact-form | 1307 | 1331 | -1.8 | 0 | 0.004 | PASS
/contact | next-steps | - | 273 | - | - | 0 | 0.000 | PASS
/contact | map | - | 67 | - | - | 0 | 0.000 | PASS
/contact | footer | s03-service-areas | 169 | 781 | -78.4 | 0 | 0.000 | PASS (EXEMPT)
/contact | (metadata) | metadata | 260 | - | - | 0 | 0.003 | PASS
/privacy | header | s01 | 55 | 2177 | -97.5 | 0 | 0.000 | PASS (EXEMPT)
/privacy | privacy-body | s02-a-fricker-roofing- | 14606 | 16077 | -9.1 | 0 | 0.000 | PASS
/privacy | footer | s03-service-areas | 169 | 781 | -78.4 | 0 | 0.000 | PASS (EXEMPT)
/privacy | (metadata) | metadata | 247 | - | - | 0 | 0.000 | PASS
```

## 3. The four structural changes

### 3.1 — three sections reordered

Our home order is header, hero, **services**, about, process, **emergency**, tabbed,
marquee, doors, components, **facts**, urgent, community, approach, map, contact, footer.

| section | reference position | ours | why |
|---|---|---|---|
| `services` | 11th | **2nd** | the symptom grid is the proposition. Somebody arriving with a stuck door should meet "what is the door doing?" before they meet a company story. |
| `emergency` | 13th | **5th** | it is where we say what we will *not* claim: no after-hours cover, no dispatch promise. Buried at 13 that reads as a disclaimer; at 5 it reads as the point. |
| `facts` | 12th | **10th**, ahead of `urgent` | hours, area and phone belong before the "things worth saying out loud" list, not after it. |

Reordering is not a class change. `docs/sections.md` section 6 records that explicitly.

### 3.2 — two reference sections dropped, two of ours added

Dropped — both are already DELETED in the contract; these are the two this gate names:

| dropped | reference band | reason |
|---|---|---|
| `logos-strip` | `s02-partnering-with-tulsa-s-best`, 13 manufacturer and association marks | D-14. Every one is a credential we have not earned and a trademark that is not ours. |
| `testimonial` | `s16-we-love-hearing-from-our-customers`, 2,157 chars of reviews and 10 reviewer avatars | D-13. Reviews, ratings and `Review` / `AggregateRating` markup are forbidden outright. |

Added — both NOVEL, with no counterpart anywhere on the saved reference:

| added | route | reason |
|---|---|---|
| `map` | `/`, and the shared tail | D-08 requires a coordinate map on the home page. The reference has no map band on any of its five pages. |
| `next-steps` | `/contact` | what happens after you get in touch, as process only. It exists because the proposition is transparency, and the one thing a callback form hides is the sequence behind it. |

`brand-logo-strip` is a third drop, and there are seven further NOVEL additions. The full
list is in `docs/sections.md`.

### 3.3 — proposition: TRANSPARENCY, held on all five routes

**You are told what is wrong and why.** Never speed. There is no 24/7 claim, no emergency
dispatch, no same-day promise and no response time anywhere in `content/copy.ts`. Prompt 1
removed a "24/7 emergency" claim and same-day dispatch copy from this repo and neither has
been allowed back in.

| route | where it lands |
|---|---|
| `/` | hero: "the reason, the part it sits on, and what happens if you leave it a month". `about`: the figure comes after the explanation, not instead of it. `emergency`: outside 7am–7pm the phone reaches nobody, said plainly. `approach`: "if a quote cannot survive being explained, it should not have been given". |
| `/about` | `who`: the visit sequence, ending on "we will also tell you what we do not know". |
| `/services` | all eight anchors end on a *What you are told on site* paragraph. `service-detail` says the repetition is deliberate. |
| `/contact` | "there is no inbox behind this form"; the hours limitation stated before the form rather than after it. |
| `/privacy` | the entire document is the proposition turned on the site itself: what it collects, and every place where the answer is nothing. |

### 3.4 — services regrouped by SYMPTOM

The reference groups by system and by material (Roof Repair / Replacement / Installation /
Coating / Inspection, and Clay / Slate / DaVinci / Metal / Stone-Coated Steel). We group by
what the customer can actually observe from the floor of their own garage.

**Five symptom groups, matching the reference grid's own five cards**, so the regrouping is
free geometrically:

| symptom | services, each appearing exactly once |
|---|---|
| It will not close | off-track and misaligned door correction; cable, roller and track repair |
| It came down hard and now it will not lift | spring repair and replacement |
| The opener runs but the door does not | opener repair and installation |
| Something hit it | panel replacement; new residential door installation |
| It is loud, it is slow, or the bay door has stopped | annual maintenance and tune-up; commercial and roll-up doors |

All eight CONSTANTS services are present and each appears **once**, with its own anchor
section on `/services`. The home `services` grid shows three of the five symptom cards as a
teaser and enumerates no services itself, so nothing is double-counted.

## 4. Length exemptions — two, both shared-shell

Configured in `harness.config.mjs` under `lengthExempt`. They appear ten times in the table
because header and footer are rows on all five routes. Reported EXEMPT, never PASS.

| row | ref chars | ours | reason |
|---|---|---|---|
| `*::header` | 2,177 | 55 | **D-01 + D-02.** The reference header is a 166-item mega menu across 158 list items, covering a blog, careers, a gallery, per-service routes and a `/locations` city tree. D-01 fixes us at five routes; D-02 deletes the locations tree outright. There is no honest way to reach that count, and padding a nav with labels that lead nowhere would be worse than the miss. |
| `*::footer` | 781 | 169 | **D-02.** 744 of those 781 chars are the service-area city grid: 30 paragraphs of Tulsa-metro place names. D-02 deletes the grid and leaves exactly one `SERVICE_AREA` sentence as its only survivor, which is the content this row is allowed to carry. |

Both rows are still measured structurally against `STRUCT_THRESHOLD`. The exemption is from
the *length* rule only, not from measurement.

### Exemptions that were refused

| row | ref chars | why an exemption was tempting | what happened instead |
|---|---|---|---|
| `/contact` `breadcrumb` | 26 | a 26-character band with almost nothing to write | matched at 25 chars, -3.8%. A short reference DOM is not a DOM the rule cannot apply to. |
| `/privacy` `privacy-body` | 16,077 | the site has no analytics, no cookies, no email and no backend, so the *honest* policy is short | written out to 14,606 chars, -9.1%, by covering every section a policy of that length has and saying **nothing** wherever nothing is the answer. First draft was -34.4%. |
| `/services` `services` | 3,089 | the grid was regrouped, so "the content is different now" was available as a reason | rewritten to 3,085 chars, -0.1%. First draft was -20.5%. |
| `/` `tabbed` | 554 | a mostly-label band | rewritten to 507, -8.5%, by giving each tab item a real line instead of a stub. |
| `/` `services` | 2,239 | three cards against the reference's three | rewritten to 2,015, -10.0%. First draft was -33.9%. |

## 5. SEO metadata

Titles and descriptions live in `content/copy.ts` under `routes[route].meta`, and every
`app/**/page.tsx` reads them through `routeMeta()`. **No page file declares a title or a
description of its own.** `routeMeta` throws on an unknown route, so a route added without
copy fails the build rather than silently inheriting the root default.

`title.absolute` is used deliberately: `app/layout.tsx` carries a `%s | Vault Garage Door
Repairs` template, and routing an already-complete title through it would append the brand
twice and change a string the lexical gate has already scored.

All five metadata rows are scored by the gate — 0 shared 5-grams, trigram 0.000 to 0.003 —
so the wrong-city defect a sibling shipped across five hardcoded blocks is measurable here
rather than invisible.

## 6. Reclassification

**Zero.** Six candidates were considered and all six stay ADAPTED; the reasoning is in
`docs/sections.md` section 6. One **contract correction** was made instead: the eight
`/services` anchor rows previously carried an empty ref-section-id, which left them paired
against nothing and silently exempt from both the structural comparison and the length rule.
They now carry `s04-let-us-handle-your-commercial-roof` in both tables and are measured
against it — each lands between +3.1% and +8.4%.

## 7. Facts

No fact was invented. Every business value resolves through `lib/site.ts`. Credentials,
years in business, review counts, prices, warranty terms, response times and team size do
not appear in the copy at all, and are listed in `docs/facts-needed.md`.
