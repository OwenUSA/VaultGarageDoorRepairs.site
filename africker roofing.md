# CONFIG — the only file you edit per project

```
### RUN ────────────────────────────────────────────────────
PORT              3000
THRESHOLD         structural divergence <= 2% per section per breakpoint
BOX_TOLERANCE     <= 6px or <= 2% of section height, whichever is larger
BREAKPOINTS       read from target CSS in Prompt 1 — never guessed
ITER_CAP          4 diff iterations per section, lifetime
ROUND_CAP         3 convergence dispatch rounds
HARNESS_CAP       1 pass, no refinement
CHECK_INS         exactly 1 — the Phase gate after Prompt 2

### TARGET ─────────────────────────────────────────────────
TARGET_URL        https://africkerroofing.com/
CRAWL_DEPTH       2                       # how far to follow internal links
CRAWL_LIMIT       25                      # max pages to profile
SITE_CLASS        auto                    # auto | marketing | commerce | docs | app
                                          # auto = Prompt 1 classifies and reports

### CLIENT ────────────────────────────────────────────────
BRAND             vaultgaragedoorrepairs
DOMAIN            vaultgaragedoorrepairs.site
VERTICAL          garage door repair
STACK             Next.js App Router + TypeScript + Tailwind + next/font +
                  next/image + lucide-react
COPY_MODE         ORIGINAL                # ORIGINAL | ADAPTED
                                          # ORIGINAL = own words, target structure
                                          # ADAPTED = only if you own the source text

COLOR_MODE        REMAP                   # PRESERVE | REMAP
PALETTE                                   # required when COLOR_MODE = REMAP
  <#hex>  <name>  <suggested role>
  <#hex>  <name>  <suggested role>
  ...

FACTS                                     # every hard business fact, one place
  hours           <...>
  locations       <one | list | none>
  nap             <placeholder | real>
  mail            <provider, host:port, env var names>
  <add rows as needed>

FORBIDDEN                                 # things that must appear nowhere
  <e.g. reviews, ratings, aggregateRating>
  <e.g. license numbers, license claims>
  <e.g. price claims, guarantees, certifications>

ASSETS            <what is real vs placeholdered at build time>

### ROUTES ────────────────────────────────────────────────
# MODE decides how the route is built AND how it is gated.
#   CLONE      1:1 with a target page. Gated on structural divergence.
#   TEMPLATE   uses a target template class, your own content.
#              Gated on structural divergence against that template.
#   SYNTHESIZE no target analog. Composed from the extracted design system.
#              Gated on system compliance, NOT divergence.
#
# ROUTE_POLICY   MIRROR | SUBSET | CUSTOM
#   MIRROR    Prompt 1 fills this table from the crawl; you approve at the gate
#   SUBSET    you keep only the rows you want from the crawled inventory
#   CUSTOM    you write the table yourself; unmatched routes become SYNTHESIZE

ROUTE_POLICY      CUSTOM

  OUR ROUTE          MODE        TARGET SOURCE / TEMPLATE CLASS
  /                  CLONE       <target home url>
  /<route>           TEMPLATE    <template class name>
  /<route>           SYNTHESIZE  —
```

---

# RUN ORDER

**0** write CLAUDE.md · **1** crawl, profile, extract system · **2** asset harvest *(concurrent with 1)* · **🚦 GATE** · **3** shared foundation *(lead alone)* · **4** route fan-out · **5** converge · **6** behavior specs · **7** cross-cutting pass · **8** close asset gap

---

## 0 — Write to repo root as `CLAUDE.md`

