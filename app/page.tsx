import type { Metadata } from 'next';
import { routeMeta } from '@/content/copy';
import {
  Hero,
  SplitFeature,
  StepRow,
  TabbedGrid,
  Marquee,
  CardCarousel,
  CardGrid,
  FeatureRow,
  ContactForm,
  SharedTail,
} from '@/components/patterns';
import { Placeholder } from '@/components/ui';
import { nap, hours, services, site } from '@/lib/site';

/**
 * ROUTE   /
 * MODE    CLONE
 * CLASS   home
 * SOURCE  https://africkerroofing.com/
 * GATED   structural divergence <= 2% per section per breakpoint,
 *         BOX_TOLERANCE <= 6px or 2% of section height
 *
 * SECTION SEQUENCE — measured from the target, in order (h@1440):
 *   hero-new 1168 · about-us-new 863 · steps 597 · roofing-service 539 ·
 *   marquee 90 · slatedroof-new 708 · roofing-materials 557 ·
 *   waterproofing 646 · services 790 · feature 322 · emergency 491 ·
 *   giving 712 · [SHARED TAIL] · message-owner 658
 *
 * CONFIG FORBIDDEN — removed, never substituted, never a divergence:
 *   `logos` + `brand-logo` (manufacturer partnerships / awards)
 *   `testimonial` (reviews — removed inside SharedTail by the lead)
 *   the `.count` counters inside `feature` (job counts / years in business)
 *   the owner portrait and signature inside `message-owner` (named real
 *   people, staff photos) — the layout survives with company voice, the
 *   person does not.
 *
 * COPY_MODE = ORIGINAL — every headline and every line of body copy here is
 * written for this business. Structure is cloned; words are not.
 * Every CONFIG FACTS value comes from lib/site.ts.
 * All photography is a <Placeholder> inside the patterns — a tracked gap.
 */
// Metadata is NOT declared here. content/copy.ts is the single source, and the
// lexical gate measures it there. See CLAUDE.md and docs/content-divergence.md.
export const metadata: Metadata = routeMeta('/');

/* --------------------------------------------------------------- content */

/** hero-new — bullet rail. Capability statements only; nothing from FORBIDDEN. */
const heroBullets = [
  'Doors that will not open, close or hold',
  'Springs, cables, rollers and tracks',
  'Openers, drives, sensors and remotes',
  'Single panels swapped without a full door',
  'Diagnosed on site before anything is quoted',
] as const;

/** steps — the four-step process band. */
const processSteps = [
  {
    title: 'Tell us what the door is doing',
    body: 'Call or send the form. We ask what the door sounds like, where it sticks, whether it moves at all by hand and whether it is safe to leave as it is overnight. Two minutes on the phone usually tells us which parts to put on the van, and whether this is a call-out today or a booking for the week.',
  },
  {
    title: 'We book the earliest slot',
    body: `We are open ${hours.label}, and we book you into a window rather than a whole day sat waiting in. You are told on the call which parts are going on the van and what the visit is likely to involve, so nothing about the appointment is a surprise. TODO(fact): typical lead time from call to visit.`,
  },
  {
    title: 'On-site diagnosis',
    body: 'A technician tests balance, travel, force settings and safety reversal before touching a single part. That is what separates a door with a worn roller from a door with a failing spring, and it decides the whole job. You get told which it is before any work starts.',
  },
  {
    title: 'Repair and hand back',
    body: 'We fit, balance and re-test the door, then run it end to end with you so you can hear it working. Anything we spotted but did not touch gets said out loud before we leave, not written on a slip and left on the side for you to find later.',
  },
] as const;

/** roofing-service — measured 2 tabs. Ours: Residential / Commercial. */
const residentialItems = [
  {
    title: 'Spring Repair',
    body: 'Torsion and extension springs replaced and re-tensioned so the door carries its own weight again.',
    href: '/services#spring-repair',
    media: 'none' as const,
  },
  {
    title: 'Opener Repair & Installation',
    body: 'Drives, logic boards, safety sensors and remotes diagnosed, repaired or replaced.',
    href: '/services#opener-repair',
    media: 'none' as const,
  },
  {
    title: 'Off-Track & Cable Repair',
    body: 'Doors that have jumped the track or snapped a lift cable, realigned, re-cabled and re-tested.',
    href: '/services#off-track-cable-repair',
    media: 'none' as const,
  },
  {
    title: 'Maintenance & Tune-Up',
    body: 'Inspection, lubrication, balance and hardware tightening on a schedule that suits the door.',
    href: '/services#maintenance-tune-up',
    media: 'none' as const,
  },
] as const;

