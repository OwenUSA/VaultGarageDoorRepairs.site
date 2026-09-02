import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Button — extracted from docs/03-design-system.md UI PRIMITIVES.
 * One shape, square corners on EVERY variant (measured border-radius: 0),
 * Roboto Condensed 700 uppercase, padding 10/30, height 38.
 * Variants and their measured instance counts:
 *   primary 36 · inverse 9 · phone 3 · submit 3 · large 1 · arrow 2
 */
export type ButtonVariant = 'primary' | 'inverse' | 'phone' | 'submit' | 'large' | 'arrow';
export type ButtonSize = 'default' | 'large';

const base =
  'inline-flex items-center justify-center gap-3 font-display font-bold uppercase leading-display ' +
  'transition-colors duration-base ease-standard ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  // amber fill, navy label — the dominant CTA
  primary:
    'rounded-none bg-cta text-cta-ink text-xs px-9 py-3 hover:bg-amber hover:text-navy active:bg-amber',
  // navy fill, amber label — used on light bands
  inverse:
    'rounded-none bg-band text-cta text-xs px-9 py-3 hover:bg-blue-deep active:bg-blue-deep',
  // phone CTA — amber fill, ink label, taller
  phone:
    'rounded-none bg-cta text-ink text-xs px-9 py-4 hover:bg-amber',
  // form submit — amber fill, ink label, square padding
  submit:
    'rounded-none bg-cta text-ink text-xs normal-case px-4 py-4 hover:bg-amber',
  // large CTA — 20px label
  large:
    'rounded-none bg-cta text-paper text-lg px-9 py-3 hover:bg-amber',
  // carousel arrow — the one round control on the site
  arrow:
    'rounded-circle bg-band text-on-band p-2 hover:bg-blue-deep',
};

type BaseProps = { variant?: ButtonVariant; children: ReactNode; className?: string };

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: BaseProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  href,
  className = '',
  children,
  ...rest
}: BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
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
