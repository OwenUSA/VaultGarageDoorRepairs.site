# 00 — BUILD BRIEF · read this first, every phase

This file replaces the conversation transcript. Each phase now runs in a **fresh
session** with no memory of earlier phases. Everything a phase needs is on disk.
Read this file, then read only the narrow slices it points you at.

---

## Context budget — the rules that keep this affordable

The harness output is enormous and must never be read whole:

| file | size | how to read it |
|---|---|---|
| `.harness/out/profile.json` | **15 MB** | `node .harness/q.mjs …` ONLY |
| `.harness/out/slots-raw.json` | 3.6 MB | never |
| `.harness/out/inventory.json` | 962 KB | never |
| `.harness/out/placeholder-inventory.json` | 573 KB | `q.mjs slots …` ONLY |
| `docs/assets.md` | 214 KB | `q.mjs slots …` instead |

**Hard rules. Violating any of these is the single most expensive mistake available:**

1. **Never `cat`, `Read`, or `grep` a file in the table above.** Query it.
2. **One breakpoint per query.** `q.mjs section home 1 1440` is 11 KB;
   the same call without a breakpoint is 55 KB. Ask for what you need.
3. **Never load a screenshot into context to judge a diff.** Run the diff
   script and read its *numbers*. `COLOR_MODE = REMAP` means the **structural**
   channel gates and it is pure text. Perceptual/SSIM is advisory — compute it,
   report the number, do not look at the image. Open an actual screenshot only
   when one section has failed twice and the numbers do not explain why.
4. **Report compactly.** One line per section: route, section, mode, the
   per-breakpoint number, max box delta, status. No prose recaps, no restating
   these instructions back, no summarising files you were told to read.
5. **Write findings to disk, not into chat.** The next phase reads the file.
6. **Read each file once.** If you have already read a doc this phase, do not
   re-read it to "check" — you still have it. Never re-read a file you just wrote.
7. **Give each subagent only its own slice.** Pass the section index and the
   query commands to run — never paste query output into a subagent's prompt that
   it could run itself, and never hand one agent another agent's data.
8. **Do not echo instructions back.** No restating the task, no summarising files
   you were told to read, no progress narration. Do the work, report the numbers.
9. **`grep`/`head` before `Read`** on anything whose size you do not know.

### The query tool

```
node .harness/q.mjs urls                      # 12 profiled exemplars + aliases
node .harness/q.mjs sections <alias>          # section map, all bps  (~2 KB)
node .harness/q.mjs section  <alias> <i> <bp> # one section, one bp   (~11 KB)
node .harness/q.mjs type     <alias> <i> <bp> # distinct type combos  (~2 KB)
node .harness/q.mjs slots    <template> [sec] # placeholder slots for a section
node .harness/q.mjs build    <route> [bp]     # OUR build, as measured
```

Aliases: `home · service-outer · so-material · service-inner · si-commercial ·
emergency · contact · about · service-areas · privacy · faqs · blogs`

---

## State — phases 0–3 are DONE. Do not redo them.

- **Prompt 1** crawled and profiled 12 exemplars × 5 breakpoints (390/640/768/1024/1440).
- **Prompt 2** harvested 29 real assets, generated 213 placeholders, removed 55
  FORBIDDEN slots.
- **Gate** resolved. The approved token binding is already implemented in
  `app/tokens.css`, with the measured reference value recorded per line.
- **Prompt 3** built the shared foundation: `app/tokens.css`, tailwind config,
  `app/layout.tsx`, 19 `components/ui/*`, 10 `components/patterns/*`,
  `lib/site.ts`, `lib/schema.ts`, `robots.ts`, `sitemap.ts`, `not-found.tsx`,
  and all 17 routes as routable skeletons. **`npx tsc --noEmit` exits 0.**

Reference docs, all small enough to read in full when relevant:
`01-page-inventory` · `02-template-classes` · `03-design-system` (12 KB, the
type/spacing/pattern vocabulary) · `04-behavior-profile` · `05-route-map` ·
`06-ranked-table`.

---

## One critical capture caveat

The target runs **NitroPack**, which defers all JS until a *trusted* user
interaction. Programmatic scrolling does not qualify: the first capture measured
the home page at 31,832 px with 0 carousels initialised; the true page is
11,800 px with 9. Every number in `profile.json` is post-fix. If you re-capture
anything, drive it with real input events or you will measure garbage — and the
garbage is stable across retries, so a settle-retry will happily confirm it.

