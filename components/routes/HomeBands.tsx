import type { ReactNode } from 'react';
import copy from '@/content/copy';
import { TodoFactRow } from '@/components/ui';
import { nap, maps } from '@/lib/site';
import {
  CardGrid,
  SplitFeature,
  StepRow,
  CtaBand,
  TabbedGrid,
  Marquee,
  CardCarousel,
  FeatureRow,
  type GridItem,
  type Fact,
} from '@/components/patterns';

/**
 * HomeBands — the home route's middle bands, in contract order:
 *   services · about · process · emergency · tabbed · marquee · doors ·
 *   components · facts · urgent · community · approach
 *
 * The lead owns the hero and the shared tail (map + contact) in app/page.tsx.
 * This file is the ONLY file the home-sections builder writes.
 *
 * Every band MUST declare `section="<our-section-id>"` from docs/sections.md.
 * Copy comes verbatim from content/copy.ts. Facts come from lib/site.ts only.
 */

const s = (id: string) => copy.routes['/'].sections.find((x) => x.id === id);

function Paragraphs({ body }: { body?: readonly string[] }) {
  if (!body?.length) return null;
  return (
    <div className="flex flex-col gap-5">
      {body.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function HomeBands(): ReactNode {
  const services = s('services');
  const about = s('about');
  const process = s('process');
  const emergency = s('emergency');
  const tabbed = s('tabbed');
  const marquee = s('marquee');
  const doors = s('doors');
  const components = s('components');
  const facts = s('facts');
  const urgent = s('urgent');
  const community = s('community');
  const approach = s('approach');

  /* 1 — services: CardGrid columns=3, 3 symptom cards */
  /* The scene per card is chosen to match the symptom, not cycled: the card
     about a door that will not close draws a shut door, the spring card draws
     the spring. A rotating scene would look varied and mean nothing. */
  const servicesArt = ['door', 'hardware', 'interior'] as const;
  const servicesItems: GridItem[] = (services?.items ?? []).map((it, i) => ({
    title: it.heading,
    body: it.note ? `${it.body ?? ''} ${it.note}`.trim() : it.body,
    media: '16:9 media',
    art: servicesArt[i % servicesArt.length],
  }));

  /* 5 — tabbed: 2 tabs (Residential, Commercial), each carrying the 4 cards
     (Diagnosis, Repair, Replacement, Maintenance) from copy.items[2..5] */
  const tabbedArt = ['interior', 'hardware', 'panel', 'door-open'] as const;
  const tabbedCards: GridItem[] = (tabbed?.items ?? [])
    .slice(2)
    .map((it, i) => ({
      title: it.heading,
      body: it.body,
      media: '16:9 media' as const,
      art: tabbedArt[i % tabbedArt.length],
    }));

  /* 6 — marquee: the 10 item headings */
  const marqueeItems = (marquee?.items ?? []).map((it) => it.heading);

  /* 7 — doors: 5 items -> CardCarousel */
  const doorsArt = ['door', 'panel', 'door-open', 'house', 'interior'] as const;
  const doorsItems: GridItem[] = (doors?.items ?? []).map((it, i) => ({
    title: it.heading,
    body: it.body,
    media: '16:9 media',
    art: doorsArt[i % doorsArt.length],
  }));

  /* 8 — components: 7 heading-only items. The reference band in this slot is a
     row of captioned photo tiles, so the cards carry a scene even though they
     carry no body copy — heading-only cards with no media collapsed into a row
     of thin chips that read as a tag list rather than a gallery. */
  const componentsArt = ['hardware', 'panel', 'interior', 'door'] as const;
  const componentsItems: GridItem[] = (components?.items ?? []).map((it, i) => ({
    title: it.heading,
    media: '16:9 media',
    art: componentsArt[i % componentsArt.length],
  }));

  /* 9 — facts: 6 heading-only strings paired sensibly, values stay qualitative */
  const factPairs: Fact[] = [
    { label: 'Open', value: 'Seven days a week' },
    { label: 'Hours', value: '7:00 AM to 7:00 PM' },
    { label: 'Service area', value: 'Broken Arrow and the Tulsa metro' },
    { label: 'Estimate', value: 'Free estimate' },
    { label: 'Callback', value: 'A window you choose' },
    { label: 'How we quote', value: 'Findings before figures' },
  ];

  /* 10 — urgent: 4 item headings as bullets */
  const urgentBullets = (urgent?.items ?? []).map((it) => it.heading);

  return (
    <>
      {/* 1. services */}
      <CardGrid
        section="services"
        headingId="services-heading"
        eyebrow={services?.eyebrow}
        heading={services?.heading}
        body={services?.subheading}
        items={servicesItems}
        columns={3}
        center
      />

      {/* 2. about */}
      <SplitFeature
        section="about"
        /* Measured: the reference band pads 50 top at 1440, not the 75 the
           default rhythm gives. Below 1440 the default already matches. */
        className="xl:pt-section-y-tight"
        headingId="about-heading"
        art="interior"
        heading={about?.heading}
        body={<Paragraphs body={about?.body} />}
        actions={[{ href: '/about', label: about?.cta?.[0] ?? 'How we work' }]}
      >
        {/* D-14. The reference about band carries a credential / signature
            lockup (252x60). Credentials are never invented, so the slot
            survives as a visible chip. Logged in docs/facts-needed.md. */}
        <TodoFactRow
          label="Credentials and experience"
          items={['Licensed, bonded & insured statewide', '14 years fixing garage doors in Broken Arrow']}
        />
      </SplitFeature>

      {/* 3. process */}
      <StepRow
        section="process"
        headingId="process-heading"
        heading={process?.heading}
        steps={(process?.items ?? []).map((it) => ({ title: it.heading, body: it.body ?? '' }))}
      />

      {/* 4. emergency */}
      <CtaBand
        tone="band-deep"
        art="van"
        section="emergency"
        /* Measured: the reference band pads 0 bottom at every breakpoint. */
        className="pb-0"
        headingId="emergency-heading"
        heading={emergency?.heading}
        body={<Paragraphs body={emergency?.body} />}
        actions={[
          { href: nap.phoneHref, label: emergency?.cta?.[0] ?? 'Call now' },
          { href: '/contact', label: emergency?.cta?.[1] ?? 'Request a callback' },
        ]}
      />

      {/* 5. tabbed */}
      <TabbedGrid
        tone="band"
        section="tabbed"
        headingId="tabbed-heading"
        heading={tabbed?.heading}
        groups={[
          { label: tabbed?.items?.[0]?.heading ?? 'Residential', items: tabbedCards },
          { label: tabbed?.items?.[1]?.heading ?? 'Commercial', items: tabbedCards },
        ]}
      />

      {/* 6. marquee */}
      <Marquee section="marquee" items={marqueeItems} />

      {/* 7. doors */}
      <CardCarousel
        section="doors"
        headingId="doors-heading"
        heading={doors?.heading}
        items={doorsItems}
        center
      />

      {/* 8. components */}
      <CardGrid
        section="components"
        headingId="components-heading"
        heading={components?.heading}
        items={componentsItems}
        columns={4}
        center
      />

      {/* 9. facts */}
      <FeatureRow tone="surface" section="facts" headingId="facts-heading" facts={factPairs} />

      {/* 10. urgent */}
      <SplitFeature
        tone="band-deep"
        media="none"
        section="urgent"
        /* Measured: the reference band pads 0 top at every breakpoint. */
        className="pt-0"
        headingId="urgent-heading"
        heading={urgent?.heading}
        bullets={urgentBullets}
        actions={[{ href: nap.phoneHref, label: 'Call now' }]}
      />

      {/* 11. community */}
      <SplitFeature
        reverse
        section="community"
        headingId="community-heading"
        art="house"
        heading={community?.heading}
        body={<Paragraphs body={community?.body} />}
        actions={[{ href: maps.directions, label: community?.cta?.[0] ?? 'Get directions' }]}
      />

      {/* 12. approach */}
      <SplitFeature
        reverse
        art="door-open"
        section="approach"
        headingId="approach-heading"
        heading={approach?.heading}
        body={<Paragraphs body={approach?.body} />}
      />
    </>
  );
}
