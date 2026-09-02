'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Container, Icon, ButtonLink, TextLink } from '@/components/ui';
import { nap, hours, primaryNav, site } from '@/lib/site';

/**
 * PATTERN: HEADER — the site's single header variant. LEAD OWNS THIS FILE (A-6).
 *
 * Measured: 3 stacked bars at 1440 = 170px (ribbon 41 + contact 78 + nav 46),
 * collapsing to ONE 110px bar at <=1024. The measured scroll state toggles at
 * `scrollTop >= 50` and the height does NOT change (170 -> 170, 110 -> 110):
 * it is a background/elevation change, not a shrink. Reproduced exactly — a
 * header that resizes on scroll moves the phone number while a caller is
 * reaching for it (docs/behavior/02).
 *
 * The scroll state comes from an IntersectionObserver on a zero-height sentinel
 * at 50px, NOT a scroll listener: one bit of information should not cost a
 * callback on every frame of a fling scroll.
 *
 * The single mobile bar carries the call button itself, so every breakpoint has
 * a filled call CTA: the sticky call bar (docs/behavior/03) is a media query at
 * <768 and the desktop contact bar starts at 1024, which would otherwise leave
 * the 768 band with no call button at all.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  /* TWO states, not one. `mounted` is presence (visibility, tab order, the
     accessibility tree); `open` is the visual state the transition runs on.
     One boolean flipped in a single commit gives no frame for the transform to
     transition from, so the drawer would jump on the way in. */
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);
  const toggle = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Close on route change, unconditionally. Next.js does not unmount the layout
     on client navigation, so without this the drawer survives the navigation
     with its scroll lock still applied and the new page appears frozen. */
  useEffect(() => {
    setOpen(false);
    setMounted(false);
  }, [pathname]);

  const openDrawer = () => {
    setMounted(true);
    requestAnimationFrame(() => setOpen(true));
  };
  const closeDrawer = () => {
    setOpen(false);
    window.setTimeout(() => setMounted(false), 200);
    toggle.current?.focus();
  };

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKey);

    /* Scroll lock, plus a compensating pad for the scrollbar the lock removes.
       Not `position: fixed` on body — that loses the scroll position. */
    const pad = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (pad > 0) document.body.style.paddingRight = `${pad}px`;

    /* The page behind the overlay stays in the tab order unless something
       removes it — the single most common drawer defect, and invisible to a
       pixel diff. `inert` removes focus AND the accessibility tree. The call
       bar leaves too: its CTA would otherwise stack on the drawer's own. */
    const offstage: (Element | null)[] = [
      document.getElementById('main'),
      document.querySelector('footer'),
      ...Array.from(document.querySelectorAll('header[data-sticky] > div:not([data-drawer])')),
    ];
    for (const el of offstage) el?.setAttribute('inert', '');
    document.body.dataset.drawer = 'open';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      for (const el of offstage) el?.removeAttribute('inert');
      delete document.body.dataset.drawer;
    };
  }, [mounted]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-[50px] h-px w-px" />
      <header
        data-section="header"
        data-sticky
        data-scrolled={scrolled ? 'true' : 'false'}
        className="sticky top-0 z-[var(--z-header)] transition-shadow duration-[var(--duration-base)] ease-standard data-[scrolled=true]:shadow-card"
      >
        {/* bar 1 — ribbon (41px @1440), desktop only */}
        <div className="hidden bg-band-deep text-ink-on-band lg:block">
          <Container className="flex h-bar-ribbon items-center justify-center">
            <span className="font-display text-xs font-bold uppercase leading-display">
              {site.tagline}
            </span>
          </Container>
        </div>

        {/* bar 2 — brand + contact (78px @1440), folded into bar 3 below lg */}
        <div className="hidden bg-page-bg text-ink lg:block">
          <Container className="flex h-bar-contact items-center justify-between">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center font-display text-2xl font-bold uppercase leading-display"
            >
              {site.name}
            </Link>
            <div className="flex items-center gap-9">
              <span className="font-body text-xs leading-body text-ink-muted">{hours.short}</span>
              <ButtonLink variant="call" href={nap.phoneHref}>
                <Icon icon={Phone} size="sm" />
                {nap.phone}
              </ButtonLink>
            </div>
          </Container>
        </div>

        {/* bar 3 — nav (46px @1440) / the single 110px bar at <=1024 */}
        <div className="bg-band text-ink-on-band">
          <Container className="flex h-header items-center justify-between gap-5 lg:h-bar-nav">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center font-display text-lg font-bold uppercase leading-display lg:hidden"
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

            <div className="flex items-center gap-5 lg:hidden">
              <ButtonLink variant="call" href={nap.phoneHref} className="px-5">
                <Icon icon={Phone} size="sm" />
                <span className="sr-only">Call {nap.phone}</span>
                <span aria-hidden="true">Call</span>
              </ButtonLink>
              <button
                ref={toggle}
                type="button"
                onClick={openDrawer}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                className="inline-flex h-[44px] w-[44px] items-center justify-center"
              >
                <Icon icon={Menu} label="Open menu" />
              </button>
            </div>
          </Container>
        </div>

        {/* drawer — docs/behavior/01. `data-open` on the element is the source of
            truth: CSS, the route-change effect and the Playwright gate all read
            it. Transform, never `left`: animating `left` triggers layout on
            every frame of a panel that contains the phone number. */}
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-drawer
          data-mounted={mounted ? 'true' : 'false'}
          data-open={open ? 'true' : 'false'}
          className="fixed inset-0 z-[var(--z-drawer)] lg:hidden"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
            className="drawer-overlay absolute inset-0 h-full w-full bg-overlay-strong"
          />
          <div className="drawer-panel absolute inset-y-0 left-0 flex w-full max-w-[85%] flex-col gap-9 overflow-y-auto bg-band p-9 text-ink-on-band">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold uppercase leading-display">Menu</span>
              <button
                type="button"
                onClick={closeDrawer}
                className="inline-flex h-[44px] w-[44px] items-center justify-center"
              >
                <Icon icon={X} label="Close menu" />
              </button>
            </div>
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-7">
                {primaryNav.map((item) => (
                  <li key={item.path}>
                    <TextLink href={item.path} variant="nav">
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
            <ButtonLink variant="call" href={nap.phoneHref}>
              <Icon icon={Phone} size="sm" />
              {nap.phone}
            </ButtonLink>
          </div>
        </div>
      </header>
    </>
  );
}
