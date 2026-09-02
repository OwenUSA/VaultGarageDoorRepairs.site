import type { Metadata } from 'next';
import { JsonLd } from '@/components/ui';
import {
  Breadcrumb,
  Hero,
  ServiceAreaMap,
  StepRow,
  ContactBlock,
  type Step,
} from '@/components/patterns';
import { breadcrumbSchema } from '@/lib/schema';
import { hours, nap } from '@/lib/site';

/**
 * ROUTE   /service-areas
 * MODE    SYNTHESIZE
 * CLASS   generic-content
 * SOURCE  serviceareaouter-one (Hero variant="page") + map-sec (ServiceAreaMap)
 * GATED   SYSTEM COMPLIANCE — zero raw hex/rgb/px, every type/spacing value
 *         from the extracted scales, every section from patterns/ + ui/.
 *         Violation count must be zero. Measured by .harness/compliance.mjs.
 *
 * Composition:
 *   HEADER > breadcrumb > serviceareaouter-one > map-sec > steps > contact-new > FOOTER
 *
 * SHARED TAIL — DECOMPOSED ON THIS ROUTE. <SharedTail /> is map-sec +
 * contact-new. map-sec IS the subject of this page, not its tail, so it is
 * rendered directly under the hero with route-specific copy and the tail
 * contributes only its ContactBlock half. Composing <SharedTail /> as well
 * would put the same coverage list and the same map on the page twice. Same
 * decomposition, same reason, as /contact. Intentional structural deviation.
 *
 * The previous build listed all twelve areas a second time in a CardGrid above
 * the map's own link grid; that duplicate section is removed.
 *
 * NAP: single service-area business (`nap.serviceAreaOnly`). The area list is
 * coverage, not addresses — no street address appears here, in the schema, in
 * the metadata or in any alt text. The target's `svg#mapArea` is a 37 KB trace
 * of Oklahoma county geometry and is deliberately NOT ported; ServiceAreaMap
 * holds a placeholder map face (tracked gap, docs/assets.md).
 */
export const metadata: Metadata = {
  title: 'Service Areas',
  description: `Where we work. ${hours.response}, ${hours.emergency.toLowerCase()}. We are a service-area garage door business and travel to you — call ${nap.phone} to check your area.`,
  alternates: { canonical: '/service-areas' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Service Areas', path: '/service-areas' },
];

/** PATTERN steps — what actually happens between the call and the fix. */
const visitSteps: readonly Step[] = [
  {
    title: 'Tell us the area',
    body: 'Give us the area you are in and what the door is doing. That pair is usually enough to work out what needs to come on the van.',
  },
  {
    title: 'We confirm coverage',
    body: 'If the area is on our route we book it straight away. If it sits just outside, we say so plainly rather than leaving you waiting.',
  },
  {
    title: 'A technician is dispatched',
    body: `${hours.response} means the door gets looked at the day it fails wherever the schedule allows, not the week after.`,
  },
  {
    title: 'The work happens on site',
    body: 'Springs, cables, openers, tracks and panels are all handled at your property. There is no drop-off point because there is no storefront.',
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumb trail={trail} />

      <Hero
        variant="page"
        eyebrow="Where we work"
        title="Service areas we cover"
        subtitle={`${hours.emergency}. We are a service-area business with no showroom — a technician travels to your property instead.`}
        primaryCta={{ href: '/contact', label: 'Book a visit' }}
        secondaryCta={{ href: nap.phoneHref, label: nap.phone }}
        mediaLabel="Coverage area placeholder"
      />

      <ServiceAreaMap
        eyebrow="Coverage"
        title="Areas on our route"
        body="Pick an area to see it highlighted. Coverage is by area rather than by address, and it moves with demand — if yours is not on the list, ask before assuming we cannot reach you."
      />

      <StepRow
        tone="surface"
        eyebrow="How it works"
        heading="From your call to the door working"
        steps={visitSteps}
        headingId="visit-steps-heading"
      />

      <ContactBlock
        title="Check your area"
        body={`${hours.office} for scheduling, and dispatch runs outside those hours every day. Tell us where you are and what the door is doing.`}
      />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
