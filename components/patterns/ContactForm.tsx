'use client';

import { useRef, useState } from 'react';
import { Button, Card, TextInput, TextArea, Select, Heading, Prose } from '@/components/ui';
import { services } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const REQUIRED = ['name', 'phone', 'email', 'service', 'message'] as const;

/**
 * ContactForm — reimplemented, not cloned from Gravity Forms.
 *
 * Posts to /api/contact, which is the ONLY place SMTP is touched. Credentials
 * live in env vars server-side (SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS /
 * CONTACT_TO_EMAIL) and are never referenced in client code, never hardcoded
 * and never logged.
 *
 * Accessibility contract (applied by the lead from docs/requests/contact.md):
 *   - empty required controls get aria-invalid + aria-describedby on submit,
 *     and focus moves to the first one
 *   - the result region is role="alert" for a failure, role="status" for a send
 * The server still validates and returns 422; this is an addition, not a
 * replacement for it.
 */
export function ContactForm({ variant = 'inline' }: { variant?: 'inline' | 'standalone' }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const isInvalid = (id: string) => invalid.includes(id);
  /** Field renders the hint with this id, so point the control at it. */
  const describedBy = (id: string) => (isInvalid(id) ? id + '-hint' : undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const missing = REQUIRED.filter((k) => !String(data[k] ?? '').trim());
    setInvalid(missing);
    if (missing.length) {
      setStatus('error');
      setError('Please fill in the highlighted fields so we can call you back.');
      const first = form.querySelector<HTMLElement>('#' + missing[0]);
      first?.focus();
      return;
    }

    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
      setError('That did not send. Please call us instead and we will pick it up straight away.');
    }
  }

  const req = (id: string) => ({
    required: true,
    'aria-invalid': isInvalid(id) ? true : undefined,
    'aria-describedby': describedBy(id),
    hint: isInvalid(id) ? 'This one is needed.' : undefined,
  });

  /**
   * The `standalone` band (`hero-new.inner-form`) is NOT a stacked card.
   * Measured at 1440: the four short fields sit on ONE row as quarter-widths
   * (x 178 / 454 / 731 / 1007, each 255x68), the message is full width
   * (1084x128) and the footer button is 42px — 423px for the whole band.
   * `inline` (the home hero aside) is a genuinely narrow column and keeps the
   * stacked layout, which already measures on target.
   */
  const standalone = variant === 'standalone';

  const shortFields = (
    <>
      <TextInput label="Name" id="name" autoComplete="name" {...req('name')} />
      <TextInput label="Phone" id="phone" type="tel" autoComplete="tel" {...req('phone')} />
      <TextInput label="Email" id="email" type="email" autoComplete="email" {...req('email')} />
      <Select label="What do you need?" id="service" defaultValue="" {...req('service')}>
        <option value="" disabled>
          Select a service
        </option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.title}
          </option>
        ))}
      </Select>
    </>
  );

  return (
    <Card variant="elevated" className={standalone ? 'p-9' : 'p-7'}>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className={`flex flex-col ${standalone ? 'gap-7' : 'gap-6'}`}
        noValidate
      >
        <Heading level={3} className="text-ink">
          Request a visit
        </Heading>

        {standalone ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">{shortFields}</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">{shortFields}</div>
        )}
        {/* Measured: the target's message field is 1084x128 including its label.
            rows=5 overshoots by ~76px in the wide band; the narrow inline column
            keeps 5 because it already measures on target. */}
        <TextArea
          label="What is the door doing?"
          id="message"
          rows={standalone ? 3 : 5}
          {...req('message')}
        />

        {/* honeypot — not a CAPTCHA, just a cheap bot filter.
            Uses sr-only rather than an off-canvas px offset: a raw px literal
            is a system-compliance violation, and sr-only is still filled by
            bots while staying out of the accessibility tree. */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <Button type="submit" variant="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Request a visit'}
        </Button>

        {status === 'error' && error ? (
          <div role="alert">
            <Prose className="text-ink">{error}</Prose>
          </div>
        ) : null}

        <div aria-live="polite" role="status">
          {status === 'sent' ? (
            <Prose className="text-ink">Thanks — we have got it and will be in touch shortly.</Prose>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
