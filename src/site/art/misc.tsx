import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { tm, type Tone } from './kit';

/* Small, single-purpose illustrations. */

const chipBg: Record<Tone, string> = {
  coral: 'bg-coral/25',
  sun: 'bg-sun/35',
  mint: 'bg-mint/30',
  sky: 'bg-sky/35',
  lilac: 'bg-lilac/35',
  pink: 'bg-pink/35',
};

export function IconTile({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={cn('grid h-14 w-14 place-items-center rounded-2xl', chipBg[tone])}>
      <svg viewBox="0 0 48 48" width="34" height="34" fill="none" aria-hidden>
        {children}
      </svg>
    </span>
  );
}

/** Measured results: bars climbing to a target. */
export function ChartIcon() {
  return (
    <IconTile tone="mint">
      {[12, 20, 28, 36].map((h, i) => (
        <rect key={i} x={7 + i * 10} y={42 - h} width="6" height={h} rx="2.5" className="fill-fg/70" />
      ))}
      <path d="M6 20 L18 14 L28 18 L42 6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent" />
    </IconTile>
  );
}

/** Model + system: stacked layers. */
export function LayersIcon() {
  return (
    <IconTile tone="lilac">
      <path d="M24 6 L42 15 L24 24 L6 15z" className="fill-fg/75" />
      <path d="M6 24 L24 33 L42 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-fg/60" />
      <path d="M6 33 L24 42 L42 33" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent" />
    </IconTile>
  );
}

/** Real market: candles. */
export function CandlesIcon() {
  return (
    <IconTile tone="sun">
      {[
        [10, 16, 30, 'fill-mint'],
        [22, 10, 26, 'fill-coral'],
        [34, 14, 34, 'fill-mint'],
      ].map(([x, y, h, c], i) => (
        <g key={i}>
          <line x1={(x as number) + 3} x2={(x as number) + 3} y1={(y as number) - 4} y2={(y as number) + (h as number) - 8} strokeWidth="2" className="stroke-fg/50" />
          <rect x={x as number} y={y as number} width="7" height={(h as number) - 12} rx="2" className={c as string} />
        </g>
      ))}
    </IconTile>
  );
}

/** Certificate seal: a scalloped ring with initials. */
export function Seal({ tone, code }: { tone: Tone; code: string }) {
  const fills: Record<Tone, string> = {
    coral: 'fill-coral',
    sun: 'fill-sun',
    mint: 'fill-mint',
    sky: 'fill-sky',
    lilac: 'fill-lilac',
    pink: 'fill-pink',
  };
  const soft: Record<Tone, string> = {
    coral: 'fill-coral/35',
    sun: 'fill-sun/45',
    mint: 'fill-mint/35',
    sky: 'fill-sky/40',
    lilac: 'fill-lilac/40',
    pink: 'fill-pink/40',
  };
  const pts = Array.from({ length: 24 })
    .map((_, i) => {
      const a = (Math.PI * 2 * i) / 24;
      const r = i % 2 ? 29 : 32;
      return `${32 + r * Math.cos(a)},${32 + r * Math.sin(a)}`;
    })
    .join(' ');
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden className="shrink-0">
      <polygon points={pts} className={soft[tone]} />
      <circle cx="32" cy="32" r="22" className={fills[tone]} />
      <circle cx="32" cy="32" r="22" fill="none" strokeWidth="1.5" strokeDasharray="2 3.5" className="stroke-surface" />
      <text x="32" y="36" textAnchor="middle" fontSize={code.length > 3 ? 10 : 12} fontWeight="700" className="fill-fg font-mono">
        {code}
      </text>
    </svg>
  );
}

/** Paper plane with a dotted trail, for the contact card. */
export function PaperPlane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 160" className={cn('h-auto w-full', className)} aria-hidden>
      <path d="M8 138 C 40 138, 60 96, 96 96 S 150 70, 176 44" fill="none" strokeWidth="2.5" strokeLinecap="round" className="a-dash stroke-accent/50" />
      <g className="plane tb" style={tm(0, 7)}>
        <g transform="translate(150 20)">
          <path d="M0 28 L58 4 L38 52 L28 34z" className="fill-accent" />
          <path d="M28 34 L58 4 L34 38z" className="fill-accent/60" />
          <path d="M28 34 L26 48 L34 38z" className="fill-lilac" />
        </g>
      </g>
      <circle cx="30" cy="132" r="4" className="a-blink fill-sun" style={tm(0, 2)} />
      <circle cx="70" cy="110" r="3" className="a-blink fill-mint" style={tm(0.6, 2)} />
      <circle cx="120" cy="84" r="3.5" className="a-blink fill-coral" style={tm(1.2, 2)} />
    </svg>
  );
}

/** Three stacked slabs for "model to metal". */
export function StackLayers() {
  const layers = [
    { label: 'AI & LLM', sub: 'agents · RAG · evals', fill: 'fill-lilac', y: 20 },
    { label: 'Backend', sub: 'FastAPI · Kafka · gRPC', fill: 'fill-sky', y: 96 },
    { label: 'Cloud & DevOps', sub: 'Docker · k8s · CI/CD', fill: 'fill-mint', y: 172 },
  ];
  return (
    <svg viewBox="0 0 360 300" className="h-auto w-full" role="img" aria-label="Three layers: AI and LLM systems on top, backend services in the middle, cloud and DevOps at the base">
      {layers.map((l, i) => (
        <g key={l.label} className="a-bob" style={tm(i * 0.6, 6)}>
          <path d={`M180 ${l.y + 40} L330 ${l.y + 8} L180 ${l.y - 24} L30 ${l.y + 8}z`} className={cn(l.fill, 'opacity-25')} transform="translate(0 40)" />
          <path d={`M30 ${l.y + 48} L180 ${l.y + 80} L330 ${l.y + 48} V${l.y + 62} L180 ${l.y + 94} L30 ${l.y + 62}z`} className="fill-fg/10" />
          <path d={`M180 ${l.y + 80} L330 ${l.y + 48} L180 ${l.y + 16} L30 ${l.y + 48}z`} className={cn(l.fill, 'stroke-surface')} strokeWidth="3" strokeLinejoin="round" />
          <text x="180" y={l.y + 46} textAnchor="middle" fontSize="15" fontWeight="600" className="fill-fg font-sans">
            {l.label}
          </text>
          <text x="180" y={l.y + 64} textAnchor="middle" fontSize="10.5" className="fill-fg/70 font-mono">
            {l.sub}
          </text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <line key={i} x1="180" x2="180" y1={100 + i * 76} y2={116 + i * 76} strokeWidth="2.5" strokeLinecap="round" className="a-dash stroke-accent" />
      ))}
    </svg>
  );
}
