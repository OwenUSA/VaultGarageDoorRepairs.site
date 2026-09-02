# assets/INVENTORY.md — asset slots, provenance, status (Prompt 2)

**Generated. Do not hand-edit the tables.** The narrative around them lives in
`assets/INVENTORY.head.md` (this text) and `assets/INVENTORY.tail.md`; the tables come from
`../_shared/harness/src/write-inventory.mjs` reading `.harness/inventory.json`.

Regenerate with:

```bash
REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs     # verify the title first
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/assets.mjs --side ref
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/inventory.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/write-inventory.mjs
```

## Provenance, and why there is no TAKE column

D-09 draws the line: layout, spacing, type scale, grid and interaction are what we clone;
their files are not. Applied to this reference that leaves **nothing** to take as a file.

| provenance | what it means here | count |
|---|---|---|
| **TAKE** | licence verifiable in one step. **Two entries, both fonts, neither a file in this repo** — Roboto Condensed and Rubik, OFL, loaded through `next/font/google`. See "Fonts" below. | 2 (no files) |
| **REPLACE** | their photograph, logo, wordmark, vehicle, staff shot, badge or review image. Slot geometry is recorded; a placeholder is generated; **the reference file is never downloaded, not even temporarily.** | 69 |
| **DELETED** | inventoried so the tally is honest, then not built — the band is deleted (D-13 reviews, D-14 unearned credentials), the asset is third-party widget chrome, or it is a UI glyph that becomes a `lucide-react` icon rather than a file. | 24 |

**Reference bytes pulled into this repo: 0.** `public/placeholders/` holds 127 generated
SVGs and nothing else.

## The measurement caveat that shaped this pass

`docs/profile.md` §5 records that no JavaScript runtime initialises on the saved copy.
NitroPack also lazy-loads **220 of 220** `<img>` on the home page and 103 on `/contact`, so
the stock asset probe recorded the 1×1 placeholder for almost every slot and no geometry at
all. This pass forced every `nitro-lazy-src` into `src` before measuring, which took the
home page from 15 resolved images to 108 and from 3 CSS backgrounds to 21. **The dimensions
in the table below are therefore the real rendered boxes**, not placeholder boxes.

Two consequences that are recorded, not fixed:

1. **Carousel and tabbed bands render unrolled**, so a band background's *height* is the
   stacked height, not the runtime height — `hero-bg` measures 1440×2982 and
   `contact-band-bg` 1440×4518 at the canonical width. Widths and aspect ratios are honest;
   those two heights are not a target. See `docs/known-divergence.md`.
2. **The Prompt 1 section screenshots were taken before the un-lazy pass**, so 40 of the 69
   REPLACE slots sampled a dominant colour of effectively white. That is treated as
   UNMEASURABLE, not as a colour — see the tail section below.