```md
# CLAUDE.md

## Autonomy
Never ask "should I continue?". Work until done or blocked on a decision only the
user can make. Never ask permission to parallelize. Never confirm intermediate
steps. One planned check-in exists: the Phase gate. Do not add another.

## Definition of done — differs by route MODE
CLONE and TEMPLATE routes: per section, per breakpoint, at matched
section-relative scroll progress —
  - no element box off by more than BOX_TOLERANCE
  - font-family / weight / size / letter-spacing / line-height match exactly
  - structural divergence <= THRESHOLD
SYNTHESIZE routes: there is nothing to diff. Gated on SYSTEM COMPLIANCE —
  - zero raw hex, rgb(), or px values in component code; tokens only
  - every font-size/weight/letter-spacing/line-height pair exists in the
    extracted type scale
  - every padding, gap, and container width exists in the extracted spacing scale
  - every section built only from extracted section patterns and ui/ primitives
  - report the count of violations, which must be zero
Report the per-section, per-breakpoint number every time you claim done.
An agent that cannot measure its own result has not finished.

## Two diff channels
STRUCTURAL — DOM geometry + typography + spacing. Color-blind.
PERCEPTUAL — SSIM against the reference screenshot.
Which one gates depends on COLOR_MODE:
  COLOR_MODE = REMAP    -> STRUCTURAL gates. PERCEPTUAL runs against a reference
                           recolored through the token map, advisory only.
  COLOR_MODE = PRESERVE -> PERCEPTUAL gates at SSIM >= 0.97. STRUCTURAL still
                           runs and still must pass; it localizes the failure.

## Color under REMAP
Never report a color mismatch as a divergence. Colors bind through tokens.css.
If a color looks wrong the bug is a wrong token BINDING — report it as "section X
binds surface where it should bind muted", never as "color off".

## Placeholders
Sections blocked by a placeholder are reported separately with the placeholder
area excluded from measurement. Never a fixable divergence. Never iterated on.

## Caps are stop conditions
ITER_CAP per section, ROUND_CAP convergence rounds, HARNESS_CAP harness passes.
On cap: freeze, report the number as-is, move on. Stalling is a reportable
outcome, not a reason to keep working.

## Dev server
Keep it on PORT. Never ask the user to start it. After any visual change,
screenshot the affected section and diff it before reporting. If it regressed,
fix it before saying anything. Never report done on a change you have not diffed.

## Parallelism
Fan out across four independent axes at once: route, section, breakpoint, state.
Never do serially what can run concurrently.

## Ownership
One agent owns one section end to end — geometry, appearance, responsive,
behavior, and its own measurement.
Lead owns shared files exclusively: tokens.css, globals.css, tailwind config,
app/layout.tsx, components/ui/*, components/patterns/*, lib/site.ts,
lib/schema.ts, next.config.
Section agents never edit them; they stop and request the change. If two sections
need the same shared change, lead makes it before dispatch or serializes it.

## Reference discipline
TARGET_URL is the only design reference. Pull nothing from any other project in
or near this workspace. Clone structure, design system, and interaction grammar.
Under COPY_MODE = ORIGINAL, never clone body copy, headlines, logo, or
photography.

## Client constraints
Every row in CONFIG FACTS is authoritative and appears identically everywhere.
Every row in CONFIG FORBIDDEN appears nowhere, including fine print, schema,
alt text, and meta descriptions. Nothing in FORBIDDEN is ever invented to fill
a layout slot — if the target has a slot for it, the slot is removed or
repurposed, and that is reported as an intentional structural deviation.
```

---

## 1 — Crawl, profile, extract the design system

