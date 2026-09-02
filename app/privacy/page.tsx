// UNREVIEWED TEMPLATE — requires legal review before launch
import type { Metadata } from 'next';
import copy, { routeMeta } from '@/content/copy';
import { ContentColumn, ProseBlock } from '@/components/patterns';
import { Eyebrow } from '@/components/ui';

/**
 * ROUTE /privacy
 *
 * NOVEL — measured by token conformance, not pixel diff (no reference
 * counterpart carries this exact body). Composed only from `ContentColumn` +
 * `ProseBlock` plus the `Eyebrow` ui primitive, per the route contract.
 *
 * Metadata comes from `routeMeta()` and never from a literal here.
 */
export const metadata: Metadata = routeMeta('/privacy');

const section = copy.routes['/privacy'].sections.find((s) => s.id === 'privacy-body');

export default function PrivacyPage() {
  return (
    <ContentColumn title={section?.heading} intro={section?.subheading} section="privacy-body">
      <Eyebrow>UNREVIEWED TEMPLATE — requires legal review before launch</Eyebrow>
      {section?.items?.map((item) => (
        <ProseBlock key={item.heading} title={item.heading}>
          <p>{item.body}</p>
        </ProseBlock>
      ))}
    </ContentColumn>
  );
}
