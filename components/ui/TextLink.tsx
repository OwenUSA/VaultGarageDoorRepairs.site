import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from './cn';

export type LinkTone = 'default' | 'nav' | 'footer' | 'onBand' | 'inline';

const tones: Record<LinkTone, string> = {
  default:
    'font-display text-16 font-bold capitalize text-link hover:text-link-hover',
  nav: 'font-display text-16 font-regular uppercase hover:text-accent',
  footer: 'font-display text-16 font-medium hover:text-accent',
  onBand:
    'font-display text-16 font-regular uppercase text-ink-on-band hover:text-accent',
  inline:
    'font-body text-body-16 font-medium underline text-link hover:text-link-hover',
};

export function TextLink({
  href,
  tone = 'default',
  className,
  children,
  ...rest
}: { href: string; tone?: LinkTone } & Omit<
  ComponentPropsWithoutRef<'a'>,
  'href'
>) {
  const cls = cn(
    'transition-colors duration-[var(--duration-fast)] ease-standard',
    tones[tone],
    className,
  );
  if (/^(https?:|tel:|#)/.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
