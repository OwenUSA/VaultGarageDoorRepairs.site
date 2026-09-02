import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Form field anatomy — reimplemented, not cloned from Gravity Forms.
 * Measured: label RC 600 14 uppercase · input 1px border, radius 4, padding 12.
 */
/* `text-ink` is EXPLICIT, never inherited. The form Card is always
   `variant="elevated"` (a light surface) but it sits inside a dark ContactBlock
   band, so an unstyled label inherits `text-ink-on-band` and paints white on
   white — 1:1, measured on 120 rows. This is the Atlas invisible-CTA defect in
   its form-label form; the colour is stated on the element that needs it. */
const labelCls = 'block font-display font-semibold text-3xs uppercase mb-3 text-ink';

const controlCls =
  'w-full rounded-xs border border-border bg-elevated text-ink font-body text-xs leading-body p-4 ' +
  'transition-colors duration-[var(--duration-fast)] ease-standard ' +
  'placeholder:text-ink-muted ' +
  'hover:border-accent ' +
  'focus:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ' +
  'aria-[invalid=true]:border-accent-hover';

export function FieldShell({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      <label className={labelCls} htmlFor={htmlFor}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-3 font-body text-3xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export function TextInput({
  label,
  id,
  required,
  hint,
  className = '',
  ...rest
}: { label: string; id: string; hint?: ReactNode } & ComponentPropsWithoutRef<'input'>) {
  return (
    <FieldShell label={label} htmlFor={id} required={required} hint={hint}>
      <input id={id} name={id} required={required} className={`${controlCls} ${className}`} {...rest} />
    </FieldShell>
  );
}

export function TextArea({
  label,
  id,
  required,
  hint,
  className = '',
  ...rest
}: { label: string; id: string; hint?: ReactNode } & ComponentPropsWithoutRef<'textarea'>) {
  return (
    <FieldShell label={label} htmlFor={id} required={required} hint={hint}>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={5}
        className={`${controlCls} ${className}`}
        {...rest}
      />
    </FieldShell>
  );
}

export function Select({
  label,
  id,
  required,
  hint,
  className = '',
  children,
  ...rest
}: { label: string; id: string; hint?: ReactNode } & ComponentPropsWithoutRef<'select'>) {
  return (
    <FieldShell label={label} htmlFor={id} required={required} hint={hint}>
      <select id={id} name={id} required={required} className={`${controlCls} ${className}`} {...rest}>
        {children}
      </select>
    </FieldShell>
  );
}
