import type { ReactNode } from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';
import {
  Container,
  Section,
  Heading,
  Eyebrow,
  Prose,
  Icon,
  TextLink,
  type SectionTone,
} from '@/components/ui';
import { ContactForm } from './ContactForm';
import { nap, hours } from '@/lib/site';

/**
 * PATTERN: contact-new — form-block, dark. h 677 @1440 / 5168 @390
 * PATTERN: contact-one — form-block, dark, standalone. h 1145 @1440
 *
 * Highest-risk section in the ranked table (risk 43.2): it appears on 10 of 12
 * exemplars, carries the only real form, and reflows 7.7x between 1440 and 390.
 * Built once by the lead; every route inherits it.
 *
 * CONFIG FACTS bind here and nowhere else — phone, hours and the service-area
 * statement all come from lib/site.ts. No street address is rendered, ever.
 */
export function ContactBlock({
  tone = 'band',
  variant = 'inline',
  eyebrow = 'Get in touch',
  title,
  body,
  id = 'contact',
  headingId = 'contact-heading',
}: {
  tone?: SectionTone;
  variant?: 'inline' | 'standalone';
  eyebrow?: string;
  title?: ReactNode;
  body?: ReactNode;
  id?: string;
  headingId?: string;
}) {
  return (
    <Section tone={tone} id={id} aria-labelledby={headingId}>
      <Container>
        {/* Measured: contact-new is 1645 @1024 and 677 @1440 on every profiled
            exemplar — it stacks through 1024, not through 768. */}
        <div className="grid gap-11 xl:grid-cols-2">
          <div className="flex flex-col gap-7">
            <Eyebrow className="text-cta">{eyebrow}</Eyebrow>
            <Heading level={2} id={headingId}>
              {title ?? 'Book a garage door visit'}
            </Heading>
            <Prose className="text-on-band-muted">
              {body ?? `Open ${hours.label}. Tell us what the door is doing and we will call you back.`}
            </Prose>

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-5">
                <Icon icon={Phone} className="mt-1 shrink-0 text-cta" />
                <span className="font-display text-2xl font-bold leading-display">
                  <TextLink href={nap.phoneHref} variant="footer" className="text-2xl">
                    {nap.phone}
                  </TextLink>
                </span>
              </li>
              <li className="flex items-start gap-5">
                <Icon icon={Clock} className="mt-1 shrink-0 text-cta" />
                <Prose className="text-on-band-muted">
                  {hours.label}
                </Prose>
              </li>
              <li className="flex items-start gap-5">
                <Icon icon={MapPin} className="mt-1 shrink-0 text-cta" />
                <Prose className="text-on-band-muted">
                  {nap.address}
                  <br />
                  {nap.serviceArea}
                </Prose>
              </li>
            </ul>
          </div>

          <ContactForm variant={variant} />
        </div>
      </Container>
    </Section>
  );
}
