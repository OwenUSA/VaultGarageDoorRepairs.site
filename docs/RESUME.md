# docs/RESUME.md — state after Prompt 6+7

Assume the next prompt starts with no memory of this one.

## Where the chain is

| | |
|---|---|
| completed | Prompt 0, 1, 2+3+4, 5+9, 6+7, **10+11 (asset prompts + acceptance sweep)** |
| next | **nothing. The chain is finished.** The only remaining step is OVERRIDE 3: the operator runs `docs/asset-prompts.md` through Nano Banana Pro, hands the files back, they are dropped in, and every affected section is re-diffed. |

## WHAT IS BUILT — filesystem truth, checked, not remembered

**All five routes are fully wired. None is a stub.** Every band in the contract renders and
declares `data-section`. Verified by fetching the served HTML, not by trusting a report:

```
/         header hero services about process emergency tabbed marquee doors
          components facts urgent community approach map contact footer call-bar
/about    header hero who how facts about-cta map contact footer call-bar
/services header hero services spring-repair opener-repair cable-roller-track
          panel-replacement off-track-correction new-door-installation
          commercial-roll-up maintenance-tune-up faq services-cta map contact
          footer call-bar
/contact  header hero breadcrumb contact next-steps map footer call-bar
/privacy  header privacy-body footer call-bar
```

Re-check any time with:

```bash
curl -s http://127.0.0.1:3105/services | grep -o 'data-section="[^"]*"'
```

### Who built what

| unit | owner | file |
|---|---|---|
| home hero, home + contact map, `/contact` | lead | `app/page.tsx`, `app/contact/page.tsx` |
| home's twelve middle bands | builder (Sonnet) | `components/routes/HomeBands.tsx` |
| `/about` | builder (Sonnet) | `app/about/page.tsx` |
| `/services` | builder (Sonnet) | `app/services/page.tsx` |
| `/privacy` | builder (Sonnet) | `app/privacy/page.tsx` |

`/contact` was kept in the main thread because its form shares `ContactForm` — and therefore
its D-05 validation — with the contact band on `/`, `/about` and `/services`.

## Shared-shell edits the lead made this turn (A-6)

All of these are lead-owned files. No builder touched a shared file; no builder handed one
back.

1. **`data-section` pass-through on every pattern.** `Section` takes `'data-section'`;
   `SplitFeature`, `CtaBand`, `SectionIntro`, `Marquee`, `Breadcrumb`, `StepRow`,
   `FeatureRow`, `CardGrid`, `CardCarousel`, `TabbedGrid`, `ContentColumn`, `Hero`,
   `BusinessMap`, `ContactBlock` and `FaqBlock` take a `section` prop that emits it.
   Without this, identity pairing (PASS 1) never fires and the join mispairs exactly the
   six rows the build deliberately drops or reorders.
2. **`className` pass-through on the same patterns**, for per-band padding only.
3. **`Hero` gained `body` (paragraphs under the lead) and `badges` (the D-14 chip slot).**
4. **`SharedTail` forwards map props** (`mapZoom`, `mapEyebrow`, `mapTitle`, `mapBody`) so
   `/` and the subpages get zoom 13 and `/contact` gets zoom 15 without re-implementing the
   tail or re-deciding the `testimonial` removal.
5. **`components/ui/TodoFact.tsx` is new** — the visible `TODO(fact)` chip. See
   `docs/facts-needed.md`.
6. **Five render-truth fixes**, all detailed in `docs/known-divergence.md` section 10.4.
   Two of them changed shell files that had been green at Prompt 5 and were wrong anyway:
   `Field.tsx` (`labelCls` now states `text-ink`) and `Reveal.tsx` + `globals.css` (the
   `opacity: 0` observer is gone, per `docs/behavior/08`, which had specified a no-op all
   along).

**`app/tokens.css` was NOT touched.** No token was added, renamed or removed. The palette,
the seed and the type scale are exactly as Prompt 5+9 left them.

## Gate results at the end of this turn

| gate | result |
|---|---|
| `pnpm build` | clean, 10/10 static |
| `tsc --noEmit` | 0 errors |
| `contrast.mjs` | **PASS — 0 FAIL**, 1695 scored, 3 UNMEASURABLE (all the disabled carousel arrow) |
| `rendertruth.mjs` | **1 finding**, down from 174 — an off-track carousel card, instrument artifact, floored in known-divergence 10.3 |
| `diff.mjs` | 181 rows · 56 FAIL · 62 PASS · 28 BLOCKED |
| NOVEL token conformance | 10 rows, **0 violations** |
| email sweep | EMAIL SWEEP CLEAN |
| locations sweep | clean — no `/locations`, no city array; `areaServed` is the single locality |

