'use client';

import { useState } from 'react';
import { kindLabels, otherProjects, type Project, type ProjectKind } from '@/content/projects';
import { cn } from '@/lib/utils';
import { Bullets, ChipList } from '@/site/ui/primitives';
import { Spotlight } from '@/site/ui/Spotlight';

type Filter = 'all' | ProjectKind;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('all');

  const kinds = (Object.keys(kindLabels) as ProjectKind[]).filter((k) =>
    projects.some((p) => p.kinds.includes(k)),
  );
  const visible = projects.filter((p) => filter === 'all' || p.kinds.includes(filter));

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {(['all', ...kinds] as Filter[]).map((k) => {
          const on = filter === k;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(k)}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-xs transition-colors',
                on
                  ? 'border-fg bg-fg text-bg'
                  : 'border-fg/15 text-muted hover:border-fg/40 hover:text-fg',
              )}
            >
              {k === 'all' ? 'All' : kindLabels[k]}
            </button>
          );
        })}
        <span className="sr-only" aria-live="polite">
          {visible.length} projects shown
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p) => (
          <Spotlight key={p.id} as="article" id={`p-${p.id}`} className="flex flex-col p-6 sm:p-7">
            <p className="eyebrow">{p.period}</p>
            <h4 className="h3 mt-3">{p.title}</h4>
            <p className="mt-1.5 font-mono text-[11px] leading-snug text-faint">{p.context}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.blurb}</p>

            {p.metrics && (
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {p.metrics.map((m) => (
                  <li key={m.label}>
                    <p className="num font-serif text-3xl leading-none">{m.value}</p>
                    <p className="mt-1 text-xs text-muted">{m.label}</p>
                  </li>
                ))}
              </ul>
            )}

            <ChipList items={p.stack.slice(0, 5)} className="mt-5" />

            <details className="disclosure mt-auto border-t border-fg/10 pt-1 [&:not([open])]:mt-6">
              <summary className="flex min-h-11 items-center justify-between text-sm font-medium">
                Details
                <svg className="chev h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <Bullets items={p.bullets} className="pb-2 pt-3 text-sm" />
              {p.stack.length > 5 && <ChipList items={p.stack.slice(5)} className="pb-3 pt-2" />}
            </details>
          </Spotlight>
        ))}

        {filter === 'all' && (
          <Spotlight as="article" id="p-others" className="p-6 sm:p-7">
            <p className="eyebrow">2022 — 2024</p>
            <h4 className="h3 mt-3">Smaller experiments</h4>
            <ul className="mt-5 space-y-4">
              {otherProjects.map((o) => (
                <li key={o.title}>
                  <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-[15px] font-medium">
                    {o.title}
                    <span className="font-mono text-[11px] font-normal text-faint">{o.when}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{o.text}</p>
                </li>
              ))}
            </ul>
          </Spotlight>
        )}
      </div>
    </div>
  );
}
