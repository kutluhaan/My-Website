import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Illustration kit: tiny helpers so every cover shares one visual language. */

export type Tone = 'coral' | 'sun' | 'mint' | 'sky' | 'lilac' | 'pink';

// Literal class names so Tailwind can see them.
export const wash: Record<Tone, string> = {
  coral: 'fill-coral/20',
  sun: 'fill-sun/25',
  mint: 'fill-mint/20',
  sky: 'fill-sky/25',
  lilac: 'fill-lilac/25',
  pink: 'fill-pink/25',
};
export const blob: Record<Tone, string> = {
  coral: 'fill-coral/35',
  sun: 'fill-sun/45',
  mint: 'fill-mint/35',
  sky: 'fill-sky/40',
  lilac: 'fill-lilac/40',
  pink: 'fill-pink/40',
};
export const solid: Record<Tone, string> = {
  coral: 'fill-coral',
  sun: 'fill-sun',
  mint: 'fill-mint',
  sky: 'fill-sky',
  lilac: 'fill-lilac',
  pink: 'fill-pink',
};
export const soft: Record<Tone, string> = {
  coral: 'fill-coral/40',
  sun: 'fill-sun/50',
  mint: 'fill-mint/40',
  sky: 'fill-sky/45',
  lilac: 'fill-lilac/45',
  pink: 'fill-pink/45',
};
export const line: Record<Tone, string> = {
  coral: 'stroke-coral',
  sun: 'stroke-sun',
  mint: 'stroke-mint',
  sky: 'stroke-sky',
  lilac: 'stroke-lilac',
  pink: 'stroke-pink',
};

/** Animation timing as CSS variables: seconds of delay, seconds of loop. */
export const tm = (d = 0, t?: number, extra?: Record<string, string>) =>
  ({ '--d': `${d}s`, ...(t ? { '--t': `${t}s` } : {}), ...extra }) as CSSProperties;

export function Frame({
  tone,
  label,
  children,
  className,
  decor = true,
}: {
  tone: Tone;
  label: string;
  children: ReactNode;
  className?: string;
  decor?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 280"
      role="img"
      aria-label={label}
      className={cn('block h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="280" className={wash[tone]} />
      {decor && (
        <>
          <circle cx="352" cy="30" r="112" className={blob[tone]} />
          <circle cx="24" cy="276" r="84" className="fill-surface/55" />
        </>
      )}
      {children}
    </svg>
  );
}

/** A white "UI card" with a soft offset shadow. */
export function Card({
  x,
  y,
  w,
  h,
  r = 14,
  className,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <g className={className}>
      <rect x={x} y={y + 5} width={w} height={h} rx={r} className="fill-fg/[0.07]" />
      <rect x={x} y={y} width={w} height={h} rx={r} className="fill-surface stroke-fg/10" />
      {children}
    </g>
  );
}

/** Skeleton "text" line. */
export function Bar({
  x,
  y,
  w,
  h = 5,
  className = 'fill-fg/15',
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  className?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={className} />;
}

export function Pill({
  x,
  y,
  w,
  h = 18,
  text,
  fill = 'fill-surface',
  ink = 'fill-fg',
  size = 9.5,
  stroke = 'stroke-fg/10',
  className,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  text: string;
  fill?: string;
  ink?: string;
  size?: number;
  stroke?: string;
  className?: string;
}) {
  return (
    <g className={className}>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} className={cn(fill, stroke)} />
      <text
        x={x + w / 2}
        y={y + h / 2 + size * 0.36}
        textAnchor="middle"
        fontSize={size}
        className={cn('font-mono', ink)}
      >
        {text}
      </text>
    </g>
  );
}

export function Txt({
  x,
  y,
  children,
  size = 10,
  className = 'fill-fg',
  anchor = 'start',
  weight,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  className?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      fontWeight={weight}
      className={cn('font-mono', className)}
    >
      {children}
    </text>
  );
}

/** Three window-chrome dots. */
export function Chrome({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="3.2" className="fill-coral" />
      <circle cx={x + 10} cy={y} r="3.2" className="fill-sun" />
      <circle cx={x + 20} cy={y} r="3.2" className="fill-mint" />
    </g>
  );
}
