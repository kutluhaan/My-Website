import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * HUD illustration kit. Everything is hairline strokes on a blueprint grid:
 * squares instead of circles, mono labels, one amber signal colour.
 */

/** Animation timing as CSS variables: seconds of delay, seconds of loop. */
export const tm = (d = 0, t?: number, extra?: Record<string, string>) =>
  ({ '--d': `${d}s`, ...(t ? { '--t': `${t}s` } : {}), ...extra }) as CSSProperties;

export function Sheet({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 280" role="img" aria-label={label} className="absolute inset-0 block h-full w-full" preserveAspectRatio="xMidYMid slice">
      {children}
    </svg>
  );
}

/** Outlined rectangle. */
export function Box({
  x,
  y,
  w,
  h,
  className = 'stroke-fg/40 fill-none',
  dash,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  className?: string;
  dash?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} strokeWidth={1} strokeDasharray={dash} className={className} />;
}

export function T({
  x,
  y,
  children,
  size = 8.5,
  className = 'fill-faint',
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
    <text x={x} y={y} fontSize={size} textAnchor={anchor} fontWeight={weight} letterSpacing="0.06em" className={cn('font-mono', className)}>
      {children}
    </text>
  );
}

/** Solid amber label block. */
export function Tag({ x, y, w, text, h = 15 }: { x: number; y: number; w: number; text: string; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="fill-accent" />
      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={8} fontWeight={700} letterSpacing="0.08em" className="fill-accent-fg font-mono">
        {text}
      </text>
    </g>
  );
}

/** Outlined label. */
export function Lab({ x, y, w, text, h = 15, className = 'fill-muted' }: { x: number; y: number; w: number; text: string; h?: number; className?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="fill-bg/60 stroke-fg/30" strokeWidth={1} />
      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={8} letterSpacing="0.06em" className={cn('font-mono', className)}>
        {text}
      </text>
    </g>
  );
}

/**
 * A framed figure: blueprint grid, amber corner ticks, figure caption.
 * `data-live` lets the behaviour layer pause the animation off-screen.
 */
export function Figure({
  no,
  title,
  children,
  className,
  ratio = 'aspect-[10/7]',
}: {
  no: string;
  title: string;
  children: ReactNode;
  className?: string;
  ratio?: string;
}) {
  return (
    <figure data-live className={cn('panel ticks blueprint relative m-0 overflow-hidden', ratio, className)}>
      {children}
      <figcaption className="hud pointer-events-none absolute left-3 top-2.5 z-[4] !text-[10px] !text-muted">
        FIG.{no} <span className="text-faint">/ {title}</span>
      </figcaption>
    </figure>
  );
}
