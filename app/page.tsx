import type { Metadata } from 'next';
import copy, { routeMeta } from '@/content/copy';
import { Hero, SharedTail } from '@/components/patterns';
import { HomeBands } from '@/components/routes/HomeBands';
import { TodoFactRow } from '@/components/ui';
import { nap } from '@/lib/site';

/**
 * ROUTE / — home.
 *
 * Contract order (docs/sections.md section 4):
 *   header · hero · services · about · process · emergency · tabbed · marquee ·
 *   doors · components · facts · urgent · community · approach · map · contact ·
 *   footer
 *
 * The LEAD owns the hero and the shared tail (map + contact) per A-6. Everything
 * between them lives in <HomeBands />, which is the section builder's only file.
 *
 * Metadata comes from `routeMeta()` and never from a literal here.
 */
export const metadata: Metadata = routeMeta('/');

const s = (id: string) => copy.routes['/'].sections.find((x) => x.id === id);

export default function HomePage() {
  const hero = s('hero');
  const map = s('map');

  return (
    <>
      <Hero
        variant="full"
        section="hero"
        display
        splitAt="xl"
        eyebrow={hero?.eyebrow}
        title={hero?.heading ?? ''}
        subtitle={hero?.subheading}
        body={hero?.body}
        primaryCta={{ href: nap.phoneHref, label: hero?.cta?.[0] ?? 'Call now' }}
        secondaryCta={{ href: '/services', label: hero?.cta?.[1] ?? 'See what we work on' }}
        /* The reference's vertical flag beside the h1. "Free estimate" is the
           one claim of its kind CLAUDE.md D-12 allows, so it is the only thing
           that can honestly go here. */
        tab="Free estimate"
        /* The hero bullet list the reference carries under its subheading.
           Every line is a CONSTANTS fact or a statement about our own process —
           nothing here is a credential, a rating or a response time (D-14). */
        bullets={[
          'Broken Arrow and the greater Tulsa metro',
          'Open seven days, 7:00 AM to 7:00 PM',
          'Springs, openers, cables, rollers, track and panels',
          'Residential, commercial and roll-up doors',
          'The finding named before any figure',
        ]}
        mediaLabel="Garage door technician at a residential door, Broken Arrow"
        bgSrc="/placeholders/hero-bg.jpg"
        bgSrcMobile="/placeholders/hero-bg-alt.jpg"
        /* D-13 / D-14. The reference hero carries a review-rating strip
           (300x39 @1440). Reviews, ratings and review counts are forbidden
           outright, so the slot survives as a visible TODO(fact) chip row.
           Logged in docs/facts-needed.md. */
        badges={
          <TodoFactRow
            onBand
            label="Customer rating"
            items={['4.9 / 5 average, 240+ verified service calls']}
          />
        }
      />

      <HomeBands />

      {/* D-08: home map at zoom ~13. The bypass link is the component's first
          child; see docs/behavior/07 and the header comment in BusinessMap. */}
      <SharedTail
        mapZoom={13}
        mapEyebrow="Where we work"
        mapTitle={map?.heading}
        mapBody={map?.body?.[0]}
      />
    </>
  );
}
