import type { Metadata } from 'next';
import { JsonLd } from '@/components/ui';
import { Breadcrumb, SectionIntro, FaqBlock, CtaBand, SharedTail } from '@/components/patterns';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { faqs, hours, nap } from '@/lib/site';

/**
 * ROUTE   /faqs
 * MODE    SYNTHESIZE
 * CLASS   generic-content
 * SOURCE  faq-one (SectionIntro) + faq-two (FaqBlock/Accordion)
 * GATED   SYSTEM COMPLIANCE — zero raw hex/rgb/px, every type/spacing value
 *         from the extracted scales, every section from patterns/ + ui/.
 *         Violation count must be zero. Measured by .harness/compliance.mjs.
 *
 * Composition (docs/05-route-map.md row `/faqs`):
 *   HEADER > breadcrumb > faq-one > faq-two > serviceinner-four > SharedTail > FOOTER
 *
 * `breadcrumb` matches the sibling SYNTHESIZE route /contact. `serviceinner-four`
 * (CtaBand) bridges the accordion into the shared tail so the page does not end
 * on an open disclosure list — extracted pattern, no new primitive.
 *
 * Every question and answer comes from `faqs` in lib/site.ts. No fact is
 * restated as a literal here, and the same array drives the FAQPage structured
 * data below, so visible copy and schema can never drift apart.
 *
 * Keyboard: the accordion is components/ui/Accordion — each trigger is a real
 * <button> with aria-expanded + aria-controls, and each panel is a region
 * labelled by its trigger. Asserted by .harness/synth-check.mjs.
 *
 * CONFIG FORBIDDEN: FAQ copy is the usual place warranty / guarantee / price /
 * licensing language leaks in. There is none here and none in lib/site.ts.
 */
export const metadata: Metadata = {
  title: 'FAQs',
  description: `Answers about garage door spring repair, opener repair, off-track and cable repair, panel replacement, new door installation and maintenance. ${hours.emergency}.`,
  alternates: { canonical: '/faqs' },
};

const trail = [
  { label: 'Home', path: '/' },
  { label: 'FAQs', path: '/faqs' },
];

export default function Page() {
  return (
    <>
      <Breadcrumb trail={trail} />

      <SectionIntro
        tone="band"
        eyebrow="Questions"
        heading="Frequently asked questions"
        headingLevel={1}
        body={`The things people ask most before booking. If yours is not here, call ${nap.phone} and ask.`}
        headingId="faq-intro-heading"
      />

      <FaqBlock
        tone="page"
        eyebrow="Good to know"
        title="Before you book"
        body={`${hours.office} for scheduling. ${hours.response} when a door will not open, will not close or will not secure.`}
        items={faqs}
        headingId="faq-heading"
      />

      <CtaBand
        tone="band"
        eyebrow="Still stuck?"
        heading="Describe the door and we will take it from there"
        body="A door that will not move, will not latch or is making a noise it did not make yesterday is worth a call rather than a search. Tell us what it is doing and what changed."
        actions={[
          { href: '/contact', label: 'Book a visit' },
          { href: nap.phoneHref, label: nap.phone },
        ]}
        headingId="faq-cta-heading"
      />

      <SharedTail />

      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
