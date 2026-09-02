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

---

# CONFIG — authoritative for this project

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
CRAWL_DEPTH       2
CRAWL_LIMIT       25
SITE_CLASS        auto

### CLIENT ────────────────────────────────────────────────
BRAND             vaultgaragedoorrepairs
DOMAIN            vaultgaragedoorrepairs.site
VERTICAL          garage door repair
STACK             Next.js App Router + TypeScript + Tailwind + next/font +
                  next/image + lucide-react
COPY_MODE         ORIGINAL

COLOR_MODE        REMAP
PALETTE
  #0B1220  vault-ink        ink / darkest surface
  #14213D  vault-navy       primary brand, dark bands, header
  #1D4ED8  vault-blue       accent, links, primary button
  #1739A8  vault-blue-deep  accent-hover
  #F59E0B  signal-amber     secondary CTA / emphasis
  #FFFFFF  paper            page-bg, elevated cards
  #F1F5F9  steel-50         surface
  #E2E8F0  steel-200        border
  #64748B  steel-500        ink-muted

FACTS
  hours           24/7 emergency service, 7 days a week; office Mon-Sat 8am-6pm
  locations       one — single service-area business, no storefront address shown
  nap             placeholder  (name: Vault Garage Door Repairs ·
                  phone: (555) 010-0199 · address: service-area only, city/state
                  placeholder — never a street address)
  mail            SMTP via env vars only: SMTP_HOST, SMTP_PORT, SMTP_USER,
                  SMTP_PASS, CONTACT_TO_EMAIL. Ship .env.example with empty
                  values. Never hardcode, never client-side, never logged.
  services        garage door spring repair, opener repair & installation,
                  off-track / cable repair, panel replacement, new door
                  installation, routine maintenance & tune-up
  response        same-day and emergency dispatch

FORBIDDEN
  reviews, testimonials, star ratings, aggregateRating, review schema
  license numbers, bonded/insured claims, any licensing claim
  price claims, "starting at", quotes with figures, discounts, coupons
  warranties, guarantees, "satisfaction guaranteed"
  certifications, manufacturer authorizations, brand partnerships, awards
  years-in-business claims, job counts, technician counts, "family owned since"
  named real people, staff photos, staff bios

ASSETS
  REAL:        icon geometry, SVG decorations, texture/noise overlays,
               layout-critical spacers, fonts (only if license permits — check
               and report; otherwise nearest next/font Google equivalent)
  PLACEHOLDER: ALL photography, ALL brand marks and logos, ALL og:images,
               ALL headshots/staff imagery, map imagery
               (COPY_MODE = ORIGINAL, so this holds regardless of fetchability)

### ROUTES ────────────────────────────────────────────────
ROUTE_POLICY      SUBSET
# RESOLVED AT THE GATE — 17 rows. Authoritative table lives in
# docs/05-route-map.md. 13 CLONE rows kept from the crawl (the 6 CONFIG FACTS
# services + their outer pages), 9 content-less detail routes dropped, 4
# SYNTHESIZE rows added: /contact, /service-areas, /faqs, /privacy-policy.
# Any requested route with no plausible template class becomes SYNTHESIZE and
# is composed from extracted section patterns.
```
