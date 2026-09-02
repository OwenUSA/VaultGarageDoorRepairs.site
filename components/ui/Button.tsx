import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Button — extracted from docs/03-design-system.md UI PRIMITIVES.
 * One shape, square corners on EVERY variant (measured border-radius: 0),
 * Roboto Condensed 700 uppercase, padding 10/30, height 38 (the `call` and
 * `submit` rows measure 44 and 42, and are reproduced).
 *
 * ────────────────────────────────────────────────────────────────────────
 * THE COLOUR RULE, and it is not negotiable in the build wave:
 *
 *   EXACTLY ONE FILLED CHROMATIC ACTION PER PAGE — the call CTA.
 *
 * `rendertruth.mjs` scores CTA salience as sRGB CHROMA DOMINANCE: if any other
 * buttonish action on the page is more saturated than the call CTA, the route
 * fails `cta-primacy`, and the fix is always the other action — never dimming
 * headings or body copy. A sibling site shipped a primary-filled secondary
 * button whose sRGB chroma beat its own CTA and failed on all five routes.
 *
 * So the secondary action is filled NEUTRAL, not primary:
 *   call        --color-cta       (accent, sRGB chroma 0.380) — tel: links only
 *   solid       --color-solid     (neutral-900, chroma 0.051) — on light bands
 *   solid-band  --color-solid-band(neutral-200, chroma 0.122) — on dark bands
 *   submit      --color-solid                                 — form submit
 *   arrow       --color-solid                                 — carousel control
 * ────────────────────────────────────────────────────────────────────────
 */
export type ButtonVariant = 'call' | 'solid' | 'solid-band' | 'submit' | 'large' | 'arrow';

const base =
  'inline-flex items-center justify-center gap-3 font-display font-bold uppercase leading-display ' +
  'min-h-[44px] transition-colors duration-[var(--duration-base)] ease-standard ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  /** THE call CTA. The only filled chromatic action on any page. */
  call: 'rounded-none bg-cta text-cta-ink text-xs px-9 py-3 hover:bg-cta-hover',
  /** Secondary action on a light band — neutral fill, never the primary. */
  solid: 'rounded-none bg-solid text-solid-ink text-xs px-9 py-3 hover:bg-ink-muted',
  /** Secondary action on a dark band — the light neutral, inverted. */
  'solid-band':
    'rounded-none bg-solid-band text-solid-band-ink text-xs px-9 py-3 hover:bg-border',
  /** Form submit — measured 42px, square padding, sentence case. */
  submit: 'rounded-none bg-solid text-solid-ink text-xs normal-case px-4 py-4 hover:bg-ink-muted',
  /** Large CTA — the one 20px label row in the type census. */
  large: 'rounded-none bg-solid text-solid-ink text-lg px-9 py-3 hover:bg-ink-muted',
  /** Carousel arrow — the one round control on the site. */
  arrow: 'rounded-circle bg-solid text-solid-ink p-3 hover:bg-ink-muted',
};

type BaseProps = { variant?: ButtonVariant; children: ReactNode; className?: string };

export function Button({
  variant = 'solid',
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
  variant = 'solid',
  href,
  className = '',
  children,
  ...rest
}: BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  const external = /^(https?:|tel:)/.test(href);
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
