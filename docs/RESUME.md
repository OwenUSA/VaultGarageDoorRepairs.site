# docs/RESUME.md — state after Prompt 5+9

Assume the next prompt starts with no memory of this one.

## Where the chain is

| | |
|---|---|
| completed | Prompt 0, Prompt 1, Prompt 2+3+4, **Prompt 5+9 (tokens, randomised palette, shared shell)** |
| next | **6+7** — the lead builds hero + map personally, then ONE 4-wide wave over the home sections and the four subpages |
| finally | 10+11 — asset prompts, then the trimmed acceptance sweep |

## THE SHELL IS FROZEN (A-6)

No section agent touches `app/globals.css`, `app/tokens.css`, `app/layout.tsx`,
`components/patterns/SiteHeader.tsx`, `SiteFooter.tsx`, `CallBar.tsx`, `BusinessMap.tsx`,
`components/ui/Button.tsx` or `Link.tsx`, `lib/site.ts`, `lib/schema.ts`. An agent that
needs a shared change **stops and hands it back**; the lead makes the edit once in the main
thread and re-dispatches.

**No section agent introduces a token that is not in the `@theme` block.** It comes back to
the lead or it does not happen.

## What landed this turn

**Palette.** masterSeed 3126, winning seed 9611, complementary, primary hue 184 (teal band),
accent hue 4 (crimson call CTA), 5 candidates, 0 rejected, 22 master seeds tried to clear
~30 degrees of every hue already taken in the programme. Full record, all five candidate
seeds, the AA table and the chroma ordering: **`docs/known-divergence.md` section 7**.
Regenerate with `node ../_shared/harness/src/palette.mjs --seed 9611 --emit`.

**Tokens.** `app/tokens.css` — the ramp, type scale, spacing, radii, shadows, containers and
breakpoints, all traced to the Prompt 1 appearance capture. Two structural facts about the
file that must not be undone:

1. **`@theme static`, and every gated value is a LITERAL, not a `var()` alias.** `diff.mjs`
   reads `--color-* / --text-* / --font-weight-* / --spacing-*` out of `@theme` to build the
   token-conformance set; an alias normalises to the string `"var(--x)"` and matches nothing,
   which reported 4 header and 5 footer violations that were all instrument artefacts. The
   `:root` primitives (`--fs-*`, `--fw-*`, `--space-*`) now alias UP to the theme names, and
   `static` stops Tailwind tree-shaking a variable out from under them. **Header and footer
   now report 0 token violations, so `TOKEN_THRESHOLD = 0` is reachable for NOVEL sections.**
2. **Colour is applied, not to be re-applied.** There is no recolor pass (A-7). Anything that
   looks wrong is a wrong BINDING in `tokens.css`, never a divergence in a section.

**THE ONE COLOUR RULE THE WAVE INHERITS:**

> **EXACTLY ONE FILLED CHROMATIC ACTION PER PAGE — the call CTA.** Every other action is
> filled NEUTRAL: `solid` on light bands, `solid-band` on dark ones. There is no
> primary-filled button variant. `Actions()` picks the variant from `href.startsWith('tel:')`
> — by what the action IS, never by its position — so a section cannot opt out by reordering.
> Measured sRGB chroma: accent 0.3804 > primary 0.2000. `rendertruth.mjs` fails
> `cta-primacy` if any non-call action out-saturates the CTA, and the fix is always the other
> action — never dimming headings or body copy.

**Shell.** Root layout with `routeMeta()` metadata (never a literal in a page file); header
with the measured 3-bar/1-bar geometry, an IntersectionObserver sentinel for the scroll state
(no scroll listener, no shrink), a two-state drawer (`data-mounted` for presence,
`data-open` for the transition) that closes on route change and `inert`s the page behind it;
footer with NAP, hours, the one SERVICE_AREA sentence and no electronic-mail column; the
mobile call bar as a CSS media query at <768 with the `body` padding compensation;
`<BusinessMap>` with **the bypass link as its first child**, an observer-gated iframe and a
fixed aspect ratio; `LocalBusiness` JSON-LD with `image` and no forbidden properties;
`robots.ts`, `sitemap.ts` (generated from the `routes` constant) and `not-found.tsx`.

