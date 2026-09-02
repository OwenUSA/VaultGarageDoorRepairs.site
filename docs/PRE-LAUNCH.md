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
