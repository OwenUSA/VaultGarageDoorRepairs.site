# 07 — Map lazy-mount

D-08: two maps. Home at zoom ~13, `/contact` at zoom ~15 beside the form. Keyless iframe,
embedded by **coordinates** (D-07) — the address is fictional and must never reach a
geocoder. `<BusinessMap>` is a shared-shell component owned by the lead (A-6).

---

## ⚠ THE BYPASS LINK IS PART OF THIS COMPONENT, NOT A SEPARATE TASK

**Three sibling sites in this programme shipped the map as a keyboard trap.** The bypass was
specified — in an accessibility document — and never built, because the spec that described
the map and the spec that described the bypass were two different files and no programmatic
gate could see the gap between them. The gap is closed by putting the markup here, in the
component's own spec, ahead of everything else.

A Google Maps iframe contains dozens of focusable controls. A keyboard user who tabs into it
must press `Tab` upwards of forty times to get out. On `/contact` the map sits **beside the
form**, so the trap is directly between the page heading and the phone field.

**The component does not render without this element. It is the first child.**

```tsx
// components/patterns/BusinessMap.tsx — the bypass is the FIRST child, always.
<section data-section="map" aria-labelledby={headingId}>
  <a href={`#${afterMapId}`} className="map-bypass">Skip the map</a>
  {/* ...heading, address text, "Get directions" link... */}
  <div className="map-frame">{mounted ? <iframe … /> : <div className="map-poster" />}</div>
  <span id={afterMapId} tabIndex={-1} />
</section>
```

```css
/* Visible on focus. NOT display:none, NOT visibility:hidden -- both remove it from the
   tab order, which is the entire point of it existing. */
.map-bypass { position: absolute; left: -9999px; }
.map-bypass:focus-visible {
  position: static; display: inline-block; left: auto;
  padding: var(--space-2) var(--space-3);
  outline: 2px solid var(--focus-ring); outline-offset: 2px;
}
```

**Acceptance, checked before any "done" report on either map:** `Tab` from the "Get
directions" link reaches a visible "Skip the map" control; activating it lands focus after
the map; the next `Tab` reaches the element that follows the map section. If any of those
three is false, the component is broken regardless of what it looks like.

---

## Mechanism

`IntersectionObserver` with `rootMargin: '200px'` on the map wrapper. Until it fires, the
wrapper renders a static poster div at the exact same box. On first intersection the
`<iframe>` is mounted, once, and the observer disconnects.

```tsx
loading="lazy"
title={`Map showing the location of ${nap.name} in ${nap.locality}, ${nap.region}`}
src={maps.embed(zoom)}          // https://www.google.com/maps?q=<coords>&z=<zoom>&output=embed
referrerPolicy="no-referrer-when-downgrade"
```

The wrapper is a **fixed aspect-ratio box** — `aspect-ratio` plus `width: 100%` — so the
poster and the iframe occupy identical space and the mount causes zero layout shift.

**Do NOT use:**

- Mounting the iframe on page load. It is a third-party request on every route the map
  appears on, and it is the heaviest thing on the page.
- `loading="lazy"` **alone**. It defers the network fetch but the element, its focusable
  contents and its accessibility subtree still exist from first render. Both mechanisms are
  used together: the observer controls the element, the attribute controls the fetch.
- A height in `px` on the wrapper. It breaks the ratio at 390 and reintroduces the layout
  shift the fixed ratio exists to prevent.
- Any Maps JavaScript API, any API key, any geocoder. D-07 and D-18. The fictional address
  is displayed as **text beside the map** and never passed to a lookup.
- A `<script>` from Google. The embed is an iframe and nothing else.
- Removing the `title` attribute. An untitled iframe is announced as "frame" and is a WCAG
  4.1.2 failure.

## Ratio and why

| | value | why |
|---|---|---|
| `rootMargin` | **200px** | About one thumb-flick of scroll. The map is loaded and painted by the time it is on screen, and a user who never scrolls that far never pays for it. |
| poster -> iframe | **no transition** | A cross-fade would draw attention to a swap the user should not notice. The poster and the iframe are the same size and the same dominant tone. |
| home zoom | **13** | Metro context: Broken Arrow in relation to Tulsa. |
| `/contact` zoom | **15** | Street context, beside the form, where the user is deciding whether we are near them. |
| aspect ratio | **16:9** at >= 768, **4:3** at 390 | A 16:9 map on a phone is a 220px-tall letterbox. |

## Failure mode

**The keyboard trap.** See the box above. It is failure mode one, two and three.

**Layout shift on mount.** Without the fixed-ratio wrapper the iframe's default 150px height
is replaced by the real height and everything below the map jumps. On `/contact` that moves
the form under the user's cursor.

**The map never mounts.** If the observer is created against an element that is already
intersecting at mount time, some implementations fire immediately and some do not; the
callback must therefore also be safe to run synchronously, and the observer must be created
in an effect that runs after the ref is attached.

**The fake address reaches a geocoder.** Any change from `?q=<coords>` to `?q=<address>`
sends "4418 Kestrel Hollow" to Google's lookup, which will resolve it to something wrong and
plausible. The embed URL is built by `maps.embed()` in `lib/site.ts` and nowhere else.

## Trigger

| event | result |
|---|---|
| wrapper within 200px of the viewport | iframe mounts, observer disconnects |
| **client-side route change** | the section unmounts and the next route mounts its own map with its own zoom. **Verify the observer is disconnected on unmount** — an observer left alive on a detached node keeps the iframe reference and the component leaks on every navigation between `/` and `/contact`. |
| `prefers-reduced-motion` | no effect. There is no motion here. |
| user never scrolls to it | no third-party request is ever made |

## Accessibility

- The bypass link, above. Non-negotiable.
- `title` on the iframe naming the business and the locality. `aria-label` is not a
  substitute on an `<iframe>`.
- The address is rendered as **text**, in the same section, so the location is available
  without entering the frame at all. The map is an enhancement, not the content.
- A "Get directions" link (`maps.directions` in `lib/site.ts`) sits outside the iframe and
  before the bypass link, so the useful action is reachable in two `Tab` presses.
- The section is `aria-labelledby` its own heading, so it is announced as a named region.
- Contrast inside the iframe is **not measurable** and is not measured. `contrast.mjs`
  reports `UNMEASURABLE` for third-party frame content rather than assuming white, per A-13;
  that is correct behaviour and not a finding.
- The poster div carries no text and is `aria-hidden="true"`; it is a sized placeholder, not
  content.
