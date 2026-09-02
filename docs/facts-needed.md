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
