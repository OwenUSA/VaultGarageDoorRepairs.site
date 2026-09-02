import type { ReactNode } from 'react';
import { cn } from './cn';

/** Body copy. Rubik owns these three rows of the scale and nothing else. */
export type TextSize = 'body' | 'lead' | 'large';

const sizes: Record<TextSize, string> = {
  body: 'font-body text-body-16 font-medium', // Rubik 500 16/22.4 — 1062 uses
  lead: 'font-body text-body-18 font-semibold', // Rubik 600 18/25.2
  large: 'font-body text-body-20 font-regular', // Rubik 400 20/26
};

export function Text({
  size = 'body',
  muted = false,
  className,
  children,
}: {
  size?: TextSize;
  muted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn(sizes[size], muted && 'text-ink-muted', className)}>
      {children}
    </p>
  );
}

/** The one fluid pull-quote row: RC 400 28.327/38.327, ls -0.287. */
export function PullQuote({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        'font-display text-quote font-regular tracking-quote',
        className,
      )}
    >
      {children}
    </p>
  );
}
