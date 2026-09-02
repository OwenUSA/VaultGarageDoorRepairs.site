# docs/PRE-LAUNCH.md — blockers before this site is public

Opened at Prompt 1. Nothing here blocks the build; everything here blocks launch.

## 1. Every business fact on this site is fictional and deliberate

Replace all of them. They come from one place, `lib/site.ts`, so there is exactly one file
to edit.

| fact | current (fictional) | note |
|---|---|---|
| business name | Vault Garage Door Repairs | |
| tagline | Locked shut or wide open, it gets diagnosed before it gets quoted. | |
| phone | (918) 555-0117 | 555-01XX reserved range — cannot ring a real person |
| address | 4418 Kestrel Hollow, Broken Arrow, OK 74012 | does not exist; never passed to a geocoder |
| map coordinates | 36.0526,-95.7908 | real Broken Arrow coordinates; the map is embedded by coordinates only |
| hours | 7 days, 7:00 AM - 7:00 PM | single block, seven days, no split hours |
| service area | Serving Broken Arrow and the greater Tulsa metro. | the only surviving service-area statement |
| domain | vaultgaragedoorrepairs.site | |

## 2. The contact form has no submission target

`components/patterns/ContactForm.tsx` is marked `// STUB: no submission target`. It
validates in the browser, shows a "we will call you back" state and `console.warn`s a stub
notice. **Nothing is transmitted anywhere.** A callback destination must be connected, and
`app/privacy/page.tsx` must be updated in the same change — the policy currently states,
accurately, that the form sends nothing.

There is deliberately no electronic-mail path anywhere on this site (D-03). Whatever is
connected must not introduce one without revisiting that decision.

## 3. The privacy policy is an unreviewed template

`app/privacy/page.tsx` carries `UNREVIEWED TEMPLATE — requires legal review before launch`
at the top. It claims no GDPR or CCPA compliance and describes only what the site actually
does. It requires legal review.

## 4. Performance was never measured

Gate 12 (Lighthouse on all five routes) is dropped from this chain by amendment A-4.
**Performance on this site has never been measured at all.** Measure before launch.

## 5. Keyboard access is spec-verified only, never hand-tested

The manual keyboard-only pass in gate 8 is dropped by amendment A-4. Keyboard paths through
the nav, the drawer, the form, the accordion and the map bypass are specified and asserted
programmatically, **but no human has driven the site from the keyboard**. Do that before
launch.

## 6. Every photographic slot is a placeholder

No real photography, and no logo image, exists. The Prompt 10 prompts must be run and the
files dropped in (OVERRIDE 3). Do not launch on placeholders.

## 7. Facts that were never supplied

`docs/facts-needed.md` lists every `TODO(fact)`. None may be guessed. In particular the site
currently makes **no** claim about response time, out-of-hours cover, credentials,
licensing, warranty, pricing, years in business or reviews — because none was supplied. If
any of those is going to be claimed, it has to be supplied and verified first.

## 8. Testimonials: real, or stay removed

The three reference testimonial bands are DELETED (D-13) and **no testimonial placeholder
ships on any route** — there is nothing on the site to fill in. If reviews are wanted at
launch they must be **real, attributable and permissioned**, and the band has to be rebuilt.

Do not, in the same change, add `Review` or `AggregateRating` JSON-LD without the reviews
actually existing on a platform that can be pointed at. `lib/schema.ts` deliberately emits
neither today. Fabricated review markup is a legal exposure, not a content gap.

## 9. Re-verify the JSON-LD after every fact is replaced

`lib/schema.ts` derives everything from `lib/site.ts`, so replacing the facts in §1 silently
rewrites the structured data. After that edit, re-verify — over HTTP, on the built site, not
by reading the source:

- `LocalBusiness` name, `telephone`, `address` and `geo` all match the real business.
- `openingHoursSpecification` still lists **all seven days** with the real opening and
  closing times. It currently reads `07:00` / `19:00`, Monday through Sunday.
- `areaServed` is still a **single** `Place`, never a city array (D-02).
- `image` no longer points at `/placeholders/logo-wordmark.svg`.
- There is still **no `email` property**, no `Review`, and no `AggregateRating` (D-03,
  D-13).
- `url` and every `canonical` point at the real production origin, not
  `https://vaultgaragedoorrepairs.site`.

## 10. Acceptance status at the end of the chain — what was verified, and what was not

Run at Prompt 10+11, from a clean `pnpm build` with exactly one verified listener on 3105.

| gate | result |
|---|---|
| `pnpm build` / `tsc --noEmit` | clean, 10/10 static, 0 type errors, **0 console errors on any route at any breakpoint** |
| email sweep | `EMAIL SWEEP CLEAN` |
| locations sweep | clean — no `/locations` route, no city grid, `areaServed` is one locality; the footer `SERVICE_AREA` sentence is the only survivor |
| NAP | one phone string, one `tel:` href, one address string site-wide; all values from `lib/site.ts`. One prose/label variance recorded in `known-divergence.md` §11.4 |
| hours | `07:00`–`19:00`, seven days, in copy and in JSON-LD |
| maps | both render; `loading="lazy"`, explicit `title`, zoom 13 on `/` and 15 on `/contact`, directions link resolves to the coordinates, bypass anchor first with its target present |
| link crawl | zero 404s, zero orphans, zero dead anchors; custom 404 renders the shell |
| keyboard | **spec-verified only — see §5** |
| `contrast.mjs` | 1695 scored, **0 FAIL**, 3 UNMEASURABLE (the disabled carousel arrow) |
| `rendertruth.mjs` | **1 finding**, the off-track carousel card, floored |
| reduced motion | every duration token zeroed, `scroll-behavior: auto`, call-bar transition 0ms, marquee `motion-reduce:animate-none` |
| palette | **zero raw colour values outside `app/tokens.css`**; masterSeed **3126**, winning seed **9611**, all five candidates recorded in `known-divergence.md` §7 (772491, 207130, 377747, **9611**, 529870) |
| `similarity.mjs` | 58 sections; 58/58 five-gram, 58/58 trigram, 32/32 length; 10 rows **EXEMPT** (header and footer × 5 routes) |
| metadata / robots / sitemap | verified over HTTP: five canonicals, five sitemap entries, no doubled brand in any title |
| Lighthouse | **not run — see §4** |
| `TODO(fact)` | 5 in code, 12 entries in `docs/facts-needed.md`. **Reported, not removed.** |
| structural diff | 181 rows · 56 FAIL · 62 PASS · 28 BLOCKED; every FAIL accounted for in `known-divergence.md` §11.1 |

**None of the above is a launch clearance.** It says the site is internally consistent and
measurably built. Sections 1 through 9 are what stand between it and being public.
