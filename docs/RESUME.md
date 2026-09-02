# RESUME — Vault Prompt 5+9, killed mid-flight

**Cause:** account session limit (HTTP 429), reset 12:20am America/Caracas. Killed at the
moment the lead reported "palette is live in the built CSS, running the blocking gates."

## What landed — tokens and shell, typecheck clean
`npx tsc --noEmit` exits 0. `app/tokens.css` carries the applied ramp:

```
--ramp-primary       oklch(29.63% 0.0510 184.60)   teal
--ramp-primary-deep  oklch(24.93% 0.0431 184.70)
--ramp-accent        oklch(48.26% 0.1326   3.71)   crimson call CTA
--ramp-accent-deep   oklch(38.92% 0.1248   4.01)
```

Shell files edited: `layout.tsx`, `SiteHeader`, `SiteFooter`, `Hero`, `Sections`,
`BusinessMap`, `Button`, `Link`, `patterns/index.ts`, `lib/schema.ts`, all five route
pages, `not-found.tsx`. **`components/patterns/CallBar.tsx` is new.**
`app/robots.ts`, `app/sitemap.ts` and `app/not-found.tsx` all exist.

## THE GAP THAT MATTERS — the seed is not recorded
`docs/known-divergence.md` §7 still reads *"Not yet generated."* The palette is applied but
**not reproducible from the record**, which A-7 requires: the winning seed AND all five
candidate seeds must be written there.

Recover it first. `harness.config.mjs` holds the `masterSeed` the run used; re-run

```bash
node ../_shared/harness/src/palette.mjs                 # regenerates the five candidates
node ../_shared/harness/src/palette.mjs --seed <n> --emit
```

and confirm the emitted ramp matches the four values above **exactly** before recording it.
If it does not match, the applied palette came from a different seed and the discrepancy
must be reported, not papered over — a palette nobody can regenerate is a palette nobody
can audit.

## Not done — the blocking gates never ran
`contrast.mjs` and `rendertruth.mjs` were about to run when the limit hit. Neither has a
result. **No claim of a green shell can be made until both are run.**

Also still owed for this turn: the AA table for the pairs actually in use, the token-set
summary, the shell divergence table, and the primary-vs-accent chroma ordering.

## Record the chroma ordering before the build wave
Volta found its `--color-primary` was MORE saturated than its `--color-accent` in the sRGB
terms `rendertruth` measures, which makes a primary-filled button fail `cta-primacy` on
every route. Vault's primary is a low-chroma teal (C 0.051) against a crimson accent
(C 0.133), so it probably orders correctly — **measure it and write it down** rather than
assuming, and state the rule in the shell so the build wave inherits it.

## Run order
```bash
REF_PORT=3198 node ../_shared/harness/src/serve-reference.mjs   # must print A. Fricker Roofing
pnpm build && pnpm start                                        # port 3105, never `next dev`
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/contrast.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/rendertruth.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/diff.mjs
```
After any rebuild: kill the port holder, restart, verify BOTH the page title AND that the
referenced stylesheet returns 200 before believing a gate. Never background a server with
`&` in the same command chain as a gate run.