const commercialItems = [
  {
    title: 'Commercial Repair',
    body: 'Roll-up and sectional doors on loading bays and service yards, back in motion the same visit where parts allow.',
    href: '/services#commercial-roll-up',
    media: 'none' as const,
  },
  {
    title: 'Commercial Inspection',
    body: 'Travel, force, balance and safety reversal checked door by door and written up for your records.',
    href: '/services#commercial-roll-up',
    media: 'none' as const,
  },
  {
    title: 'Maintenance Program',
    body: 'Planned visits across a whole site so doors are serviced before they strand a vehicle.',
    href: '/services#commercial-roll-up',
    media: 'none' as const,
  },
  {
    title: 'New Door Installation',
    body: 'Measured, fitted, balanced and tested on site, sized to the opening you actually have.',
    href: '/services#new-door-installation',
    media: 'none' as const,
  },
] as const;

/** marquee — infinite ticker. Capability phrases, no claims. */
const marqueeItems = [
  'Garage Door Repair',
  'Springs & Cables',
  'Openers & Remotes',
  'Panels & Tracks',
] as const;

/** slatedroof-new — the door-style carousel. Categories, never brands. */
const doorStyles = [
  {
    title: 'Sectional Doors',
    body: 'The panelled door most homes run. Sections, hinges, rollers and tracks all serviced as one system.',
    media: '16:9 media' as const,
    mediaLabel: 'Sectional garage door placeholder',
  },
  {
    title: 'Roll-Up Doors',
    body: 'Curtain doors that coil into a barrel overhead. Common on service yards and tight garages.',
    media: '16:9 media' as const,
    mediaLabel: 'Roll-up garage door placeholder',
  },
  {
    title: 'Insulated Doors',
    body: 'Layered panels for garages that share a wall with living space or double as a workshop.',
    media: '16:9 media' as const,
    mediaLabel: 'Insulated garage door placeholder',
  },
  {
    title: 'Carriage-Style Doors',
    body: 'Side-hinged looks on an overhead mechanism, so the appearance changes and the operation does not.',
    media: '16:9 media' as const,
    mediaLabel: 'Carriage-style garage door placeholder',
  },
  {
    title: 'Glazed & Full-View Doors',
    body: 'Framed panels with glazing where the garage doubles as a room and needs daylight.',
    media: '16:9 media' as const,
    mediaLabel: 'Full-view garage door placeholder',
  },
] as const;

/** roofing-materials — the second carousel. Ours: the parts we actually touch. */
const componentItems = [
  {
    title: 'Torsion Springs',
    body: 'The shaft-mounted spring that carries the door. Replaced in matched pairs and re-wound to the door weight.',
    media: 'none' as const,
  },
  {
    title: 'Lift Cables',
    body: 'Frayed or snapped cables re-run and tensioned so both sides lift together.',
    media: 'none' as const,
  },
  {
    title: 'Rollers & Hinges',
    body: 'Worn rollers and cracked hinges are what turn a quiet door into a loud one.',
    media: 'none' as const,
  },
  {
    title: 'Tracks & Brackets',
    body: 'Bent track and loose brackets straightened, re-seated or replaced before the door binds again.',
    media: 'none' as const,
  },
  {
    title: 'Openers & Drives',
    body: 'Chain, belt and screw drives serviced, with force and travel reset after any repair.',
    media: 'none' as const,
  },
  {
    title: 'Safety Sensors',
    body: 'Photo-eyes realigned and re-wired so the door reverses when something is in the way.',
    media: 'none' as const,
  },
] as const;

/** waterproofing — dark band, single column, list + CTA. */
const emergencyChecklist = [
  'Door stuck open and the garage will not secure',
  'Snapped spring or cable, door dropped on the track',
  'Opener dead with a vehicle shut inside',
] as const;

