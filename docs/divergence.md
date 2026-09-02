# docs/divergence.md — ranked divergence table

Generated 2026-09-02T12:49:28.066Z by `src/diff.mjs`.
Rewritten each convergence loop. Ranked worst-first, normalized against each row's own threshold.

Rows: 181 · FAIL: 56 · PASS: 62 · BLOCKED: 28

## Top 10

route | section | bp | class | metric | value | threshold | status | advisory
------|---------|----|-------|--------|-------|-----------|--------|---------
/ | (page) | 1440 | PAGE | height delta % | 74.66 | 5 | FAIL | -
/ | (page) | 768 | PAGE | height delta % | 66.39 | 5 | FAIL | -
/services | (page) | 390 | PAGE | height delta % | 65.07 | 5 | FAIL | -
/ | (page) | 390 | PAGE | height delta % | 58.45 | 5 | FAIL | -
/services | (page) | 1440 | PAGE | height delta % | 46.53 | 5 | FAIL | -
/privacy | (page) | 1440 | PAGE | height delta % | 38.97 | 5 | FAIL | -
/ | s11-best-exterior-services | 768 | ADAPTED | structural deviation % | 24.31 | 5 | FAIL | advisory: innerCols ref=1 ours=2 (50%)
/ | s11-best-exterior-services | 390 | ADAPTED | structural deviation % | 23.94 | 5 | FAIL | advisory: innerCols ref=1 ours=2 (50%)
/ | s06-our-roofing-services-in-tulsa- | 390 | ADAPTED | structural deviation % | 18.17 | 5 | FAIL | advisory: none diverge
/ | s06-our-roofing-services-in-tulsa- | 768 | ADAPTED | structural deviation % | 18.06 | 5 | FAIL | advisory: none diverge

## Full table

