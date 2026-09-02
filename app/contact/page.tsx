import type { Metadata } from 'next';
import copy, { routeMeta } from '@/content/copy';
import { Hero, Breadcrumb, ContactBlock, StepRow, BusinessMap } from '@/components/patterns';
import { nap } from '@/lib/site';

/**
 * ROUTE /contact — built by the LEAD, because the form shares its validation
 * code with the home and subpage contact bands (<ContactForm>, D-05).
 *
 * Contract order (docs/sections.md):
 *   header · hero (NOVEL) · breadcrumb · contact · next-steps (NOVEL) ·
 *   map (NOVEL, zoom 15) · footer
 *
 * D-05: name, phone, service needed, preferred callback window, message.
 * No electronic-mail field of any kind and no backend (D-03, D-05).
 * All of that lives in <ContactForm>, which is marked `// STUB: no submission
 * target` and console.warns on submit. Not re-implemented here.
 *
 * D-08: the contact map is zoom ~15 and sits beside the form. The keyboard
 * bypass is <BusinessMap>'s first child — see docs/behavior/07.
 */
export const metadata: Metadata = routeMeta('/contact');

const s = (id: string) => copy.routes['/contact'].sections.find((x) => x.id === id);

export default function ContactPage() {
  const hero = s('hero');
  const crumb = s('breadcrumb');
  const band = s('contact');
  const next = s('next-steps');
  const map = s('map');

  return (
    <>
      <Hero
        variant="page"
        section="hero"
        eyebrow={hero?.eyebrow}
        title={hero?.heading ?? ''}
        subtitle={band?.subheading}
        primaryCta={{ href: nap.phoneHref, label: 'Call now' }}
        mediaLabel="Garage door service van outside a Broken Arrow home"
        id="contact-hero"
      />

      <Breadcrumb
        section="breadcrumb"
        trail={[
          { label: crumb?.items?.[0]?.heading ?? 'Home', path: '/' },
          { label: crumb?.items?.[1]?.heading ?? 'Contact', path: '/contact' },
        ]}
      />

      <ContactBlock
        section="contact"
        variant="standalone"
        eyebrow={band?.eyebrow}
        title={band?.heading}
        body={
          <span className="flex flex-col gap-5">
            {(band?.body ?? []).map((p) => (
              <span key={p} className="block">
                {p}
              </span>
            ))}
          </span>
        }
        headingId="contact-heading"
      />

      <StepRow
        section="next-steps"
        tone="surface"
        heading={next?.heading}
        headingId="next-steps-heading"
        steps={(next?.items ?? []).map((i) => ({ title: i.heading, body: i.body ?? '' }))}
      />

      {/* D-08: zoom ~15 beside the form. */}
      <BusinessMap
        section="map"
        zoom={15}
        eyebrow="Where we are"
        title={map?.heading}
        body={map?.body?.[0]}
        headingId="contact-map-heading"
      />
    </>
  );
}