---

## Route map — 17 rows, resolved and approved

`ROUTE_POLICY = SUBSET`. 13 CLONE + 4 SYNTHESIZE. The nine content-less detail
routes MIRROR would have emitted were dropped at the gate.

| our route | MODE | template class |
|---|---|---|
| `/` | CLONE | home |
| `/emergency-garage-door-repair` | CLONE | service-outer |
| `/residential-garage-door-services` | CLONE | service-outer |
| `/residential-garage-doors` | CLONE | service-outer |
| `/residential-garage-door-services/maintenance-tune-up` | CLONE | service-inner |
| `/residential-garage-door-services/spring-repair` | CLONE | service-inner |
| `/residential-garage-door-services/panel-replacement` | CLONE | service-inner |
| `/residential-garage-door-services/new-door-installation` | CLONE | service-inner |
| `/residential-garage-door-services/off-track-cable-repair` | CLONE | service-outer |
| `/commercial-garage-door-services` | CLONE | service-outer |
| `/commercial-garage-door-services/inspection` | CLONE | service-inner |
| `/commercial-garage-door-services/repair` | CLONE | service-inner |
| `/commercial-garage-door-services/maintenance-program` | CLONE | service-outer |
| `/contact` | SYNTHESIZE | breadcrumb + contact-one + map-sec |
| `/service-areas` | SYNTHESIZE | serviceareaouter-one + map-sec |
| `/faqs` | SYNTHESIZE | faq-one + faq-two |
| `/privacy-policy` | SYNTHESIZE | blankpage |

### Build by CLASS, not by route

The 13 CLONE routes are **three** template classes. Build and converge each class
once against its exemplar, then bind members to it — members differ in copy, not
skeleton. Treating 17 routes as independent design problems is the single
biggest waste available.

| class | exemplar to diff against | member routes |
|---|---|---|
| home | `q.mjs … home` | 1 |
| service-outer | `q.mjs … service-outer` | 6 |
| service-inner | `q.mjs … service-inner` | 6 |

`/residential-garage-doors` maps to the `so-material` variant of service-outer;
`/commercial-garage-door-services/repair` maps to `si-commercial`. Check both
against their own exemplar before assuming the base class fits.

---

## Concurrency cap — MAXIMUM 2 AGENTS AT ONCE

Never dispatch more than **2** subagents concurrently. Work in pairs: dispatch 2,
wait for both to return, then dispatch the next 2. This is a hard limit, not a
target to approach creatively — "2 agents plus a quick helper" is 3 and is
forbidden.

An earlier run exhausted the whole session budget in 8 minutes by fanning out
across every route and section at once. Small sequential batches finish;
unbounded fan-out does not.

Working in pairs also *reduces* cost per unit of work: consecutive batches in one
phase reuse the same warm prompt cache, so the later pairs are cheaper than the
first. Do not try to "save time" by widening the batch — it costs more and
finishes later.

---

## Invariants — true in every phase

- **`lib/site.ts` is the only source of business facts.** Never hardcode a phone
  number, service name, or hours string anywhere else.
- **`CONFIG FORBIDDEN` (see `CLAUDE.md`) appears nowhere** — not in copy, fine
  print, schema, alt text, or meta descriptions. No reviews, ratings, licence or
  insurance claims, prices, guarantees, certifications, awards, years-in-business,
  job/technician counts, or named staff. A target slot needing one is **removed**
  and reported as an intentional structural deviation with its pixel cost — never
  filled with invention, never counted as a divergence.
- **No raw hex, rgb(), or px in component code.** Tokens only.
- **Lead owns shared files**: `tokens.css`, `globals.css`, tailwind config,
  `app/layout.tsx`, `components/ui/*`, `components/patterns/*`, `lib/site.ts`,
  `lib/schema.ts`, `next.config`. Section agents request changes; they never edit.
- **Fonts**: Roboto Condensed + Rubik, both OFL, already wired via
  `next/font/google`. Exact — no substitution.
- **Motion**: the profile found no scroll-linked motion, no GSAP, no split-text.
  IntersectionObserver + CSS transition only. Do not add a motion library.
- **Dev server** stays on port 3000. Do not ask anyone to start it.
- **Caps are stop conditions**: 4 diff iterations per section, 3 convergence
  rounds. On cap, freeze, report the number as-is, move on.
