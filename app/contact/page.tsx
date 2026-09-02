import type { Metadata } from 'next';
import { routeMeta } from '@/content/copy';
import { JsonLd } from '@/components/ui';
import { Breadcrumb, ContactBlock, BusinessMap, Hero, StepRow, type Step } from '@/components/patterns';
import { breadcrumbSchema } from '@/lib/schema';
import { hours, nap, site } from '@/lib/site';

/**
 * ROUTE   /contact   (one of the five in D-01)
 *
 * Composition: breadcrumb > hero(page) > contact-one > steps > map-sec > FOOTER
 *
 * DEVIATION 1 — `hero(page)` is added ahead of the form because none of the
 * mapped patterns emits an h1.
 * DEVIATION 2 — `steps` carries "what happens after you get in touch"; the
 * reference's equivalent reassurance slots are all ratings/warranty/licensing,
 * which D-13 and D-14 forbid.
 * DEVIATION 3 — <SharedTail /> is deliberately not rendered: this page IS the
 * contact block, so the tail would emit a second one. The map is composed
 * directly, at zoom 15 per D-08.
 *
 * NO SUBMISSION TARGET. The form is client-side only (D-05). There is no API
 * route, no transport, and no electronic-mail anywhere on this site (D-03).
 */
// Metadata is NOT declared here. content/copy.ts is the single source, and the
// lexical gate measures it there. See CLAUDE.md and docs/content-divergence.md.
export const metadata: Metadata = routeMeta('/contact');

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Contact', path: '/contact' },
];

/** What happens after the form is sent. Process only — no claims of any kind. */
const steps: readonly Step[] = [
  {
    title: 'You tell us what the door is doing',
    body: 'Send the form or call. The more you can say about the noise, the movement and when it started, the closer we can get to the fault before anyone is on site.',
  },
  {
    title: 'We call you back',
    body: `We are open ${hours.label} and we ring back inside the window you picked on the form. TODO(fact): typical callback time.`,
  },
  {
    title: 'A technician comes to the property',
    body: 'Balance, travel, force settings and safety reversal are tested before a part is touched, and you are told what is wrong before the work is quoted.',
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
        subtitle={`${site.tagline} Tell us what the door is doing and we will call you back — spring repair, opener repair, cable, roller and track work, panel replacement, a new door, or an annual tune-up.`}
        bullets={[hours.label, nap.serviceArea, nap.address]}
        primaryCta={{ href: '#contact', label: 'Request a callback' }}
        secondaryCta={{ href: nap.phoneHref, label: nap.phone }}
        mediaLabel="Garage door service placeholder"
      />

      <ContactBlock
        variant="standalone"
        eyebrow="Get in touch"
        title="Request a callback"
        body="A name, a number, which service you need, when it suits you to be called and a short description of the fault are all we need. If the door is open and will not close, call rather than write."
        headingId="contact-heading"
      />

      <StepRow
        eyebrow="What happens next"
        heading="From your message to a technician on site"
        steps={steps}
        headingId="next-heading"
      />

      <BusinessMap
        zoom={15}
        eyebrow="Where we are"
        title="Find us on the map"
        body={`${nap.serviceArea} Open ${hours.label}.`}
      />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
