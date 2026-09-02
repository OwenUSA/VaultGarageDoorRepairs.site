import type { Metadata } from 'next';
import copy, { routeMeta } from '@/content/copy';
import { Hero } from '@/components/patterns/Hero';
import { SplitFeature, StepRow, FeatureRow, CtaBand, type Step, type Fact } from '@/components/patterns/Sections';
import { SharedTail } from '@/components/patterns/SharedTail';
import { nap, hours } from '@/lib/site';

/**
 * ROUTE /about
 *
 * Built against the contract in `docs/sections.md`: hero (NOVEL) -> who
 * (ADAPTED) -> how (ADAPTED) -> facts (NOVEL) -> about-cta (NOVEL) -> shared
 * tail (map + contact). Copy is pulled verbatim from `content/copy.ts`,
 * selected by section id. No literal copy, no literal metadata, no new
 * tokens — only patterns and utilities already used elsewhere in this repo.
 */
export const metadata: Metadata = routeMeta('/about');

const sections = copy.routes['/about'].sections;
const find = (id: string) => sections.find((s) => s.id === id);

export default function AboutPage() {
  const hero = find('hero');
  const who = find('who');
  const how = find('how');
  const facts = find('facts');
  const aboutCta = find('about-cta');
  const map = find('map');
  const contact = find('contact');

  const steps: Step[] = (how?.items ?? []).map((i) => ({ title: i.heading, body: i.body ?? '' }));

  const factList: Fact[] = (facts?.items ?? []).map((i) => ({ label: i.heading, value: i.body ?? '' }));

  return (
    <>
      <Hero
        variant="page"
        section="hero"
        id="hero"
        eyebrow={hero?.eyebrow}
        title={hero?.heading}
        body={hero?.body}
        primaryCta={{ href: nap.phoneHref, label: 'Call now' }}
        secondaryCta={{ href: '/services', label: 'See what we work on' }}
      />

      <SplitFeature
        tone="page"
        section="who"
        headingId="who-heading"
        heading={who?.heading}
        body={who?.body?.map((p) => <p key={p}>{p}</p>)}
        media="4:3 card"
        mediaLabel="Vault Garage Door Repairs technician placeholder"
      />

      <StepRow tone="surface" section="how" headingId="how-heading" heading={how?.heading} steps={steps} />

      <FeatureRow tone="surface" section="facts" headingId="facts-heading" facts={factList} />

      <CtaBand
        tone="band"
        section="about-cta"
        headingId="about-cta-heading"
        heading={aboutCta?.heading}
        actions={[
          { href: nap.phoneHref, label: 'Call now' },
          { href: '/contact', label: 'Request a callback' },
        ]}
      />

      <SharedTail
        mapZoom={13}
        mapTitle={map?.heading}
        mapBody={map?.body?.[0]}
        contactTitle={contact?.heading}
        contactBody={contact?.body?.[0]}
      />
    </>
  );
}
