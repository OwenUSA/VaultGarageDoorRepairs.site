import type { Metadata } from 'next';
import { Section, Placeholder, JsonLd } from '@/components/ui';
import {
  Hero,
  SplitFeature,
  CardGrid,
  ContactForm,
  SharedTail,
} from '@/components/patterns';
import { nap, hours, services } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';

/**
 * ROUTE   /commercial-garage-door-services/repair
 * MODE    CLONE
 * CLASS   service-inner
 * SOURCE  /commercial-roofing-services/commercial-roof-repair
 *         — this is the class exemplar profiled at all five breakpoints in
 *           .harness/out/profile.json, so its geometry is the reference.
 * GATED   structural divergence <= 2% per section per breakpoint,
 *         BOX_TOLERANCE <= 6px or 2% of section height
 *
 * SECTION SEQUENCE — measured, h@1440:
 *   serviceinner-one 680 · hero-new.inner-form 423 · serviceinner-two 523 ·
 *   serviceinner-three 492 (media right) · serviceinner-four 530 (media right) ·
 *   blogs-one 703 · template-ascend 852 · [SHARED TAIL] · FOOTER
 *
 * CONFIG FORBIDDEN — removed, never substituted, never a divergence:
 *   `logos` band (slot 3, h=306 @1440) — manufacturer partnerships / awards
 *   `testimonial` (slot 10, h=702 @1440) — removed inside SharedTail by lead
 *   the `wprevpro_badge` star-rating badge inside serviceinner-one — reviews
 *   the target's "50 years of combined experience" line in serviceinner-four —
 *   years-in-business claim; the paragraph slot survives, the claim does not.
 *
 * INTENTIONAL DEVIATIONS (reported, not fixed):
 *   `blogs-one` has no blog behind it — repurposed as a related-services
 *   CardGrid reading from lib/site.ts.
 *   `template-ascend`'s "Show 8 More" XHR is not reproduced; static link grid.
 *   Breadcrumb is SCHEMA only — the target service-inner sequence has no
 *   visible breadcrumb band.
 *
 * COPY_MODE = ORIGINAL — structure cloned, words are ours. Every CONFIG FACTS
 * value comes from lib/site.ts. All photography is a <Placeholder>.
 */

