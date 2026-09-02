import type { Metadata } from 'next';
import { JsonLd } from '@/components/ui';
import { Breadcrumb, Hero, SplitFeature, StepRow, FeatureRow, CtaBand, SharedTail, type Step } from '@/components/patterns';
import { breadcrumbSchema } from '@/lib/schema';
import { hours, nap, site } from '@/lib/site';

/**
 * ROUTE   /about   (one of the five in D-01)
 *
 * The pre-existing build had no /about at all. This is Prompt 1 scaffolding: it
 * exists so the route set is legal and the build is clean. Prompt 6+7 rebuilds
 * it against the reference section contract in docs/sections.md.
 *
 * Every claim here is capability or process. No years in business, no team
 * size, no credentials, no review counts, no response times (D-14, D-17).
 */
export const metadata: Metadata = {
  title: 'About',
  description: `${site.name}. ${site.tagline} ${nap.serviceArea}`,
  alternates: { canonical: '/about' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
];

const howWeWork: readonly Step[] = [
  {
    title: 'The door is tested before it is touched',
    body: 'Balance, travel, force settings and safety reversal are checked first. That is what separates a door with a worn roller from a door with a failing spring, and it decides the whole job.',
  },
  {
    title: 'You are told what is wrong',
    body: 'In plain terms, before any price is discussed and before any part comes off the van. If two things are wrong, you hear about both, including the one that can wait.',
  },
  {
    title: 'The repair is re-tested end to end',
    body: 'The door is run in front of you so you can hear it working. Anything spotted but not touched is said out loud rather than written on a slip and left on the side.',
  },
];

const facts = [
  { label: 'Hours', value: hours.label },
  { label: 'Service area', value: nap.serviceArea },
  { label: 'Phone', value: nap.phone },
] as const;

export default function Page() {
  return (
    <>
      <Breadcrumb trail={trail} />

      <Hero
        variant="page"
        eyebrow="About"
        title="Garage doors are the whole job, not a sideline"
        subtitle={site.tagline}
        bullets={[hours.label, nap.serviceArea, nap.address]}
        primaryCta={{ href: '/contact', label: 'Request a callback' }}
        secondaryCta={{ href: nap.phoneHref, label: nap.phone }}
        mediaLabel="Garage door technician on site placeholder"
      />

      <SplitFeature
        tone="band"
        eyebrow="Who you are calling"
        heading="One trade, done properly"
        body={`${site.name} works on one thing: overhead doors and the hardware that moves them. Springs, cables, rollers, tracks, openers and panels — the parts that decide whether a door lifts cleanly or gives up halfway.`}
        bullets={[
          'Residential and commercial doors',
          'Scheduled and unplanned callouts',
          'Diagnosis before quoting, every visit',
          'Parts carried for the doors this area has',
        ]}
        actions={[{ href: '/services', label: 'See the services' }]}
        media="portrait card"
        mediaLabel="Garage door service van placeholder"
        headingId="about-heading"
        id="who"
        splitAt="xl"
      />

      <StepRow
        tone="page"
        eyebrow="How we work"
        heading="What a visit actually involves"
        steps={howWeWork}
        headingId="how-heading"
        id="how"
      />

      <FeatureRow tone="surface" heading="The details" facts={facts} headingId="facts-heading" id="facts" />

      <CtaBand
        tone="band-deep"
        eyebrow="Get in touch"
        heading="Tell us what the door is doing"
        body="Describe the noise, the movement and when it started. That is usually enough to know what goes on the van."
        actions={[
          { href: '/contact', label: 'Request a callback' },
          { href: nap.phoneHref, label: nap.phone },
        ]}
        headingId="about-cta-heading"
      />

      <SharedTail />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
