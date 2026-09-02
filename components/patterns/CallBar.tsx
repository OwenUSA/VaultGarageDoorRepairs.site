import { Phone, MessageSquare } from 'lucide-react';
import { Icon } from '@/components/ui';
import { nap } from '@/lib/site';

/**
 * PATTERN: mobile sticky call bar — docs/behavior/03. LEAD OWNS THIS FILE (A-6).
 * D-04 requires a `tel:` link in a mobile sticky bar. The reference has none;
 * this is ours, and on a phone-driven business it is the highest-value
 * interactive element on the page.
 *
 * Shown below 768 by MEDIA QUERY (globals.css `.call-bar`), never by a JS
 * breakpoint check — that flashes the bar on desktop during hydration and puts
 * a resize listener on the page for something CSS already knows. It is a server
 * component for the same reason: there is nothing here to hydrate.
 *
 * It NEVER auto-hides on scroll. The entire purpose is that the number is
 * reachable without thinking; a bar that hides is a bar the user has to hunt
 * for at exactly the moment they gave up reading. It leaves only for the nav
 * drawer, whose own call button it would otherwise stack on.
 *
 * Rendered LAST in `layout.tsx` so it does not intercept the reading order, and
 * pulled to the bottom of the viewport by CSS only. `body` carries a
 * compensating `padding-bottom: var(--call-bar-h)` below 768 — without it the
 * bar covers the last section on every page: the map on /contact, the footer
 * on /.
 */
export function CallBar() {
  return (
    <div
      className="call-bar bg-band-deep"
      role="complementary"
      aria-label={`Call ${nap.name}`}
      data-section="call-bar"
    >
      <div className="flex w-full items-stretch gap-3 px-5 pt-3">
        {/* The anchor is the flex item and carries the height. A styled wrapper
            with a text-sized link inside gives a 20px target in a 56px bar. */}
        <a
          href={nap.phoneHref}
          className="flex min-h-[44px] flex-[2] items-center justify-center gap-3 bg-cta px-5 font-display text-xs font-bold uppercase leading-display text-cta-ink"
        >
          <Icon icon={Phone} size="sm" />
          {/* The accessible name carries the number itself, not just "Call". */}
          <span>Call {nap.phone}</span>
        </a>
        <a
          href="/contact"
          className="flex min-h-[44px] flex-1 items-center justify-center gap-3 bg-solid-band px-5 font-display text-xs font-bold uppercase leading-display text-solid-band-ink"
        >
          <Icon icon={MessageSquare} size="sm" />
          Contact
        </a>
      </div>
    </div>
  );
}
