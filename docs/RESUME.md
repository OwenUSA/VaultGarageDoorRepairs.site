# docs/RESUME.md — state after Prompt 2+3+4

Assume the next prompt starts with no memory of this one.

## Where the chain is

| | |
|---|---|
| completed | Prompt 0, Prompt 1 (demolition + reference profile + section contract), **Prompt 2+3+4 (assets, copy and divergence gates, behavior specs)** |
| next | **Prompt 5+9** — tokens, randomized palette, shared shell. The shell freezes at the end of it (A-6). |
| then | 6+7 — lead builds hero + map, then ONE 4-wide wave over home sections and the four subpages |
| finally | 10+11 — asset prompts, then the trimmed acceptance sweep |

## What landed this turn

**Prompt 2 — assets.** `assets/INVENTORY.md` (regenerated, never hand-edited; narrative in
`assets/INVENTORY.head.md` / `INVENTORY.tail.md`). 93 slots: **69 REPLACE, 24 DELETED, 0
reference files downloaded**. 127 placeholder SVGs in `public/placeholders/`, file name =
slot ID. Slot classification is entirely in `harness.config.mjs` `slotRules` /
`sharedSlots`. Fonts are Roboto Condensed + Rubik, both OFL, both via `next/font` —
**no font-substitution floor is booked and none may be.**

**Prompt 3 — copy.** `content/copy.ts`, 58 sections, `tsc --strict` clean, `pnpm build`
clean. Gates: **58/58 5-gram, 58/58 trigram, 32/32 length** (10 EXEMPT, two register-driven
rows applied across five routes). Metadata moved out of the page files: every
`app/**/page.tsx` now calls `routeMeta(route)` from `content/copy.ts`. Full record in
`docs/content-divergence.md`.

**Prompt 4 — behavior.** Eight specs in `docs/behavior/`, `01`…`08`.

## Two things the next turns must not undo

1. **`docs/behavior/07-map-lazy-mount.md` puts the map bypass link in the component's own
   spec, as its first child, with acceptance criteria.** Three sibling sites shipped a
   keyboard trap because that requirement lived in a different document from the map.
   `<BusinessMap>` is a shared-shell file: the **lead** builds it, in the main thread.
2. **`framer-motion` is not justified and must not be installed.** `Reveal.tsx` stays a
   no-op wrapper. See `docs/behavior/08-scroll-reveal.md`.

## Still owed to the instrument (unchanged from Prompt 1)

**`data-section="<our-section-id>"` on every band**, using the exact ids in
`docs/sections.md` section 3. Only `header` and `footer` declare it today. First task of the
build wave, and a shared-shell edit for those two, so the lead makes it.

## Running the instrument

```bash
# from the SITE ROOT. Never background a server in the same chain as a gate run.
REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs
curl -s http://127.0.0.1:3198/ | grep -o '<title>[^<]*'      # MUST say A. Fricker Roofing
pnpm dev                                                      # port 3105
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/similarity.mjs           # lexical gate
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/diff.mjs --bp 1440 [--route /about]
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/contrast.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/rendertruth.mjs
```

**3198, not 3199.** A sibling site's reference server holds 3199 and answers with its own
reference. Verify the title before trusting any number.

### Regenerating the asset inventory

The stock asset probe records NitroPack's 1x1 lazy placeholder for 220 of 220 images on the
home page. This turn forced `nitro-lazy-src` into `src` before measuring, which took home
from 15 resolved images to 108. **That un-lazy pass was a one-off script in the scratchpad
and is not in the repo.** If `.harness/assets/*.json` is ever regenerated with the stock
`assets.mjs`, the geometry in `assets/INVENTORY.md` degrades to placeholder boxes. The
current JSON is on disk and correct; leave it unless you are prepared to redo the pass.

## The legacy `.harness/` scripts are GONE

55 ad-hoc scripts from the previous lineage were deleted this turn. `.harness/` now holds
only shared-harness output: `assets/ cap/ diff/ profile/ inventory.json refcopy.json
simtable.txt`. The instrument is `../_shared/harness` (A-11).

## Canonical state files

```
docs/profile.md             reference profile: heights, bands, breakpoints, motion, fonts
docs/sections.md            THE CONTRACT — 62 rows, machine + human tables, edit together
docs/content-divergence.md  Prompt 3: overlap table, four structural changes, exemptions
docs/behavior/01..08.md     Prompt 4: eight interaction specs
assets/INVENTORY.md         Prompt 2: 93 slots, provenance, geometry, dominant colour
docs/divergence.md          ranked table, rewritten by every diff run
docs/known-divergence.md    permanent floors (colour, JS-unrolled bands, placeholders)
docs/facts-needed.md        every TODO(fact)
docs/PRE-LAUNCH.md          launch blockers, including the fictional CONSTANTS
```
