# 06 — Form field focus, error and success states

D-05: five fields — name, phone, service needed (select), preferred callback window,
message. **No backend.** The component is marked `// STUB: no submission target` at the top.
No `type="email"` control exists anywhere (D-03).

## Mechanism

Native constraint validation (`required`, `pattern`, `:user-invalid`) plus one `data-state`
attribute per field wrapper, set on blur and on submit.

```css
.field input, .field select, .field textarea {
  border: 1px solid var(--border);
  transition: border-color 140ms linear, box-shadow 140ms linear;
}
.field :is(input, select, textarea):focus-visible {
  outline: 2px solid var(--focus-ring); outline-offset: 2px; border-color: var(--border-strong);
}
.field[data-state="error"]   :is(input, select, textarea) { border-color: var(--color-error); }
.field[data-state="success"] :is(input, select, textarea) { border-color: var(--color-success); }
```

**Do NOT use:**

- `:invalid`. It matches an empty required field the moment the page renders, so every field
  is red before the user has typed anything. `:user-invalid` (or the `data-state` set on
  blur) is what "invalid *after the user has interacted*" means.
- `outline: none` on focus without an immediate replacement. This is the most common a11y
  regression in a form and it is silent.
- Colour as the only error signal. An error is a **red border, an icon, and a text message**;
  a colour-blind user gets the last two.
- `react-hook-form` or `zod`. Banned by the dependency allowlist for exactly this form:
  five fields, no backend.
- `libphonenumber`. One country. A `pattern` and `inputmode="tel"` is the whole requirement.
- Rotating the error or success hue with the palette. **A-7 exempts semantic colours from
  rotation.** A randomly green error state is a bug. `--color-error` and `--color-success`
  keep conventional hues and are excluded from the Prompt 5 rotation.
- `alert()` or a `console.error` on submit. The stub uses `console.warn` (D-05).

## Ratio and why

| | value | why |
|---|---|---|
| focus ring | **instant**, no transition | A focus ring that fades in is a focus ring that is not there yet when a fast keyboard user has already moved on. Focus indication is never animated. |
| border colour | **140ms linear** | Matches the card hover. Colour only, so linear. |
| error appearance | **instant** | An error message that animates in delays the moment the user learns something is wrong. |
| success state | **140ms**, and it is a border colour only | No tick animation, no bounce. The field is not the achievement. |
| submitted state | **replaces the form**, no transition | See below. |

## Failure mode

**Errors are announced once and then never again.** A `role="alert"` region that is
populated on first submit and re-populated with the same string on second submit does not
re-announce, because the text did not change. The region is cleared, then written on the
next frame.

**The error summary and the field message disagree.** With five fields, a summary at the top
of the form is what a screen-reader user acts on; if it lists "Phone" but the field message
says something else, the user is navigating blind. Both strings come from one source.

**Focus is lost on submit.** After a failed validation, focus must move to the summary; after
a successful submit, focus must move to the confirmation. Leaving focus on the submit button
of a form that has just been replaced drops the user at `<body>`.

**A `select` with no chosen value passes `required`.** The first `<option>` must be a
disabled, valueless placeholder, or "Service needed" submits empty.

## Trigger

| event | result |
|---|---|
| focus | focus ring, instantly |
| blur, field touched and invalid | `data-state="error"`, message rendered, `aria-invalid="true"` |
| blur, field touched and valid | `data-state="success"` |
| input while in error | error clears as soon as the value becomes valid — errors are removed eagerly and applied lazily |
| submit with errors | all invalid fields marked, error summary rendered and focused |
| submit with no errors | the form is replaced by the "we will call you back" state; `console.warn` records the stub notice (D-05); **nothing is transmitted** |
| **client-side route change** | the form unmounts and its state is discarded, including the submitted state. A user who navigates away and returns gets an empty form, not a stale confirmation. |

## Accessibility

- Every control has a visible `<label>` with `htmlFor`, not a placeholder standing in for
  one. Placeholders disappear on input and are not accessible names.
- The phone field is `type="tel"` `inputmode="tel"` `autocomplete="tel"`. Name is
  `autocomplete="name"`.
- Error message is linked with `aria-describedby` and the control carries
  `aria-invalid="true"`. The message text names the fix, not just the fault.
- The error summary is `role="alert"` at the top of the form, listing each failed field as
  an in-page link to that control.
- The submitted state is `role="status"` `aria-live="polite"` and receives focus.
- Required fields are marked in the label text as well as with the `required` attribute; an
  asterisk alone is not a label.
- Focus ring 3:1 against both the input and the page background (D-19), verified
  programmatically by `contrast.mjs`, and the error and success borders are checked as UI
  colours at 3:1 rather than assumed.
- `prefers-reduced-motion: reduce` — the 140ms border transitions drop to `0ms`. Nothing
  else in this component moves.
- Every control is at least 44px tall at 390 (A-14 covers `tel:` links; the form's own
  controls carry it explicitly).
