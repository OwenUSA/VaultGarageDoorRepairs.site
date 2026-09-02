# docs/RESUME.md — state after Prompt 1

Assume the next prompt starts with no memory of this one.

## Where the chain is

| | |
|---|---|
| completed | Prompt 0 (CLAUDE.md), **Prompt 1 (compliance demolition + reference profile + section contract)** |
| next | Prompt 2+3+4 — assets, copy and divergence gates, behavior specs |
| then | Prompt 5+9 — tokens, randomized palette, shared shell (the shell freezes at the end of it, A-6) |

## What Prompt 1 removed, and what stands

**Removed** — all recoverable from commit `3c22ada` (baseline of the pre-existing build):

- `app/api/contact/route.ts` and the `nodemailer` + `@types/nodemailer` dependencies
- 12 routes: `commercial-garage-door-services` and its three children,
  `residential-garage-door-services` and its five children plus `_service-inner`,
  `residential-garage-doors`, `emergency-garage-door-repair`, `faqs`, `service-areas`
- `components/patterns/ServiceAreaMap.tsx` (city grid, D-02) — replaced by `BusinessMap.tsx`
- `.env.example` (SMTP variables), `tailwind.config.ts` (v3 JS config)
- every email affordance in `ContactBlock`, `SiteFooter`, `ContactForm`, `privacy`,
  `lib/site.ts`, `lib/schema.ts`, and the `mailto:` branch of three `ui/` link primitives

**Stands**: exactly five `page.tsx` under `app/` — `/`, `/about`, `/services`, `/contact`,
`/privacy`. `pnpm build` clean on Next 15.5.4 / React 19.1.1 / Tailwind 4.1.13.

## Scaffolding that Prompt 6+7 must rebuild

`/about` and `/services` did not exist before this turn and were written as **minimum-legal
scaffolding**, not as clone work: enough to make the route set legal, resolve every anchor
and keep the build clean. Both say so at the top of the file. `/` and `/contact` are the
pre-existing lineage's pages with dead routes and non-compliant facts patched out — they
are also not clone work.

## Two things the build wave owes the instrument

1. **`data-section="<our-section-id>"` on every band**, using the exact ids in
   `docs/sections.md` section 3. Only `header` and `footer` declare it today; everything else
   reports `UNDECLARED` in `docs/divergence.md` and falls through to the page-progress join.
2. **The eight `/services` anchors** each repeat the same reference band
   (`s04-let-us-handle-your-commercial-roof`); they currently pair against nothing.

## Running the instrument

```bash
# from the SITE ROOT. Never background a server in the same chain as a gate run.
REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs
curl -s http://127.0.0.1:3198/ | grep -o '<title>[^<]*'      # MUST say A. Fricker Roofing
pnpm dev                                                      # port 3105
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/capture.mjs --side ref  --bp 1440
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/capture.mjs --side ours --bp 1440
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/diff.mjs --bp 1440 [--route /about]
```

**3198, not 3199.** A sibling site's reference server held 3199 and answered with its own
reference. Verify the title before trusting any number.

A full three-breakpoint capture is slow when several sibling sites are building at once —
it stalled for 11 minutes under load. Scope with `--bp` and `--route` while iterating; the
one full sweep happens in Prompt 11.

## The legacy `.harness/` scripts are SUPERSEDED — delete them

`.harness/` still holds 46 ad-hoc scripts from the previous lineage, alongside the shared
harness's own output directories. **Do not run or extend any of them.** The instrument is
`../_shared/harness`, configured by `./harness.config.mjs` (A-11).

Delete on sight, at the next convenient turn:

```
analyze.mjs audit.mjs bp640.mjs bp640b.mjs classify.mjs classmap.json compliance.mjs
crawl.mjs css.mjs diag-inner.mjs docs.mjs fetchcss.mjs final.mjs fonts.mjs harvest.mjs
hdr.mjs home-final.mjs home-measure.mjs lib.mjs m.mjs measure-service-inner.mjs
measure-service-outer.mjs measure-so-residential.mjs measure-so-target.mjs
patch-embedded.mjs pp-privacy.mjs probe.mjs profile.mjs q.mjs refadj.mjs regen.mjs
resolve-lazy.mjs retry.mjs routes.json sample-two.mjs settle.mjs settle2.mjs shot.mjs
shot2.mjs skel.mjs slots.mjs srcset-check.mjs state.mjs sweep.mjs synth-check.mjs
synth-responsive.mjs targets.json target-service-outer.json theme.js verify-home.mjs
verify-inner.mjs node_modules/ out/ package.json package-lock.json
```

Keep `.harness/profile/` and `.harness/cap/` — those are the shared harness's own output.
`.harness/` is gitignored, so none of this is in version control either way.

## Canonical state files

```
docs/profile.md            reference profile: heights, bands, breakpoints, motion, fonts
docs/sections.md           THE CONTRACT — 62 rows, machine + human tables, edit together
docs/divergence.md         ranked table, rewritten by every diff run
docs/known-divergence.md   permanent floors (colour, JS-unrolled bands, placeholders)
docs/facts-needed.md       every TODO(fact)
docs/PRE-LAUNCH.md         launch blockers, including the fictional CONSTANTS
```
