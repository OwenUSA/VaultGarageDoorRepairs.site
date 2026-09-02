# Asset harvest — africkerroofing.com → vaultgaragedoorrepairs.site

Generated 2026-09-01T01:37:34.086Z by Prompt 2 (ASSET HARVEST).
Target: https://africkerroofing.com/ · COPY_MODE `ORIGINAL` · COLOR_MODE `REMAP`

## Summary

| | count |
|---|---|
| Real assets harvested into `assets/harvested/` | 29 (133 KB) |
| Font binaries harvested | 0 — see font license finding |
| Placeholder slots (files generated in `public/placeholders/`) | 213 |
| Slots REMOVED — content is CONFIG FORBIDDEN | 55 |
| Slot instances inventoried in total | 268 |

Every slot is measured at 7 viewports. Placeholder slots are a tracked gap, not a blocker.

## Breakpoints (read from target CSS, not guessed)

Theme stylesheets (`themes/fricker/{base,home,inner,responsive,style}.css`) declare:

```
min-width : 768  992  1024  1200  1400
max-width : 481  575  767  768  1024  1199  1440
```

Measured at **390, 575, 640, 768, 992, 1024, 1200, 1440**.
Full list including plugin CSS: `350, 420, 481, 575, 576, 600, 601, 640, 641, 767, 768, 781, 782, 800, 900, 960, 992, 993, 1024, 1199, 1200, 1400, 1440`.

**640 was added in a gap-closing pass.** The authoritative harness set resolved in
Prompt 1 is **390 / 640 / 768 / 1024 / 1440** (`docs/03-design-system.md`) — 640
carries 36 real vendor CSS rules. The first harvest pass measured the theme's own
tiers and omitted it, which left every slot short of the required
"rendered dimensions at every breakpoint".

- **235 of 268 slots re-measured directly at 640.**
- **33 carried from 575**, each flagged `estimated: true` in the JSON with its
  reason. These are approximations, not exact: the CSS does carry rules at 600px
  (slick `responsive`), 640px and 641px, so a carousel-hosted slot can shift
  between 575 and 640.
- Matching was done on `(page, slotKind, filename-basename)` with occurrence
  counting. Matching on full URL fails — the inventory stores original
  `/wp-content/uploads/` paths while the runtime serves NitroPack-rewritten ones;
  only the terminal filename survives the rewrite.
- 8 slots now have 640 as their largest-area breakpoint. 3 placeholder PNGs were
  regenerated at the new dimensions; the other 5 are FORBIDDEN slots with no
  placeholder file.

## "Highest resolution actually served" — verified, not assumed

`srcsetBestWidth` is `null` on all 268 slots. That is a true negative, not a
parsing failure. Measured across 737 `<img>` elements on 4 exemplars
(`.harness/srcset-check.mjs`):

| | count |
|---|---:|
| `<img>` elements | 737 |
| with `srcset` | **0** |
| with `sizes` | **0** |
| `<picture><source srcset>` | **0** |
| `<link rel=preload>` | **0** |

NitroPack strips `srcset` entirely and serves exactly one optimised variant per
slot, so the served resolution *is* the highest served resolution. There are no
thumbnails to avoid.

One honest caveat: for some slots the original WordPress upload under
`/wp-content/uploads/` is larger than the NitroPack variant that is actually
served. This is moot for what we ship — under `COPY_MODE = ORIGINAL` every
photograph and brand mark is a placeholder regardless, and the only assets we
keep are 29 SVGs, which are resolution-independent.

## Font license finding

**PERMITTED — every font the target serves for its own design system is a Google Fonts family delivered from fonts.gstatic.com. No self-hosted or proprietary/licensed webfont is used for the design. The only non-permitted font file on the site is the Gravity Forms icon font (plugin chrome, not design).**

