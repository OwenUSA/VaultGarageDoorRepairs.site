import type { ReactNode } from 'react';

/**
 * TodoFact — D-14 / D-17. The reference fills these slots with credentials,
 * accreditation marks and review-rating strips. Every one of those is a fact we
 * do not have and are forbidden to invent, so the slot survives as a VISIBLE
 * chip at the reference geometry rather than as a silently deleted band.
 *
 * Rendered visibly on purpose: a `TODO(fact)` that only exists in a comment is
 * a fact that gets forgotten. Each chip here has a matching row in
 * docs/facts-needed.md and assets/INVENTORY.md.
 *
 * Colour comes only from existing tokens — `border-border` plus the muted ink
 * for the band it sits on — so the chips cannot move contrast.mjs or
 * rendertruth.mjs, and they are never actions, so they cannot touch
 * cta-primacy.
 */
export function TodoFact({
  children,
  onBand = false,
  className = '',
}: {
  children: ReactNode;
  onBand?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center border border-border px-5 py-3 font-display text-3xs font-semibold uppercase tracking-tracked ${
        onBand ? 'text-ink-on-band-muted' : 'text-ink-muted'
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** A row of chips standing in for a deleted badge / rating strip. */
export function TodoFactRow({
  items,
  onBand = false,
  label,
}: {
  items: readonly string[];
  onBand?: boolean;
  label: string;
}) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-5">
      {items.map((i) => (
        <li key={i}>
          <TodoFact onBand={onBand}>{i}</TodoFact>
        </li>
      ))}
    </ul>
  );
}
