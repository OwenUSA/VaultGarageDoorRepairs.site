# docs/RESUME.md — state after Prompt 6+7

Assume the next prompt starts with no memory of this one.

## Where the chain is

| | |
|---|---|
| completed | Prompt 0, 1, 2+3+4, 5+9 (tokens, palette, shell), **6+7 (build wave)** |
| next | **10+11** — `docs/asset-prompts.md`, then the trimmed acceptance sweep (A-4) |

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