```
TARGET_URL, CRAWL_DEPTH, CRAWL_LIMIT per CONFIG.
Build the capture harness FIRST. No page code until it works.
Run STEP A and STEP E concurrently.

STEP A — PAGE INVENTORY
Crawl internal links to CRAWL_DEPTH, capped at CRAWL_LIMIT. Per page record URL,
title, h1, section count, and page height. Note pages behind auth, geo, or
pagination and mark them UNREACHABLE rather than guessing.

STEP B — TEMPLATE CLASSES  ← this is what makes the clone reusable
Do not treat every page as its own design problem. Cluster the inventory into
template classes by shared section sequence and shared layout skeleton. Most
sites have 3-6. Typical classes: home, listing/index, detail, generic-content,
form/contact, legal.
Per class report:
  - class name
  - member URLs, and which member is the canonical exemplar (the richest one)
  - the ordered section sequence
  - which sections are fixed across members and which vary
  - the page-level chrome: container width, grid, header/footer variant
Then classify SITE_CLASS if CONFIG says auto, and state the decomposition unit
you will use — for marketing that is the section; for docs it is the content
column plus persistent nav; for commerce it is the template plus its data shape;
for app it is the routed pane. Say which and why.

STEP C — DESIGN SYSTEM EXTRACTION
This is extracted once, site-wide, and every route inherits it.
  - TYPE SCALE: every distinct font-size/weight/letter-spacing/line-height
    combination, with the selector that owns it and where it is used
  - SPACING SCALE: distinct section padding, gap, container max-width, and
    vertical rhythm values
  - COLOR ROLES: cluster every computed color into roles — page-bg, surface,
    elevated, ink, ink-muted, accent, accent-hover, border, overlay — with the
    element count using each
  - RADII, BORDERS, SHADOWS, GRADIENTS: distinct values, with usage counts
  - SECTION PATTERNS: the reusable section archetypes (hero, split, grid-of-N,
    band, stat-row, accordion, form-block, footer). Give each a name and record
    its geometry at every breakpoint. SYNTHESIZE routes are built only from
    these, so this list is the vocabulary for the whole build.
  - UI PRIMITIVES: button variants and their states, link styles, card variants,
    form field anatomy, icon sizing
  - BREAKPOINTS: every breakpoint in the CSS, read from the stylesheets

STEP D — BEHAVIOR PROFILE, per template class
  - motion: scroll-linked or time-driven, per section
  - content static or fetched
  - state: menus, tabs, carousels, accordions, forms, sticky/shrink headers
Then name the axes that actually matter for THIS site and state which you capture
and which you SKIP, with reasons. Do not default to a motion-heavy capture on a
site whose difficulty is layout, density, or state.

STEP E — dispatch asset harvest now (Prompt 2). Do not serialize it.

HARNESS — build for the chosen axes. Always capture, per section:
  - Geometry: box, position, z-order, overflow
  - Static appearance: resolved font-family, weight, size, letter-spacing,
    line-height, rest opacity, border, radius, shadow geometry, gradient stops.
    Geometry-only audits are blind to most of what makes a section read wrong.
  - Responsive: the same pass at EVERY breakpoint from STEP C.
Add only per profile:
  - Scroll-linked motion -> sample by requestAnimationFrame during a slow
    programmatic scroll, ~2-4px/frame. Never step to fixed scroll offsets; offset
    stepping cannot see staggers, easing, or sub-step transitions. If you write
    scrollTo(y) in a loop, stop.
  - Text effects -> count `h1 span, h2 span, [class*=char], [class*=word]` per
    heading and dump each heading's outerHTML. A visually-hidden duplicate of the
    text is a split-library signature, not an accessibility copy.
  - Interactive state -> capture each state as its own reference, not just the
    default render.
  - Data-driven lists -> real item count, plus empty/loading states if reachable.

COMPARISON — two channels, gated per COLOR_MODE:
  STRUCTURAL: diff the DOM property dumps. Per section per breakpoint output max
    box delta px, elements over tolerance, typography mismatches, divergent area %.
  PERCEPTUAL: SSIM. Under REMAP, recolor the reference through the token map first.
  Screenshot both sides at matched SECTION-RELATIVE progress — page heights
  differ, absolute scrollY is meaningless.
  Rank sections by the gating channel, descending.

ROUTE MAP — resolve CONFIG ROUTES against the template classes:
  ROUTE_POLICY MIRROR -> emit one row per crawled page, mode CLONE
  ROUTE_POLICY SUBSET -> emit rows only for pages the user kept
  ROUTE_POLICY CUSTOM -> bind each requested route to its named template class;
    any route with no plausible class becomes SYNTHESIZE, and you propose which
    section patterns compose it
Report the resolved table. Flag any binding you think is wrong.

Harness gets HARNESS_CAP passes. Rough is fine. Refine only if it produces a
number you can prove is wrong.

Deliverable: page inventory, template classes, design system, behavior profile,
resolved route map, ranked table, raw traces. Continue straight into Prompt 2's
inventory — do not stop here.
```

**Shape of the STEP B + C output:**

