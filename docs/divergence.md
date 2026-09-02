# docs/divergence.md — ranked divergence table

Generated 2026-09-02T04:35:31.159Z by `src/diff.mjs`.
Rewritten each convergence loop. Ranked worst-first, normalized against each row's own threshold.

Rows: 119 · FAIL: 12 · PASS: 20 · BLOCKED: 10

## Top 10

route | section | bp | class | metric | value | threshold | status | advisory
------|---------|----|-------|--------|-------|-----------|--------|---------
/ | (page) | 1440 | PAGE | height delta % | 96.45 | 5 | FAIL | -
/ | (page) | 768 | PAGE | height delta % | 94.73 | 5 | FAIL | -
/ | (page) | 390 | PAGE | height delta % | 94.02 | 5 | FAIL | -
/services | (page) | 1440 | PAGE | height delta % | 82.31 | 5 | FAIL | -
/privacy | (page) | 1440 | PAGE | height delta % | 81.68 | 5 | FAIL | -
/services | (page) | 390 | PAGE | height delta % | 80.97 | 5 | FAIL | -
/about | (page) | 768 | PAGE | height delta % | 75.16 | 5 | FAIL | -
/about | (page) | 1440 | PAGE | height delta % | 74.9 | 5 | FAIL | -
/about | (page) | 390 | PAGE | height delta % | 73.19 | 5 | FAIL | -
/contact | (page) | 1440 | PAGE | height delta % | 64.52 | 5 | FAIL | -

## Full table

