# Resolved Route Map

**`ROUTE_POLICY = SUBSET`** (changed from MIRROR at the Phase gate).
**17 rows. This table is resolved and binding — no further check-ins exist.**

## The table

| # | our route | MODE | template class | target source / composition |
|---|---|---|---|---|
| 1 | `/` | CLONE | home | `/` |
| 2 | `/emergency-garage-door-repair` | CLONE | service-outer | `/emergency-services` |
| 3 | `/residential-garage-door-services` | CLONE | service-outer | `/residential-roofing-services` |
| 4 | `/residential-garage-doors` | CLONE | service-outer | `/residential-roofing-material` |
| 9 | `/residential-garage-door-services/maintenance-tune-up` | CLONE | service-inner | `/residential-roofing-services/roof-inspection` |
| 10 | `/residential-garage-door-services/spring-repair` | CLONE | service-inner | `/residential-roofing-services/roof-repair` |
| 11 | `/residential-garage-door-services/panel-replacement` | CLONE | service-inner | `/residential-roofing-services/roof-replacement` |
| 12 | `/residential-garage-door-services/new-door-installation` | CLONE | service-inner | `/residential-roofing-services/new-roof-installation` |
| 13 | `/residential-garage-door-services/off-track-cable-repair` | CLONE | service-outer | `/residential-roofing-services/water-proofing` |
| 14 | `/commercial-garage-door-services` | CLONE | service-outer | `/commercial-roofing-services` |
| 20 | `/commercial-garage-door-services/inspection` | CLONE | service-inner | `/commercial-roofing-services/commercial-roof-inspection` |
| 21 | `/commercial-garage-door-services/repair` | CLONE | service-inner | `/commercial-roofing-services/commercial-roof-repair` |
| 24 | `/commercial-garage-door-services/maintenance-program` | CLONE | service-outer | `/commercial-roofing-services/roof-maintenance-program` |
| — | `/contact` | SYNTHESIZE | form-page | `breadcrumb` + `contact-one` + `map-sec` |
| — | `/service-areas` | SYNTHESIZE | generic-content | `serviceareaouter-one` + `map-sec` |
| — | `/faqs` | SYNTHESIZE | generic-content | `faq-one` + `faq-two` |
| — | `/privacy-policy` | SYNTHESIZE | generic-content | `blankpage` |

Row numbers are the original MIRROR indices, kept so this table stays traceable
against `docs/01-page-inventory.md`. Dropped at the gate: **5-8, 15-19, 22, 23, 25**.

## Gate rulings applied

**Dropped 12 rows.** Rows 5-8 (residential door materials), 15-19 (commercial
doors + materials), 22, 23 and 25 were structure looking for content — CONFIG
FACTS lists 6 services and MIRROR demanded 15 detail pages. CONFIG forbids
inventing content to fill a layout slot, so they are deleted rather than filled.
This also resolves the weakest binding in the previous table
(row 25, `roof-coating` -> opener repair) by deletion.

**Opener repair stays reachable.** It is a CONFIG FACTS service, so it is folded
into `/residential-garage-door-services` as a service entry rather than given its
own route. Per the gate ruling, row 25 is **not** resurrected.

**Four SYNTHESIZE rows added.** These have no target analog and are therefore
gated on **SYSTEM COMPLIANCE, not divergence** — zero raw hex/rgb/px in component
code, every type pair from the extracted scale, every padding/gap/container from
the extracted spacing scale, every section from `components/patterns/*` and
`components/ui/*`. Violation count must be zero.

## Coverage against CONFIG FACTS services

All six configured services are reachable:

| service | route |
|---|---|
| garage door spring repair | `/residential-garage-door-services/spring-repair` |
| opener repair & installation | `/residential-garage-door-services` (folded, per gate) |
| off-track / cable repair | `/residential-garage-door-services/off-track-cable-repair` |
| panel replacement | `/residential-garage-door-services/panel-replacement` |
| new door installation | `/residential-garage-door-services/new-door-installation` |
| routine maintenance & tune-up | `/residential-garage-door-services/maintenance-tune-up` |

## CONFIG FORBIDDEN — structural deviations, reported not fixed

Intentional removals. **Never divergences, never iterated on.**

| removed | appeared on | reason |
|---|---|---|
| `testimonial` section | 10 of 12 exemplars | reviews / ratings |
| `logos`, `brand-logo` | 6 exemplars | manufacturer partnerships, awards |
| `team-one`, `team-three` | about class | staff photos, bios, named people |
| `.count` counters in `feature` + scroll handler | home | job counts, years in business |
| review-tab state | home | reviews |
| `/about-us` as a route | — | entire body FORBIDDEN; class survives, page does not |

### Shared-tail contraction — applied by lead before dispatch

The universal tail contracts site-wide:

```
  map-sec  >  testimonial  >  contact-new      (target)
  map-sec  >  contact-new                      (ours)
```

One shared change touching **all 10 affected routes**. Per the ownership rule the
lead makes it once, before dispatch — section agents never edit shared files.

Asset-side removals (55 further slots) are inventoried in `docs/assets.md`.
