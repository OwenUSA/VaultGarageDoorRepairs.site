import type { Metadata } from 'next';
import { JsonLd } from '@/components/ui';
import {
  Breadcrumb,
  Hero,
  CardGrid,
  SplitFeature,
  FaqBlock,
  CtaBand,
  SharedTail,
} from '@/components/patterns';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { services, faqs, hours, nap, site } from '@/lib/site';

/**
 * ROUTE   /services   (one of the five in D-01)
 *
 * This route absorbs everything the pre-existing build had spread across nine
 * per-service routes plus a separate FAQ page. D-01 allows sections inside a
 * page but not extra routes, so every service is an in-page anchor
 * (`/services#<slug>`) and the FAQ is the in-page accordion at `#faq`.
 *
 * PLACEHOLDER STATE — this is Prompt 1 scaffolding. It exists so the route set
 * is legal, the anchors resolve and the build is clean. Prompt 6+7 rebuilds it
 * against the reference section contract in docs/sections.md.
 */
export const metadata: Metadata = {
  title: 'Services',
  description: site.description,
  alternates: { canonical: '/services' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
];

export default function Page() {
  return (
    <>
      <Breadcrumb trail={trail} />

      <Hero
        variant="page"
        eyebrow="Services"
        title="Garage door work, start to finish"
        subtitle={`${site.tagline} Eight things account for nearly every call we take. Each one is set out below with what the fault looks like and what a visit involves.`}
        bullets={[hours.label, nap.serviceArea]}
        primaryCta={{ href: '/contact', label: 'Request a callback' }}
        secondaryCta={{ href: nap.phoneHref, label: nap.phone }}
        mediaLabel="Garage door service placeholder"
      />

      <CardGrid
        tone="band"
        eyebrow="What we do"
        heading="The eight services"
        body="Every one of these is an overhead-door job. Nothing here is subcontracted out to a general trade."
        items={services.map((s) => ({ title: s.title, body: s.summary, href: s.href, media: 'none' as const }))}
        columns={4}
        headingId="services-heading"
        id="services"
      />

      {services.map((s, i) => (
        <SplitFeature
          key={s.slug}
          tone={i % 2 === 0 ? 'page' : 'surface'}
          reverse={i % 2 === 1}
          media="square slot"
          mediaLabel={`${s.title} placeholder`}
          eyebrow="Service"
          heading={s.title}
          body={s.summary}
          actions={[
            { href: '/contact', label: 'Request a callback' },
            { href: nap.phoneHref, label: nap.phone },
          ]}
          headingId={`${s.slug}-heading`}
          id={s.slug}
          splitAt="xl"
        />
      ))}

      <FaqBlock
        tone="band"
        eyebrow="Good to know"
        title="Frequently asked questions"
        body="Generic garage-door technical ground, not a description of how we schedule or price work."
        items={faqs}
        id="faq"
        headingId="faq-heading"
      />

      <CtaBand
        tone="band-deep"
        eyebrow="Still stuck?"
        heading="Describe the door and we will take it from there"
        body="A door that will not move, will not latch, or is making a noise it did not make yesterday is worth a call rather than a search."
        actions={[
          { href: '/contact', label: 'Request a callback' },
          { href: nap.phoneHref, label: nap.phone },
        ]}
        headingId="services-cta-heading"
      />

      <SharedTail />

      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
