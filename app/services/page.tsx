import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import copy, { routeMeta } from '@/content/copy';
import { nap, faqs } from '@/lib/site';
import { Hero, CardGrid, SplitFeature, FaqBlock, CtaBand, SharedTail, type GridItem } from '@/components/patterns';

/**
 * ROUTE /services
 *
 * Contract order (docs/sections.md):
 *   header · hero · services · [eight service detail bands] · faq ·
 *   services-cta · map · contact · footer
 *
 * D-01: no per-service routes. Every service below is an in-page anchor on
 * this one route, and every action links only to `tel:` or `/contact`.
 */
export const metadata: Metadata = routeMeta('/services');

const s = (id: string) => copy.routes['/services'].sections.find((x) => x.id === id);

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

/** order id -> leading service anchor named in that card's `note` (first slug mentioned) */
const leadAnchor: Record<string, string> = {
  'It will not close': 'off-track-correction',
  'It came down hard and now it will not lift': 'spring-repair',
  'The opener runs but the door does not': 'opener-repair',
  'Something hit it': 'panel-replacement',
  'It is loud, it is slow, or the bay door has stopped': 'maintenance-tune-up',
};

const detailOrder = [
  'spring-repair',
  'opener-repair',
  'cable-roller-track',
  'panel-replacement',
  'off-track-correction',
  'new-door-installation',
  'commercial-roll-up',
  'maintenance-tune-up',
] as const;

export default function ServicesPage(): ReactNode {
  const hero = s('hero');
  const services = s('services');
  const map = s('map');
  const servicesCta = s('services-cta');

  const servicesItems: GridItem[] = (services?.items ?? []).map((it) => ({
    title: it.heading,
    body: it.note ? `${it.body ?? ''} ${it.note}`.trim() : it.body,
    href: `#${leadAnchor[it.heading]}`,
  }));

  return (
    <>
      <Hero
        variant="page"
        section="hero"
        eyebrow={hero?.eyebrow}
        title={hero?.heading ?? ''}
        body={hero?.body}
        primaryCta={{ href: nap.phoneHref, label: hero?.cta?.[0] ?? 'Call now' }}
        secondaryCta={{ href: '/contact', label: hero?.cta?.[1] ?? 'Request a callback' }}
        mediaLabel="Garage door service placeholder"
      />

      <CardGrid
        section="services"
        headingId="services-heading"
        heading={services?.heading}
        body={services?.subheading}
        items={servicesItems}
        columns={3}
      />

      {detailOrder.map((id, i) => {
        const d = s(id);
        return (
          <SplitFeature
            key={id}
            id={id}
            section={id}
            headingId={`${id}-heading`}
            reverse={i % 2 === 1}
            heading={d?.heading}
            body={<Paragraphs body={d?.body} />}
            actions={[
              { href: nap.phoneHref, label: d?.cta?.[0] ?? 'Call now' },
              { href: '/contact', label: 'Request a callback' },
            ]}
            mediaLabel={`${d?.heading ?? ''} placeholder`}
          />
        );
      })}

      <FaqBlock
        section="faq"
        headingId="faq-heading"
        title={s('faq')?.heading}
        items={faqs.map((f) => ({ q: f.q, a: f.a }))}
      />

      <CtaBand
        tone="band"
        section="services-cta"
        headingId="services-cta-heading"
        heading={servicesCta?.heading}
        actions={[
          { href: nap.phoneHref, label: servicesCta?.cta?.[0] ?? 'Call now' },
          { href: '/contact', label: servicesCta?.cta?.[1] ?? 'Request a callback' },
        ]}
      />

      <SharedTail mapZoom={13} mapEyebrow="Where we work from" mapTitle={map?.heading} mapBody={map?.body?.[0]} />
    </>
  );
}
