import type { ReactNode } from 'react';

/**
 * Card — variants extracted from the RADII and SHADOWS censuses.
 *   default   radius 20px, shadow-card     (750 / 251 instances)
 *   signature radius 5 20 5 5, shadow-card  — the site signature corner
 *   elevated  radius 20px, shadow-elevated (92 instances)
 *   flat      radius 10px, no shadow, border
 */
export type CardVariant = 'default' | 'signature' | 'elevated' | 'flat';

const variants: Record<CardVariant, string> = {
  default: 'rounded-xl shadow-card bg-elevated',
  signature: 'rounded-card shadow-card bg-elevated',
  elevated: 'rounded-xl shadow-elevated bg-elevated',
  flat: 'rounded-md shadow-none bg-elevated border border-border',
};

export function Card({
  variant = 'default',
  className = '',
  children,
}: {
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
}
