# Shared-file change request — /contact (section agent, PROMPT 4)

Owner of `/contact` cannot edit `components/patterns/ContactForm.tsx` or
`components/ui/Field.tsx`. Requesting the lead apply the following once.

## 1. `components/patterns/ContactForm.tsx` — error announcement

Route contract requires: "errors announced (`aria-invalid` + `role=alert`)".

Current state, verified by DOM query on the rendered page:

- `fields carrying aria-invalid: 0` — no field ever receives `aria-invalid`,
  even though `components/ui/Field.tsx` already ships the style hook
  `aria-[invalid=true]:border-accent-hover`. That hook is dead code today.
- The submit-result region is `<div aria-live="polite" role="status">`. Success
  copy and failure copy share it. A send failure is an error and should be
  announced assertively.

Requested:

1. `role="alert"` (or `aria-live="assertive"`) on the region when
   `status === 'error'`; keep `role="status"` for the success case.
2. Client-side required-field validation on submit that sets
   `aria-invalid="true"` + `aria-describedby` on each empty required control and
   moves focus to the first one. The API already returns 422 for missing fields,
   so the server contract is unchanged.

Everything else on the form already passes: every control is labelled (0
unlabelled controls at all five breakpoints), the submit button is reachable and
fires on `Enter`, and both terminal states render (verified with the network
call stubbed at 503 and at 200).

## 2. Nothing else

No token, spacing or type change is needed. `.harness/compliance.mjs` reports
**0 violations** with `app/contact/page.tsx` as built.
