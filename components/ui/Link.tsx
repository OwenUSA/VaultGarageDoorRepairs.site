import NextLink from 'next/link';
import type { ReactNode } from 'react';

/**
 * Link styles extracted from the type scale:
 *   nav    RC 400 16 uppercase (type scale #1)
 *   footer RC 500 16           (type scale #4)
 *   inline body copy, link colour
 *
 * `nav` and `footer` carry the WCAG 2.5.8 target minimum themselves. A-14 sets
 * it globally for `tel:` links only; a nav link is 18px tall on its own and
 * `rendertruth.mjs` fails it at 390 unless the anchor — not its wrapper — is
 * the element that carries the height.
 *
 * Hover is `underline`, never a colour swap. A colour hover on a dark band is
 * the one state no gate captures, and it is where an unreadable pair hides.
 */
export type LinkVariant = 'nav' | 'footer' | 'inline';

const target = 'inline-flex min-h-[44px] min-w-[44px] items-center';

const variants: Record<LinkVariant, string> = {
  nav: `${target} font-display font-regular text-xs uppercase leading-display hover:underline`,
  footer: `${target} font-display font-medium text-xs leading-display hover:underline`,
  inline:
    'font-body text-xs leading-body text-link underline underline-offset-2 transition-colors duration-[var(--duration-fast)] ease-standard hover:text-link-hover',
};

export function TextLink({
  href,
  variant = 'inline',
  className = '',
  children,
}: {
  href: string;
  variant?: LinkVariant;
  className?: string;
  children: ReactNode;
}) {
  const cls = `${variants[variant]} ${className}`;
  if (/^(https?:|tel:)/.test(href)) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={cls}>
      {children}
    </NextLink>
  );
}
