import type { Metadata } from 'next';
import { JsonLd } from '@/components/ui';
import { Breadcrumb, ContactBlock, ServiceAreaMap, Hero, StepRow, type Step } from '@/components/patterns';
import { breadcrumbSchema } from '@/lib/schema';
import { hours, nap, services } from '@/lib/site';

/**
 * ROUTE   /contact
 * MODE    SYNTHESIZE
 * CLASS   form-page
 * SOURCE  breadcrumb + contact-one + map-sec  (docs/05-route-map.md)
 * GATED   SYSTEM COMPLIANCE — zero raw hex/rgb/px in component code, every
 *         type/spacing value from the extracted scales, every section from
 *         patterns/ + ui/. Violation count must be zero. Measured by
 *         .harness/compliance.mjs — there is NO divergence number for this
 *         route because there is no target analog to diff against.
 *
 * Composition actually rendered:
 *   HEADER > breadcrumb > hero(page) > contact-one > steps > map-sec > FOOTER
 *
 * INTENTIONAL STRUCTURAL DEVIATION 1 — `hero(page)` is added ahead of
 * `contact-one`. The mapped composition has no pattern that emits an h1:
 * `Breadcrumb` is a nav band, `ContactBlock` heads at level 2 and
 * `ServiceAreaMap` heads at level 2, so the mapped trio renders ZERO h1. The
 * page-title hero (`serviceareaouter-one` variant, already used the same way on
 * /service-areas) supplies the single h1 and nothing else does.
 *
 * INTENTIONAL STRUCTURAL DEVIATION 2 — `steps` is added between the form and
 * the map to carry "what happens after you get in touch". It replaces nothing;
 * the target's equivalent reassurance slots are all CONFIG FORBIDDEN (ratings,
 * warranties, licensing, years in business), so the slot is repurposed to
 * process description, which is factual and permitted.
 *
 * INTENTIONAL STRUCTURAL DEVIATION 3 — <SharedTail /> is deliberately NOT
 * rendered. The shared tail is `map-sec > contact-new`; this page IS the
 * contact block, so rendering the tail would emit a second ContactBlock and a
 * second copy of the phone/hours facts. map-sec is composed directly instead.
 *
 * Mail: the form posts to /api/contact, the only place SMTP is touched.
 * Credentials come from SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS /
 * CONTACT_TO_EMAIL server-side (see .env.example) — never hardcoded, never
 * client-side, never logged.
 *
 * NAP: single service-area business (`nap.serviceAreaOnly`). No street address
 * is rendered here, in metadata, or in schema. Locality/region stay placeholder.
 */
export const metadata: Metadata = {
  title: 'Contact',
  description: `Book a garage door visit. ${hours.emergency}. ${hours.office}. Call ${nap.phone} or send the form and we will get a technician out to you.`,
  alternates: { canonical: '/contact' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Contact', path: '/contact' },
];

/** What happens after the form is sent. Process only — no claims of any kind. */
const steps: readonly Step[] = [
  {
    title: 'You tell us what the door is doing',
    body: 'Send the form or call. The more you can say about the noise, the movement and when it started, the faster we can work out what is wrong.',
  },
  {
    title: 'We come back to you',
    body: `${hours.office}, we answer during the day. Outside those hours, ${hours.emergency.toLowerCase()}, so a stuck or unsecured door still reaches someone.`,
  },
  {
    title: 'A technician comes to the property',
    body: `${hours.response} means we book the earliest slot that works for you. We arrive with the parts a ${services[0].short.toLowerCase()} or opener call usually needs.`,
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumb trail={trail} />

      <Hero
        variant="page"
        eyebrow="Contact"
        title="Talk to a garage door technician"
        subtitle={`${hours.response}. Tell us what the door is doing and we will get someone out to it — spring repair, opener repair, off-track and cable work, panel replacement, a new door, or a routine tune-up.`}
        bullets={[hours.emergency, hours.office, hours.response]}
        primaryCta={{ href: '#contact', label: 'Send the form' }}
        secondaryCta={{ href: nap.phoneHref, label: nap.phone }}
        mediaLabel="Garage door service placeholder"
      />

      <ContactBlock
        variant="standalone"
        eyebrow="Get in touch"
        title="Book a garage door visit"
        body={`Every field on the form is optional detail except the ones marked required — a name, a number, an email and a short description of the fault are enough to get you on the schedule. If the door is open and will not close, call instead of writing; ${hours.emergency.toLowerCase()}.`}
        headingId="contact-heading"
      />

      <StepRow
        eyebrow="What happens next"
        heading="From your message to a technician on site"
        steps={steps}
        headingId="next-heading"
      />

      <ServiceAreaMap
        title="Areas we come out to"
        body="We work by area rather than from a storefront, so there is no address to visit and nothing to drop off. Pick an area to see it highlighted. If yours is not on the list, ask — coverage moves with demand."
      />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