```
PAGE INVENTORY — 14 pages crawled, 2 UNREACHABLE (search results, paginated blog p2+)

TEMPLATE CLASSES — 4
  home          1 page   exemplar /
                sections: hero · trust-strip · services-grid · process-3col ·
                          gallery · service-area · cta-band · form · footer
  listing       2 pages  exemplar /services
                sections: page-header · filter-row · grid-of-N · cta-band · footer
                varies: grid item count (6, 9)
  detail        8 pages  exemplar /services/roof-replacement
                sections: page-header · split-media · prose-block · related-grid ·
                          cta-band · footer
  legal         3 pages  exemplar /privacy-policy
                sections: page-header · prose-block · footer

SITE_CLASS: marketing. Decomposition unit = section.

DESIGN SYSTEM
  TYPE SCALE (7 combos)
    display clamp(2.5rem,5vw,4rem)/700/-0.02em/1.05   h1
    h2      clamp(1.75rem,3vw,2.5rem)/700/-0.01em/1.15
    ...
  SPACING (5 steps + 1 container)  96 / 64 / 40 / 24 / 16 · max-w 1200
  COLOR ROLES (11 hexes -> 8 roles)
    page-bg #FFFFFF 412els · surface #F5F5F3 88 · ink #1A1A1A 340
    ink-muted #6B6B6B 126 · accent #C8102E 44 · accent-hover #A00D25 hover
    border #E4E4E1 61 · overlay rgba(0,0,0,.45)
  SECTION PATTERNS (9) hero · trust-strip · grid-of-N · split-media · prose-block ·
    stat-row · accordion · cta-band · form-block
  PRIMITIVES  Button(primary,secondary,ghost x 4 states) · Card(flat,elevated) ·
    Field(text,select,textarea) · Link(inline,nav,footer)
  BREAKPOINTS 640 · 768 · 1024 · 1280   (no 1536 rule found)

BEHAVIOR
  motion: time-driven only — IO fade-up 0.6s / 0.08s stagger. NO scroll-linked
    transforms. Header shrink is a threshold toggle at 80px, not interpolation.
  state: mobile drawer, header scrolled/unscrolled, card hover, FAQ accordion

AXES CHOSEN: layout geometry, type scale, spacing rhythm, responsive x4, state x4.
AXES SKIPPED: scroll-linked motion sampling — none exists. A rAF trace would cost
  ~40% of harness time and measure nothing. Time-driven reveals captured as
  before/after pairs instead.

RESOLVED ROUTE MAP
  /                 CLONE       target /
  /services         TEMPLATE    listing
  /contact          TEMPLATE    home§form-block + legal§page-header
                                FLAG: target has no standalone contact page; the
                                form lives in the home page. Composing from two
                                classes — confirm at gate.
  /privacy-policy   TEMPLATE    legal
  /faq              SYNTHESIZE  page-header + accordion + cta-band + footer
                                no target analog; composed from patterns
```

---

## 2 — Harvest what exists, placeholder the rest

Dispatched concurrently with Prompt 1. Never serialize behind it.

```
Pull every asset the reference already serves, at the highest resolution actually
served — not thumbnails. Sources: origin network log, <img>/<source>/srcset,
CSS url(), <link rel=preload>, the font files themselves, inline SVG sprites.
Harvest across ALL template class exemplars, not just home.

KEEP: fonts if the license permits (check and report), icon geometry, SVG
decorations, texture/noise overlays, layout-critical spacers.
PLACEHOLDER per CONFIG ASSETS. Under COPY_MODE = ORIGINAL, all photography and
all brand marks are placeholders regardless of whether you could fetch them.

Inventory every slot you are NOT filling. Per slot record:
  - selector + section + template class
  - rendered dimensions at every breakpoint, and aspect ratio
  - object-fit / object-position
  - dominant color sampled from the reference, remapped to the nearest token role
  - what it depicts structurally — wide hero, 4:3 card, square slot, full-bleed
    band — for the generation prompt in Prompt 8

Build with neutral placeholders at correct dimensions and mapped dominant color.
Placeholder slots are a tracked gap: not a blocker, not a check-in.
Do NOT generate or source replacements now.

Deliverable: asset manifest + placeholder inventory, grouped by template class.
```

---

## 🚦 GATE — the only stop

Post, then wait:

1. Page inventory + template classes + SITE_CLASS with decomposition unit
2. **Resolved route map** — every binding, every SYNTHESIZE composition, every flag
3. Design system: type scale, spacing scale, section patterns, primitives
4. **Token binding proposal** (REMAP only) with contrast check
5. Axes chosen and axes skipped, with reasons
6. Placeholder inventory count
7. Harness output: ranked table, reference vs blank scaffold

**Shape of the token binding (COLOR_MODE = REMAP):**