route | section | bp | class | metric | value | threshold | status | advisory
------|---------|----|-------|--------|-------|-----------|--------|---------
/ | (page) | 1440 | PAGE | height delta % | 74.66 | 5 | FAIL | -
/ | (page) | 768 | PAGE | height delta % | 66.39 | 5 | FAIL | -
/services | (page) | 390 | PAGE | height delta % | 65.07 | 5 | FAIL | -
/ | (page) | 390 | PAGE | height delta % | 58.45 | 5 | FAIL | -
/services | (page) | 1440 | PAGE | height delta % | 46.53 | 5 | FAIL | -
/privacy | (page) | 1440 | PAGE | height delta % | 38.97 | 5 | FAIL | -
/ | s11-best-exterior-services | 768 | ADAPTED | structural deviation % | 24.31 | 5 | FAIL | advisory: innerCols ref=1 ours=2 (50%)
/ | s11-best-exterior-services | 390 | ADAPTED | structural deviation % | 23.94 | 5 | FAIL | advisory: innerCols ref=1 ours=2 (50%)
/ | s06-our-roofing-services-in-tulsa- | 390 | ADAPTED | structural deviation % | 18.17 | 5 | FAIL | advisory: none diverge
/ | s06-our-roofing-services-in-tulsa- | 768 | ADAPTED | structural deviation % | 18.06 | 5 | FAIL | advisory: none diverge
/about | (page) | 768 | PAGE | height delta % | 17.91 | 5 | FAIL | -
/ | s06-our-roofing-services-in-tulsa- | 1440 | ADAPTED | structural deviation % | 17.78 | 5 | FAIL | advisory: none diverge
/about | (page) | 1440 | PAGE | height delta % | 16.29 | 5 | FAIL | -
/ | s11-best-exterior-services | 1440 | ADAPTED | structural deviation % | 16.26 | 5 | FAIL | advisory: innerRows ref=2 ours=1 (50%), innerCount ref=3 ours=2 (33.33%)
/ | s10-best-waterproofing-solutions-f | 1440 | ADAPTED | structural deviation % | 14.76 | 5 | FAIL | advisory: innerRows ref=2 ours=1 (50%)
/ | s04-tulsa-s-1-contractor-for-roofi | 768 | ADAPTED | structural deviation % | 14.43 | 5 | FAIL | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=5 ours=1 (80%), innerCount ref=6 ours=2 (66.67%)
/ | s04-tulsa-s-1-contractor-for-roofi | 390 | ADAPTED | structural deviation % | 14.22 | 5 | FAIL | advisory: innerRows ref=5 ours=1 (80%), innerCount ref=6 ours=2 (66.67%)
/ | s04-tulsa-s-1-contractor-for-roofi | 1440 | ADAPTED | structural deviation % | 14.04 | 5 | FAIL | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=5 ours=1 (80%), innerCount ref=6 ours=2 (66.67%)
/services | s01-commercial-roofing-services-in | 390 | ADAPTED | structural deviation % | 13.18 | 5 | FAIL | advisory: innerRows ref=1 ours=2 (50%), innerCount ref=2 ours=5 (60%)
/ | s01-award-winning-tulsa-roofing-co | 1440 | ADAPTED | structural deviation % | 12.51 | 5 | FAIL | advisory: innerRows ref=3 ours=2 (33.33%), innerCount ref=4 ours=5 (20%)
/ | s07 | 1440 | ADAPTED | structural deviation % | 12.27 | 5 | FAIL | advisory: innerCols ref=4 ours=20 (80%), innerCount ref=5 ours=21 (76.19%), position ref=relative ours=static (100%)
/services | s01-commercial-roofing-services-in | 1440 | ADAPTED | structural deviation % | 12.05 | 5 | FAIL | advisory: innerCols ref=2 ours=3 (33.33%), innerRows ref=1 ours=2 (50%), innerCount ref=2 ours=5 (60%)
/ | s13-storm-damage-roofing-experts-r | 1440 | ADAPTED | structural deviation % | 11.78 | 5 | FAIL | advisory: none diverge
/services | s03-our-commercial-roofing-service | 390 | ADAPTED | structural deviation % | 11.7 | 5 | FAIL | advisory: innerRows ref=2 ours=1 (50%), innerCount ref=3 ours=2 (33.33%)
/ | s10-best-waterproofing-solutions-f | 768 | ADAPTED | structural deviation % | 10.49 | 5 | FAIL | advisory: innerRows ref=2 ours=1 (50%)
/ | s08-premium-roofing-materials | 768 | ADAPTED | structural deviation % | 10.36 | 5 | FAIL | advisory: innerCols ref=4 ours=2 (50%), innerRows ref=7 ours=1 (85.71%), innerCount ref=8 ours=2 (75%)
/ | s08-premium-roofing-materials | 1440 | ADAPTED | structural deviation % | 10.34 | 5 | FAIL | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=7 ours=1 (85.71%), innerCount ref=8 ours=2 (75%)
/ | s10-best-waterproofing-solutions-f | 390 | ADAPTED | structural deviation % | 10.31 | 5 | FAIL | advisory: innerRows ref=2 ours=1 (50%)
/ | s08-premium-roofing-materials | 390 | ADAPTED | structural deviation % | 10.29 | 5 | FAIL | advisory: innerCols ref=4 ours=2 (50%), innerRows ref=7 ours=1 (85.71%), innerCount ref=8 ours=2 (75%)
/services | s03-our-commercial-roofing-service | 1440 | ADAPTED | structural deviation % | 10.22 | 5 | FAIL | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=2 ours=1 (50%), innerCount ref=3 ours=2 (33.33%)
/services | s04-let-us-handle-your-commercial- | 390 | ADAPTED | structural deviation % | 10.06 | 5 | FAIL | advisory: none diverge
/ | s14-we-believe-in-giving-back-to-t | 1440 | ADAPTED | structural deviation % | 9.68 | 5 | FAIL | advisory: none diverge
/ | s14-we-believe-in-giving-back-to-t | 390 | ADAPTED | structural deviation % | 9.53 | 5 | FAIL | advisory: none diverge
/ | s14-we-believe-in-giving-back-to-t | 768 | ADAPTED | structural deviation % | 9.38 | 5 | FAIL | advisory: none diverge
/ | s12-roofing-done-with-integrity | 1440 | ADAPTED | structural deviation % | 9.17 | 5 | FAIL | advisory: none diverge
/services | s04-let-us-handle-your-commercial- | 1440 | ADAPTED | structural deviation % | 9 | 5 | FAIL | advisory: none diverge
/ | s13-storm-damage-roofing-experts-r | 768 | ADAPTED | structural deviation % | 8.87 | 5 | FAIL | advisory: none diverge
/ | s13-storm-damage-roofing-experts-r | 390 | ADAPTED | structural deviation % | 8.66 | 5 | FAIL | advisory: none diverge
/ | s09-our-expertise-in-roofing-mater | 1440 | ADAPTED | structural deviation % | 8.47 | 5 | FAIL | advisory: innerRows ref=7 ours=1 (85.71%), innerCount ref=9 ours=2 (77.78%)
/ | s01-award-winning-tulsa-roofing-co | 768 | ADAPTED | structural deviation % | 8.27 | 5 | FAIL | advisory: innerRows ref=3 ours=2 (33.33%), innerCount ref=4 ours=5 (20%)
/about | (page) | 390 | PAGE | height delta % | 8.21 | 5 | FAIL | -
/ | s09-our-expertise-in-roofing-mater | 768 | ADAPTED | structural deviation % | 8.15 | 5 | FAIL | advisory: innerRows ref=7 ours=1 (85.71%), innerCount ref=9 ours=2 (77.78%)
/ | s01-award-winning-tulsa-roofing-co | 390 | ADAPTED | structural deviation % | 8.14 | 5 | FAIL | advisory: innerRows ref=3 ours=2 (33.33%), innerCount ref=4 ours=5 (20%)
/ | s17-contact-form | 1440 | ADAPTED | structural deviation % | 8.1 | 5 | FAIL | advisory: none diverge
/ | s09-our-expertise-in-roofing-mater | 390 | ADAPTED | structural deviation % | 7.21 | 5 | FAIL | advisory: innerCols ref=1 ours=2 (50%), innerRows ref=7 ours=1 (85.71%), innerCount ref=9 ours=2 (77.78%)
/contact | s01-contact-us | 1440 | ADAPTED | structural deviation % | 7.12 | 5 | FAIL | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=2 ours=1 (50%), innerCount ref=3 ours=2 (33.33%)
/ | s15-committed-to-preserving-our-ho | 768 | ADAPTED | structural deviation % | 6.97 | 5 | FAIL | advisory: innerRows ref=2 ours=1 (50%), innerCount ref=3 ours=2 (33.33%)
/contact | s02-contact-form | 1440 | ADAPTED | structural deviation % | 6.45 | 5 | FAIL | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=2 (50%)
/ | s15-committed-to-preserving-our-ho | 390 | ADAPTED | structural deviation % | 6.36 | 5 | FAIL | advisory: innerRows ref=2 ours=1 (50%), innerCount ref=3 ours=2 (33.33%)
/ | s12-roofing-done-with-integrity | 768 | ADAPTED | structural deviation % | 6.27 | 5 | FAIL | advisory: none diverge
/privacy | s02-a-fricker-roofing-and-waterpro | 1440 | ADAPTED | structural deviation % | 5.74 | 5 | FAIL | advisory: none diverge
/about | s02-our-services | 390 | ADAPTED | structural deviation % | 5.55 | 5 | FAIL | advisory: none diverge
/ | s15-committed-to-preserving-our-ho | 1440 | ADAPTED | structural deviation % | 5.54 | 5 | FAIL | advisory: innerRows ref=2 ours=1 (50%), innerCount ref=3 ours=2 (33.33%)
/about | s02-our-services | 768 | ADAPTED | structural deviation % | 5.19 | 5 | FAIL | advisory: none diverge
/about | s02-our-services | 1440 | ADAPTED | structural deviation % | 5.13 | 5 | FAIL | advisory: none diverge
/about | s01-about-a-fricker-roofing-and-wa | 390 | ADAPTED | structural deviation % | 5.07 | 5 | FAIL | advisory: none diverge
/ | s18-service-areas | 390 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/ | s18-service-areas | 768 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/about | s05-service-areas | 390 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/about | s05-service-areas | 768 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/services | s07-service-areas | 390 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/about | s01-about-a-fricker-roofing-and-wa | 768 | ADAPTED | structural deviation % | 4.74 | 5 | PASS | advisory: none diverge
/about | s04-contact-form | 1440 | ADAPTED | structural deviation % | 4.73 | 5 | PASS | advisory: none diverge
/services | s06-contact-form | 1440 | ADAPTED | structural deviation % | 4.73 | 5 | PASS | advisory: none diverge
/about | s01-about-a-fricker-roofing-and-wa | 1440 | ADAPTED | structural deviation % | 4.72 | 5 | PASS | advisory: none diverge
/ | s12-roofing-done-with-integrity | 390 | ADAPTED | structural deviation % | 4.54 | 5 | PASS | advisory: none diverge
/ | s05-ensuring-a-smooth-roofing-expe | 768 | ADAPTED | structural deviation % | 4.45 | 5 | PASS | advisory: none diverge
/ | s05-ensuring-a-smooth-roofing-expe | 1440 | ADAPTED | structural deviation % | 4.41 | 5 | PASS | advisory: none diverge
/ | s05-ensuring-a-smooth-roofing-expe | 390 | ADAPTED | structural deviation % | 4.39 | 5 | PASS | advisory: none diverge
/ | s17-contact-form | 768 | ADAPTED | structural deviation % | 3.56 | 5 | PASS | advisory: none diverge
/ | s07 | 390 | ADAPTED | structural deviation % | 3.4 | 5 | PASS | advisory: innerCols ref=4 ours=20 (80%), innerRows ref=2 ours=1 (50%), innerCount ref=5 ours=21 (76.19%), position ref=relative ours=static (100%)
/ | s07 | 768 | ADAPTED | structural deviation % | 3.4 | 5 | PASS | advisory: innerCols ref=4 ours=20 (80%), innerRows ref=2 ours=1 (50%), innerCount ref=5 ours=21 (76.19%), position ref=relative ours=static (100%)
/ | s17-contact-form | 390 | ADAPTED | structural deviation % | 3.28 | 5 | PASS | advisory: none diverge
/about | s04-contact-form | 768 | ADAPTED | structural deviation % | 1.48 | 5 | PASS | advisory: none diverge
/contact | (page) | 1440 | PAGE | height delta % | 0.42 | 5 | PASS | -
/ | s18-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/about | s05-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/services | s07-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/contact | s03-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/privacy | s03-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/about | s04-contact-form | 390 | ADAPTED | structural deviation % | 0.29 | 5 | PASS | advisory: none diverge
/services | s06-contact-form | 390 | ADAPTED | structural deviation % | 0.22 | 5 | PASS | advisory: none diverge
/ | s00 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/about | s00 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/services | s00 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/contact | s00 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/privacy | s01 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/ | s00 | 390 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/ | s00 | 768 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/ | s02-partnering-with-tulsa-s-best | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/ | s03 | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/ | s16-we-love-hearing-from-our-custo | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/ | map | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/about | s00 | 390 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/about | s00 | 768 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/about | s03-we-love-hearing-from-our-custo | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/about | hero | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/about | facts | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/about | about-cta | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/about | map | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/services | s00 | 390 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/services | header | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | header | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | hero | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | hero | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | services | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | services | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | spring-repair | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | spring-repair | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | opener-repair | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | opener-repair | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | cable-roller-track | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | cable-roller-track | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | panel-replacement | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | panel-replacement | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | off-track-correction | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | off-track-correction | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | new-door-installation | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | new-door-installation | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | commercial-roll-up | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | commercial-roll-up | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | maintenance-tune-up | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | maintenance-tune-up | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | faq | 768 | NOVEL | token violations | 0 | 0 | PASS | -
/services | services | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | services | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | map | 768 | NOVEL | token violations | 0 | 0 | PASS | -
/services | contact | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | contact | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | footer | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | footer | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | s02-partnering-with-tulsa-s-best | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/services | s05-we-love-hearing-from-our-custo | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/services | spring-repair | 1440 | ADAPTED | token violations (no top-level ref band; sub-row of a builder parent) | 0 | 0 | PASS | -
/services | opener-repair | 1440 | ADAPTED | token violations (no top-level ref band; sub-row of a builder parent) | 0 | 0 | PASS | -
/services | cable-roller-track | 1440 | ADAPTED | token violations (no top-level ref band; sub-row of a builder parent) | 0 | 0 | PASS | -
/services | panel-replacement | 1440 | ADAPTED | token violations (no top-level ref band; sub-row of a builder parent) | 0 | 0 | PASS | -
/services | off-track-correction | 1440 | ADAPTED | token violations (no top-level ref band; sub-row of a builder parent) | 0 | 0 | PASS | -
/services | new-door-installation | 1440 | ADAPTED | token violations (no top-level ref band; sub-row of a builder parent) | 0 | 0 | PASS | -
/services | commercial-roll-up | 1440 | ADAPTED | token violations (no top-level ref band; sub-row of a builder parent) | 0 | 0 | PASS | -
/services | faq | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/services | services | 1440 | ADAPTED | token violations (no top-level ref band; sub-row of a builder parent) | 0 | 0 | PASS | -
/services | map | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | header | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | header | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | hero | 390 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | breadcrumb | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | breadcrumb | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | contact | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | contact | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | next-steps | 390 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | map | 390 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | footer | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | footer | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | header | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | header | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | hero | 768 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | breadcrumb | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | breadcrumb | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | contact | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | contact | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | next-steps | 768 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | map | 768 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | footer | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | footer | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | hero | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | next-steps | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/contact | map | 1440 | NOVEL | token violations | 0 | 0 | PASS | -
/privacy | header | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | header | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | privacy-body | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | privacy-body | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | footer | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | footer | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | header | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | header | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | privacy-body | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | privacy-body | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | footer | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | footer | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | s00 | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