export const metadata: Metadata = {
  title: 'Commercial Garage Door Repair',
  description:
    'Repair for overhead, rolling steel and sectional doors on commercial sites: broken springs, snapped cables, off-track doors, damaged panels and opener faults. Same-day and emergency dispatch.',
  alternates: { canonical: '/commercial-garage-door-services/repair' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Commercial Services', path: '/commercial-garage-door-services' },
  { label: 'Commercial Repair', path: '/commercial-garage-door-services/repair' },
];

/** serviceinner-one — capability statements only. Nothing from FORBIDDEN. */
const heroBullets = [
  'Doors stuck open, stuck shut or hanging crooked',
  'Broken torsion and extension springs',
  'Snapped lift cables and doors off the track',
  'Dented and split panels on rolling and sectional doors',
  hours.emergency,
] as const;

/** serviceinner-two — the symptom list. Structure clones the target's `ul.theme`. */
const failureSigns = [
  'The door lifts on one side and binds on the other',
  'A bang from the spring shaft and the door will not lift',
  'A cable hanging loose, or a drum with slack wrapped on it',
  'Rollers riding out of the track, or a track visibly bowed',
  'The opener straining, reversing part-way, or running with nothing moving',
  'A gap at the floor once the door is fully down',
  'Seals and weatherstrip torn back by a door running out of line',
] as const;

/** blogs-one, repurposed — the services a commercial repair draws on. */
const relatedServices = services.slice(0, 3).map((s) => ({
  title: s.title,
  body: s.summary,
  href: s.href,
  media: '16:9 media' as const,
  mediaLabel: `${s.title} placeholder`,
}));

/** template-ascend — static cross-link grid, no load-more XHR. */
const crossLinks = [
  {
    title: 'Commercial Garage Door Inspection',
    body: 'A documented walk-through of every door on the site, with balance, travel and safety reversal checked on each one and every fault written up and ranked so you can decide what gets done first and what can wait.',
    href: '/commercial-garage-door-services/inspection',
    media: 'none' as const,
  },
  {
    title: 'Commercial Maintenance Program',
    body: 'A repeating visit schedule so the doors on a busy site are looked at on a rhythm and seen well before one of them stops in the middle of a shift with a vehicle already backed up to the bay.',
    href: '/commercial-garage-door-services/maintenance-program',
    media: 'none' as const,
  },
  {
    title: 'All Commercial Services',
    body: 'Rolling shutters, sectional doors and high-cycle openers kept moving on working premises, scheduled around the hours you actually need the bay clear rather than the hours that suit us.',
    href: '/commercial-garage-door-services',
    media: 'none' as const,
  },
  {
    title: 'Emergency Garage Door Repair',
    body: `A door stuck open, hanging off its track, or dropped because a spring let go. Calls are picked up round the clock and a van is sent as soon as one is free. ${hours.response}.`,
    href: '/emergency-garage-door-repair',
    media: 'none' as const,
  },
  {
    title: 'Service Areas',
    body: 'Where our vans already go day to day, and how far out beyond that we will travel when a commercial call comes in that nobody nearer is able to pick up that same day.',
    href: '/service-areas',
    media: 'none' as const,
  },
  {
    title: 'Questions Before You Call',
    body: 'The questions we get asked most often about commercial door work, answered plainly and without the jargon that usually comes attached to them, including hours and how dispatch runs.',
    href: '/faqs',
    media: 'none' as const,
  },
] as const;

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      {/* serviceinner-one — hero, dark, copy left / media right (measured x=160 / x=847) */}
      <Hero
        variant="page"
        eyebrow="Commercial"
        title="Commercial Garage Door Repair"
        subtitle="Overhead, rolling steel and sectional doors on loading bays, service yards and storefronts, put back into service. Tell us what the door is doing and we will bring what it takes to move it."
        bullets={heroBullets}
        primaryCta={{ href: '/contact', label: 'Request a repair' }}
        secondaryCta={{ href: nap.phoneHref, label: nap.phone }}
        mediaLabel="Commercial garage door repair placeholder"
        aside={
          <Placeholder
            kind="square slot"
            tone="band-deep"
            label="Commercial garage door repair placeholder"
          />
        }
        id="repair-hero"
      />

      {/* hero-new.inner-form — compact form band. Measured target: ZERO section
          padding, one full-width card, no media slot beside the form. Mirrors
          ServiceInnerTemplate exactly. h 423 @1440 */}
      <Section tone="band-deep" rhythm="none" id="request">
        <ContactForm variant="standalone" />
      </Section>

      {/* serviceinner-two — full-width copy + symptom list, dark */}
      <SplitFeature
        tone="band"
        media="none"
        eyebrow="The symptoms"
        heading="Signs a commercial door needs repair now"
        body="Most commercial doors give warning before they stop. The problem is that the warning arrives during a shift, in the middle of everything else, and gets logged as the door being awkward rather than as a fault. By the time it is raised properly the door has usually already failed, and it has failed at the worst hour of the day with a vehicle waiting behind it. A door on a working site runs many times more cycles than one on a house, so the parts that wear reach the end of their life far sooner and they tend to go without much ceremony. These are the signs worth acting on the same day rather than the next quiet week."
        bullets={failureSigns}
        headingId="repair-signs-heading"
        id="repair-signs"
      />

      {/* serviceinner-three — split, copy left / media right (measured x=160 / x=728) */}
      <SplitFeature
        tone="page"
        reverse
        eyebrow="How we work"
        heading="Diagnosed on site, not guessed at"
        body="A door that will not lift can be a spring, a cable, a drum that has unwound, an opener that has lost its travel limits, or a track that has moved under a knock. Swapping the obvious part on a door where something else pulled it out of line just breaks the new part too. So we test balance, travel, force and reversal before we fit anything, then re-test all four once the repair is in. Where a part is not on the van we say so on the visit rather than after it."
        media="16:9 media"
        mediaLabel="Torsion spring and drum assembly placeholder"
        actions={[
          { href: '/commercial-garage-door-services/inspection', label: 'Commercial inspection' },
        ]}
        headingId="repair-method-heading"
        id="repair-method"
      />

      {/* serviceinner-four — split, dark, copy left / media right (measured x=160 / x=745) */}
      <SplitFeature
        tone="band"
        reverse
        eyebrow="Why call us"
        heading="Built around a door that has to keep working"
        body="A commercial door is not a convenience, it is the way stock and vehicles move. We book around that: emergency dispatch when a door has failed with a bay behind it, and scheduled slots when it can wait for a quieter hour. Every repair ends with the door run end to end in front of you, so you hear it working before we leave."
        media="4:3 card"
        mediaLabel="Rolling steel door on a service yard placeholder"
        actions={[
          { href: '/contact', label: 'Request a repair' },
          { href: nap.phoneHref, label: nap.phone },
        ]}
        headingId="repair-why-heading"
        id="repair-why"
      />

      {/* blogs-one slot, REPURPOSED as a related-services grid — intentional deviation */}
      <CardGrid
        tone="surface"
        eyebrow="What a repair covers"
        heading="The services behind a commercial repair"
        body="A commercial call-out resolves into one of these. We do not carry work outside them."
        items={relatedServices}
        columns={3}
        stackUntil="lg"
        headingId="repair-services-heading"
        id="repair-services"
      />

      {/* template-ascend — static link grid, no load-more XHR */}
      <CardGrid
        tone="page"
        eyebrow="Featured in"
        heading="More on commercial doors"
        items={crossLinks}
        columns={2}
        headingId="repair-more-heading"
        id="repair-more"
      />

      <SharedTail />
    </>
  );
}