/** services — the six CONFIG FACTS services, straight from lib/site.ts. */
const serviceItems = services.map((s) => ({
  title: s.title,
  body: s.summary,
  href: s.href,
  media: 'none' as const,
}));

/**
 * feature — the target animates `.count` from 0 to a data-value here. Those are
 * job counts and years-in-business figures, both CONFIG FORBIDDEN, so the
 * numbers AND the scroll handler are deleted. The row survives with qualitative
 * facts drawn from CONFIG FACTS. Intentional structural deviation.
 */
const facts = [
  { label: 'Hours', value: hours.label },
  { label: 'Service area', value: nap.serviceArea },
  { label: 'Phone', value: nap.phone },
] as const;

/** emergency — dark band, phone-led. */
const emergencyBullets = [
  'The door is made safe before anything else is discussed',
  'You are told what is wrong before a price is discussed',
  'Openers isolated so the door can be worked by hand',
  'Anything spotted but not touched is said out loud',
  'Parts we do not carry ordered from the drive, not the office',
] as const;

/* ------------------------------------------------------------------ page */

export default function Page() {
  return (
    <>
      {/* hero-new — 1168 @1440. The target hero pairs a slide rail with a
          quote form (measured: one <form>, h2 "Hero Form"), so the aside is the
          form. The tail carries the second one, exactly as the target does. */}
      <Hero
        variant="full"
        eyebrow="Garage door repair and installation"
        title="The fault is found before the work is quoted"
        subtitle={`${site.tagline} Open ${hours.label}. ${nap.serviceArea}`}
        bullets={heroBullets}
        primaryCta={{ href: '/contact', label: 'Book a visit' }}
        secondaryCta={{ href: nap.phoneHref, label: `Call ${nap.phone}` }}
        id="hero"
        splitAt="xl"
        display
        mediaLabel="Garage door technician on site placeholder"
        aside={
          <div className="flex flex-col gap-7">
            <Placeholder kind="16:9 media" tone="band-deep" label="Garage door repair in progress placeholder" />
            <ContactForm />
          </div>
        }
      />

      {/* about-us-new — 863 @1440. Dark split, image slot + copy + fact rail. */}
      <SplitFeature
        tone="band"
        eyebrow="Who you are calling"
        heading="Garage doors are the whole job, not a sideline"
        body={`${site.name} works on one thing: overhead doors and the hardware that moves them. Springs, cables, rollers, tracks, openers and panels — the parts that decide whether a door lifts cleanly or gives up halfway.`}
        bullets={[
          'Single service-area business',
          'We come to you, no showroom',
          'Residential and commercial doors',
          'Scheduled and unplanned callouts',
        ]}
        actions={[{ href: '/services', label: 'See the services' }]}
        media="portrait card"
        mediaLabel="Garage door service van placeholder"
        headingId="about-heading"
        id="about"
        splitAt="xl"
      />

      {/* steps — 597 @1440. Four-step process row. */}
      <StepRow
        tone="page"
        eyebrow="How a call goes"
        heading="From the first call to a door that runs"
        steps={processSteps}
        headingId="process-heading"
        id="process"
      />

      {/* roofing-service — 539 @1440. Measured: exactly 2 tabs. */}
      <TabbedGrid
        tone="band"
        eyebrow="What we work on"
        heading="Residential and commercial door work"
        groups={[
          { label: 'Residential', items: residentialItems },
          { label: 'Commercial', items: commercialItems },
        ]}
        columns={4}
        headingId="tabbed-heading"
        id="tabbed"
      />

      {/* marquee — 90 @1440. CSS marquee replaces the slick ticker. */}
      <div id="marquee">
        <Marquee items={marqueeItems} />
      </div>

      {/* slatedroof-new — 708 @1440. Door-style carousel. */}
      <CardCarousel
        tone="page"
        eyebrow="Door types"
        heading="The doors we service and install"
        body="Every overhead door lifts on the same principles, but the hardware differs. Knowing which one is on the opening tells us what to bring."
        items={doorStyles}
        perView={{ base: 1, md: 2, lg: 4 }}
        headingId="doors-heading"
        id="doors"
      />

      {/* roofing-materials — 557 @1440. Component carousel. */}
      <CardCarousel
        tone="surface"
        eyebrow="Parts and hardware"
        heading="The components that fail first"
        body="These are the parts a door actually fails on, and the ones we carry on the van. Most repairs come down to one of these six going out of tolerance, and the rest come down to two of them at once."
        items={componentItems}
        perView={{ base: 1, md: 2, lg: 4 }}
        headingId="components-heading"
        id="components"
      />

      {/* waterproofing — 646 @1440. Dark band, list + CTA, no media slot. */}
      <SplitFeature
        tone="band-deep"
        media="square slot"
        mediaLabel="Garage door stuck off its track placeholder"
        eyebrow="When it cannot wait"
        heading="A door that will not close is a security problem"
        body="If the garage is open to the street, the door is off its track or a spring has gone, say so when you ring. It changes what goes on the van and what gets looked at first."
        bullets={emergencyChecklist}
        actions={[
          { href: '/contact', label: 'Book a visit' },
          { href: nap.phoneHref, label: `Call ${nap.phone}` },
        ]}
        headingId="urgent-heading"
        id="urgent"
      />

      {/* services — 790 @1440. Dark grid-of-N. Six CONFIG FACTS services. */}
      <CardGrid
        tone="band"
        eyebrow="Services"
        heading="Everything we are called out for"
        body="Eight things account for nearly every call. Each one is set out on the services page with what the fault looks like and what a visit involves."
        items={serviceItems}
        columns={3}
        headingId="services-heading"
        id="services"
      />

      {/* feature — 322 @1440. Counters REMOVED (FORBIDDEN); facts are
          qualitative and come from CONFIG FACTS. */}
      <FeatureRow tone="surface" heading="How we run" facts={facts} headingId="facts-heading" id="facts" />

      {/* emergency — 491 @1440. Dark band, phone-led CTA. */}
      <SplitFeature
        tone="band-deep"
        media="none"
        eyebrow="Doors that cannot be left"
        heading="A stuck door is worth a phone call"
        body={`We are open ${hours.label}. If the door has trapped a vehicle or left the garage open to the street, tell us that on the call — it decides what we bring and what we look at first. TODO(fact): out-of-hours cover, if any.`}
        bullets={emergencyBullets}
        actions={[
          { href: nap.phoneHref, label: `Call ${nap.phone}` },
          { href: '/contact', label: 'Send the details' },
        ]}
        headingId="emergency-heading"
        id="emergency"
      />

      {/* giving — 712 @1440. Dark split, reversed. */}
      <SplitFeature
        tone="band"
        reverse
        eyebrow="In the neighbourhood"
        heading="Work that stays in the area we cover"
        body={`${nap.serviceArea} The doors we work on are on the streets we drive every day, which is why the van is stocked for the doors this area actually has rather than for a catalogue.`}
        actions={[{ href: '/contact', label: 'Get in touch' }]}
        media="square slot"
        mediaLabel="Neighbourhood garage doors placeholder"
        headingId="community-heading"
        id="community"
      />

      {/* SHARED TAIL — map-sec > [message-owner] > contact-new. `testimonial`
          removed by the lead site-wide (reviews are CONFIG FORBIDDEN).
          Composed, never re-implemented. The target sequence puts
          message-owner between the map and the contact block, so it goes in
          the tail's `middle` slot rather than after the tail.

          message-owner — 658 @1440. The target runs an owner portrait and a
          signed personal message. Staff photos and named real people are
          CONFIG FORBIDDEN, so the layout survives in company voice with no
          portrait and no signature. Intentional structural deviation. */}
      <SharedTail
        middle={
          <SplitFeature
            tone="page"
            media="square slot"
            mediaLabel="Garage door hardware close-up placeholder"
            eyebrow="Why we work this way"
            heading="A door either runs safely or it does not"
            body="Overhead doors are the heaviest moving thing on most properties, and they are under tension whether or not anyone is looking at them. That is why every visit ends with balance, travel and safety reversal re-tested rather than just the broken part swapped. It is also why we would rather tell you a door needs a second visit than hand back something that only looks fixed."
            actions={[{ href: '/services#faq', label: 'Read the FAQs' }]}
            headingId="approach-heading"
            id="approach"
            splitAt="xl"
          />
        }
      />
    </>
  );
}
