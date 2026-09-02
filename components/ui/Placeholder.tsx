/**
 * Placeholder — a neutral slot at correct dimensions and mapped token colour.
 *
 * Under COPY_MODE = ORIGINAL every photograph and brand mark is a placeholder
 * regardless of fetchability. 213 slots are inventoried in
 * .harness/out/placeholder-inventory.json with per-breakpoint dimensions and a
 * mapped token role. Placeholder slots are a tracked gap, not a blocker, and
 * are excluded from measurement — never iterated on as a divergence.
 *
 * `kind` values match the `depicts` field in the inventory so a slot can be
 * looked up from the markup.
 */
export type PlaceholderKind =
  | 'wide hero'
  | '4:3 card'
  | 'square slot'
  | 'full-bleed band'
  | '16:9 media'
  | 'portrait card'
  | 'logo lockup'
  | 'icon';

const ratios: Record<PlaceholderKind, string> = {
  'wide hero': 'aspect-[16/7]',
  '4:3 card': 'aspect-[4/3]',
  'square slot': 'aspect-square',
  'full-bleed band': 'aspect-[21/9]',
  '16:9 media': 'aspect-video',
  'portrait card': 'aspect-[3/4]',
  'logo lockup': 'aspect-[5/2]',
  icon: 'aspect-square',
};

const tones = {
  surface: 'bg-surface',
  band: 'bg-band',
  'band-deep': 'bg-band-deep',
  border: 'bg-border',
} as const;

export function Placeholder({
  kind = '4:3 card',
  tone = 'surface',
  className = '',
  label,
  fill = false,
}: {
  kind?: PlaceholderKind;
  tone?: keyof typeof tones;
  className?: string;
  label?: string;
  /** true = stretch to the parent box instead of holding its own ratio */
  fill?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? 'Placeholder image'}
      data-placeholder={kind}
      className={`overflow-hidden rounded-xl ${tones[tone]} ${
        fill ? 'absolute inset-0 h-full w-full rounded-none' : `w-full ${ratios[kind]}`
      } ${className}`}
    />
  );
}
