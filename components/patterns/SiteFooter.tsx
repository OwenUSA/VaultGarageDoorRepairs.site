import Link from 'next/link';
import { Phone, Clock, MapPin } from 'lucide-react';
import { Container, Icon, TextLink, Heading } from '@/components/ui';
import { site, nap, hours, footerNav } from '@/lib/site';

/**
 * PATTERN: FOOTER — the site's single footer variant. LEAD OWNS THIS FILE (A-6).
 * Measured: 703px @1440 / 1538px @390, a 4-column link grid plus a copyright
 * strip.
 *
 * D-02: the reference footer's service-area city grid — 744 of its 781
 * characters, 30 paragraphs of Tulsa-metro place names — is DELETED. The single
 * `SERVICE_AREA` sentence is its only survivor and it lives in the bottom strip.
 *
 * D-03: there is no electronic-mail column, no sign-up block and no envelope
 * icon, and there never will be. The words themselves are avoided here so the
 * standing sweep in CLAUDE.md stays clean — a comment that names them turns the
 * check into noise for everyone downstream, which is how a real hit gets missed. The forbidden list applies to fine print too: no licence
 * number, no bonded/insured claim, no "family owned since", no awards, no
 * certifications (D-14).
 *
 * Every fact here comes from `lib/site.ts`. A sibling shipped two different
 * hours strings — one with an en dash, one with a hyphen — from exactly the
 * drift that starts by typing a fact into a component.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  /* Measured on the reference footer at all three widths: padding-top 50,
     padding-bottom 0, at every breakpoint. The 50 sits on the BAND, not on the
     container inside it, which is where the comparator reads it. */
  return (
    <footer
      data-section="footer"
      className="border-t-4 border-cta bg-band-deep pt-section-y-tight pb-0 text-ink-on-band"
    >
      <Container className="pb-section-y">
        <div className="grid gap-11 lg:grid-cols-3">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center font-display text-2xl font-bold uppercase leading-display"
            >
              {site.name}
            </Link>
            <p className="font-body text-xs leading-body text-ink-on-band-muted">
              {site.description}
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <Icon icon={Phone} size="sm" className="shrink-0" />
                <TextLink href={nap.phoneHref} variant="footer">
                  {nap.phone}
                </TextLink>
              </li>
              <li className="flex items-center gap-3">
                <Icon icon={Clock} size="sm" className="shrink-0" />
                <span className="font-body text-xs leading-body text-ink-on-band-muted">
                  {hours.label}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon={MapPin} size="sm" className="mt-1 shrink-0" />
                <address className="font-body text-xs not-italic leading-body text-ink-on-band-muted">
                  {nap.address}
                </address>
              </li>
            </ul>
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-5">
              <Heading level={4} className="text-cta">
                {col.heading}
              </Heading>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={`${col.heading}-${l.path}-${l.label}`}>
                    <TextLink href={l.path} variant="footer">
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
          <p className="font-body text-3xs leading-body text-ink-on-band-muted">
            {site.name} © {year}. All rights reserved.
          </p>
          {/* D-02 — the one surviving service-area sentence. */}
          <p className="font-body text-3xs leading-body text-ink-on-band-muted">
            {nap.serviceArea}
          </p>
        </Container>
      </div>
    </footer>
  );
}
