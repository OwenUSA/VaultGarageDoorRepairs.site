# STEP A — Page Inventory

Crawl: `https://africkerroofing.com/`, depth 2, capped at **CRAWL_LIMIT 25**.
Raw trace: `.harness/out/inventory.json`.

**430 internal URLs were discovered; 25 were profiled.** The cap binds hard here —
the site is ~85% blog (`/blogs/*`, 300+ posts). BFS ordering meant the 25 profiled
pages are the service tree, which is the part that carries the design system.

Every height below is measured **after** the NitroPack fix described in
`docs/04-behavior-profile.md` — pre-fix heights were inflated by up to 2.7x.

| # | URL | Title (trunc) | H1 | Sections | Height @1440 |
|---|-----|---------------|----|---------:|-------------:|
| 1 | `/` | Roofing Company - Tulsa, OK | Award Winning Tulsa Roofing Company | 20 | 11800 |
| 2 | `/emergency-services` | Emergency Roofing Tulsa, OK | Emergency Roofing Services in Tulsa, OK | 10 | 6057 |
| 3 | `/residential-roofing-services` | Residential Roofing in Tulsa, OK | Residential Roofing Contractor in Tulsa, OK | 10 | 6980 |
| 4 | `/residential-roofing-material` | Residential Roofing Materials | Quality Residential Roofing Materials | 10 | 6430 |
| 5 | `/residential-roofing-material/asphalt-shingle-roof` | Asphalt Shingle Roofing Contractor | Asphalt Shingle Roofing Services | 13 | 7241 |
| 6 | `/residential-roofing-material/wood-shake` | Wood Shake Roofing Contractor | Wood Shake Roof Installation & Repair | 13 | 7188 |
| 7 | `/residential-roofing-material/slate-roof` | Slate Roofing Contractor | Slate Roofing Contractor in Tulsa, OK | 13 | 7203 |
| 8 | `/residential-roofing-material/synthetic-roof` | Synthetic Roofing Contractor | Synthetic Roofing Systems | 13 | 7180 |
| 9 | `/residential-roofing-services/roof-inspection` | Roof Inspection Tulsa, OK | Residential Roof Inspection | 13 | 7295 |
| 10 | `/residential-roofing-services/roof-repair` | Roof Repair Tulsa, OK | Residential Roof Repair | 13 | 7320 |
| 11 | `/residential-roofing-services/roof-replacement` | Roof Replacement Tulsa, OK | Residential Roof Replacement | 13 | 7210 |
| 12 | `/residential-roofing-services/new-roof-installation` | New Roof Installation | Residential New Roof Installation | 13 | 7245 |
| 13 | `/residential-roofing-services/water-proofing` | Roof Waterproofing Tulsa, OK | Basement Waterproofing Services | 10 | 6890 |
| 14 | `/commercial-roofing-services` | Commercial Roofing Tulsa, OK | Commercial Roofing Services | 10 | 7120 |
| 15 | `/commercial-roofing-material` | Commercial Roofing Materials | Commercial Roofing Materials | 10 | 6037 |
| 16 | `/commercial-roofing-material/tpo` | TPO Roofing Contractor | TPO Roofing Replacement & Repair | 13 | 7260 |
| 17 | `/commercial-roofing-material/epdm` | EPDM Roofing Contractor | EPDM Roofing Replacement & Repair | 13 | 7583 |
| 18 | `/commercial-roofing-material/modified-bitumen` | Modified Bitumen Roofing Contractor | Modified Bitumen Roofing Contractor | 13 | 7240 |
| 19 | `/commercial-roofing-material/ballast` | Ballasted Roofing Systems | Ballasted Roofing System for Businesses | 13 | 7255 |
| 20 | `/commercial-roofing-services/commercial-roof-inspection` | Commercial Roof Inspection | Commercial Roof Inspections | 13 | 7290 |
| 21 | `/commercial-roofing-services/commercial-roof-repair` | Commercial Roof Repair | Commercial Roof Repair | 13 | 7276 |
| 22 | `/commercial-roofing-services/commercial-roof-replacement` | Commercial Roof Replacement | Commercial Roof Replacement | 13 | 7554 |
| 23 | `/commercial-roofing-services/new-roof-installation` | Commercial Roof Installation | Commercial Roof Installation | 13 | 7230 |
| 24 | `/commercial-roofing-services/roof-maintenance-program` | Preventive Roof Maintenance | Preventive Commercial Roof Maintenance | 8 | 5739 |
| 25 | `/commercial-roofing-services/roof-coating` | Commercial Roof Coating | Commercial Roof Coating Services | 13 | 7301 |

## Supplemental class probe — beyond CRAWL_LIMIT, flagged

The 25-page cap returned **zero** contact, legal, listing, FAQ or about pages, so
the crawl alone cannot support STEP B. I profiled 5 extra pages **for template
classification only**; they are not part of the 25-page inventory and do not
enter the MIRROR route table as crawled rows.

`/contact-us` · `/about-us` · `/service-areas` · `/privacy-policy` · `/blogs` · `/faqs`

This is a deliberate, reported deviation. Without it the form, legal and listing
classes would have been guessed.

## UNREACHABLE

**None.** All 25 profiled pages returned HTTP 200 and rendered fully. No auth
walls, no geo gates, no pagination barriers. `/blogs` paginates via a
`loadmore.js` XHR "Show 14 More" button — reachable, but the 300+ posts behind
it were not profiled (cap).
