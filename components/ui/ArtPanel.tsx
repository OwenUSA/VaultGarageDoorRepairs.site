/**
 * ArtPanel — the illustrated stand-in that fills every photographic slot.
 *
 * WHY THIS EXISTS. D-09 forbids reusing the reference's photography, and no
 * commissioned photography has been supplied yet, so the 213 inventoried photo
 * slots had nothing in them: `Placeholder` painted a flat tinted rectangle and
 * the page read as a wireframe. A flat rectangle is not a neutral choice — it
 * makes an image-led layout look broken rather than unfinished.
 *
 * So every slot gets a drawn scene instead: a garage-door subject built out of
 * the site's own palette tokens. It is honest (nothing is passed off as a
 * photograph), it costs no network request, it scales to any box, and when real
 * photography arrives it is a one-line swap at the call site.
 *
 * EVERY COLOUR IS A TOKEN. The scenes are painted with `var(--color-*)` so a
 * palette change moves the artwork with the rest of the site; there is not one
 * literal hex in this file.
 *
 * The scenes are pure geometry with no randomness: the same `kind` always draws
 * the same picture, so a static export is byte-stable across builds.
 */
export type ArtKind =
  | 'door' /* a closed sectional door on a house facade */
  | 'door-open' /* the same door raised, garage interior visible */
  | 'house' /* a suburban street of rooflines — band backgrounds */
  | 'interior' /* track, spring and opener rail seen from inside */
  | 'hardware' /* close-up of a torsion spring and drum */
  | 'panel' /* flat panel/material sample — the door-styles cards */
  | 'van' /* the service van at the kerb */
  | 'skyline'; /* the metro skyline — the stats band watermark */

/** `sky` washes for the outdoor scenes, deepest last. */
function Sky({ id, dark }: { id: string; dark: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop
        offset="0"
        stopColor={dark ? 'var(--color-primary-deep)' : 'var(--color-brand)'}
        stopOpacity={dark ? 1 : 0.85}
      />
      <stop offset="1" stopColor="var(--color-primary-deep)" stopOpacity="1" />
    </linearGradient>
  );
}

/** One sectional garage door: `rows` panels, each divided into `cols` lights. */
function SectionalDoor({
  x,
  y,
  w,
  h,
  rows = 4,
  cols = 4,
  windows = true,
  open = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rows?: number;
  cols?: number;
  windows?: boolean;
  /** 0 = shut, 1 = fully raised. Raising slides the panels up behind the head. */
  open?: number;
}) {
  const visible = h * (1 - open);
  const rowH = h / rows;
  const top = y + (h - visible);
  return (
    <g>
      {/* the opening behind the door — always drawn, so raising reveals it */}
      <rect x={x} y={y} width={w} height={h} fill="var(--color-primary-deep)" />
      <g clipPath={`url(#clip-door)`}>
        {Array.from({ length: rows }, (_, i) => {
          const ry = top + i * rowH;
          if (ry + rowH <= y) return null;
          return (
            <g key={i}>
              <rect
                x={x}
                y={ry}
                width={w}
                height={rowH - 2}
                fill="var(--color-neutral-0)"
                fillOpacity={0.93 - i * 0.04}
              />
              {/* the stile lines that make a panel read as a panel */}
              {Array.from({ length: cols }, (_, c) => (
                <rect
                  key={c}
                  x={x + 8 + (c * (w - 16)) / cols}
                  y={ry + 6}
                  width={(w - 16) / cols - 8}
                  height={rowH - 16}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeOpacity="0.18"
                  strokeWidth="2"
                />
              ))}
              {/* the glazed top row */}
              {windows && i === 0
                ? Array.from({ length: cols }, (_, c) => (
                    <rect
                      key={`w${c}`}
                      x={x + 12 + (c * (w - 16)) / cols}
                      y={ry + 10}
                      width={(w - 16) / cols - 16}
                      height={rowH - 24}
                      fill="var(--color-brand)"
                      fillOpacity="0.35"
                    />
                  ))
                : null}
            </g>
          );
        })}
      </g>
      {/* the head jamb, and the amber weather seal along the bottom rail */}
      <rect x={x - 6} y={y - 8} width={w + 12} height={8} fill="var(--color-primary)" />
      {open < 0.9 ? (
        <rect x={x} y={y + h - 4} width={w} height={4} fill="var(--color-amber)" />
      ) : null}
    </g>
  );
}