| family | role in target | origin | license | permitted | action |
|---|---|---|---|---|---|
| Roboto Condensed | CSS var --font — all headings, nav, buttons, body default | fonts.gstatic.com/s/robotocondensed/v31/ (Google Fonts) | SIL Open Font License 1.1 | yes | use directly |
| Rubik | CSS var --paragraph-font — paragraph / body copy | fonts.gstatic.com/s/rubik/v31/ (Google Fonts) | SIL Open Font License 1.1 | yes | use directly |
| Lato | Gravity Forms form controls only | fonts.gstatic.com (Google Fonts) | SIL Open Font License 1.1 | yes | do not clone — plugin chrome, not part of the design system |
| Inter | ascend-plugin-inlinks Tailwind plugin only | fonts.gstatic.com (Google Fonts) | SIL Open Font License 1.1 | yes | do not clone — plugin chrome |
| Material Icons / Material Symbols Outlined | a single pin_drop glyph in the service-area section | fonts.gstatic.com (Google Fonts) | Apache License 2.0 | yes | replace with lucide-react MapPin — do not ship an icon font for one glyph |
| Roboto (self-hosted copy) | accessibility-onetap plugin readable-font toggle | africkerroofing.com/wp-content/plugins/accessibility-onetap/assets/fonts/Roboto/*.woff2 | SIL Open Font License 1.1 (Roboto upstream) | yes | do not clone — plugin chrome |
| gform-icons-theme | Gravity Forms icon font | africkerroofing.com (Gravity Forms commercial plugin) | proprietary — Gravity Forms commercial plugin asset | **no** | NOT harvested. Replace with lucide-react icons. |

**Decision.** Ship NO font binaries in assets/harvested/. Load Roboto_Condensed (display/UI, --font) and Rubik (body, --paragraph-font) via next/font/google. Both are OFL 1.1 and present on Google Fonts, so they are exact matches — no nearest-equivalent substitution is required. Replace Material Icons and gform-icons-theme with lucide-react.

```ts
// target declares:  --font: "Roboto Condensed", sans-serif   /  --paragraph-font: "Rubik", sans-serif
import { Roboto_Condensed, Rubik } from 'next/font/google'
```

No nearest-equivalent substitution is needed: both design fonts are already on Google Fonts under OFL 1.1, so `next/font/google` reproduces them exactly (identical x-height, width and weight range). The only unlicensed file on the target is the Gravity Forms `gform-icons-theme` icon font, which was **not** harvested — lucide-react replaces it.

## Harvested real assets

All 29 are flat vector SVG — icon geometry and one decorative underline. No logo, no brand mark, no photography, no embedded raster. (`Frame-1000010253-1.svg` was harvested, found to wrap a base64 JPEG, and demoted to a placeholder.)

| file | intrinsic | bytes | template(s) | section | depicts |
|---|---|---|---|---|---|
| `assets/harvested/decorations/Vector-3.svg` | 356×58 | 196 | listing, generic-content | WHY CHOOSE A. FRICKER ROOFING AND WATERPROOF | Vector 3 |
| `assets/harvested/icons/Contact-Us.svg` | 36×42 | 3297 | home | STORM DAMAGE ROOFING EXPERTS - READY WHEN YO | Contact Us |
| `assets/harvested/icons/exteriors-services-Icons-4.svg` | 48×48 | 383 | home | BEST EXTERIOR SERVICES | WINDOW Icon |
| `assets/harvested/icons/exteriors-services-Icons-5.svg` | 48×48 | 7762 | home | BEST EXTERIOR SERVICES | SIDING Icon |
| `assets/harvested/icons/exteriors-services-Icons-6.svg` | 48×48 | 1880 | home | BEST EXTERIOR SERVICES | Gutter Icon |
| `assets/harvested/icons/Frame-1000010212.svg` | 100×101 | 1686 | home | OUR ROOFING SERVICES IN TULSA, OK | Roof Inspection Icon |
| `assets/harvested/icons/Frame-1000010213.svg` | 100×100 | 4729 | home | OUR ROOFING SERVICES IN TULSA, OK | Roof Replacement Icon |
| `assets/harvested/icons/Frame-1000010214.svg` | 100×100 | 5084 | home | OUR ROOFING SERVICES IN TULSA, OK | Roof Installation Icon |
| `assets/harvested/icons/Frame-1000010215.svg` | 100×100 | 5235 | home | OUR ROOFING SERVICES IN TULSA, OK | Roof Installation Icon |
| `assets/harvested/icons/Frame-1000010216.svg` | 100×100 | 3018 | home | OUR ROOFING SERVICES IN TULSA, OK | Roof Replacement Icon |
| `assets/harvested/icons/Frame-1000010217.svg` | 100×100 | 1742 | home | OUR ROOFING SERVICES IN TULSA, OK | Roof Repair Icon |
| `assets/harvested/icons/Frame-1000010223-2.svg` | 103×70 | 21766 | home | Premium Roofing Materials | Frame 1000010223 (2) |
| `assets/harvested/icons/Frame-1000010225-2.svg` | 103×70 | 8531 | home | Premium Roofing Materials | Frame 1000010225 (2) |
| `assets/harvested/icons/Frame-1000010226-2.svg` | 103×70 | 3291 | home | Premium Roofing Materials | Frame 1000010226 (2) |
| `assets/harvested/icons/Frame-1000010228-1.svg` | 103×70 | 3838 | home | Premium Roofing Materials | Frame 1000010228 (1) |
| `assets/harvested/icons/Group-1000009000-1.svg` | 80×80 | 7946 | home | OUR ROOFING SERVICES IN TULSA, OK | Roof Inspection Icon |
| `assets/harvested/icons/Group-14.svg` | 52×53 | 1752 | detail | WHY ARE SHINGLE ROOFS POPULAR? | slate roof |
| `assets/harvested/icons/Group-883799.svg` | 50×51 | 6942 | home, listing, detail, generic-content, contact, about, legal | pc.lazyloaded / pc | Insaurance claim |
| `assets/harvested/icons/Group-883858-3.svg` | 25×25 | 6671 | listing | OUR RESIDENTIAL ROOFING SERVICES IN TULSA, O | Group 883858 (3) |
| `assets/harvested/icons/Group-883859-3.svg` | 21×25 | 2667 | listing | OUR RESIDENTIAL ROOFING SERVICES IN TULSA, O | Group 883859 (3) |
| `assets/harvested/icons/Group-883864-1.svg` | 25×25 | 4814 | listing | OUR RESIDENTIAL ROOFING SERVICES IN TULSA, O | Group 883864 (1) |
| `assets/harvested/icons/Group-883865-1.svg` | 25×25 | 4700 | listing | OUR RESIDENTIAL ROOFING SERVICES IN TULSA, O | Group 883865 (1) |
| `assets/harvested/icons/Group-883926-1.svg` | 27×25 | 4912 | generic-content | OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA | Group 883926 (1) |
| `assets/harvested/icons/Group-883928.svg` | 25×25 | 2151 | generic-content | OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA | Group 883928 |
| `assets/harvested/icons/Group-884210.svg` | 60×60 | 2446 | detail | WHY ARE SHINGLE ROOFS POPULAR? | Asphalt shingle roof icon |
| `assets/harvested/icons/Group-884212.svg` | 52×44 | 4730 | detail | WHY ARE SHINGLE ROOFS POPULAR? | synthetic Roof |
| `assets/harvested/icons/Group-884227-1.svg` | 25×20 | 6573 | listing | OUR RESIDENTIAL ROOFING SERVICES IN TULSA, O | Group 884227 (1) |
| `assets/harvested/icons/residential-services-icons.svg` | 36×36 | 4658 | home | OUR ROOFING SERVICES IN TULSA, OK | Roof Repair Icon |
| `assets/harvested/icons/Vector-13.svg` | 52×32 | 2965 | detail | WHY ARE SHINGLE ROOFS POPULAR? | Wood shake roof |

Source URLs are recorded per asset in `.harness/out/asset-manifest.json`. NitroPack CDN paths were canonicalised back to their `/wp-content/uploads/` origin.

## Dominant-colour → palette token remap

Each unfilled slot had its reference image sampled with sharp (`stats().dominant`, cross-checked against a 1×1 average) and the result mapped to the nearest CONFIG PALETTE entry by CIE-Lab distance. Under COLOR_MODE = REMAP these are **token bindings**, never colour values — a wrong-looking placeholder is a wrong binding, not a colour divergence.

| token | hex | role | slots bound |
|---|---|---|---|
| `vault-ink` | #0B1220 | ink / darkest surface | 103 |
| `steel-200` | #E2E8F0 | border | 55 |
| `steel-500` | #64748B | ink-muted | 40 |
| `paper` | #FFFFFF | page-bg, elevated cards | 25 |
| `signal-amber` | #F59E0B | secondary CTA / emphasis | 23 |
| `vault-blue-deep` | #1739A8 | accent-hover | 19 |
| `vault-navy` | #14213D | primary brand, dark bands, header | 2 |
| `steel-50` | #F1F5F9 | surface | 1 |

## Slots REMOVED — CONFIG FORBIDDEN (intentional structural deviation)

These slots exist in the target but their content is forbidden by CONFIG. They are **not** placeholders and are **never** iterated on. The slot is removed or the surrounding section repurposed. Nothing forbidden may be invented to refill them.

| forbidden category | slots | templates | affected sections |
|---|---|---|---|
| accreditation / association seal | 11 | home, listing, detail, generic-content, contact, about, legal | AWARD WINNING TULSA ROOFING COMPANY · PARTNERING WITH TULSA'S BEST · WE BELIEVE  |
| reviews / star ratings / rating badges | 16 | home, listing, detail, generic-content, contact, about | AWARD WINNING TULSA ROOFING COMPANY · TULSA’S #1 CONTRACTOR FOR ROOFING & WATERP |
| manufacturer authorization / brand partnership logo strip | 11 | home | PARTNERING WITH TULSA'S BEST · brand-logo.nitro-offscreen |
| staff photo / named person / team & community imagery | 17 | home, contact | TULSA’S #1 CONTRACTOR FOR ROOFING & WATERPROOFING · ROOFING DONE WITH INTEGRITY  |

Concretely this deletes from the clone: the "PARTNERING WITH TULSA'S BEST" manufacturer logo strip, the BBB seal in the header/footer, the Google/Facebook 5-star rating lockups, the five Google-review screenshot cards on the home page, the review-slider band, the owner headshot, and the team / ribbon-cutting / community photography. Report these as structural deviations, not divergences.

## Unfilled slots by template class

### `home` — https://africkerroofing.com/

70 placeholder slots, 42 removed.

<details><summary><code>home--pc-lazyloaded--01</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#NTQyOjExNg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--pc-lazyloaded--01.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--pc-lazyloaded--02</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#Njg4OjE1Mg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--pc-lazyloaded--02.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--tulsa-s-1-contractor-for-roofing-w--06</code> — 4:3 card · <code>steel-200</code> · TULSA’S #1 CONTRACTOR FOR ROOFING & WATERPROOFING</summary>

- **section**: TULSA’S #1 CONTRACTOR FOR ROOFING & WATERPROOFING (`.about-us-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#ODYxOjE5NA==-1`
- **slot kind**: img · alt: "Happy family of four sitting together on beige sectional sofa in cozy living room"
- **depicts**: 4:3 card
- **rendered**: 390:180×112.5  575:272.5×170.3  768:360×225  992:465×290.6  1024:465×290.6  1200:280×175  1440:280×175
- **aspect ratio**: 1.6
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 600×375 png
- **reference dominant**: #C8C8C8 (avg #827866) → **`steel-200`** #E2E8F0 — border (ΔE 12.1)
- **placeholder**: `public/placeholders/home--tulsa-s-1-contractor-for-roofing-w--06.png` @ 930×581
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--tulsa-s-1-contractor-for-roofing-w--09</code> — wide hero · <code>vault-ink</code> · TULSA’S #1 CONTRACTOR FOR ROOFING & WATERPROOFING</summary>

- **section**: TULSA’S #1 CONTRACTOR FOR ROOFING & WATERPROOFING (`.about-us-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#ODc1Ojk2-1`
- **slot kind**: img · alt: "Logo.ic"
- **depicts**: wide hero
- **rendered**: 390:176×73  575:176×73  768:176×73  992:176×73  1024:176×73  1200:176×73  1440:176×73
- **aspect ratio**: 2.411
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 176×73 svg
- **reference dominant**: #080808 (avg #5F76B6) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--tulsa-s-1-contractor-for-roofing-w--09.png` @ 352×146
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-roofing-services-in-tulsa-ok--01</code> — portrait card · <code>steel-500</code> · OUR ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR ROOFING SERVICES IN TULSA, OK (`.roofing-service.dark.nitro-offscreen`)
- **selector**: `img#MTAwMjoxNzM=-1`
- **slot kind**: img · alt: "Gray asphalt shingle roof with brick chimney against cloudy blue sky"
- **depicts**: portrait card
- **rendered**: 390:370×190  575:508.9×190  768:730×190  992:940×190  1024:940×190  1200:279.8×384.7  1440:279.8×384.7
- **aspect ratio**: 0.727
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 280×385 jpeg
- **reference dominant**: #788888 (avg #878F96) → **`steel-500`** #64748B — ink-muted (ΔE 15.4)
- **placeholder**: `public/placeholders/home--our-roofing-services-in-tulsa-ok--01.png` @ 1880×380
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-roofing-services-in-tulsa-ok--02</code> — portrait card · <code>steel-500</code> · OUR ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR ROOFING SERVICES IN TULSA, OK (`.roofing-service.dark.nitro-offscreen`)
- **selector**: `img#MTAxOToxODU=-1`
- **slot kind**: img · alt: "Brick house with damaged roof being repaired under blue sky with green trees"
- **depicts**: portrait card
- **rendered**: 390:370×190  575:508.9×190  768:730×190  992:940×190  1024:940×190  1200:279.8×384.7  1440:279.8×384.7
- **aspect ratio**: 0.727
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 280×385 png
- **reference dominant**: #78A8E8 (avg #6F746F) → **`steel-500`** #64748B — ink-muted (ΔE 29.9)
- **placeholder**: `public/placeholders/home--our-roofing-services-in-tulsa-ok--02.png` @ 1880×380
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-roofing-services-in-tulsa-ok--03</code> — portrait card · <code>steel-200</code> · OUR ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR ROOFING SERVICES IN TULSA, OK (`.roofing-service.dark.nitro-offscreen`)
- **selector**: `img#MTAzNjoxODk=-1`
- **slot kind**: img · alt: "Roofer installing synthetic underlayment on residential roof during construction"
- **depicts**: portrait card
- **rendered**: 390:370×190  575:508.9×190  768:730×190  992:940×190  1024:940×190  1200:279.8×384.7  1440:279.8×384.7
- **aspect ratio**: 0.727
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 280×385 png
- **reference dominant**: #D8D8D8 (avg #8E8D87) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/home--our-roofing-services-in-tulsa-ok--03.png` @ 1880×380
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-roofing-services-in-tulsa-ok--04</code> — portrait card · <code>steel-500</code> · OUR ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR ROOFING SERVICES IN TULSA, OK (`.roofing-service.dark.nitro-offscreen`)
- **selector**: `img#MTA1MzoxODM=-1`
- **slot kind**: img · alt: "Modern brick and stone house with gray shingle roof against clear blue sky"
- **depicts**: portrait card
- **rendered**: 390:370×190  575:508.9×190  768:730×190  992:940×190  1024:940×190  1200:279.8×384.7  1440:279.8×384.7
- **aspect ratio**: 0.727
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 280×385 png
- **reference dominant**: #4878C8 (avg #73869A) → **`steel-500`** #64748B — ink-muted (ΔE 33.4)
- **placeholder**: `public/placeholders/home--our-roofing-services-in-tulsa-ok--04.png` @ 1880×380
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-roofing-services-in-tulsa-ok--05</code> — portrait card · <code>steel-500</code> · OUR ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR ROOFING SERVICES IN TULSA, OK (`.roofing-service.dark.nitro-offscreen`)
- **selector**: `img#MTEyNDoxNzM=-1`
- **slot kind**: img · alt: "Workers installing a metal roof on a building under clear skies"
- **depicts**: portrait card
- **rendered**: 390:370×190  575:508.9×190  768:730×190  992:940×190  1024:940×190  1200:279.8×383.7  1440:279.8×383.7
- **aspect ratio**: 0.729
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 280×384 png
- **reference dominant**: #988888 (avg #6B7476) → **`steel-500`** #64748B — ink-muted (ΔE 20.4)
- **placeholder**: `public/placeholders/home--our-roofing-services-in-tulsa-ok--05.png` @ 1880×380
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-roofing-services-in-tulsa-ok--06</code> — portrait card · <code>steel-200</code> · OUR ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR ROOFING SERVICES IN TULSA, OK (`.roofing-service.dark.nitro-offscreen`)
- **selector**: `img#MTE0MToxODg=-1`
- **slot kind**: img · alt: "Worker installing white roofing membrane with roller tool on flat commercial roof"
- **depicts**: portrait card
- **rendered**: 390:370×190  575:508.9×190  768:730×190  992:940×190  1024:940×190  1200:279.8×384.7  1440:279.8×384.7
- **aspect ratio**: 0.727
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 280×385 png
- **reference dominant**: #98B8C8 (avg #7F96A7) → **`steel-200`** #E2E8F0 — border (ΔE 21.2)
- **placeholder**: `public/placeholders/home--our-roofing-services-in-tulsa-ok--06.png` @ 1880×380
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-roofing-services-in-tulsa-ok--07</code> — portrait card · <code>vault-ink</code> · OUR ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR ROOFING SERVICES IN TULSA, OK (`.roofing-service.dark.nitro-offscreen`)
- **selector**: `img#MTE1ODoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of a building with a metal roof design and HVAC units."
- **depicts**: portrait card
- **rendered**: 390:370×190  575:508.9×190  768:730×190  992:940×190  1024:940×190  1200:279.8×384.7  1440:279.8×384.7
- **aspect ratio**: 0.727
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 280×385 png
- **reference dominant**: #181828 (avg #63676E) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 4.9)
- **placeholder**: `public/placeholders/home--our-roofing-services-in-tulsa-ok--07.png` @ 1880×380
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-roofing-services-in-tulsa-ok--08</code> — portrait card · <code>steel-200</code> · OUR ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR ROOFING SERVICES IN TULSA, OK (`.roofing-service.dark.nitro-offscreen`)
- **selector**: `img#MTE3NToxOTY=-1`
- **slot kind**: img · alt: "Aerial view of industrial rooftop with a large skylight and maintenance equipment."
- **depicts**: portrait card
- **rendered**: 390:370×190  575:508.9×190  768:730×190  992:940×190  1024:940×190  1200:279.8×383.3  1440:279.8×383.3
- **aspect ratio**: 0.73
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 281×385 png
- **reference dominant**: #E8E8E8 (avg #747B82) → **`steel-200`** #E2E8F0 — border (ΔE 4.6)
- **placeholder**: `public/placeholders/home--our-roofing-services-in-tulsa-ok--08.png` @ 1880×380
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--01</code> — 16:9 media · <code>vault-blue-deep</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTI1NjoxOTA=-1`
- **slot kind**: img · alt: "Blue geometric shape with irregular edges on white background"
- **depicts**: 16:9 media
- **rendered**: 390:115.8×58  575:171.3×85.8  768:229.2×114.9  992:296.4×148.5  1024:306×153.3  1200:358.8×179.8  1440:430.8×215.9
- **aspect ratio**: 1.995
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 429×215 png
- **reference dominant**: #3858A8 (avg #3D57A7) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 25)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--01.png` @ 862×432
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--02</code> — 16:9 media · <code>vault-blue-deep</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTI3MzoxOTA=-1`
- **slot kind**: img · alt: "Blue geometric shape with irregular edges on white background"
- **depicts**: 16:9 media
- **rendered**: 390:115.8×58  575:171.3×85.8  768:229.2×114.9  992:296.4×148.5  1024:306×153.3  1200:358.8×179.8  1440:430.8×215.9
- **aspect ratio**: 1.995
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 429×215 png
- **reference dominant**: #3858A8 (avg #3D57A7) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 25)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--02.png` @ 862×432
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--03</code> — 4:3 card · <code>vault-ink</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTI4ODoxMjY=-1`
- **slot kind**: img · alt: "Frame 1000010253 (1)"
- **depicts**: 4:3 card
- **rendered**: 390:68.5×54.9  575:68.5×54.9  768:68.5×54.9  992:68.5×54.9  1024:68.5×54.9  1200:68.5×54.9  1440:68.5×54.9
- **aspect ratio**: 1.248
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 103×70 svg+embedded-raster
- **reference dominant**: #080808 (avg #E6E6E6) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--03.png` @ 137×110
- **why unfilled**: SVG wrapper around an embedded raster photograph — photography, COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--04</code> — 16:9 media · <code>vault-blue-deep</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTI5MDoxOTA=-1`
- **slot kind**: img · alt: "Blue geometric shape with irregular edges on white background"
- **depicts**: 16:9 media
- **rendered**: 390:115.8×58  575:171.3×85.8  768:229.2×114.9  992:296.4×148.5  1024:306×153.3  1200:358.8×179.8  1440:430.8×215.9
- **aspect ratio**: 1.995
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 429×215 png
- **reference dominant**: #3858A8 (avg #3D57A7) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 25)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--04.png` @ 862×432
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--05</code> — 16:9 media · <code>vault-blue-deep</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTMwNzoxOTA=-1`
- **slot kind**: img · alt: "Blue geometric shape with irregular edges on white background"
- **depicts**: 16:9 media
- **rendered**: 390:115.8×58  575:171.3×85.8  768:229.2×114.9  992:296.4×148.5  1024:306×153.3  1200:358.8×179.8  1440:430.8×215.9
- **aspect ratio**: 1.995
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 429×215 png
- **reference dominant**: #3858A8 (avg #3D57A7) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 25)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--05.png` @ 862×432
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--06</code> — 16:9 media · <code>vault-blue-deep</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTMyNDoxOTA=-1`
- **slot kind**: img · alt: "Blue geometric shape with irregular edges on white background"
- **depicts**: 16:9 media
- **rendered**: 390:115.8×58  575:171.3×85.8  768:229.2×114.9  992:296.4×148.5  1024:306×153.3  1200:358.8×179.8  1440:430.8×215.9
- **aspect ratio**: 1.995
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 429×215 png
- **reference dominant**: #3858A8 (avg #3D57A7) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 25)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--06.png` @ 862×432
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-expertise-in-roofing-materials--01</code> — 4:3 card · <code>steel-200</code> · Our Expertise In Roofing Materials</summary>

- **section**: Our Expertise In Roofing Materials (`.roofing-materials.nitro-offscreen`)
- **selector**: `img#MTM0NzoxOTQ=-1`
- **slot kind**: img · alt: "White flat roof membrane with residential homes and green fields in background"
- **depicts**: 4:3 card
- **rendered**: 390:390×340.2  575:575×499.7  768:768×666  992:992×859  1024:1024×886.6  1200:1200×1038.3  1440:1440×1245.1
- **aspect ratio**: 1.157
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `30px`
- **intrinsic (reference)**: 369×318 png
- **reference dominant**: #E8E8E8 (avg #CECFD2) → **`steel-200`** #E2E8F0 — border (ΔE 4.6)
- **placeholder**: `public/placeholders/home--our-expertise-in-roofing-materials--01.png` @ 2880×2490
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-expertise-in-roofing-materials--02</code> — 4:3 card · <code>vault-ink</code> · Our Expertise In Roofing Materials</summary>

- **section**: Our Expertise In Roofing Materials (`.roofing-materials.nitro-offscreen`)
- **selector**: `img#MTM1MzoxODg=-1`
- **slot kind**: img · alt: "Flat roof with EPDM rubber membrane and skylights on brick house extension"
- **depicts**: 4:3 card
- **rendered**: 390:390×340.2  575:575×499.7  768:768×666  992:992×859  1024:1024×886.6  1200:1200×1038.3  1440:1440×1245.1
- **aspect ratio**: 1.157
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `30px`
- **intrinsic (reference)**: 369×318 png
- **reference dominant**: #180808 (avg #727276) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 13.3)
- **placeholder**: `public/placeholders/home--our-expertise-in-roofing-materials--02.png` @ 2880×2490
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-expertise-in-roofing-materials--03</code> — 4:3 card · <code>steel-500</code> · Our Expertise In Roofing Materials</summary>

- **section**: Our Expertise In Roofing Materials (`.roofing-materials.nitro-offscreen`)
- **selector**: `img#MTM1OToxODY=-1`
- **slot kind**: img · alt: "Commercial flat roof with gray membrane roofing material and roof drains"
- **depicts**: 4:3 card
- **rendered**: 390:390×340.2  575:575×499.7  768:768×666  992:992×859  1024:1024×886.6  1200:1200×1038.3  1440:1440×1245.1
- **aspect ratio**: 1.157
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `30px`
- **intrinsic (reference)**: 369×318 png
- **reference dominant**: #686868 (avg #706F6B) → **`steel-500`** #64748B — ink-muted (ΔE 15.1)
- **placeholder**: `public/placeholders/home--our-expertise-in-roofing-materials--03.png` @ 2880×2490
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-expertise-in-roofing-materials--04</code> — 4:3 card · <code>steel-200</code> · Our Expertise In Roofing Materials</summary>

- **section**: Our Expertise In Roofing Materials (`.roofing-materials.nitro-offscreen`)
- **selector**: `img#MTM2NToxOTg=-1`
- **slot kind**: img · alt: "Gray asphalt shingle roof with ridge line and chimney, residential neighborhood view"
- **depicts**: 4:3 card
- **rendered**: 390:390×340.2  575:575×499.7  768:768×666  992:992×859  1024:1024×886.6  1200:1200×1038.3  1440:1440×1245.1
- **aspect ratio**: 1.157
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `30px`
- **intrinsic (reference)**: 369×318 png
- **reference dominant**: #A8A898 (avg #A29D97) → **`steel-200`** #E2E8F0 — border (ΔE 26.7)
- **placeholder**: `public/placeholders/home--our-expertise-in-roofing-materials--04.png` @ 2880×2490
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-expertise-in-roofing-materials--05</code> — 4:3 card · <code>steel-500</code> · Our Expertise In Roofing Materials</summary>

- **section**: Our Expertise In Roofing Materials (`.roofing-materials.nitro-offscreen`)
- **selector**: `img#MTM3MToxOTQ=-1`
- **slot kind**: img · alt: "Natural wood cedar roof shingles with weathered brown texture and grain patterns"
- **depicts**: 4:3 card
- **rendered**: 390:390×340.2  575:575×499.7  768:768×666  992:992×859  1024:1024×886.6  1200:1200×1038.3  1440:1440×1245.1
- **aspect ratio**: 1.157
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `30px`
- **intrinsic (reference)**: 369×318 png
- **reference dominant**: #986848 (avg #956B47) → **`steel-500`** #64748B — ink-muted (ΔE 43.2)
- **placeholder**: `public/placeholders/home--our-expertise-in-roofing-materials--05.png` @ 2880×2490
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--our-expertise-in-roofing-materials--06</code> — 4:3 card · <code>steel-500</code> · Our Expertise In Roofing Materials</summary>

- **section**: Our Expertise In Roofing Materials (`.roofing-materials.nitro-offscreen`)
- **selector**: `img#MTM3NzoxOTU=-1`
- **slot kind**: img · alt: "Rooftop view of asphalt shingles with chimney and golden sunset sky in background"
- **depicts**: 4:3 card
- **rendered**: 390:390×340.2  575:575×499.7  768:768×666  992:992×859  1024:1024×886.6  1200:1200×1038.3  1440:1440×1245.1
- **aspect ratio**: 1.157
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `30px`
- **intrinsic (reference)**: 369×318 png
- **reference dominant**: #787878 (avg #897F6B) → **`steel-500`** #64748B — ink-muted (ΔE 14.7)
- **placeholder**: `public/placeholders/home--our-expertise-in-roofing-materials--06.png` @ 2880×2490
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--best-exterior-services--01</code> — portrait card · <code>steel-200</code> · BEST EXTERIOR SERVICES</summary>

- **section**: BEST EXTERIOR SERVICES (`.services.dark.nitro-offscreen`)
- **selector**: `img#MTQyNzoxNjc=-1`
- **slot kind**: img · alt: "White vinyl gutters and downspout on beige house exterior with blue sky"
- **depicts**: portrait card
- **rendered**: 390:360×250  575:545×250  768:738×250  992:169.8×250  1024:182.6×250  1200:220.6×350.4  1440:316.6×502.8
- **aspect ratio**: 0.63
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 544×864 png
- **reference dominant**: #98B8D8 (avg #9A968D) → **`steel-200`** #E2E8F0 — border (ΔE 23.8)
- **placeholder**: `public/placeholders/home--best-exterior-services--01.png` @ 1476×500
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--best-exterior-services--02</code> — portrait card · <code>steel-500</code> · BEST EXTERIOR SERVICES</summary>

- **section**: BEST EXTERIOR SERVICES (`.services.dark.nitro-offscreen`)
- **selector**: `img#MTQ0MDoxNjk=-1`
- **slot kind**: img · alt: "White colonial house with black shutters and Christmas wreaths on windows"
- **depicts**: portrait card
- **rendered**: 390:360×250  575:545×250  768:738×250  992:169.8×250  1024:182.6×250  1200:220.6×350.4  1440:316.6×502.8
- **aspect ratio**: 0.63
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 544×864 png
- **reference dominant**: #68B8F8 (avg #677C8B) → **`steel-500`** #64748B — ink-muted (ΔE 34.8)
- **placeholder**: `public/placeholders/home--best-exterior-services--02.png` @ 1476×500
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--best-exterior-services--03</code> — portrait card · <code>signal-amber</code> · BEST EXTERIOR SERVICES</summary>

- **section**: BEST EXTERIOR SERVICES (`.services.dark.nitro-offscreen`)
- **selector**: `img#MTQ1MzoxNzU=-1`
- **slot kind**: img · alt: "Modern two-story house with stone exterior, gray shingle roof and brick chimney"
- **depicts**: portrait card
- **rendered**: 390:360×250  575:545×250  768:738×250  992:169.8×250  1024:182.6×250  1200:220.6×350.4  1440:316.6×502.8
- **aspect ratio**: 0.63
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 544×864 png
- **reference dominant**: #F8C838 (avg #708694) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/home--best-exterior-services--03.png` @ 1476×500
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--best-exterior-services--04</code> — portrait card · <code>steel-200</code> · BEST EXTERIOR SERVICES</summary>

- **section**: BEST EXTERIOR SERVICES (`.services.dark.nitro-offscreen`)
- **selector**: `img#MTQ2NjoxNjc=-1`
- **slot kind**: img · alt: "White vinyl gutters and downspout on beige house exterior with blue sky"
- **depicts**: portrait card
- **rendered**: 390:360×250  575:545×250  768:738×250  992:169.8×250  1024:182.6×250  1200:220.6×350.4  1440:316.6×502.8
- **aspect ratio**: 0.63
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 544×864 png
- **reference dominant**: #98B8D8 (avg #9A968D) → **`steel-200`** #E2E8F0 — border (ΔE 23.8)
- **placeholder**: `public/placeholders/home--best-exterior-services--04.png` @ 1476×500
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--best-exterior-services--05</code> — portrait card · <code>steel-500</code> · BEST EXTERIOR SERVICES</summary>

- **section**: BEST EXTERIOR SERVICES (`.services.dark.nitro-offscreen`)
- **selector**: `img#MTQ3OToxNjk=-1`
- **slot kind**: img · alt: "White colonial house with black shutters and Christmas wreaths on windows"
- **depicts**: portrait card
- **rendered**: 390:360×250  575:545×250  768:738×250  992:169.8×250  1024:182.6×250  1200:220.6×350.4  1440:316.6×502.8
- **aspect ratio**: 0.63
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 544×864 png
- **reference dominant**: #68B8F8 (avg #677C8B) → **`steel-500`** #64748B — ink-muted (ΔE 34.8)
- **placeholder**: `public/placeholders/home--best-exterior-services--05.png` @ 1476×500
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--best-exterior-services--06</code> — portrait card · <code>signal-amber</code> · BEST EXTERIOR SERVICES</summary>

- **section**: BEST EXTERIOR SERVICES (`.services.dark.nitro-offscreen`)
- **selector**: `img#MTQ5MjoxNzU=-1`
- **slot kind**: img · alt: "Modern two-story house with stone exterior, gray shingle roof and brick chimney"
- **depicts**: portrait card
- **rendered**: 390:360×250  575:545×250  768:738×250  992:169.8×250  1024:182.6×250  1200:220.6×350.4  1440:316.6×502.8
- **aspect ratio**: 0.63
- **object-fit / position**: `cover` / `50% 50%`
- **intrinsic (reference)**: 544×864 png
- **reference dominant**: #F8C838 (avg #708694) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/home--best-exterior-services--06.png` @ 1476×500
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--01</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzEyODoxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/home--contact-form--01.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--02</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzEyOToxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--contact-form--02.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--03</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzEzMDoxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--contact-form--03.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--04</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzEzMToxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/home--contact-form--04.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--05</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzEzMjoxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/home--contact-form--05.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--06</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzEzMzoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/home--contact-form--06.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--07</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzEzODoxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/home--contact-form--07.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--08</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzEzOToxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--contact-form--08.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--09</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzE0MDoxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--contact-form--09.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--10</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzE0MToxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/home--contact-form--10.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--11</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzE0MjoxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/home--contact-form--11.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--contact-form--12</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MzE0MzoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/home--contact-form--12.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--service-areas--01</code> — wide hero · <code>vault-ink</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MzI0NToxMDY=-1`
- **slot kind**: img · alt: "Group 259 (1)"
- **depicts**: wide hero
- **rendered**: 390:185×80  575:185×80  768:185×80  992:185×80  1024:185×80  1200:185×80  1440:185×80
- **aspect ratio**: 2.313
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×80 svg
- **reference dominant**: #080808 (avg #FFF5DD) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--service-areas--01.png` @ 370×160
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--service-areas--02</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MzM1OTo5OA==-1`
- **slot kind**: img · alt: "Yelp"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #C69E3D) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/home--service-areas--02.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--service-areas--04</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MzM2ODoxMDQ=-1`
- **slot kind**: img · alt: "Facebook"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #E3BA3C) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/home--service-areas--04.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--08</code> — full-bleed band · <code>steel-500</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.hero-new.dark`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.hero-new.dark:nth-of-type(1) > div.bg.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×3298.3  575:575×3298.3  768:768×3089.5  992:992×3078.6  1024:1024×3127.1  1200:1200×2981.7  1440:1440×2981.7
- **aspect ratio**: 0.483
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `0% 0%` / `repeat`
- **intrinsic (reference)**: 1920×1080 png
- **reference dominant**: #384858 (avg #515964) → **`steel-500`** #64748B — ink-muted (ΔE 18.8)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--08.png` @ 1391×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--09</code> — 4:3 card · <code>vault-ink</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.hero-new.dark`)
- **selector**: `body.home.wp-singular.page-template > main > section.hero-new.dark:nth-of-type(1) > div.container:nth-of-type(2) > div.inner:nth-of-type(2) > div.right.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: 4:3 card
- **rendered**: 390:360×702.8  575:545×702.8  768:720×397  992:930×397  1024:930×397  1200:616×415.4  1440:616×415.4
- **aspect ratio**: 1.483
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `0% 0%` / `no-repeat`
- **intrinsic (reference)**: 701×340 png
- **reference dominant**: #181818 (avg #14161C) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--09.png` @ 1090×1406
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--10</code> — portrait card · <code>vault-ink</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.home.wp-singular.page-template.page-template-pages`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.about-us-new.dark.lazyloaded:nth-of-type(4)`
- **slot kind**: bg
- **depicts**: portrait card
- **rendered**: 390:390×1439.5  575:575×1553.1  768:768×1727  992:992×1944.7  1024:1024×1944.7  1200:—  1440:—
- **aspect ratio**: 0.271
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 500×1200 jpeg
- **reference dominant**: #181818 (avg #26231D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--10.png` @ 1516×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--tulsa-s-1-contractor-for-roofing-w--12</code> — full-bleed band · <code>vault-ink</code> · TULSA’S #1 CONTRACTOR FOR ROOFING & WATERPROOFING</summary>

- **section**: TULSA’S #1 CONTRACTOR FOR ROOFING & WATERPROOFING (`.about-us-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `div#target`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×1439.5  575:575×1553.1  768:768×1727  992:992×1944.7  1024:1024×1944.7  1200:1200×862.7  1440:1440×862.7
- **aspect ratio**: 1.669
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `196.717%` / `29.0151% 38.6868%` / `no-repeat`
- **intrinsic (reference)**: 1920×871 jpeg
- **reference dominant**: #181818 (avg #25221C) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/home--tulsa-s-1-contractor-for-roofing-w--12.png` @ 1516×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--11</code> — full-bleed band · <code>paper</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.home.wp-singular.page-template.page-template-pages`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.steps.lazyloaded:nth-of-type(5)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×1055.3  575:575×938  768:768×597.7  992:992×597.7  1024:1024×597.7  1200:1200×493  1440:1440×493
- **aspect ratio**: 2.921
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #F8F8F8 (avg #F6F7F9) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--11.png` @ 2880×986
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--12</code> — full-bleed band · <code>paper</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.home.wp-singular.page-template.page-template-pages`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.slatedroof-new.lazyloaded:nth-of-type(8)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×2235.5  575:575×2235.5  768:768×2235.5  992:992×2235.5  1024:1024×2235.5  1200:1200×2318  1440:1440×2318
- **aspect ratio**: 0.621
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1920×1194 jpeg
- **reference dominant**: #F8F8F8 (avg #F9F9F9) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--12.png` @ 1789×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--07</code> — 16:9 media · <code>signal-amber</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(1) > div.front:nth-of-type(1) > div.img1.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #C87858 (avg #B68371) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 46.7)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--07.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--08</code> — 16:9 media · <code>signal-amber</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(1) > div.front:nth-of-type(1) > div.img2.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #C87858 (avg #A78C89) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 46.7)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--08.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--09</code> — 16:9 media · <code>steel-500</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(2) > div.front:nth-of-type(1) > div.img1.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #989888 (avg #898782) → **`steel-500`** #64748B — ink-muted (ΔE 27)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--09.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--10</code> — 16:9 media · <code>steel-500</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(2) > div.front:nth-of-type(1) > div.img2.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #989888 (avg #898782) → **`steel-500`** #64748B — ink-muted (ΔE 27)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--10.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--11</code> — 16:9 media · <code>steel-200</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(3) > div.front:nth-of-type(1) > div.img1.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #B8C8D8 (avg #556060) → **`steel-200`** #E2E8F0 — border (ΔE 13.1)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--11.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--12</code> — 16:9 media · <code>steel-200</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(3) > div.front:nth-of-type(1) > div.img2.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #C8D8D8 (avg #808B91) → **`steel-200`** #E2E8F0 — border (ΔE 8.6)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--12.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--13</code> — 16:9 media · <code>steel-200</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(4) > div.front:nth-of-type(1) > div.img1.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #D8D8D8 (avg #A7AFBD) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--13.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--14</code> — 16:9 media · <code>steel-200</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(4) > div.front:nth-of-type(1) > div.img2.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #B8B8B8 (avg #97A1AF) → **`steel-200`** #E2E8F0 — border (ΔE 17.6)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--14.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--15</code> — 16:9 media · <code>steel-500</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(5) > div.front:nth-of-type(1) > div.img1.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #9898A8 (avg #8B9299) → **`steel-500`** #64748B — ink-muted (ΔE 16.6)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--15.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--premium-roofing-materials--16</code> — 16:9 media · <code>steel-500</code> · Premium Roofing Materials</summary>

- **section**: Premium Roofing Materials (`.slatedroof-new.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.slatedroof-new.lazyloaded:nth-of-type(8) > div.inner:nth-of-type(2) > div.item-block:nth-of-type(5) > div.front:nth-of-type(1) > div.img2.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:193×400  575:285.5×400  768:382×400  992:494×400  1024:510×400  1200:598×400  1440:718×400
- **aspect ratio**: 1.795
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100% 100%` / `50% 50%` / `repeat`
- **intrinsic (reference)**: 387×452 png
- **reference dominant**: #888898 (avg #898F96) → **`steel-500`** #64748B — ink-muted (ΔE 11.3)
- **placeholder**: `public/placeholders/home--premium-roofing-materials--16.png` @ 1436×800
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--best-waterproofing-solutions-for-t--01</code> — 16:9 media · <code>steel-200</code> · Best Waterproofing Solutions For Tulsa's Property Owners Needs</summary>

- **section**: Best Waterproofing Solutions For Tulsa's Property Owners Needs (`.waterproofing.dark.nitro-offscreen`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.waterproofing.dark:nth-of-type(10) > div.container.lazyloaded`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:390×562.2  575:575×467.4  768:750×445  992:960×445  1024:960×452.4  1200:1150×571.4  1440:1150×571.4
- **aspect ratio**: 2.013
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `0% 0%` / `repeat`
- **intrinsic (reference)**: 1280×507 jpeg
- **reference dominant**: #D8D8D8 (avg #A4A7AC) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/home--best-waterproofing-solutions-for-t--01.png` @ 2300×1143
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--13</code> — full-bleed band · <code>vault-ink</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.home.wp-singular.page-template.page-template-pages`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.emergency.dark.lazyloaded:nth-of-type(13)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×852  575:575×784.4  768:768×763.5  992:992×831.4  1024:1024×460.2  1200:1200×490.9  1440:1440×490.9
- **aspect ratio**: 2.933
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1920×855 jpeg
- **reference dominant**: #080808 (avg #18121B) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--13.png` @ 1984×1663
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--14</code> — full-bleed band · <code>signal-amber</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.home.wp-singular.page-template.page-template-pages`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.giving.dark.lazyloaded:nth-of-type(14)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×1004.4  575:575×1045.5  768:768×1205.6  992:992×563.2  1024:1024×563.2  1200:1200×712.3  1440:1440×712.3
- **aspect ratio**: 2.022
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1920×1024 png
- **reference dominant**: #F8C838 (avg #615635) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--14.png` @ 2880×1425
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--15</code> — full-bleed band · <code>paper</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.home.wp-singular.page-template.page-template-pages`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.testimonial.lazyloaded:nth-of-type(16)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×304.2  575:575×251.4  768:768×251.4  992:992×226.2  1024:1024×226.2  1200:1200×415.4  1440:1440×415.4
- **aspect ratio**: 3.467
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #F8F8F8 (avg #F7F7F7) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--15.png` @ 2880×831
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--award-winning-tulsa-roofing-compan--16</code> — full-bleed band · <code>vault-ink</code> · AWARD WINNING TULSA ROOFING COMPANY</summary>

- **section**: AWARD WINNING TULSA ROOFING COMPANY (`.home.wp-singular.page-template.page-template-pages`)
- **selector**: `html > body.home.wp-singular.page-template > main > section.contact-new.dark.lazyloaded:nth-of-type(17)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×5167.5  575:575×5193.8  768:768×5122.1  992:992×5151.9  1024:1024×5151.9  1200:1200×4518.2  1440:1440×4518.2
- **aspect ratio**: 0.319
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1921×844 jpeg
- **reference dominant**: #181818 (avg #15161B) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/home--award-winning-tulsa-roofing-compan--16.png` @ 918×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--serving-northeast-oklahoma-with-tr--01</code> — 16:9 media · <code>steel-200</code> · SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO</summary>

- **section**: SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO (`.map-sec.nitro-offscreen`)
- **selector**: `svg#mapArea`
- **slot kind**: inline-svg
- **depicts**: 16:9 media
- **rendered**: 390:360×198.2  575:545×297.8  768:550×300.5  992:445×244  1024:445×244  1200:540×295.1  1440:540×295.1
- **aspect ratio**: 1.83
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 540×296 inline-svg
- **reference dominant**: #D8D8D8 (avg #DBDDDF) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/home--serving-northeast-oklahoma-with-tr--01.png` @ 1100×601
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--pc-lazyloaded--03</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#Mzc5OjExNQ==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:160×64  1440:160×64
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/home--pc-lazyloaded--03.png` @ 320×128
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>home--we-love-hearing-from-our-customers--01</code> — wide hero · <code>paper</code> · WE LOVE HEARING FROM OUR CUSTOMERS!</summary>

- **section**: WE LOVE HEARING FROM OUR CUSTOMERS! (`.testimonial.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.testimonial.lazyloaded:nth-of-type(16) > div.container > div.inner:nth-of-type(3) > div.left:nth-of-type(1) > video`
- **slot kind**: video
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:535×154  1440:535×154
- **aspect ratio**: 3.474
- **object-fit / position**: `contain` / `50% 50%`
- **intrinsic (reference)**: 535×155 video-frame
- **reference dominant**: #F8F8F8 (avg #FEF7E3) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/home--we-love-hearing-from-our-customers--01.png` @ 1070×308
- **why unfilled**: video content — placeholder

</details>
<details><summary><code>home--pc-lazyloaded--04</code> — full-bleed band · <code>vault-blue-deep</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `html > body.home.wp-singular.page-template > header.pc.lazyloaded > div.top.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×78.4  1440:1440×78.4
- **aspect ratio**: 18.367
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100%` / `50% 100%` / `repeat-x`
- **intrinsic (reference)**: 1589×52 png
- **reference dominant**: #283888 (avg #486D91) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/home--pc-lazyloaded--04.png` @ 2880×157
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>

### `listing` — https://africkerroofing.com/residential-roofing-services

32 placeholder slots, 2 removed.

<details><summary><code>listing--pc--01</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#NTQyOjExNg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--pc--01.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--pc--02</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#Njg4OjE1Mg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--pc--02.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--residential-roofing-contractor-in---01</code> — portrait card · <code>steel-500</code> · RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK</summary>

- **section**: RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK (`.serviceouter-one.dark.lazyloaded`)
- **selector**: `img#NzEwOjE5NA==-1`
- **slot kind**: img · alt: "Modern brick house with roofing company sign in front yard under cloudy sky"
- **depicts**: portrait card
- **rendered**: 390:340×300  575:525×300  768:700×300  992:259×300  1024:259×300  1200:316×418.9  1440:316×418.9
- **aspect ratio**: 0.754
- **object-fit / position**: `cover` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 301×399 jpeg
- **reference dominant**: #988878 (avg #7B7D7E) → **`steel-500`** #64748B — ink-muted (ΔE 27.2)
- **placeholder**: `public/placeholders/listing--residential-roofing-contractor-in---01.png` @ 1400×600
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--our-residential-roofing-services-i--01</code> — square slot · <code>steel-500</code> · OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#NzcyOjIwOA==-1`
- **slot kind**: img · alt: "Worker in white uniform walking on paved surface carrying red container at sunset"
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 jpeg
- **reference dominant**: #888888 (avg #8D8D8B) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/listing--our-residential-roofing-services-i--01.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--our-residential-roofing-services-i--02</code> — square slot · <code>steel-500</code> · OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#Nzg3OjIxMA==-1`
- **slot kind**: img · alt: "Worker in white protective suit applying waterproof membrane to concrete foundation"
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 jpeg
- **reference dominant**: #485868 (avg #64758F) → **`steel-500`** #64748B — ink-muted (ΔE 12.3)
- **placeholder**: `public/placeholders/listing--our-residential-roofing-services-i--02.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--our-residential-roofing-services-i--03</code> — square slot · <code>steel-200</code> · OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#ODAyOjIwOQ==-1`
- **slot kind**: img · alt: "Aerial view of large brick and stone house with gray roof surrounded by green lawn"
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 jpeg
- **reference dominant**: #C8D8D8 (avg #686F51) → **`steel-200`** #E2E8F0 — border (ΔE 8.6)
- **placeholder**: `public/placeholders/listing--our-residential-roofing-services-i--03.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--our-residential-roofing-services-i--04</code> — square slot · <code>steel-500</code> · OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#ODE3OjE5Mw==-1`
- **slot kind**: img · alt: "Large two-story brick house with arched windows and manicured lawn"
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 jpeg
- **reference dominant**: #6898E8 (avg #7C8A8F) → **`steel-500`** #64748B — ink-muted (ΔE 34.7)
- **placeholder**: `public/placeholders/listing--our-residential-roofing-services-i--04.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--our-residential-roofing-services-i--05</code> — square slot · <code>vault-ink</code> · OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR RESIDENTIAL ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#ODMzOjIyNA==-1`
- **slot kind**: img · alt: "Black waterproofing membrane applied to building foundation exterior wall"
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 jpeg
- **reference dominant**: #080808 (avg #646359) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--our-residential-roofing-services-i--05.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--01</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0NToxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/listing--contact-form--01.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--02</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0NjoxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--contact-form--02.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--03</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0NzoxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--contact-form--03.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--04</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0ODoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/listing--contact-form--04.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--05</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0OToxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/listing--contact-form--05.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--06</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1MDoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/listing--contact-form--06.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--07</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1NToxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/listing--contact-form--07.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--08</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1NjoxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--contact-form--08.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--09</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1NzoxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--contact-form--09.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--10</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1ODoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/listing--contact-form--10.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--11</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1OToxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/listing--contact-form--11.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--contact-form--12</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA2MDoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/listing--contact-form--12.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--service-areas--01</code> — wide hero · <code>vault-ink</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MjE1ODoxMDY=-1`
- **slot kind**: img · alt: "Group 259 (1)"
- **depicts**: wide hero
- **rendered**: 390:185×80  575:185×80  768:185×80  992:185×80  1024:185×80  1200:185×80  1440:185×80
- **aspect ratio**: 2.313
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×80 svg
- **reference dominant**: #080808 (avg #FFF5DD) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--service-areas--01.png` @ 370×160
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--service-areas--02</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MjI3Mjo5OA==-1`
- **slot kind**: img · alt: "Yelp"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #C69E3D) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/listing--service-areas--02.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--service-areas--04</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MjI4MToxMDQ=-1`
- **slot kind**: img · alt: "Facebook"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #E3BA3C) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/listing--service-areas--04.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--residential-roofing-contractor-in---02</code> — full-bleed band · <code>vault-blue-deep</code> · RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK</summary>

- **section**: RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceouter-one.dark.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×1112.5  575:575×941.3  768:768×837.3  992:992×509.7  1024:1024×509.7  1200:1200×593.3  1440:1440×593.3
- **aspect ratio**: 2.427
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #283888 (avg #273F86) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/listing--residential-roofing-contractor-in---02.png` @ 2880×1187
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--residential-roofing-contractor-in---03</code> — full-bleed band · <code>paper</code> · RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK</summary>

- **section**: RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceouter-two.lazyloaded:nth-of-type(3)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×3101  575:575×3073.5  768:768×3073.5  992:992×3073.5  1024:1024×3073.5  1200:1200×3142.7  1440:1440×3142.7
- **aspect ratio**: 0.458
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #F8F8F8 (avg #F4F5F9) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/listing--residential-roofing-contractor-in---03.png` @ 1320×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--residential-roofing-contractor-in---04</code> — full-bleed band · <code>paper</code> · RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK</summary>

- **section**: RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.testimonial.lazyloaded:nth-of-type(5)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×265.8  575:575×213  768:768×213  992:992×187.8  1024:1024×187.8  1200:1200×415.4  1440:1440×415.4
- **aspect ratio**: 3.467
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #F8F8F8 (avg #F7F7F7) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/listing--residential-roofing-contractor-in---04.png` @ 2880×831
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--residential-roofing-contractor-in---05</code> — full-bleed band · <code>vault-ink</code> · RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK</summary>

- **section**: RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.contact-new.dark.lazyloaded:nth-of-type(6)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×5167.5  575:575×5193.8  768:768×5122.1  992:992×5151.9  1024:1024×5151.9  1200:1200×4518.2  1440:1440×4518.2
- **aspect ratio**: 0.319
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1921×844 jpeg
- **reference dominant**: #181818 (avg #15161B) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/listing--residential-roofing-contractor-in---05.png` @ 918×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--serving-northeast-oklahoma-with-tr--01</code> — 16:9 media · <code>steel-200</code> · SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO</summary>

- **section**: SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO (`.map-sec.nitro-offscreen`)
- **selector**: `svg#mapArea`
- **slot kind**: inline-svg
- **depicts**: 16:9 media
- **rendered**: 390:360×198.2  575:545×297.8  768:550×300.5  992:445×244  1024:445×244  1200:540×295.1  1440:540×295.1
- **aspect ratio**: 1.83
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 540×296 inline-svg
- **reference dominant**: #D8D8D8 (avg #DBDDDF) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/listing--serving-northeast-oklahoma-with-tr--01.png` @ 1100×601
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--pc--03</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#Mzc5OjExNQ==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:160×64  1440:160×64
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/listing--pc--03.png` @ 320×128
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--we-love-hearing-from-our-customers--01</code> — wide hero · <code>paper</code> · WE LOVE HEARING FROM OUR CUSTOMERS!</summary>

- **section**: WE LOVE HEARING FROM OUR CUSTOMERS! (`.testimonial.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.testimonial.lazyloaded:nth-of-type(5) > div.container > div.inner:nth-of-type(3) > div.left:nth-of-type(1) > video`
- **slot kind**: video
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:535×154  1440:535×154
- **aspect ratio**: 3.474
- **object-fit / position**: `contain` / `50% 50%`
- **intrinsic (reference)**: 535×155 video-frame
- **reference dominant**: #F8F8F8 (avg #FEF7E3) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/listing--we-love-hearing-from-our-customers--01.png` @ 1070×308
- **why unfilled**: video content — placeholder

</details>
<details><summary><code>listing--pc--04</code> — full-bleed band · <code>vault-blue-deep</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > header.pc > div.top.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×78.4  1440:1440×78.4
- **aspect ratio**: 18.367
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100%` / `50% 100%` / `repeat-x`
- **intrinsic (reference)**: 1589×52 png
- **reference dominant**: #283888 (avg #486D91) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/listing--pc--04.png` @ 2880×157
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>listing--residential-roofing-contractor-in---06</code> — full-bleed band · <code>signal-amber</code> · RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK</summary>

- **section**: RESIDENTIAL ROOFING CONTRACTOR IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceouter-three.dark.lazyloaded:nth-of-type(4)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×600  1440:1440×600
- **aspect ratio**: 2.4
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `100% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #D88818 (avg #C69134) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 13.4)
- **placeholder**: `public/placeholders/listing--residential-roofing-contractor-in---06.png` @ 2880×1200
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>

### `detail` — https://africkerroofing.com/residential-roofing-material/asphalt-shingle-roof

33 placeholder slots, 3 removed.

<details><summary><code>detail--pc-lazyloaded--01</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#Mzc5OjExNQ==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:160×64  1440:160×64
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--pc-lazyloaded--01.png` @ 320×128
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--asphalt-shingle-roofing-services-i--01</code> — square slot · <code>vault-ink</code> · ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK</summary>

- **section**: ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK (`.serviceinner-one.dark.lazyloaded`)
- **selector**: `img#NzMzOjE3MQ==-1`
- **slot kind**: img · alt: "Modern gray shingle roofing against blue sky on residential home."
- **depicts**: square slot
- **rendered**: 390:360×399.7  575:545×605  768:720×799.3  992:357×396.3  1024:357×396.3  1200:433×480.7  1440:433×480.7
- **aspect ratio**: 0.901
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 481×534 png
- **reference dominant**: #080808 (avg #8F8A6F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--asphalt-shingle-roofing-services-i--01.png` @ 1440×1599
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--hire-a-fricker-roofing-and-waterpr--01</code> — 4:3 card · <code>steel-500</code> · HIRE A. FRICKER ROOFING AND WATERPROOFING FOR ASPHALT SHINGLE ROOF INS</summary>

- **section**: HIRE A. FRICKER ROOFING AND WATERPROOFING FOR ASPHALT SHINGLE ROOF INS (`.serviceinner-four.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#ODg3OjE4MQ==-1`
- **slot kind**: img · alt: "Elegant two-story brick house with manicured lawn under clear blue sky."
- **depicts**: 4:3 card
- **rendered**: 390:360×253.7  575:545×382.5  768:720×504.3  992:440×309.4  1024:440×309.4  1200:535×375.5  1440:535×375.5
- **aspect ratio**: 1.425
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `15px`
- **intrinsic (reference)**: 451×314 jpeg
- **reference dominant**: #5888C8 (avg #828881) → **`steel-500`** #64748B — ink-muted (ΔE 25)
- **placeholder**: `public/placeholders/detail--hire-a-fricker-roofing-and-waterpr--01.png` @ 1440×1009
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--blogs--01</code> — 4:3 card · <code>vault-blue-deep</code> · BLOGS</summary>

- **section**: BLOGS (`.blogs-one.nitro-offscreen`)
- **selector**: `img#OTAyOjIwMQ==-1`
- **slot kind**: img · alt: "Close-up of cracked and faded roof shingles under sunlight, illustrating UV damage."
- **depicts**: 4:3 card
- **rendered**: 390:360×244.8  575:545×370.6  768:720×489.6  992:930×632.4  1024:300×204  1200:363.3×247.1  1440:363.3×247.1
- **aspect ratio**: 1.47
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 1250×850 jpeg
- **reference dominant**: #283888 (avg #909292) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/detail--blogs--01.png` @ 1860×1265
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--blogs--02</code> — 4:3 card · <code>steel-500</code> · BLOGS</summary>

- **section**: BLOGS (`.blogs-one.nitro-offscreen`)
- **selector**: `img#OTIwOjE5Ng==-1`
- **slot kind**: img · alt: "What's the Minimum Pitch for Asphalt Shingles?"
- **depicts**: 4:3 card
- **rendered**: 390:360×244.8  575:545×370.6  768:720×489.6  992:930×632.4  1024:300×204  1200:363.3×247.1  1440:363.3×247.1
- **aspect ratio**: 1.47
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 1250×850 jpeg
- **reference dominant**: #98A8B8 (avg #7D8798) → **`steel-500`** #64748B — ink-muted (ΔE 20.4)
- **placeholder**: `public/placeholders/detail--blogs--02.png` @ 1860×1265
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--blogs--03</code> — 4:3 card · <code>vault-blue-deep</code> · BLOGS</summary>

- **section**: BLOGS (`.blogs-one.nitro-offscreen`)
- **selector**: `img#OTM4OjIwMA==-1`
- **slot kind**: img · alt: "Partial installation of asphalt shingle roofing on a brick house under construction."
- **depicts**: 4:3 card
- **rendered**: 390:360×244.8  575:545×370.6  768:720×489.6  992:930×632.4  1024:300×204  1200:363.3×247.1  1440:363.3×247.1
- **aspect ratio**: 1.47
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 1250×850 jpeg
- **reference dominant**: #283888 (avg #838084) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/detail--blogs--03.png` @ 1860×1265
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--01</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU0OToxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/detail--contact-form--01.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--02</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU1MDoxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--contact-form--02.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--03</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU1MToxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--contact-form--03.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--04</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU1MjoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/detail--contact-form--04.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--05</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU1MzoxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/detail--contact-form--05.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--06</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU1NDoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/detail--contact-form--06.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--07</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU1OToxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/detail--contact-form--07.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--08</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU2MDoxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--contact-form--08.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--09</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU2MToxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--contact-form--09.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--10</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU2MjoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/detail--contact-form--10.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--11</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU2MzoxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/detail--contact-form--11.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--contact-form--12</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjU2NDoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/detail--contact-form--12.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--service-areas--01</code> — wide hero · <code>vault-ink</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MjY2MjoxMDY=-1`
- **slot kind**: img · alt: "Group 259 (1)"
- **depicts**: wide hero
- **rendered**: 390:185×80  575:185×80  768:185×80  992:185×80  1024:185×80  1200:185×80  1440:185×80
- **aspect ratio**: 2.313
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×80 svg
- **reference dominant**: #080808 (avg #FFF5DD) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--service-areas--01.png` @ 370×160
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--service-areas--02</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#Mjc3Njo5OA==-1`
- **slot kind**: img · alt: "Yelp"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #C69E3D) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/detail--service-areas--02.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--service-areas--04</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#Mjc4NToxMDQ=-1`
- **slot kind**: img · alt: "Facebook"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #E3BA3C) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/detail--service-areas--04.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--we-love-hearing-from-our-customers--01</code> — wide hero · <code>paper</code> · WE LOVE HEARING FROM OUR CUSTOMERS!</summary>

- **section**: WE LOVE HEARING FROM OUR CUSTOMERS! (`.testimonial.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.testimonial.lazyloaded:nth-of-type(7) > div.container > div.inner:nth-of-type(3) > div.left:nth-of-type(1) > video`
- **slot kind**: video
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:535×154  1440:535×154
- **aspect ratio**: 3.474
- **object-fit / position**: `contain` / `50% 50%`
- **intrinsic (reference)**: 535×155 video-frame
- **reference dominant**: #F8F8F8 (avg #FEF7E3) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/detail--we-love-hearing-from-our-customers--01.png` @ 1070×308
- **why unfilled**: video content — placeholder

</details>
<details><summary><code>detail--pc-lazyloaded--02</code> — full-bleed band · <code>vault-blue-deep</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > header.pc.lazyloaded > div.top.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×78.4  1440:1440×78.4
- **aspect ratio**: 18.367
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100%` / `50% 100%` / `repeat-x`
- **intrinsic (reference)**: 1589×52 png
- **reference dominant**: #283888 (avg #486D91) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/detail--pc-lazyloaded--02.png` @ 2880×157
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--asphalt-shingle-roofing-services-i--02</code> — full-bleed band · <code>vault-blue-deep</code> · ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK</summary>

- **section**: ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-inner`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceinner-one.dark.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×1243.5  575:575×1295.4  768:768×1326.5  992:992×611.8  1024:1024×611.8  1200:1200×680.1  1440:1440×680.1
- **aspect ratio**: 2.117
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×667 jpeg
- **reference dominant**: #283888 (avg #273F86) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/detail--asphalt-shingle-roofing-services-i--02.png` @ 1536×2653
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--hero-form--02</code> — wide hero · <code>vault-ink</code> · Hero Form</summary>

- **section**: Hero Form (`.hero-new.inner-form`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > div.hero-new.inner-form:nth-of-type(1) > div.inner > div.right.lazyloaded`
- **slot kind**: bg
- **depicts**: wide hero
- **rendered**: 390:351×729.2  575:517.5×729.2  768:614.4×423.4  992:793.6×423.4  1024:819.2×423.4  1200:960×423.4  1440:1152×423.4
- **aspect ratio**: 2.721
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `0% 0%` / `no-repeat`
- **intrinsic (reference)**: 701×340 png
- **reference dominant**: #181818 (avg #14161C) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/detail--hero-form--02.png` @ 2304×847
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--asphalt-shingle-roofing-services-i--03</code> — full-bleed band · <code>vault-ink</code> · ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK</summary>

- **section**: ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-inner`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceinner-two.dark.inner-two:nth-of-type(3)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×560.9  575:575×443.7  768:768×406.9  992:992×363.3  1024:1024×363.3  1200:1200×423.2  1440:1440×423.2
- **aspect ratio**: 3.403
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #181808 (avg #2E2917) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 19.4)
- **placeholder**: `public/placeholders/detail--asphalt-shingle-roofing-services-i--03.png` @ 2880×846
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--asphalt-shingle-roofing-services-i--04</code> — full-bleed band · <code>paper</code> · ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK</summary>

- **section**: ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-inner`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceinner-three.lazyloaded:nth-of-type(4)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×874.7  575:575×729.8  768:768×685  992:992×517  1024:1024×517  1200:1200×444.4  1440:1440×444.4
- **aspect ratio**: 3.24
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×639 jpeg
- **reference dominant**: #F8F8F8 (avg #F4F5F9) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/detail--asphalt-shingle-roofing-services-i--04.png` @ 2880×889
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--asphalt-shingle-roofing-services-i--05</code> — full-bleed band · <code>signal-amber</code> · ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK</summary>

- **section**: ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-inner`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceinner-four.dark.lazyloaded:nth-of-type(5)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×844.3  575:575×855.9  768:768×927.7  992:992×491.4  1024:1024×491.4  1200:1200×543.4  1440:1440×543.4
- **aspect ratio**: 2.65
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×620 jpeg
- **reference dominant**: #F8C838 (avg #615732) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/detail--asphalt-shingle-roofing-services-i--05.png` @ 2880×1087
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--asphalt-shingle-roofing-services-i--06</code> — full-bleed band · <code>paper</code> · ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK</summary>

- **section**: ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-inner`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.testimonial.lazyloaded:nth-of-type(7)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×265.8  575:575×213  768:768×213  992:992×187.8  1024:1024×187.8  1200:1200×415.4  1440:1440×415.4
- **aspect ratio**: 3.467
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #F8F8F8 (avg #F7F7F7) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/detail--asphalt-shingle-roofing-services-i--06.png` @ 2880×831
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--asphalt-shingle-roofing-services-i--07</code> — full-bleed band · <code>vault-ink</code> · ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK</summary>

- **section**: ASPHALT SHINGLE ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-inner`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.contact-new.dark.lazyloaded:nth-of-type(8)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×5167.5  575:575×5193.8  768:768×5122.1  992:992×5151.9  1024:1024×5151.9  1200:1200×4518.2  1440:1440×4518.2
- **aspect ratio**: 0.319
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1921×844 jpeg
- **reference dominant**: #181818 (avg #15161B) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/detail--asphalt-shingle-roofing-services-i--07.png` @ 918×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--serving-northeast-oklahoma-with-tr--01</code> — 16:9 media · <code>steel-200</code> · SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO</summary>

- **section**: SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO (`.map-sec.nitro-offscreen`)
- **selector**: `svg#mapArea`
- **slot kind**: inline-svg
- **depicts**: 16:9 media
- **rendered**: 390:360×198.2  575:545×297.8  768:550×300.5  992:445×244  1024:445×244  1200:540×295.1  1440:540×295.1
- **aspect ratio**: 1.83
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 540×296 inline-svg
- **reference dominant**: #D8D8D8 (avg #DBDDDF) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/detail--serving-northeast-oklahoma-with-tr--01.png` @ 1100×601
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--pc-lazyloaded--03</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#NTQyOjExNg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--pc-lazyloaded--03.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>detail--pc-lazyloaded--04</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#Njg4OjE1Mg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/detail--pc-lazyloaded--04.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>

### `generic-content` — https://africkerroofing.com/emergency-services

31 placeholder slots, 2 removed.

<details><summary><code>generic-content--pc--01</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#Mzc5OjExNQ==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:160×64  1440:160×64
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/generic-content--pc--01.png` @ 320×128
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--emergency-roofing-services-in-tuls--01</code> — portrait card · <code>steel-200</code> · EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: EMERGENCY ROOFING SERVICES IN TULSA, OK (`.serviceouter-one.dark.lazyloaded`)
- **selector**: `img#NzEwOjE5NQ==-1`
- **slot kind**: img · alt: "Storm damaged house with torn roof and exposed wooden beams under cloudy sky"
- **depicts**: portrait card
- **rendered**: 390:340×300  575:525×300  768:700×300  992:259×300  1024:259×300  1200:316×418.9  1440:316×418.9
- **aspect ratio**: 0.754
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 301×399 jpeg
- **reference dominant**: #C8C8D8 (avg #8B8982) → **`steel-200`** #E2E8F0 — border (ΔE 11.8)
- **placeholder**: `public/placeholders/generic-content--emergency-roofing-services-in-tuls--01.png` @ 1400×600
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--our-24-7-emergency-roofing-service--01</code> — square slot · <code>paper</code> · OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#NzcwOjIwMw==-1`
- **slot kind**: img · alt: "Storm damage with large tree fallen on white residential house roof and yard"
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 jpeg
- **reference dominant**: #F8F8F8 (avg #8C855E) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/generic-content--our-24-7-emergency-roofing-service--01.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--our-24-7-emergency-roofing-service--02</code> — square slot · <code>steel-200</code> · OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#Nzg1OjIwMg==-1`
- **slot kind**: img · alt: "Hands holding small model house representing real estate and home ownership"
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 jpeg
- **reference dominant**: #C8C8C8 (avg #B6AFAC) → **`steel-200`** #E2E8F0 — border (ΔE 12.1)
- **placeholder**: `public/placeholders/generic-content--our-24-7-emergency-roofing-service--02.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--our-24-7-emergency-roofing-service--03</code> — square slot · <code>steel-500</code> · OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#ODAwOjIwMw==-1`
- **slot kind**: img · alt: "House with damaged roof under construction or repair with exposed wooden framework"
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 png
- **reference dominant**: #988878 (avg #7A7772) → **`steel-500`** #64748B — ink-muted (ΔE 27.2)
- **placeholder**: `public/placeholders/generic-content--our-24-7-emergency-roofing-service--03.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--our-24-7-emergency-roofing-service--04</code> — square slot · <code>steel-200</code> · OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: OUR 24/7 EMERGENCY ROOFING SERVICES IN TULSA, OK (`.serviceouter-two.lazyloaded`)
- **selector**: `img#ODE1OjE5Mw==-1`
- **slot kind**: img · alt: "Red ceramic roof tiles with hail damage alongside packed ice."
- **depicts**: square slot
- **rendered**: 390:197×196  575:197×196  768:197×196  992:197×196  1024:197×196  1200:197×196  1440:197×196
- **aspect ratio**: 1.005
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `100%`
- **intrinsic (reference)**: 187×186 jpeg
- **reference dominant**: #C88868 (avg #B9836F) → **`steel-200`** #E2E8F0 — border (ΔE 48.1)
- **placeholder**: `public/placeholders/generic-content--our-24-7-emergency-roofing-service--04.png` @ 394×392
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--01</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0MToxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/generic-content--contact-form--01.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--02</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0MjoxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/generic-content--contact-form--02.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--03</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0MzoxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/generic-content--contact-form--03.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--04</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0NDoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/generic-content--contact-form--04.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--05</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0NToxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/generic-content--contact-form--05.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--06</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA0NjoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/generic-content--contact-form--06.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--07</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1MToxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/generic-content--contact-form--07.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--08</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1MjoxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/generic-content--contact-form--08.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--09</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1MzoxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/generic-content--contact-form--09.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--10</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1NDoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/generic-content--contact-form--10.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--11</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1NToxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/generic-content--contact-form--11.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--contact-form--12</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-offscreen.lazyloaded`)
- **selector**: `img#MjA1NjoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/generic-content--contact-form--12.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--service-areas--01</code> — wide hero · <code>vault-ink</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MjE1NDoxMDY=-1`
- **slot kind**: img · alt: "Group 259 (1)"
- **depicts**: wide hero
- **rendered**: 390:185×80  575:185×80  768:185×80  992:185×80  1024:185×80  1200:185×80  1440:185×80
- **aspect ratio**: 2.313
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×80 svg
- **reference dominant**: #080808 (avg #FFF5DD) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/generic-content--service-areas--01.png` @ 370×160
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--service-areas--02</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MjI2ODo5OA==-1`
- **slot kind**: img · alt: "Yelp"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #C69E3D) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/generic-content--service-areas--02.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--service-areas--04</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MjI3NzoxMDQ=-1`
- **slot kind**: img · alt: "Facebook"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #E3BA3C) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/generic-content--service-areas--04.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--we-love-hearing-from-our-customers--01</code> — wide hero · <code>paper</code> · WE LOVE HEARING FROM OUR CUSTOMERS!</summary>

- **section**: WE LOVE HEARING FROM OUR CUSTOMERS! (`.testimonial.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.testimonial.lazyloaded:nth-of-type(5) > div.container > div.inner:nth-of-type(3) > div.left:nth-of-type(1) > video`
- **slot kind**: video
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:535×154  1440:535×154
- **aspect ratio**: 3.474
- **object-fit / position**: `contain` / `50% 50%`
- **intrinsic (reference)**: 535×155 video-frame
- **reference dominant**: #F8F8F8 (avg #FEF7E3) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/generic-content--we-love-hearing-from-our-customers--01.png` @ 1070×308
- **why unfilled**: video content — placeholder

</details>
<details><summary><code>generic-content--pc--02</code> — full-bleed band · <code>vault-blue-deep</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > header.pc > div.top.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×78.4  1440:1440×78.4
- **aspect ratio**: 18.367
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100%` / `50% 100%` / `repeat-x`
- **intrinsic (reference)**: 1589×52 png
- **reference dominant**: #283888 (avg #486D91) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/generic-content--pc--02.png` @ 2880×157
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--emergency-roofing-services-in-tuls--02</code> — full-bleed band · <code>vault-blue-deep</code> · EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: EMERGENCY ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceouter-one.dark.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×1014.9  575:575×880.5  768:768×798.8  992:992×456.9  1024:1024×456.9  1200:1200×593.3  1440:1440×593.3
- **aspect ratio**: 2.427
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #283888 (avg #273F86) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/generic-content--emergency-roofing-services-in-tuls--02.png` @ 2880×1187
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--emergency-roofing-services-in-tuls--03</code> — full-bleed band · <code>paper</code> · EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: EMERGENCY ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceouter-two.lazyloaded:nth-of-type(3)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×2520.9  575:575×2520.9  768:768×2493.3  992:992×2493.3  1024:1024×2493.3  1200:1200×2562.5  1440:1440×2562.5
- **aspect ratio**: 0.562
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #F8F8F8 (avg #F4F5F9) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/generic-content--emergency-roofing-services-in-tuls--03.png` @ 1618×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--emergency-roofing-services-in-tuls--04</code> — full-bleed band · <code>signal-amber</code> · EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: EMERGENCY ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.serviceouter-three.dark.lazyloaded:nth-of-type(4)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×563.2  1440:1440×563.2
- **aspect ratio**: 2.557
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `100% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #D88808 (avg #C89734) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 11.3)
- **placeholder**: `public/placeholders/generic-content--emergency-roofing-services-in-tuls--04.png` @ 2880×1126
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--emergency-roofing-services-in-tuls--05</code> — full-bleed band · <code>paper</code> · EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: EMERGENCY ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.testimonial.lazyloaded:nth-of-type(5)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×265.8  575:575×213  768:768×213  992:992×187.8  1024:1024×187.8  1200:1200×415.4  1440:1440×415.4
- **aspect ratio**: 3.467
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #F8F8F8 (avg #F7F7F7) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/generic-content--emergency-roofing-services-in-tuls--05.png` @ 2880×831
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--emergency-roofing-services-in-tuls--06</code> — full-bleed band · <code>vault-ink</code> · EMERGENCY ROOFING SERVICES IN TULSA, OK</summary>

- **section**: EMERGENCY ROOFING SERVICES IN TULSA, OK (`.wp-singular.page-template.page-template-pages.page-template-service-outer`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.contact-new.dark.lazyloaded:nth-of-type(6)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×5167.5  575:575×5193.8  768:768×5122.1  992:992×5151.9  1024:1024×5151.9  1200:1200×4518.2  1440:1440×4518.2
- **aspect ratio**: 0.319
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1921×844 jpeg
- **reference dominant**: #181818 (avg #15161B) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/generic-content--emergency-roofing-services-in-tuls--06.png` @ 918×2880
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--serving-northeast-oklahoma-with-tr--01</code> — 16:9 media · <code>steel-200</code> · SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO</summary>

- **section**: SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO (`.map-sec.nitro-offscreen`)
- **selector**: `svg#mapArea`
- **slot kind**: inline-svg
- **depicts**: 16:9 media
- **rendered**: 390:360×198.2  575:545×297.8  768:550×300.5  992:445×244  1024:445×244  1200:540×295.1  1440:540×295.1
- **aspect ratio**: 1.83
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 540×296 inline-svg
- **reference dominant**: #D8D8D8 (avg #DBDDDF) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/generic-content--serving-northeast-oklahoma-with-tr--01.png` @ 1100×601
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--pc--03</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#NTQyOjExNg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/generic-content--pc--03.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>generic-content--pc--04</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#Njg4OjE1Mg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/generic-content--pc--04.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>

### `contact` — https://africkerroofing.com/contact-us

11 placeholder slots, 3 removed.

<details><summary><code>contact--pc--01</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#Mzc5OjExNQ==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:160×64  1440:160×64
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/contact--pc--01.png` @ 320×128
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--contact-us--01</code> — wide hero · <code>vault-ink</code> · CONTACT US</summary>

- **section**: CONTACT US (`.breadcrumb.lazyloaded`)
- **selector**: `img#NzA3OjExOA==-1`
- **slot kind**: img · alt: "Group 259 (1)"
- **depicts**: wide hero
- **rendered**: 390:185×80  575:185×80  768:185×80  992:185×80  1024:185×80  1200:185×80  1440:185×80
- **aspect ratio**: 2.313
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×80 svg
- **reference dominant**: #080808 (avg #FFF5DD) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/contact--contact-us--01.png` @ 370×160
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--service-areas--01</code> — wide hero · <code>vault-ink</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTUxMDoxMDY=-1`
- **slot kind**: img · alt: "Group 259 (1)"
- **depicts**: wide hero
- **rendered**: 390:185×80  575:185×80  768:185×80  992:185×80  1024:185×80  1200:185×80  1440:185×80
- **aspect ratio**: 2.313
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×80 svg
- **reference dominant**: #080808 (avg #FFF5DD) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/contact--service-areas--01.png` @ 370×160
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--service-areas--02</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTYyNDo5OA==-1`
- **slot kind**: img · alt: "Yelp"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #C69E3D) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/contact--service-areas--02.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--service-areas--04</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen.lazyloaded`)
- **selector**: `img#MTYzMzoxMDQ=-1`
- **slot kind**: img · alt: "Facebook"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #E3BA3C) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/contact--service-areas--04.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--pc--02</code> — full-bleed band · <code>vault-blue-deep</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > header.pc > div.top.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×78.4  1440:1440×78.4
- **aspect ratio**: 18.367
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100%` / `50% 100%` / `repeat-x`
- **intrinsic (reference)**: 1589×52 png
- **reference dominant**: #283888 (avg #486D91) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/contact--pc--02.png` @ 2880×157
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--contact-us--03</code> — full-bleed band · <code>vault-navy</code> · CONTACT US</summary>

- **section**: CONTACT US (`.wp-singular.page-template.page-template-pages.page-template-contact`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.breadcrumb.lazyloaded:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:390×281.8  575:575×282  768:768×282  992:992×282  1024:1024×282  1200:1200×232  1440:1440×232
- **aspect ratio**: 6.207
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 0%` / `no-repeat`
- **intrinsic (reference)**: 1440×409 jpeg
- **reference dominant**: #182858 (avg #66624E) → **`vault-navy`** #14213D — primary brand, dark bands, header (ΔE 14)
- **placeholder**: `public/placeholders/contact--contact-us--03.png` @ 2880×464
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--contact-form--02</code> — portrait card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-one.dark`)
- **selector**: `section.contact-one.dark:nth-of-type(2) > div.container > div.contact-content:nth-of-type(2) > div.row.align-items-center > div.col-md-6.col-12.lazyloaded:nth-of-type(2) > div.contact-form.lazyloaded`
- **slot kind**: bg
- **depicts**: portrait card
- **rendered**: 390:360×631.9  575:545×631.9  768:720×486  992:930×486  1024:457.5×507.3  1200:552.5×486  1440:552.5×486
- **aspect ratio**: 1.137
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `0% 0%` / `no-repeat`
- **intrinsic (reference)**: 701×340 png
- **reference dominant**: #181818 (avg #14161C) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 10.8)
- **placeholder**: `public/placeholders/contact--contact-form--02.png` @ 1860×972
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--serving-northeast-oklahoma-with-tr--01</code> — 16:9 media · <code>steel-200</code> · SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO</summary>

- **section**: SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO (`.map-sec.nitro-offscreen`)
- **selector**: `svg#mapArea`
- **slot kind**: inline-svg
- **depicts**: 16:9 media
- **rendered**: 390:360×198.2  575:545×297.8  768:550×300.5  992:445×244  1024:445×244  1200:540×295.1  1440:540×295.1
- **aspect ratio**: 1.83
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 540×296 inline-svg
- **reference dominant**: #D8D8D8 (avg #DBDDDF) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/contact--serving-northeast-oklahoma-with-tr--01.png` @ 1100×601
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--pc--03</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#NTQyOjExNg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/contact--pc--03.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>contact--pc--04</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#Njg4OjE1Mg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/contact--pc--04.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>

### `about` — https://africkerroofing.com/about-us

29 placeholder slots, 2 removed.

<details><summary><code>about--pc-lazyloaded--01</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#MzgzOjExNQ==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:160×64  1440:160×64
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--pc-lazyloaded--01.png` @ 320×128
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--about-a-fricker-roofing-and-waterp--01</code> — square slot · <code>vault-ink</code> · ABOUT A. FRICKER ROOFING AND WATERPROOFING</summary>

- **section**: ABOUT A. FRICKER ROOFING AND WATERPROOFING (`.team-one.dark`)
- **selector**: `img#NzEyOjIyNA==-1`
- **slot kind**: img · alt: "Happy family of three laughing together outdoors, parents holding young child upside down"
- **depicts**: square slot
- **rendered**: 390:360×360  575:545×545  768:720×720  992:930×930  1024:378.8×378.8  1200:457.9×457.9  1440:457.9×457.9
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 1440×1440 jpeg
- **reference dominant**: #181808 (avg #6B5F53) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 19.4)
- **placeholder**: `public/placeholders/about--about-a-fricker-roofing-and-waterp--01.png` @ 1860×1860
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--our-services--01</code> — wide hero · <code>vault-ink</code> · OUR SERVICES</summary>

- **section**: OUR SERVICES (`.team-three.lazyloaded`)
- **selector**: `img#NzM1Ojg3-1`
- **slot kind**: img · alt: "Group 259"
- **depicts**: wide hero
- **rendered**: 390:200×86.2  575:200×86.2  768:200×86.2  992:200×86.2  1024:200×86.2  1200:200×86.2  1440:200×86.2
- **aspect ratio**: 2.32
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 406×175 svg
- **reference dominant**: #080808 (avg #FFFAE2) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--our-services--01.png` @ 400×172
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--contact-form--01</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTYyOToxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/about--contact-form--01.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--02</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTYzMDoxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--contact-form--02.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--03</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTYzMToxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--contact-form--03.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--04</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTYzMjoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/about--contact-form--04.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--05</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTYzMzoxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/about--contact-form--05.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--06</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTYzNDoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `10px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/about--contact-form--06.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--07</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTYzOToxOTQ=-1`
- **slot kind**: img · alt: "Aerial view of a commercial building's flat white rooftop with HVAC units."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8C8B8 (avg #898485) → **`steel-200`** #E2E8F0 — border (ΔE 18.2)
- **placeholder**: `public/placeholders/about--contact-form--07.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--08</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTY0MDoxODI=-1`
- **slot kind**: img · alt: "Elegant suburban brick house with autumn trees and manicured lawn."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #73775D) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--contact-form--08.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--09</code> — 4:3 card · <code>vault-ink</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTY0MToxODE=-1`
- **slot kind**: img · alt: "Street view of a modern commercial building with large windows."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #080808 (avg #7F725F) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--contact-form--09.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--10</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTY0MjoxNzc=-1`
- **slot kind**: img · alt: "Aerial view of red brick building with new gray shingle roof."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #B8A8A8 (avg #9E8A77) → **`steel-200`** #E2E8F0 — border (ΔE 23.4)
- **placeholder**: `public/placeholders/about--contact-form--10.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--11</code> — 4:3 card · <code>steel-500</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTY0MzoxNzk=-1`
- **slot kind**: img · alt: "Charming gray wooden house with white trim and a lush garden."
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #888888 (avg #737462) → **`steel-500`** #64748B — ink-muted (ΔE 16.7)
- **placeholder**: `public/placeholders/about--contact-form--11.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--contact-form--12</code> — 4:3 card · <code>steel-200</code> · Contact Form</summary>

- **section**: Contact Form (`.contact-new.dark.nitro-lazy.nitro-offscreen`)
- **selector**: `img#MTY0NDoxOTI=-1`
- **slot kind**: img · alt: "Wide view of a flat rooftop with protective white membrane in urban area"
- **depicts**: 4:3 card
- **rendered**: 390:511×341  575:511×341  768:511×341  992:511×341  1024:511×341  1200:511×341  1440:511×341
- **aspect ratio**: 1.499
- **object-fit / position**: `fill` / `50% 50%`
- **border-radius**: `8px`
- **intrinsic (reference)**: 511×341 png
- **reference dominant**: #D8D8C8 (avg #B8B2AB) → **`steel-200`** #E2E8F0 — border (ΔE 13.9)
- **placeholder**: `public/placeholders/about--contact-form--12.png` @ 1022×682
- **why unfilled**: photography — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--service-areas--01</code> — wide hero · <code>vault-ink</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MTc0MjoxMDY=-1`
- **slot kind**: img · alt: "Group 259 (1)"
- **depicts**: wide hero
- **rendered**: 390:185×80  575:185×80  768:185×80  992:185×80  1024:185×80  1200:185×80  1440:185×80
- **aspect ratio**: 2.313
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×80 svg
- **reference dominant**: #080808 (avg #FFF5DD) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--service-areas--01.png` @ 370×160
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--service-areas--02</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MTg1Njo5OA==-1`
- **slot kind**: img · alt: "Yelp"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #C69E3D) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/about--service-areas--02.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--service-areas--04</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MTg2NToxMDQ=-1`
- **slot kind**: img · alt: "Facebook"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #E3BA3C) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/about--service-areas--04.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--we-love-hearing-from-our-customers--01</code> — wide hero · <code>paper</code> · WE LOVE HEARING FROM OUR CUSTOMERS!</summary>

- **section**: WE LOVE HEARING FROM OUR CUSTOMERS! (`.testimonial.nitro-offscreen.lazyloaded`)
- **selector**: `main > section.testimonial.lazyloaded:nth-of-type(3) > div.container > div.inner:nth-of-type(3) > div.left:nth-of-type(1) > video`
- **slot kind**: video
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:535×154  1440:—
- **aspect ratio**: 3.474
- **object-fit / position**: `contain` / `50% 50%`
- **intrinsic (reference)**: 535×155 video-frame
- **reference dominant**: #F8F8F8 (avg #FEF7E3) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/about--we-love-hearing-from-our-customers--01.png` @ 1070×308
- **why unfilled**: video content — placeholder

</details>
<details><summary><code>about--pc-lazyloaded--02</code> — full-bleed band · <code>vault-blue-deep</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > header.pc.lazyloaded > div.top.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×78.4  1440:1440×78.4
- **aspect ratio**: 18.367
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100%` / `50% 100%` / `repeat-x`
- **intrinsic (reference)**: 1589×52 png
- **reference dominant**: #283888 (avg #486D91) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/about--pc-lazyloaded--02.png` @ 2880×157
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--about-a-fricker-roofing-and-waterp--02</code> — full-bleed band · <code>vault-navy</code> · ABOUT A. FRICKER ROOFING AND WATERPROOFING</summary>

- **section**: ABOUT A. FRICKER ROOFING AND WATERPROOFING (`.wp-singular.page-template.page-template-pages.page-template-about`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.team-three.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×411.7  1440:1440×411.7
- **aspect ratio**: 3.498
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×545 png
- **reference dominant**: #183868 (avg #807655) → **`vault-navy`** #14213D — primary brand, dark bands, header (ΔE 16.1)
- **placeholder**: `public/placeholders/about--about-a-fricker-roofing-and-waterp--02.png` @ 2880×823
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--about-a-fricker-roofing-and-waterp--03</code> — full-bleed band · <code>paper</code> · ABOUT A. FRICKER ROOFING AND WATERPROOFING</summary>

- **section**: ABOUT A. FRICKER ROOFING AND WATERPROOFING (`.wp-singular.page-template.page-template-pages.page-template-about`)
- **selector**: `html > body.wp-singular.page-template.page-template-pages > main > section.testimonial.lazyloaded:nth-of-type(3)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×415.4  1440:—
- **aspect ratio**: 2.889
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `cover` / `50% 50%` / `no-repeat`
- **intrinsic (reference)**: 1440×768 jpeg
- **reference dominant**: #F8F8F8 (avg #F7F7F7) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/about--about-a-fricker-roofing-and-waterp--03.png` @ 2400×831
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--serving-northeast-oklahoma-with-tr--01</code> — 16:9 media · <code>steel-200</code> · SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO</summary>

- **section**: SERVING NORTHEAST OKLAHOMA WITH TRUST AND EXCELLENCE TULSA & ROGERS CO (`.map-sec.nitro-offscreen`)
- **selector**: `svg#mapArea`
- **slot kind**: inline-svg
- **depicts**: 16:9 media
- **rendered**: 390:360×198.2  575:545×297.8  768:550×300.5  992:445×244  1024:445×244  1200:540×295.1  1440:540×295.1
- **aspect ratio**: 1.83
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 540×296 inline-svg
- **reference dominant**: #D8D8D8 (avg #DBDDDF) → **`steel-200`** #E2E8F0 — border (ΔE 7.1)
- **placeholder**: `public/placeholders/about--serving-northeast-oklahoma-with-tr--01.png` @ 1100×601
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--pc-lazyloaded--03</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#NTQ2OjExNg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:—  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--pc-lazyloaded--03.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL (resolved from NitroPack lazy data: URI via alt match)

</details>
<details><summary><code>about--pc-lazyloaded--04</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#NjkyOjE1Mg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--pc-lazyloaded--04.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--our-services--02</code> — 16:9 media · <code>vault-blue-deep</code> · OUR SERVICES</summary>

- **section**: OUR SERVICES (`.team-three.nitro-offscreen.lazyloaded`)
- **selector**: `body.wp-singular.page-template.page-template-pages > main > section.team-three.lazyloaded:nth-of-type(2) > div.container > div.row > div.col-md-6.col-12.text-center:nth-of-type(1)`
- **slot kind**: bg
- **depicts**: 16:9 media
- **rendered**: 390:360×187.2  575:545×187.2  768:738×187.2  992:962×187.2  1024:497×187.2  1200:—  1440:—
- **aspect ratio**: 1.923
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `auto` / `0% 0%` / `repeat`
- **border-radius**: `15px 15px 0px 0px`
- **intrinsic (reference)**: 471×261 png
- **reference dominant**: #283888 (avg #2F468B) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/about--our-services--02.png` @ 1924×374
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--our-services--03</code> — 4:3 card · <code>signal-amber</code> · OUR SERVICES</summary>

- **section**: OUR SERVICES (`.team-three.nitro-offscreen.lazyloaded`)
- **selector**: `body.wp-singular.page-template.page-template-pages > main > section.team-three.lazyloaded:nth-of-type(2) > div.container > div.row > div.col-md-6.col-12.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: 4:3 card
- **rendered**: 390:360×303.7  575:545×303.7  768:738×303.7  992:962×303.7  1024:497×303.7  1200:—  1440:—
- **aspect ratio**: 1.185
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `auto` / `0% 0%` / `repeat`
- **border-radius**: `0px 0px 15px 15px`
- **intrinsic (reference)**: 493×528 png
- **reference dominant**: #F8C838 (avg #FDCC35) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/about--our-services--03.png` @ 1924×607
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>about--we-love-hearing-from-our-customers--02</code> — wide hero · <code>paper</code> · WE LOVE HEARING FROM OUR CUSTOMERS!</summary>

- **section**: WE LOVE HEARING FROM OUR CUSTOMERS! (`.testimonial.nitro-lazy.nitro-offscreen`)
- **selector**: `main > section.testimonial:nth-of-type(3) > div.container > div.inner:nth-of-type(3) > div.left:nth-of-type(1) > video`
- **slot kind**: video
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:—  1440:535×154
- **aspect ratio**: 3.474
- **object-fit / position**: `contain` / `50% 50%`
- **intrinsic (reference)**: 535×155 video-frame
- **reference dominant**: #F8F8F8 (avg #FEF7E3) → **`paper`** #FFFFFF — page-bg, elevated cards (ΔE 2.4)
- **placeholder**: `public/placeholders/about--we-love-hearing-from-our-customers--02.png` @ 1070×308
- **why unfilled**: video content — placeholder

</details>
<details><summary><code>about--pc-lazyloaded--05</code> — wide hero · <code>vault-ink</code> · pc.lazyloaded</summary>

- **section**: pc.lazyloaded (`.pc.lazyloaded`)
- **selector**: `img#NTQ2OjExNg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:—  768:—  992:—  1024:—  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/about--pc-lazyloaded--05.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>

### `legal` — https://africkerroofing.com/privacy-policy

7 placeholder slots, 1 removed.

<details><summary><code>legal--pc--01</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#Mzc0OjExNQ==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:160×64  1440:160×64
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/legal--pc--01.png` @ 320×128
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>legal--service-areas--01</code> — wide hero · <code>vault-ink</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MTA1MjoxMDY=-1`
- **slot kind**: img · alt: "Group 259 (1)"
- **depicts**: wide hero
- **rendered**: 390:185×80  575:185×80  768:185×80  992:185×80  1024:185×80  1200:185×80  1440:185×80
- **aspect ratio**: 2.313
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×80 svg
- **reference dominant**: #080808 (avg #FFF5DD) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/legal--service-areas--01.png` @ 370×160
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>legal--service-areas--02</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MTE2Njo5OA==-1`
- **slot kind**: img · alt: "Yelp"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #C69E3D) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/legal--service-areas--02.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>legal--service-areas--04</code> — icon · <code>signal-amber</code> · SERVICE AREAS</summary>

- **section**: SERVICE AREAS (`.nitro-offscreen`)
- **selector**: `img#MTE3NToxMDQ=-1`
- **slot kind**: img · alt: "Facebook"
- **depicts**: icon
- **rendered**: 390:50×50  575:50×50  768:50×50  992:50×50  1024:50×50  1200:50×50  1440:50×50
- **aspect ratio**: 1
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 50×50 svg
- **reference dominant**: #F8C838 (avg #E3BA3C) → **`signal-amber`** #F59E0B — secondary CTA / emphasis (ΔE 22.4)
- **placeholder**: `public/placeholders/legal--service-areas--04.png` @ 100×100
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>legal--pc--02</code> — full-bleed band · <code>vault-blue-deep</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `html > body.privacy-policy.wp-singular.page-template > header.pc > div.top.lazyloaded:nth-of-type(2)`
- **slot kind**: bg
- **depicts**: full-bleed band
- **rendered**: 390:—  575:—  768:—  992:—  1024:—  1200:1200×78.4  1440:1440×78.4
- **aspect ratio**: 18.367
- **object-fit / position**: `fill` / `50% 50%`
- **background size / position / repeat**: `100%` / `50% 100%` / `repeat-x`
- **intrinsic (reference)**: 1589×52 png
- **reference dominant**: #283888 (avg #486D91) → **`vault-blue-deep`** #1739A8 — accent-hover (ΔE 18.7)
- **placeholder**: `public/placeholders/legal--pc--02.png` @ 2880×157
- **why unfilled**: photography — COPY_MODE=ORIGINAL

</details>
<details><summary><code>legal--pc--03</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#NTM3OjExNg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/legal--pc--03.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>
<details><summary><code>legal--pc--04</code> — wide hero · <code>vault-ink</code> · pc</summary>

- **section**: pc (`.pc`)
- **selector**: `img#NjgzOjE1Mg==-1`
- **slot kind**: img · alt: "A fricker roofing logo"
- **depicts**: wide hero
- **rendered**: 390:100×40  575:100×40  768:100×40  992:100×40  1024:100×40  1200:—  1440:—
- **aspect ratio**: 2.5
- **object-fit / position**: `fill` / `50% 50%`
- **intrinsic (reference)**: 185×74 svg
- **reference dominant**: #080808 (avg #4E5875) → **`vault-ink`** #0B1220 — ink / darkest surface (ΔE 11)
- **placeholder**: `public/placeholders/legal--pc--04.png` @ 200×80
- **why unfilled**: brand mark / third-party logo — COPY_MODE=ORIGINAL

</details>

## Special cases

- **`svg#mapArea`** (home / listing / detail / generic / contact / about) — a 37 KB inline Inkscape-authored SVG of Oklahoma counties, `viewBox="0 0 400 215.341"`, rendering 540×295 at 1440. Per CONFIG this is map imagery → placeholder. The builder needs an equivalent inline per-county/per-area path map for the client service area; the geometry itself is region-specific and cannot be reused. Captured markup is in `.harness/out/slots-raw.json`.
- **Video** — one `vid-cdn.multiscreensite.com` MP4 (535×?, home/listing/detail/generic/about). Placeholder; not sampled for colour.
- **NitroPack lazy stubs** — 18 slots on `/about-us` were still serving base64 `data:image/svg+xml` lazy stubs at capture. All 18 were resolved to their real assets by alt-text match against the other exemplar pages. Zero unresolved.
- **Third-party plugin chrome ignored** — 14 slot instances from `accessibility-onetap`, `wp-review-slider-pro`, `gravityforms`, `add-to-any` and `contextual-related-posts`, plus 19 of the 20 inline SVGs on every page (the onetap accessibility widget). These are not part of the design system and were excluded from both manifests.
- **Highest resolution rule** — every `<img srcset>` and `<picture><source>` was parsed and the largest `w`/`x` candidate taken, not the rendered thumbnail. Recorded per slot as `referenceHighestRes` / `srcsetBestWidth`.

## Files

| path | contents |
|---|---|
| `assets/harvested/icons/` | 28 SVG icons |
| `assets/harvested/decorations/` | 1 SVG decoration (`Vector-3.svg`, 356×58 heading underline) |
| `public/placeholders/` | 213 PNG placeholders, named by slot id |
| `.harness/out/asset-manifest.json` | every harvested asset: url, local path, type, bytes, intrinsic dims, where used |
| `.harness/out/placeholder-inventory.json` | every unfilled slot, grouped by template class |
| `.harness/out/slots-raw.json` | raw per-breakpoint measurements (7 pages × 7 viewports) |
| `.harness/out/colors.json` | per-asset sharp colour samples and palette mapping |
| `.harness/out/css-index.json` | 36 fetched stylesheets, breakpoint census, 280 `url()` refs |

## Caveat on selectors

205 of the 268 slot `selector` values terminate in a NitroPack-generated id (`img#MTAwMjoxNzM=-1` and similar). Those ids are **not stable across page loads** and must not be used as clone targets. Every slot additionally carries `section.name`, `section.class`, `alt`, `slotKind` and full per-breakpoint geometry — identify slots by section + order + geometry, not by the recorded id. The remaining 63 selectors are stable class/tag paths.
