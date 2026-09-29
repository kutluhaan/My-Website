import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Custom properties (--d, --to, ...) need a cast in React's CSSProperties. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties;

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('chip', className)}>{children}</span>;
}

export function ChipList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}

export function Bullets({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('max-w-[52rem] space-y-3.5', className)}>
      {items.map((item) => (
        <li key={item} className="relative pl-6 leading-relaxed text-muted">
          <span aria-hidden className="absolute left-0 top-[0.62em] h-1.5 w-1.5 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Section header: index, hairline, label, then a big split-word title. */
export function SectionHead({
  id,
  no,
  label,
  title,
  children,
}: {
  id: string;
  no: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative mb-14 sm:mb-20">
      <span
        aria-hidden
        data-reveal
        className="display pointer-events-none absolute -top-2 right-0 hidden select-none text-[clamp(9rem,17vw,21rem)] leading-none text-transparent lg:block"
        style={{ WebkitTextStroke: '1px rgb(var(--fg) / 0.13)' }}
      >
        {no}
      </span>
      <div className="relative flex items-center gap-4">
        <span className="hud !text-accent">{no}</span>
        <span aria-hidden data-reveal="line" className="h-px flex-1 bg-fg/20" />
        <span className="hud">{label}</span>
      </div>
      <h2 id={id} data-split className="display display-lg mt-8 max-w-[16ch]">
        {title}
      </h2>
      {children ? (
        <p data-reveal className="lede mt-7 max-w-prose">
          {children}
        </p>
      ) : null}
    </div>
  );
}

/** Small "table" row: label on the left, value on the right. */
export function KV({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 border-t border-fg/[0.12] py-3.5 sm:grid-cols-[9rem_1fr]">
      <dt className="hud pt-0.5">{k}</dt>
      <dd className="text-[15px] text-fg">{children}</dd>
    </div>
  );
}