**A-14 applied once**, in `globals.css`: `a[href^="tel:"] { min-height: 44px; }`. `Link.tsx`
carries the 44px minimum for nav and footer links itself, because the anchor — not its
wrapper — has to be the element with the height.

**One base-typography fix, and it was the whole shell residual.** The default family is the
DISPLAY face (Roboto Condensed 400 16/18.4), with Rubik on `p` only. Declaring Rubik on
`body` put a 100% fontFamily, 20% weight and 18% line-height deviation on the root of every
band the comparator measures. Header went 6.13 -> **0.13%**, footer 10.56 -> **0.37%**.

**The five routes are STUBS.** Each renders the shell and one h1 from `content/copy.ts`.
The previous lineage's full pages are in git at **6a38bcc** — they predate the Prompt 1
section contract and the Prompt 3 copy, so they are reference material for the wave, not a
starting point to patch.

## Gate results at the end of this turn

| gate | result |
|---|---|
| `pnpm build` | clean, 10/10 static |
| `tsc --noEmit` | 0 errors |
| `contrast.mjs` | 420 scored, **0 FAIL, 0 UNMEASURABLE** |
| `rendertruth.mjs` | **0 findings** |
| email sweep | EMAIL SWEEP CLEAN |
| locations sweep | clean |
| shell structural | header 0.13% @1440, 0.00% @390/768 · footer 0.37% @1440, 4.94% @390/768 — all PASS at 5% |
| token conformance | header 0, footer 0 |

`diff.mjs` reports 119 rows, 12 FAIL — **every one of them a `(page) height delta %` row**,
because the routes are stubs. No section row fails.

## Still owed to the instrument

**`data-section="<our-section-id>"` on every band**, using the exact ids in
`docs/sections.md` section 3. `header`, `footer` and `call-bar` declare it; every band the
wave builds must too, or `diff.mjs` falls back to a positional join and mispairs exactly the
four sections Prompt 3 deliberately reordered.

## Running the instrument

```bash
# from the SITE ROOT. Never background a server in the same chain as a gate run.
REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs
curl -s http://127.0.0.1:3198/ | grep -o '<title>[^<]*'   # MUST say A. Fricker Roofing
pnpm build && pnpm start                                   # 3105. NEVER `next dev`.
curl -s http://127.0.0.1:3105/ | grep -o '<title>[^<]*'    # MUST say Vault Garage Door Repairs

MSYS_NO_PATHCONV=1 node ../_shared/harness/src/capture.mjs --side ours   # diff.mjs does NOT recapture
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/diff.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/contrast.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/rendertruth.mjs
```

**`diff.mjs` reads captures off disk and never takes them.** A diff run after a rebuild
without a fresh `capture.mjs --side ours` silently scores the PREVIOUS build — it happened
once this turn and reported sections that no longer existed.

**3198, not 3199.** A sibling site's reference server holds 3199 and answers with its own
reference. Verify the title before trusting any number.

## Canonical state files

```
docs/profile.md             reference profile: heights, bands, breakpoints, motion, fonts
docs/sections.md            THE CONTRACT — 62 rows, machine + human tables, edit together
docs/content-divergence.md  Prompt 3: overlap table, four structural changes, exemptions
docs/behavior/01..08.md     Prompt 4: eight interaction specs
assets/INVENTORY.md         Prompt 2: 93 slots, provenance, geometry, dominant colour
docs/known-divergence.md    permanent floors + SECTION 7, the whole palette record
docs/divergence.md          ranked table, rewritten by every diff run
docs/facts-needed.md        every TODO(fact)
docs/PRE-LAUNCH.md          launch blockers, including the fictional CONSTANTS
```
