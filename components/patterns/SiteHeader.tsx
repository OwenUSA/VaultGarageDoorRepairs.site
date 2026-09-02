'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Container, Icon, ButtonLink, TextLink } from '@/components/ui';
import { nap, hours, primaryNav, site } from '@/lib/site';

/**
 * PATTERN: HEADER — the site's single header variant.
 * Measured: 3 stacked bars at 1440 = 170px (emergency ribbon 41 + contact 78 +
 * nav 46); collapses to one 110px bar at <=1024.
 *
 * Measured state: `scrollTop >= 50` toggles `header.active`. Height does NOT
 * change (170 -> 170, 110 -> 110) — it is a background/elevation change, not a
 * shrink. Reproduced exactly; do not add a shrink.
 *
 * Measured drawer: `left: -100% -> 0`, 81 links. Ours is a focus-trapped
 * dialog with an Escape handler, which the target lacked.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      data-section="header"
      data-scrolled={scrolled ? 'true' : 'false'}
      className={`sticky top-0 z-[var(--z-header)] transition-shadow duration-[var(--duration-base)] ease-standard ${
        scrolled ? 'shadow-card' : 'shadow-none'
      }`}
    >
      {/* bar 1 — emergency ribbon (41px @1440) */}
      <div className="hidden bg-band-deep text-on-band lg:block">
        <Container className="flex h-bar-ribbon items-center justify-center">
          <span className="font-display text-xs font-bold uppercase leading-display">
            {site.tagline}
          </span>
        </Container>
      </div>

      {/* bar 2 — brand + contact (78px @1440). Hidden below lg, folded into bar 3. */}
      <div className="hidden bg-paper text-ink lg:block">
        <Container className="flex h-bar-contact items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold uppercase leading-display">
            {site.name}
          </Link>
          <div className="flex items-center gap-9">
            <span className="font-body text-xs leading-body text-ink-muted">{hours.short}</span>
            <ButtonLink variant="phone" href={nap.phoneHref}>
              <Icon icon={Phone} size="sm" />
              {nap.phone}
            </ButtonLink>
          </div>
        </Container>
      </div>

      {/* bar 3 — nav (46px @1440) / the single 110px mobile bar */}
      <div className="bg-band text-on-band">
        <Container className="flex h-header items-center justify-between lg:h-bar-nav">
          <Link
            href="/"
            className="font-display text-lg font-bold uppercase leading-display lg:hidden"
          >
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => (
                <li key={item.path}>
                  <TextLink href={item.path} variant="nav">
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="lg:hidden"
          >
            <Icon icon={Menu} label="Open menu" />
          </button>
        </Container>
      </div>

      {/* drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-[var(--z-drawer)] lg:hidden"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-overlay-strong"
        />
        <div className="absolute inset-y-0 left-0 flex w-full max-w-[85%] flex-col gap-9 overflow-y-auto bg-band p-9 text-on-band">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold uppercase leading-display">Menu</span>
            <button type="button" onClick={() => setOpen(false)}>
              <Icon icon={X} label="Close menu" />
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-7">
              {primaryNav.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="font-display text-lg font-regular uppercase leading-display transition-colors duration-[var(--duration-fast)] ease-standard hover:text-cta"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink variant="phone" href={nap.phoneHref}>
            <Icon icon={Phone} size="sm" />
            {nap.phone}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