/**
 * A run of rooflines. Used as the band watermark and behind the hero.
 *
 * `scale` exists because the same run has to work at two very different jobs:
 * a faint 78px-tall watermark strip in the header, and the whole subject of a
 * 4:3 card. At scale 1 the card was ~85% empty sky and read as a flat
 * rectangle; the houses have to be sized to the box, not to the viewBox.
 */
function Rooflines({
  y,
  w,
  opacity,
  scale = 1,
}: {
  y: number;
  w: number;
  opacity: number;
  scale?: number;
}) {
  const houses = [];
  let x = -40;
  let i = 0;
  while (x < w + 60) {
    const hw = (110 + ((i * 37) % 70)) * scale;
    const hh = (70 + ((i * 53) % 46)) * scale;
    houses.push(
      <g key={i}>
        <path
          d={`M${x} ${y} L${x} ${y - hh} L${x + hw / 2} ${y - hh - 34 * scale} L${x + hw} ${y - hh} L${x + hw} ${y} Z`}
        />
        <rect x={x + hw * 0.28} y={y - hh * 0.55} width={hw * 0.44} height={hh * 0.55} />
      </g>,
    );
    x += hw + 18 * scale;
    i += 1;
  }
  return (
    <g fill="var(--color-neutral-0)" fillOpacity={opacity}>
      {houses}
    </g>
  );
}

