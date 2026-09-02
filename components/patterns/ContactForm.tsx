// STUB: no submission target
'use client';

import { useRef, useState } from 'react';
import { Button, Card, TextInput, TextArea, Select, Heading, Prose } from '@/components/ui';
import { services, callbackWindows, nap } from '@/lib/site';

type Status = 'idle' | 'done';

/**
 * ContactForm — D-05. Five fields: name, phone, service needed, preferred
 * callback window, message.
 *
 * There is NO backend and no transport of any kind. Validation is entirely
 * client-side; a valid submit swaps the form for a "we'll call you back" state
 * and writes a stub notice to the console. Nothing leaves the browser.
 *
 * Phone validation is ten digits, permissive on paste (spaces, dashes,
 * parentheses, a leading 1 and a leading +1 are all stripped before counting)
 * and formatted to (NNN) NNN-NNNN on blur.
 *
 * Accessibility: empty or invalid required controls get aria-invalid plus a
 * hint the control is described by, and focus moves to the first offender. The
 * failure region is role="alert"; the success region is role="status".
 */

const REQUIRED = ['name', 'phone', 'service', 'window', 'message'] as const;

const LABELS: Record<string, string> = {
  name: 'Name',
  phone: 'Phone',
  service: 'Service needed',
  window: 'Preferred callback window',
  message: 'Message',
};

/** Permissive: keep digits only, then drop a US country-code 1. */
export function digitsOf(raw: string) {
  const d = raw.replace(/\D+/g, '');
  return d.length === 11 && d.startsWith('1') ? d.slice(1) : d;
}

export function formatPhone(raw: string) {
  const d = digitsOf(raw);
  if (d.length !== 10) return raw;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function ContactForm({ variant = 'inline' }: { variant?: 'inline' | 'standalone' }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const isInvalid = (id: string) => invalid.includes(id);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const bad = REQUIRED.filter((k) => !String(data[k] ?? '').trim());
    if (!bad.includes('phone') && digitsOf(String(data.phone ?? '')).length !== 10) {
      bad.push('phone');
    }

    setInvalid(bad);
    if (bad.length) {
      setError(
        bad.length === 1 && bad[0] === 'phone' && String(data.phone ?? '').trim()
          ? 'That phone number is not ten digits. Check it and try again.'
          : 'Please fill in the highlighted fields so we can call you back.',
      );
      form.querySelector<HTMLElement>('#' + bad[0])?.focus();
      return;
    }

    // STUB: there is no submission target. Nothing is sent anywhere.
    console.warn(
      'STUB: contact form has no submission target. Nothing was transmitted. ' +
        'Wire a callback-request destination before launch.',
    );
    setError(null);
    setStatus('done');
    form.reset();
  }

  const req = (id: string) => ({
    required: true,
    'aria-invalid': isInvalid(id) ? true : undefined,
    'aria-describedby': isInvalid(id) ? id + '-hint' : undefined,
    hint: isInvalid(id) ? `${LABELS[id]} is needed.` : undefined,
  });

  const standalone = variant === 'standalone';

  if (status === 'done') {
    return (
      <Card variant="elevated" className={standalone ? 'p-9' : 'p-7'}>
        <div role="status" className="flex flex-col gap-5">
          <Heading level={3} className="text-ink">
            We will call you back
          </Heading>
          <Prose className="text-ink-muted">
            Your callback request is noted. We will ring you in the window you picked. If the door
            is open and will not close, call {nap.phone} now rather than waiting.
          </Prose>
          <Button type="button" variant="submit" onClick={() => setStatus('idle')}>
            Send another
          </Button>
        </div>
      </Card>
    );
  }

  const shortFields = (
    <>
      <TextInput label="Name" id="name" autoComplete="name" {...req('name')} />
      <TextInput
        label="Phone"
        id="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        onBlur={(e) => {
          e.currentTarget.value = formatPhone(e.currentTarget.value);
        }}
        {...req('phone')}
      />
      <Select label="Service needed" id="service" defaultValue="" {...req('service')}>
        <option value="" disabled>
          Select a service
        </option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.title}
          </option>
        ))}
      </Select>
      <Select label="Preferred callback window" id="window" defaultValue="" {...req('window')}>
        <option value="" disabled>
          Select a window
        </option>
        {callbackWindows.map((w) => (
          <option key={w} value={w}>
            {w}
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
          Request a callback
        </Heading>

        {standalone ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">{shortFields}</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">{shortFields}</div>
        )}

        <TextArea
          label="What is the door doing?"
          id="message"
          rows={standalone ? 3 : 5}
          {...req('message')}
        />

        <Button type="submit" variant="submit">
          Request a callback
        </Button>

        {error ? (
          <div role="alert">
            <Prose className="text-ink">{error}</Prose>
          </div>
        ) : null}
      </form>
    </Card>
  );
}
