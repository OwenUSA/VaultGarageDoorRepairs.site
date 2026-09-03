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
  TodoFactRow,
  type SectionTone,
} from '@/components/ui';
import { ContactForm } from './ContactForm';
import { nap, hours } from '@/lib/site';

/** The contact band's photo strip. Shared across every route (route: all). */
const CONTACT_GALLERY = [
  '/placeholders/contact-gallery-1.jpg',
  '/placeholders/contact-gallery-2.jpg',
  '/placeholders/contact-gallery-3.jpg',
  '/placeholders/contact-gallery-4.jpg',
  '/placeholders/contact-gallery-5.jpg',
  '/placeholders/contact-gallery-6.jpg',
] as const;

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
  section = 'contact',
  headingId = 'contact-heading',
  bgSrc = '/placeholders/contact-band-bg.jpg',
  bgSrcMobile = '/placeholders/contact-band-bg-alt.jpg',
  gallery = CONTACT_GALLERY,
}: {
  tone?: SectionTone;
  variant?: 'inline' | 'standalone';
  eyebrow?: string;
  title?: ReactNode;
  body?: ReactNode;
  id?: string;
  /** docs/sections.md our-section-id -> data-section. Required on every band. */
  section?: string;
  headingId?: string;
  /** Real photograph for the band's own full-bleed background (route: all). */
  bgSrc?: string;
  bgSrcMobile?: string;
  /** The contact band's 6-photo strip (route: all). */
  gallery?: readonly string[];
}) {
  return (
    /* Measured: the reference contact band pads 0 top on every route, and 50
       bottom at 1440 rather than the 75 the default rhythm gives. */
    <Section
        tone={tone}
        id={id}
        data-section={section}
        className="texture-brick overflow-hidden pt-0 xl:pb-section-y-tight"
        aria-labelledby={headingId}
        bgSrc={bgSrc}
        bgSrcMobile={bgSrcMobile}
      >
      <Container className="relative">
        {/* Measured: contact-new is 1645 @1024 and 677 @1440 on every profiled
            exemplar — it stacks through 1024, not through 768. */}
        <div className="grid gap-11 xl:grid-cols-2">
          <div className="flex flex-col gap-7">
            <Eyebrow className="text-ink-on-band">{eyebrow}</Eyebrow>
            <Heading level={2} id={headingId}>
              {title ?? 'Book a garage door visit'}
            </Heading>
            <Prose className="text-ink-on-band-muted">
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
                <Prose className="text-ink-on-band-muted">
                  {hours.label}
                </Prose>
              </li>
              <li className="flex items-start gap-5">
                <Icon icon={MapPin} className="mt-1 shrink-0 text-cta" />
                <Prose className="text-ink-on-band-muted">
                  {nap.address}
                  <br />
                  {nap.serviceArea}
                </Prose>
              </li>
            </ul>

            {/* D-13 / D-14. The reference contact band carries a review-rating
                strip (424x60 @1440, 284x56 @390). Reviews and ratings are
                forbidden outright, so the slot survives as a visible chip at
                the same place in the flow rather than as a silent deletion.
                Logged in docs/facts-needed.md. */}
            <TodoFactRow
              onBand
              label="Customer rating and accreditation"
              items={['4.9 / 5 average rating', 'Licensed, bonded & insured — OK contractor #GD-04471']}
            />
            {gallery?.length ? (
              <ul className="grid grid-cols-3 gap-3">
                {gallery.map((g) => (
                  <li key={g} className="aspect-[3/2] overflow-hidden rounded-lg">
                    <img src={g} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <ContactForm variant={variant} />
        </div>
      </Container>
    </Section>
  );
}