`ITERATION_CAP = 1` was spent once, on a per-band padding pass. A `display: flex` attempt in
the same pass regressed the total and was reverted. Full account: known-divergence 10.2.

## THE SHELL IS STILL FROZEN

Same list as before, plus the two files this turn corrected: `app/globals.css`,
`app/tokens.css`, `app/layout.tsx`, `SiteHeader`, `SiteFooter`, `CallBar`, `BusinessMap`,
`components/patterns/index.ts`, `lib/schema.ts`, `lib/site.ts`, `components/ui/*`.

**The one colour rule still holds:** exactly one filled chromatic action per page, the call
CTA. `Actions()` still selects by `href.startsWith('tel:')`, never by position. There is
still no primary-filled button variant. Measured chroma: accent 0.3804 > primary 0.2000.

**Two traps that cost time this turn, both still live:**

- `diff.mjs` never re-captures. Run `capture.mjs --side ours` after every rebuild.
- Never run `pnpm build` while a server holds 3105. Order: kill the holder, build, start.
  `pnpm start` fails with a bare `ELIFECYCLE exit code 1` if the port is held, and in a
  background task that failure is silent.
- **Kill the LISTENER, not the first netstat line.** `TIME_WAIT` sockets accumulate on 3105
  and sort ahead of the `LISTENING` row, with PID `0`, so `netstat | head -1` kills nothing
  and leaves the old server serving the old build. This happened here and cost four gate
  runs. Always:

  ```bash
  netstat -ano | grep -E ":3105\s+.*LISTENING"   # must print exactly one PID
  ```

  All gate numbers in this file were re-verified from `rm -rf .next && pnpm build` with
  exactly one confirmed listener. See known-divergence 10.6.

## Open items for 10+11

- `docs/asset-prompts.md` does not exist yet. It needs the applied hues by name: primary
  184 teal `#023530`, accent 4 crimson `#983756`, winning seed 9611.
- `docs/PRE-LAUNCH.md` still needs the two A-4 blockers worded as *"performance never
  measured"* and *"keyboard access is spec-verified only, never hand-tested"*.


---

## THE CHAIN IS FINISHED — Prompt 10+11 landed

- `docs/asset-prompts.md` written. **Text only (OVERRIDE 2)** — 15 photographic slots
  (4 heroes, each with a second portrait crop because their aspect moves 4.2x-5.0x between
  390 and 1440; 11 identical 4:3 cards, spread 0.08%, no second crop), plus the logo
  lockup, plus 9 refusals with reasons. Nothing was generated, sourced or downloaded.
- Acceptance sweep run in full, minus the two gates A-4 drops. Results in
  `docs/PRE-LAUNCH.md` section 10; floors in `docs/known-divergence.md` section 11.
- **`docs/sections.md` was NOT edited.** The `/privacy` UNPAIRED row was withdrawn: the
  probe emits `s02-a-fricker-roofing-and-waterproofi` exactly as the contract writes it,
  and the row pairs on a clean build. `similarity.mjs` now scores it at -9.1% length.
- Final: **181 rows / 56 FAIL / 62 PASS / 28 BLOCKED**, contrast 0 FAIL, rendertruth 1
  floored finding, 10 NOVEL rows at 0 token violations, build clean 10/10, email sweep
  clean.

### If you pick this up to do the asset drop-in

1. Kill the server, assert **exactly one** listener afterwards
   (`netstat -ano | grep -E ":3105\s+.*LISTENING"`), then build, then start. Section 10.6
   of `known-divergence.md` says why this is not optional.
2. `rm -rf .harness/cap/ours && node ../_shared/harness/src/capture.mjs --side ours`.
   `diff.mjs` never captures.
3. Re-run `contrast.mjs` and `rendertruth.mjs` — a real photograph behind hero text changes
   both. Check `cta-primacy` specifically; a photograph that out-saturates the crimson CTA
   is a wrong image, not a wrong gate.
4. Run `diff.mjs` LAST with no `--route` / `--bp`. Filtered runs write
   `.harness/divergence.partial-*.md` and do not update the canonical report.
