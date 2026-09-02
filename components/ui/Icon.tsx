import type { LucideIcon } from 'lucide-react';

/**
 * Icon — lucide-react replaces the target's Material Icons and the proprietary
 * `gform-icons-theme` font (not harvested; its license does not permit reuse).
 * Measured sizes: 16 inline bullet · 24 default · 40 feature.
 */
export type IconSize = 'sm' | 'md' | 'lg';

const sizes: Record<IconSize, number> = { sm: 16, md: 24, lg: 40 };

export function Icon({
  icon: Glyph,
  size = 'md',
  className = '',
  label,
}: {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  label?: string;
}) {
  return (
    <Glyph
      width={sizes[size]}
      height={sizes[size]}
      strokeWidth={2}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  );
}