```
ROLE           REFERENCE        ->  OURS               NOTE
page-bg        #FFFFFF          ->  <hex> <name>
surface        #F5F5F3          ->  <hex> @60%         subtle lift
elevated       #FFFFFF          ->  #FFFFFF            cards stay near-white
ink            #1A1A1A          ->  <hex>
ink-muted      #6B6B6B          ->  <hex>
accent         #C8102E          ->  <hex>
accent-hover   #A00D25          ->  <hex>              LIGHTENS (ref darkens)
border         #E4E4E1          ->  <hex> @30%
overlay        rgba(0,0,0,.45)  ->  <hex> @55%         warm, not neutral black

CONTRAST (AA — 4.5:1 body, 3:1 large) — every bound pair, computed
  <fg> on <bg>   9.4:1  PASS
  <fg> on <bg>   2.1:1  FAIL -> derived value <hex> (10.1) substituted

Deviations from CONFIG PALETTE are limited to the derived values above and
listed here rather than applied silently.
```

Under `COLOR_MODE = PRESERVE`, skip the binding — tokens take the extracted values verbatim, and the gate is the perceptual channel.

Approve this and Phase 2 needs no further design decisions.

---

## 3 — Shared foundation, lead alone, before any fan-out

```
You (lead) build these yourself, before dispatching anyone. Serialized on purpose
— every parallel agent depends on them.

  tokens.css            approved binding as CSS custom properties + full type
                        scale + spacing scale + radii/shadows. No magic numbers
                        downstream, anywhere, ever.
  tailwind config       bind tokens; no raw hex permitted in component code
  app/layout.tsx        html/body shell, next/font, skip-link, header, footer
  components/ui/*       every primitive from the extraction, all states
  components/patterns/* every SECTION PATTERN from the extraction, as a
                        configurable component. This is the vocabulary
                        SYNTHESIZE routes are built from — build them all, even
                        patterns only one route uses.
  lib/site.ts           SINGLE source of every CONFIG FACTS value
  lib/schema.ts         structured data built from lib/site.ts
  app/not-found.tsx, robots.ts, sitemap.ts

Motion library ONLY if the profile found motion CSS cannot do. If reveals are
IntersectionObserver + transition, use IntersectionObserver + transition.

Route skeleton, empty but routable, one file per row in the resolved route map.

Then dispatch. Do not build sections yourself.
```

---

## 4 — Fan out across routes and sections

```
Dispatch CONCURRENTLY across every route in the resolved map, and within each
route across every section. Route agents do not block each other.

Each section agent owns its section end to end and:
  1. reads the trace for its section only, from its route's bound template
  2. builds from components/patterns/* and components/ui/* — never new primitives
  3. writes content per COPY_MODE
  4. applies every CONFIG FACTS value from lib/site.ts, never hardcoded
  5. removes or repurposes any slot that would require a CONFIG FORBIDDEN item,
     and reports that as an intentional structural deviation with its pixel cost
  6. measures, per its route MODE:
       CLONE / TEMPLATE -> structural diff at every breakpoint, then classify:
         (a) blocked by placeholder asset    -> list, exclude area, move on
         (b) measurable but unmeasured       -> measure it
         (c) layout / type / spacing / state -> fix it
         (d) intentional deviation           -> list with cost, never "fix"
         Fix (b) and (c) once. List (a) and (d).
       SYNTHESIZE -> system compliance audit: count raw hex, off-scale type,
         off-scale spacing, non-pattern sections. Report the count, which must
         be zero. No divergence number exists for these — do not invent one.
  7. reports: route, section, MODE, number per breakpoint, max box delta px,
     counts of (a) and (d), and any shared-file change it needs

Agents NEVER edit shared files. Needing a token, a pattern change, or a layout
change means stopping and requesting it. Lead applies it once and rebroadcasts.

Cap: 1 build + 1 fix pass per agent, then report whatever the number is.
```

---

## 5 — Converge, in batches

```
Loop without checking in.

Round 1: dispatch ALL sections over THRESHOLD at once, one agent each, across
         all routes simultaneously.
Round 2: re-diff as each returns; dispatch everything still over, at once.
Round 3: same. STOP after ROUND_CAP.

Serialize only when two sections need the same shared-file change — lead makes
that edit alone, then both resume. A pattern-component fix propagates to every
route using it; re-diff all of them, not just the requester.

A section at ITER_CAP is frozen and reported at whatever number it holds.

Stop and report when green, floored by placeholders, or capped. Report the
categories separately — never blend FLOORED, CAPPED, or DEVIATION into FAILED.
```

