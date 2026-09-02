import Link from 'next/link';
import { Phone, Clock, MapPin } from 'lucide-react';
import { Container, Icon, TextLink, Heading } from '@/components/ui';
import { site, nap, hours, footerNav } from '@/lib/site';

/**
 * PATTERN: FOOTER — the site's single footer variant.
 * Measured: 703px @1440 / 1538px @390, 4-column link grid plus a
 * `footer-bottom` copyright strip.
 *
 * CONFIG FORBIDDEN applies to fine print too: no license number, no
 * bonded/insured claim, no "family owned since", no awards, no certifications.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-section="footer" className="bg-band-deep text-on-band">
      <Container className="py-section-y">
        <div className="grid gap-11 lg:grid-cols-3">
          <div className="flex flex-col gap-5">
            <Link href="/" className="font-display text-2xl font-bold uppercase leading-display">
              {site.name}
            </Link>
            <p className="font-body text-xs leading-body text-on-band-muted">{site.description}</p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <Icon icon={Phone} size="sm" className="text-cta" />
                <TextLink href={nap.phoneHref} variant="footer">
                  {nap.phone}
                </TextLink>
              </li>
              <li className="flex items-center gap-3">
                <Icon icon={Clock} size="sm" className="text-cta" />
                <span className="font-body text-xs leading-body text-on-band-muted">{hours.label}</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon={MapPin} size="sm" className="mt-1 shrink-0 text-cta" />
                <span className="font-body text-xs leading-body text-on-band-muted">{nap.address}</span>
              </li>
            </ul>
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-5">
              <Heading level={4}>{col.heading}</Heading>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={`${col.heading}-${l.path}-${l.label}`}>
                    <TextLink href={l.path} variant="footer" className="text-on-band-muted">
                      {l.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="border-t border-border-on-band">
        <Container className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-3xs leading-body text-on-band-muted">
            {site.name} © {year}. All rights reserved.
          </p>
          <p className="font-body text-3xs leading-body text-on-band-muted">
            {nap.serviceArea}
          </p>
        </Container>
      </div>
    </footer>
  );
}
