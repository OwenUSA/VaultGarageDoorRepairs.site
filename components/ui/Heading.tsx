import type { ReactNode } from 'react';

/**
 * Heading — every level maps to a measured type-scale entry.
 *   h1  RC 700 32/36.8 upper below 1440, 42/48.3 at 1440   (measured)
 *       `display` opts into the 58/69.6 home-hero size     (measured)
 *   h2  RC 700 32/36.8 upper  (type scale #15)
 *   h3  RC 700 24/27.6        (type scale #7)
 *   h4  RC 700 18/20.7        (type scale #11)
 * `Eyebrow` is the tracked label, RC 600 14 / ls 0.35 upper (type scale #27).
 */
export type HeadingLevel = 1 | 2 | 3 | 4;

const levels: Record<HeadingLevel, string> = {
  1: 'font-display font-bold text-4xl uppercase leading-display xl:text-5xl',
  2: 'font-display font-bold text-4xl leading-display uppercase',
  3: 'font-display font-bold text-2xl leading-display',
  4: 'font-display font-bold text-sm leading-display',
};

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`block font-display font-semibold text-3xs uppercase tracking-tracked ${className}`}
    >
      {children}
    </span>
  );
}

export function Heading({
  level = 2,
  as,
  id,
  className = '',
  display = false,
  children,
}: {
  level?: HeadingLevel;
  as?: HeadingLevel;
  id?: string;
  className?: string;
  /** h1 only. The home hero measures 58/700 at 1440; every other h1 measures 42. */
  display?: boolean;
  children: ReactNode;
}) {
  const Tag = `h${as ?? level}` as 'h1' | 'h2' | 'h3' | 'h4';
  const size = display && level === 1 ? 'xl:text-6xl' : '';
  return (
    <Tag id={id} className={`${levels[level]} ${size} ${className}`}>
      {children}
    </Tag>
  );
}

/** Body copy — Rubik 500 16/22.4 (type scale #2), the site default. */
export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`font-body font-medium text-xs leading-body ${className}`}>{children}</div>;
}

/** Lead paragraph — Rubik 600 18/25.2 (type scale #18). */
export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`font-body font-semibold text-sm leading-body ${className}`}>{children}</p>;
}