**Report format:**

```
ROUTE / SECTION            MODE    390    768   1024   1280   STATUS
/ hero                     CLONE  1.2%   0.9%   0.7%   0.6%   PASS
/ trust-strip              CLONE  0.4%   0.4%   0.3%   0.3%   PASS
/ services-grid            CLONE  1.8%   1.1%   0.9%   0.9%   PASS
/ gallery                  CLONE  6.1%   5.8%   5.4%   5.2%   FLOORED — 6
                                          placeholder tiles = 88% of section.
                                          Geometry exact.
/ testimonial-band         CLONE     —      —      —      —   DEVIATION — slot
                                          removed (FORBIDDEN: reviews). Costs
                                          412px of page height vs reference.
/services page-header      TMPL   0.6%   0.5%   0.4%   0.4%   PASS
/services grid-of-N        TMPL   2.9%   1.6%   1.3%   1.2%   CAPPED @390 — card
                                          stack adds 14px. Shared pattern fix,
                                          deferred.
/privacy-policy prose      TMPL   0.9%   0.7%   0.6%   0.6%   PASS
/faq (whole route)         SYNTH     0      0      0      0   PASS — 0 system
                                          violations across 4 sections

6 PASS / 1 FLOORED / 1 CAPPED / 1 DEVIATION. Perceptual SSIM 0.94 (advisory).
```

---

## 6 — Behavior specs, for what a diff cannot see

```
One spec per non-obvious interaction from the behavior profile. Write them in
parallel, one agent per interaction, then implement. A spec is written ONCE and
applies to every route using that pattern.

Anatomy, every time:
  mechanism  the exact CSS property or API, and explicitly what NOT to use where
             a plausible wrong choice exists
  numbers    the values, PLUS why the ratio matters perceptually
  failure    the tempting-but-wrong version and why it reads wrong
  trigger    what fires it, once or repeating, what happens on re-entry
  a11y       labels, hidden state, focus, prefers-reduced-motion
```

**Example — the one that landed first try:**

```
Hero "Aurelia": per-character spans, animate font-variation-settings 'wght'
200->800 (NOT font-weight) with opacity 0.15->1 simultaneously. Never start at 0
— the faint resting state is what makes it read as ink rather than a fade.
IntersectionObserver at 25%, fire once then unobserve. 0.45s per char, 0.06s
stagger — that ratio keeps 6-8 chars mid-transition, which is what creates a
moving edge. cubic-bezier(0.4,0,0.2,1). Time-driven, not scroll-linked.
aria-label on the heading, aria-hidden on every char, full weight instantly
under prefers-reduced-motion.
```

**Example — threshold vs interpolation:**

```
Header shrink: toggle a boolean class at scrollY > 80, transition height 88->64px
and padding-block 20->12px. NOT scroll-linked interpolation — the reference is a
threshold toggle, and interpolating produces a header that breathes continuously
during scroll, which reads jittery on trackpads. 0.22s ease-out: fast enough to
feel like a state change, slow enough not to snap. Hysteresis — shrink at 80,
restore at 60; without the 20px gap a scroll resting near 80 flickers. Logo
scales via transform, not width — width triggers layout every frame.
Trigger: passive scroll listener, rAF-throttled, repeating both directions.
a11y: sticky in both states, focus ring unchanged, reduced-motion snaps.
```

**Example — the one most likely to be built wrong:**

```
Mobile nav drawer: translateX(100%) -> 0. NOT display:none -> block, NOT a height
animation — the first kills the transition, the second reflows the page. 0.3s
cubic-bezier(0.4,0,0.2,1); overlay fades 0 -> ink@55% over the same 0.3s.
Matching durations matter — a faster overlay reads as two separate events.
Failure mode: animating `right` or `width` — janks on mobile Safari, neither is
compositor-only. transform and opacity only.
Trigger: button click, repeating. On close, focus returns to the trigger.
Body scroll locks via overflow:hidden + scroll restore, NOT position:fixed on
body — position:fixed loses scroll position on close.
a11y: aria-expanded on trigger, aria-controls -> panel id, inert when closed,
focus trapped while open, Escape closes. Reduced-motion: instant show/hide,
overlay still fades (opacity is safe).
```