function Scene({ kind }: { kind: ArtKind }) {
  const W = 800;
  const H = 600;

  if (kind === 'house' || kind === 'skyline') {
    const dark = kind === 'house';
    /* xMidYMax, not xMidYMid: the subject of this scene is the roofline along
       the BOTTOM edge. Centre-cropped into a 4:3 card it framed the empty sky
       and the card painted as a flat navy rectangle — which is exactly the
       failure ArtPanel exists to remove. Anchoring the crop to the bottom keeps
       the houses in frame at every box shape. */
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <Sky id="sky-h" dark={dark} />
        </defs>
        <rect width={W} height={H} fill="url(#sky-h)" />
        <Rooflines y={H - 190} w={W} opacity={0.13} scale={2.4} />
        <Rooflines y={H - 40} w={W} opacity={0.3} scale={1.9} />
        <rect y={H - 40} width={W} height={40} fill="var(--color-primary-deep)" />
        <rect y={H - 44} width={W} height={4} fill="var(--color-amber)" />
      </svg>
    );
  }

  if (kind === 'hardware') {
    /* A torsion spring on its shaft, with the cable drum at one end. The coil
       is drawn as a run of ellipses rather than a path so the pitch stays even
       at any box width. */
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width={W} height={H} fill="var(--color-primary)" />
        <Rooflines y={H} w={W} opacity={0.05} />
        <rect x={60} y={H / 2 - 6} width={W - 120} height={12} fill="var(--color-neutral-0)" fillOpacity="0.25" />
        {Array.from({ length: 26 }, (_, i) => (
          <ellipse
            key={i}
            cx={190 + i * 15}
            cy={H / 2}
            rx={7}
            ry={54}
            fill="none"
            stroke="var(--color-amber)"
            strokeOpacity={0.85}
            strokeWidth="5"
          />
        ))}
        <circle cx={120} cy={H / 2} r={62} fill="var(--color-neutral-0)" fillOpacity="0.9" />
        <circle cx={120} cy={H / 2} r={40} fill="var(--color-primary)" />
        <circle cx={120} cy={H / 2} r={12} fill="var(--color-amber)" />
        <circle cx={W - 110} cy={H / 2} r={44} fill="var(--color-neutral-0)" fillOpacity="0.9" />
        <circle cx={W - 110} cy={H / 2} r={16} fill="var(--color-primary)" />
      </svg>
    );
  }

  if (kind === 'interior') {
    /* Seen from inside: the opener rail down the centre, vertical track up the
       left, and the daylight gap under a door that is part-raised. */
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width={W} height={H} fill="var(--color-primary-deep)" />
        <rect x={0} y={H - 150} width={W} height={150} fill="var(--color-amber)" fillOpacity="0.16" />
        <rect x={90} y={0} width={16} height={H - 150} fill="var(--color-neutral-0)" fillOpacity="0.3" />
        <path
          d={`M90 200 Q90 90 240 84 L${W - 60} 84`}
          fill="none"
          stroke="var(--color-neutral-0)"
          strokeOpacity="0.3"
          strokeWidth="16"
        />
        <rect x={W - 190} y={40} width={130} height={92} rx={8} fill="var(--color-neutral-0)" fillOpacity="0.9" />
        <circle cx={W - 125} cy={148} r={14} fill="var(--color-amber)" />
        {Array.from({ length: 3 }, (_, i) => (
          <rect
            key={i}
            x={140}
            y={200 + i * 66}
            width={W - 220}
            height={54}
            fill="var(--color-neutral-0)"
            fillOpacity={0.14 + i * 0.05}
          />
        ))}
        <rect x={0} y={H - 12} width={W} height={12} fill="var(--color-amber)" />
      </svg>
    );
  }

  if (kind === 'panel') {
    /* A flat material sample: the door-styles and parts cards. Reads as a
       swatch rather than a scene, which is what those small boxes want. */
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width={W} height={H} fill="var(--color-primary)" />
        {Array.from({ length: 4 }, (_, i) => (
          <g key={i}>
            <rect
              x={0}
              y={i * (H / 4)}
              width={W}
              height={H / 4 - 4}
              fill="var(--color-neutral-0)"
              fillOpacity={0.1 + i * 0.05}
            />
            {Array.from({ length: 5 }, (_, c) => (
              <rect
                key={c}
                x={30 + c * ((W - 60) / 5)}
                y={i * (H / 4) + 18}
                width={(W - 60) / 5 - 24}
                height={H / 4 - 44}
                fill="none"
                stroke="var(--color-neutral-0)"
                strokeOpacity="0.22"
                strokeWidth="3"
              />
            ))}
          </g>
        ))}
        <rect x={0} y={0} width={W} height={H / 4 - 4} fill="var(--color-amber)" fillOpacity="0.22" />
      </svg>
    );
  }

  if (kind === 'van') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <Sky id="sky-v" dark />
        </defs>
        <rect width={W} height={H} fill="url(#sky-v)" />
        <Rooflines y={H - 130} w={W} opacity={0.1} />
        <rect y={H - 130} width={W} height={130} fill="var(--color-primary-deep)" />
        <path
          d={`M110 ${H - 160} L110 ${H - 300} L470 ${H - 300} L470 ${H - 250} L610 ${H - 240} L660 ${H - 160} Z`}
          fill="var(--color-neutral-0)"
          fillOpacity="0.94"
        />
        <path d={`M480 ${H - 292} L590 ${H - 246} L480 ${H - 246} Z`} fill="var(--color-brand)" />
        <rect x={140} y={H - 272} width={290} height={54} fill="var(--color-amber)" />
        <rect x={110} y={H - 175} width={550} height={16} fill="var(--color-brand)" />
        <circle cx={210} cy={H - 150} r={40} fill="var(--color-primary-deep)" />
        <circle cx={210} cy={H - 150} r={17} fill="var(--color-amber)" />
        <circle cx={580} cy={H - 150} r={40} fill="var(--color-primary-deep)" />
        <circle cx={580} cy={H - 150} r={17} fill="var(--color-amber)" />
      </svg>
    );
  }

  /* door / door-open — the default facade */
  const open = kind === 'door-open' ? 0.55 : 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <Sky id="sky-d" dark />
        <clipPath id="clip-door">
          <rect x={150} y={190} width={500} height={300} />
        </clipPath>
      </defs>
      <rect width={W} height={H} fill="url(#sky-d)" />
      <Rooflines y={H - 110} w={W} opacity={0.08} />
      {/* the facade the door sits in */}
      <path d={`M90 ${H} L90 250 L400 120 L710 250 L710 ${H} Z`} fill="var(--color-neutral-0)" fillOpacity="0.12" />
      <path d={`M60 258 L400 105 L740 258`} fill="none" stroke="var(--color-amber)" strokeWidth="10" />
      <SectionalDoor x={150} y={190} w={500} h={300} open={open} />
      {/* driveway */}
      <rect y={H - 110} width={W} height={110} fill="var(--color-primary-deep)" />
      <rect y={H - 110} width={W} height={4} fill="var(--color-neutral-0)" fillOpacity="0.2" />
    </svg>
  );
}

/**
 * `fill` stretches the scene to the parent box (a band background); otherwise
 * the panel holds its own aspect ratio, which is what a card slot wants.
 */
export function ArtPanel({
  kind = 'door',
  className = '',
  label,
  fill = false,
  rounded = true,
}: {
  kind?: ArtKind;
  className?: string;
  label?: string;
  fill?: boolean;
  rounded?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? 'Illustration of a garage door'}
      data-art={kind}
      className={`overflow-hidden bg-band ${rounded && !fill ? 'rounded-xl' : ''} ${
        fill ? 'absolute inset-0 h-full w-full' : 'aspect-[4/3] w-full'
      } ${className}`}
    >
      <Scene kind={kind} />
    </div>
  );
}