route | section | bp | class | metric | value | threshold | status | advisory
------|---------|----|-------|--------|-------|-----------|--------|---------
/ | (page) | 1440 | PAGE | height delta % | 96.45 | 5 | FAIL | -
/ | (page) | 768 | PAGE | height delta % | 94.73 | 5 | FAIL | -
/ | (page) | 390 | PAGE | height delta % | 94.02 | 5 | FAIL | -
/services | (page) | 1440 | PAGE | height delta % | 82.31 | 5 | FAIL | -
/privacy | (page) | 1440 | PAGE | height delta % | 81.68 | 5 | FAIL | -
/services | (page) | 390 | PAGE | height delta % | 80.97 | 5 | FAIL | -
/about | (page) | 768 | PAGE | height delta % | 75.16 | 5 | FAIL | -
/about | (page) | 1440 | PAGE | height delta % | 74.9 | 5 | FAIL | -
/about | (page) | 390 | PAGE | height delta % | 73.19 | 5 | FAIL | -
/contact | (page) | 1440 | PAGE | height delta % | 64.52 | 5 | FAIL | -
/ | s09-our-expertise-in-roofing-mater | 390 | ADAPTED | structural deviation % | 20.75 | 5 | FAIL | advisory: innerCols ref=1 ours=3 (66.67%), innerRows ref=7 ours=2 (71.43%), innerCount ref=9 ours=3 (66.67%), position ref=relative ours=fixed (100%)
/services | s04-let-us-handle-your-commercial- | 390 | ADAPTED | structural deviation % | 16.13 | 5 | FAIL | advisory: innerCols ref=2 ours=3 (33.33%), innerRows ref=1 ours=2 (50%), innerCount ref=2 ours=3 (33.33%), position ref=relative ours=fixed (100%)
/ | s18-service-areas | 390 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/ | s18-service-areas | 768 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/about | s05-service-areas | 390 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/about | s05-service-areas | 768 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/services | s07-service-areas | 390 | ADAPTED | structural deviation % | 4.94 | 5 | PASS | advisory: innerRows ref=5 ours=3 (40%), innerCount ref=6 ours=4 (33.33%)
/ | s18-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/about | s05-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/services | s07-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/contact | s03-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/privacy | s03-service-areas | 1440 | ADAPTED | structural deviation % | 0.37 | 5 | PASS | advisory: innerCols ref=4 ours=3 (25%), innerCount ref=6 ours=4 (33.33%)
/ | s00 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/about | s00 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/services | s00 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/contact | s00 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/privacy | s01 | 1440 | ADAPTED | structural deviation % | 0.13 | 5 | PASS | advisory: innerRows ref=4 ours=3 (25%), innerCount ref=5 ours=6 (16.67%)
/ | s00 | 390 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/ | s01-award-winning-tulsa-roofing-co | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s04-tulsa-s-1-contractor-for-roofi | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s05-ensuring-a-smooth-roofing-expe | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s06-our-roofing-services-in-tulsa- | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s07 | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s08-premium-roofing-materials | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s10-best-waterproofing-solutions-f | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s11-best-exterior-services | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s12-roofing-done-with-integrity | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s13-storm-damage-roofing-experts-r | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s14-we-believe-in-giving-back-to-t | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s15-committed-to-preserving-our-ho | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s17-contact-form | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s00 | 768 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/ | s01-award-winning-tulsa-roofing-co | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s04-tulsa-s-1-contractor-for-roofi | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s05-ensuring-a-smooth-roofing-expe | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s06-our-roofing-services-in-tulsa- | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s07 | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s08-premium-roofing-materials | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s09-our-expertise-in-roofing-mater | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s10-best-waterproofing-solutions-f | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s11-best-exterior-services | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s12-roofing-done-with-integrity | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s13-storm-damage-roofing-experts-r | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s14-we-believe-in-giving-back-to-t | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s15-committed-to-preserving-our-ho | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s17-contact-form | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s01-award-winning-tulsa-roofing-co | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s02-partnering-with-tulsa-s-best | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/ | s03 | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/ | s04-tulsa-s-1-contractor-for-roofi | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s05-ensuring-a-smooth-roofing-expe | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s06-our-roofing-services-in-tulsa- | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s07 | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s08-premium-roofing-materials | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s09-our-expertise-in-roofing-mater | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s10-best-waterproofing-solutions-f | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s11-best-exterior-services | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s12-roofing-done-with-integrity | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s13-storm-damage-roofing-experts-r | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s14-we-believe-in-giving-back-to-t | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s15-committed-to-preserving-our-ho | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/ | s16-we-love-hearing-from-our-custo | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/ | s17-contact-form | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s00 | 390 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/about | s01-about-a-fricker-roofing-and-wa | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s02-our-services | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s04-contact-form | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s00 | 768 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/about | s01-about-a-fricker-roofing-and-wa | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s02-our-services | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s04-contact-form | 768 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s01-about-a-fricker-roofing-and-wa | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s02-our-services | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/about | s03-we-love-hearing-from-our-custo | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/about | s04-contact-form | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/services | s00 | 390 | ADAPTED | structural deviation % | 0 | 5 | PASS | advisory: innerCols ref=3 ours=2 (33.33%), innerRows ref=3 ours=1 (66.67%), innerCount ref=4 ours=5 (20%)
/services | s01-commercial-roofing-services-in | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/services | s03-our-commercial-roofing-service | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/services | s06-contact-form | 390 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/services | header | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | header | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | footer | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/services | footer | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/services | s01-commercial-roofing-services-in | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/services | s02-partnering-with-tulsa-s-best | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/services | s03-our-commercial-roofing-service | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/services | s04-let-us-handle-your-commercial- | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/services | s05-we-love-hearing-from-our-custo | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/services | s06-contact-form | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/contact | header | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | header | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | footer | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | footer | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | header | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | header | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | footer | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/contact | footer | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/contact | s01-contact-us | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/contact | s02-contact-form | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
/privacy | header | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | header | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | footer | 390 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | footer | 390 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | header | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | header | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | footer | 768 | ADAPTED | token violations (advisory, no reference side) | 0 | - | REPORTED | -
/privacy | footer | 768 | ADAPTED | structural deviation % | null | 5 | BLOCKED | -
/privacy | s00 | 1440 | DELETED | no counterpart in build | null | - | UNPAIRED | -
/privacy | s02-a-fricker-roofing-and-waterpro | 1440 | ADAPTED | no counterpart in build | null | - | UNPAIRED | -
