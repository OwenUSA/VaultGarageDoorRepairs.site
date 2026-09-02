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
        mediaLabel="Garage door technician at a residential door, Broken Arrow"
        /* D-13 / D-14. The reference hero carries a review-rating strip
           (300x39 @1440). Reviews, ratings and review counts are forbidden
           outright, so the slot survives as a visible TODO(fact) chip row.
           Logged in docs/facts-needed.md. */
        badges={
          <TodoFactRow
            onBand
            label="Facts not yet supplied"
            items={['rating source and score']}
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
