import { ArtPanel, type ArtKind } from './ArtPanel';

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

/**
 * Every slot now DRAWS something (see ArtPanel). The flat tinted rectangle this
 * used to paint was technically neutral and practically wrong: on an image-led
 * layout it read as a broken page rather than an unfinished one. `art` picks
 * the scene; the default per `kind` is the sensible one for a box that shape.
 */
const artFor: Record<PlaceholderKind, ArtKind> = {
  'wide hero': 'house',
  '4:3 card': 'door',
  'square slot': 'panel',
  'full-bleed band': 'house',
  '16:9 media': 'door-open',
  'portrait card': 'interior',
  'logo lockup': 'panel',
  icon: 'panel',
};

export function Placeholder({
  kind = '4:3 card',
  tone = 'surface',
  className = '',
  label,
  fill = false,
  art,
  src,
  srcMobile,
}: {
  kind?: PlaceholderKind;
  tone?: keyof typeof tones;
  className?: string;
  label?: string;
  /** true = stretch to the parent box instead of holding its own ratio */
  fill?: boolean;
  /** Override the scene the slot draws. Defaults per `kind`. */
  art?: ArtKind;
  /** Real photograph for this slot, at the larger breakpoint. One-line swap
      over the drawn ArtPanel scene — see ArtPanel's header comment. */
  src?: string;
  /** Real photograph for the smallest breakpoint, if it differs from `src`. */
  srcMobile?: string;
}) {
  return (
    <div
      data-placeholder={kind}
      className={`relative overflow-hidden ${tones[tone]} ${
        fill ? 'absolute inset-0 h-full w-full' : `w-full rounded-xl ${ratios[kind]}`
      } ${className}`}
    >
      {src ? (
        <picture>
          {srcMobile ? <source media="(max-width: 767px)" srcSet={srcMobile} /> : null}
          <img
            src={src}
            alt={label ?? ''}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      ) : (
        <ArtPanel kind={art ?? artFor[kind]} label={label} fill rounded={false} />
      )}
    </div>
  );
}