---

## 7 — Cross-cutting pass — parallel agents, whole site

```
These span every route, so they run after routes exist, as parallel agents.

AGENT SEO
  - structured data from lib/site.ts, appropriate to SITE_CLASS and to each
    template class — never a type the business does not warrant
  - emit NOTHING that CONFIG FORBIDDEN excludes, including in schema
  - unique title + meta description per route via generateMetadata
  - Open Graph + Twitter card, og:image slot placeholdered 1200x630
  - one h1 per route, unbroken heading order
  - canonical per route, sitemap.ts from the route map, robots.ts
  - internal linking that matches the target's link graph shape

AGENT PERFORMANCE
  - next/image everywhere with explicit width/height or fill+sizes — zero CLS
  - third-party embeds lazy, titled, wrapped in aspect-ratio boxes
  - fonts self-hosted via next/font, display:swap
  - target LCP < 2.5s, CLS < 0.1, INP < 200ms mobile; report all three from a
    Lighthouse run per route

AGENT ACCESSIBILITY
  - axe pass per route, per breakpoint; report violations, fix all
  - keyboard path through every interactive element on every route
  - focus visible everywhere, focus order matches visual order
  - every behavior spec's reduced-motion branch verified, not assumed

AGENT FORMS  (only if any route has one)
  - typed schema validation client AND server — client validation is UX, not a
    gate. Honeypot + submit-timestamp check. No third-party captcha unless asked.
  - transport per CONFIG FACTS mail. Credentials from env ONLY — never in
    source, never in a client component, never logged. Ship .env.example with
    empty values and a clear TODO.
  - states idle / submitting / success / error, all visible, all announced via
    aria-live. Never a silent failure.

Each agent reports pass/fail per route, not a global number.
```

---

## 8 — Close the asset gap, last

```
Everything else is converged. Now the placeholders.

One agent per slot, in parallel. Each writes a generation prompt derived from the
reference's art direction for that slot — subject, framing, lens feel, lighting
direction, palette bound to the CONFIG palette, grain, and exact output
dimensions from the placeholder inventory.

Subject matter is CONFIG VERTICAL. Art direction is the reference's.
Slots that recur across template classes get ONE prompt and one file, not one per
route — check the inventory for shared selectors before writing.

Output: one prompt per slot, plus dimensions and file name. The user runs them.

When files come back: drop them in, re-run the diff on every affected section
across every affected route, and report the final table with placeholder
exclusions removed.
```

**Shape of a generation prompt:**

```
SLOT hero-bg | used by: home, listing | 2400x1350 (16:9) | object-position 50% 40%
Wide exterior shot at golden hour, subject centered-right, camera low and
slightly off-axis at roughly 35mm, warm low-angle light raking from frame left,
long soft shadows. Muted warm palette bound to CONFIG PALETTE. Fine natural film
grain, no HDR, no lens flare, no text, no visible branding. Lower third holds
detail but stays quiet enough for an overlay at 55% opacity.
```

---

# WHAT TO CHANGE PER PROJECT

Only the CONFIG block. Prompts 0–8 read from it and from Prompt 1's output.

Three switches carry most of the variation:

**`COLOR_MODE`** flips which diff channel gates. `REMAP` when you're rebranding — structural gates, perceptual is advisory. `PRESERVE` when you're rebuilding a site as-is — perceptual gates at SSIM ≥ 0.97.

**`ROUTE_POLICY`** decides where the route table comes from. `MIRROR` clones the whole site. `SUBSET` keeps the pages you want. `CUSTOM` lets you name routes the target never had — those become `SYNTHESIZE` and get built from extracted section patterns instead of diffed.

**`SITE_CLASS`** sets the decomposition unit, which is what one agent owns. Marketing decomposes by section. Docs decompose by content column plus persistent nav. Commerce decomposes by template plus data shape. App decomposes by routed pane — and an app with real data has no stable reference capture, so `CLONE` mode won't work on it; those routes must be `TEMPLATE` against a fixed exemplar state, or `SYNTHESIZE`.

Two things the workflow cannot absorb into CONFIG: anything behind auth or geo (Prompt 1 marks it `UNREACHABLE` and it never enters the route map), and any target whose license or terms forbid this. Check before you crawl.
