# docs/facts-needed.md — every TODO(fact)

Anything not in CLAUDE.md CONSTANTS is `TODO(fact):` and lands here. Never guessed, never
filled from the reference, never invented to complete a layout slot (D-17).

## Emitted in code as of Prompt 1

| where | TODO(fact) |
|---|---|
| `app/page.tsx`, process step 2 | typical lead time from call to visit |
| `app/page.tsx`, the urgent/emergency band | out-of-hours cover, if any — the site currently claims none, and D-06 forbids inventing a 24/7 or emergency-dispatch claim |
| `app/contact/page.tsx`, next-steps step 2 | typical callback time |

## Known-needed, not yet emitted, blocking a reference slot

The reference fills each of these; we cannot, so the slot is a `TODO(fact):` chip at the
correct dimensions or the band is deleted outright. Listed so the build wave does not
rediscover them one at a time.

| reference slot | fact needed | register |
|---|---|---|
| `logos` / `brand-logo` strips on `/` and `/services` | manufacturer partnerships, authorizations, dealer status | D-14 — band DELETED |
| `feature` counters on `/` | years in business, jobs completed, technician count | D-14 — counters removed, row survives with hours/area/phone |
| `testimonial` bands on `/`, `/about`, `/services` | customer reviews, names, star ratings, review counts | D-13 — band DELETED, no `Review` or `AggregateRating` JSON-LD at all |
| `team-one` / `team-three` on `/about` | named staff, roles, bios, portraits | D-17 — layout kept, company voice, no people |
| any badge row | licensed / bonded / insured, license numbers, BBB, certifications | D-14 |
| any pricing slot | prices, "starting at", call-out fees, discounts | D-12 — none permitted; "free estimate" is allowed |
| any warranty slot | warranty terms, guarantees | D-14 |
| response-time copy anywhere | same-day availability, emergency dispatch window, service radius | D-06 / D-17 |

## Added by Prompt 2 — asset slots that cannot be filled without a fact

| slot ID | route / section | fact needed | register |
|---|---|---|---|
| `logo-wordmark` | header, all routes, 160x64 at 1440 / 100x40 at 390-768 | **the logo asset itself.** Rendered as a wordmark in the display font until a file exists. No icon, no lockup, no invented emblem. | D-09 / D-17 |
| `logo-footer` | footer, all routes, 185x80 | the same logo, footer lockup | D-09 / D-17 |
| `badge-bbb` | footer, 200x42 | accreditation, if any. A `TODO(fact)` chip holds the box. | D-14 |
| `badge-signature-strip` | `/` about band, 252x60 | credential or signature lockup | D-14 |
| `review-rating-strip` | `/` hero and `/` contact band, 300x39 / 424x60 / 284x56 | rating source and score | D-13 — forbidden outright, the geometry survives as a `TODO(fact)` chip row |
| `partner-logo-strip` | `/` and `/services`, 13 marks at 150x100 | manufacturer partnerships, dealer status | D-14 — band DELETED |
| `icon-social` | footer, 2 marks at 50x50 | **social profiles, if any.** None exist, so no social links are shipped. | D-17 |
| `community-photo`, `approach-photo`, `who-photo`, `emergency-vehicle`, `breadcrumb-vehicle` | `/`, `/about`, `/contact` | these are their staff, owner and branded-vehicle shots. Ours are generated as non-identifying, unbranded equivalents. No named people, no portraits. | D-09 / D-17 |

Full geometry for every slot is in `assets/INVENTORY.md`.

## Added by Prompt 3 — facts the copy deliberately does not assert

`content/copy.ts` contains no credential, no year count, no job count, no review, no price,
no warranty term, no response time and no team size. Every one of those was available as an
easy sentence and none was written. The proposition is transparency, and the honest form of
it is saying what is not known:

- **out-of-hours cover** — the `emergency` band on `/` states that outside 7am-7pm the phone
  reaches nobody. If cover ever exists, that sentence is the one that changes.
- **typical callback time** — the copy says "inside the window you chose" and never a number.
- **service radius** — `SERVICE_AREA` is the only geographic claim.

## Added by Prompt 6+7 — the chips that are now RENDERED, visibly

Prompt 1's table listed `TODO(fact)` slots that were "known-needed, not yet emitted". The
build wave emits three of them as visible chips on the page, via
`components/ui/TodoFact.tsx`. Visible is the point: a `TODO(fact)` that lives only in a
source comment is a fact that ships missing.

| where | rendered chip | reference slot it holds | register |
|---|---|---|---|
| `/` hero | `TODO(fact): rating source and score` | `review-rating-strip`, 300x39 @1440 | D-13 |
| `/` `about` band | `TODO(fact): licensed / bonded / insured status`, `TODO(fact): years in business` | `badge-signature-strip`, 252x60 | D-14 |
| contact band, all four routes that carry it | `TODO(fact): rating source and score`, `TODO(fact): accreditation, if any` | `review-rating-strip`, 424x60 @1440 / 284x56 @390 | D-13 / D-14 |

`TodoFact` paints only in existing tokens (`border-border` plus the muted ink for the band
it sits on) and is never an action, so it cannot move `contrast.mjs` and cannot touch
`rendertruth.mjs`'s `cta-primacy` check.

**Nothing else was invented to fill a slot.** `/about` renders no credential, year-founded,
headcount or certification chip because its Prompt 3 copy asserts none of those — the
`facts` row there carries hours, service area and phone, all resolved through `lib/site.ts`.
`/services` carries no price, no warranty term and no response time. The three copy-level
facts the site deliberately does not assert (out-of-hours cover, typical callback time,
service radius) are unchanged and still stated as unknowns rather than filled in.

## Fictional CONSTANTS that must be replaced before public launch

These are ground truth for the build and are NOT `TODO(fact)`. They belong in
`docs/PRE-LAUNCH.md` as must-replace-before-public, and are repeated here so the two lists
cannot drift:

- business name `Vault Garage Door Repairs`
- phone `(918) 555-0117` — 555-01XX reserved range, cannot ring anyone
- address `4418 Kestrel Hollow, Broken Arrow, OK 74012` — does not exist, never geocoded
- coordinates `36.0526,-95.7908` — real Broken Arrow coordinates, the only geocodable fact
- hours `7 days, 7:00 AM - 7:00 PM`
- service area `Serving Broken Arrow and the greater Tulsa metro.`
- domain `vaultgaragedoorrepairs.site`
