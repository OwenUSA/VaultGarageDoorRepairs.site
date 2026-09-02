import type { Metadata } from 'next';
import copy, { routeMeta } from '@/content/copy';
import { Container, Section, Heading } from '@/components/ui';

/**
 * ROUTE /services
 *
 * STUB. Prompt 5+9 froze the shared shell (A-6) and deliberately left the five
 * routes rendering the shell and nothing else. Every band on this route is
 * built in the 6+7 wave, one owner per section, against the contract in
 * `docs/sections.md` and the copy in `content/copy.ts` — and each is diffed as
 * it lands, gets ONE fix attempt, then is floored and logged (A-2, A-3).
 *
 * The previous lineage's version of this page is in git at 6a38bcc; it predates
 * the Prompt 1 section contract and the Prompt 3 copy, so it is reference
 * material for the wave, not a starting point to patch.
 *
 * Metadata comes from `routeMeta()` and never from a literal here: a sibling
 * shipped the wrong city in five hardcoded metadata blocks that no gate read.
 */
export const metadata: Metadata = routeMeta('/services');

export default function ServicesPage() {
  const h1 = copy.routes['/services'].sections.find((s) => s.heading)?.heading ?? '';
  return (
    <Section rhythm="hero">
      <Container>
        <Heading level={1}>{h1}</Heading>
      </Container>
    </Section>
  );
}
