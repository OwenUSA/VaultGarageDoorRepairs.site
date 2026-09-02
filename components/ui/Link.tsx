import NextLink from 'next/link';
import type { ReactNode } from 'react';

/**
 * Link styles extracted from the type scale:
 *   nav    RC 400 16 uppercase (type scale #1)
 *   footer RC 500 16           (type scale #4)
 *   inline body copy, accent colour
 */
export type LinkVariant = 'nav' | 'footer' | 'inline';

const variants: Record<LinkVariant, string> = {
  nav: 'font-display font-regular text-xs uppercase leading-display transition-colors duration-fast ease-standard hover:text-cta',
  footer:
    'font-display font-medium text-xs leading-display transition-colors duration-fast ease-standard hover:text-cta',
  inline:
    'font-body text-xs leading-body text-accent underline underline-offset-2 transition-colors duration-fast ease-standard hover:text-accent-hover',
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
  if (/^(https?:|tel:|mailto:)/.test(href)) {
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
