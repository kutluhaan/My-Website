import { kindLabels, otherProjects, projects, type Project, type Tone } from '@/content/projects';
import { cn } from '@/lib/utils';
import { Cover, CoverArt } from '@/site/art/Cover';
import { Flow } from '@/site/ui/Flow';
import { Bullets, ChipList, SectionHeading } from '@/site/ui/primitives';
import { Spotlight } from '@/site/ui/Spotlight';
import { ProjectGrid, type GridItem } from './ProjectGrid';

const metricBg: Record<Tone, string> = {
  coral: 'bg-coral/25',
  sun: 'bg-sun/35',
  mint: 'bg-mint/25',
  sky: 'bg-sky/30',
  lilac: 'bg-lilac/30',
  pink: 'bg-pink/30',
};

const chevron = (
  <svg className="chev h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function Featured({ p, i }: { p: Project; i: number }) {
  return (
    <article id={`p-${p.id}`} aria-labelledby={`p-${p.id}-title`} className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={cn('lg:col-span-5 lg:sticky lg:top-28', i % 2 === 1 && 'lg:order-2')} data-reveal={i % 2 ? 'right' : 'left'}>
        <Cover kind={p.cover} tilt />
        <p className="mt-5 hidden font-mono text-xs text-faint lg:block">{p.context}</p>
      </div>

      <div className="lg:col-span-7" data-reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className={cn('grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] text-fg', metricBg[p.tone])}>0{i + 1}</span>
          {p.period}
        </p>
        <h3 id={`p-${p.id}-title`} className="mt-5 max-w-3xl font-serif text-[clamp(2.1rem,1.4rem+2.6vw,3.9rem)] leading-[1.02] tracking-[-0.018em]">
          {p.title}
        </h3>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">{p.blurb}</p>
        <p className="mt-3 font-mono text-xs text-faint lg:hidden">{p.context}</p>

        {p.metrics && (
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label={`${p.title} results`}>
            {p.metrics.map((m) => (
              <li key={m.label} className={cn('rounded-2xl px-4 py-3.5', metricBg[p.tone])}>
                <p className="num font-serif text-[clamp(1.6rem,1.3rem+0.9vw,2.2rem)] leading-none tracking-tight">{m.value}</p>
                <p className="mt-1.5 text-[12.5px] leading-snug text-fg/90">{m.label}</p>
              </li>
            ))}
          </ul>
        )}

        {p.flow && (
          <div className="mt-8">
            <Flow steps={p.flow} label={`${p.title} architecture`} />
          </div>
        )}

        <ChipList items={p.stack} className="mt-7" />

        <details className="disclosure mt-7 rounded-2xl border border-fg/[0.08] bg-surface px-5 py-1">
          <summary className="flex min-h-12 items-center justify-between gap-4 text-[15px] font-medium">
            <span>
              How it was built <span className="ml-1 font-mono text-xs font-normal text-faint">{p.bullets.length} points</span>
            </span>
            {chevron}
          </summary>
          <Bullets items={p.bullets} className="pb-4 pt-3" />
        </details>
      </div>
    </article>
  );
}

function Compact({ p }: { p: Project }) {
  return (
    <Spotlight as="article" id={`p-${p.id}`} className="lift flex h-full flex-col overflow-hidden">
      <div data-live className="relative aspect-[10/7] overflow-hidden">
        <CoverArt kind={p.cover} />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow">{p.period}</p>
        <h4 className="h3 mt-3">{p.title}</h4>
        <p className="mt-1.5 font-mono text-[11px] leading-snug text-faint">{p.context}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.blurb}</p>

        {p.metrics && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.metrics.map((m) => (
              <li key={m.label} className={cn('rounded-xl px-3 py-2', metricBg[p.tone])}>
                <span className="num font-serif text-xl leading-none">{m.value}</span>
                <span className="ml-2 text-xs text-fg/90">{m.label}</span>
              </li>
            ))}
          </ul>
        )}

        <ChipList items={p.stack.slice(0, 5)} className="mt-5" />

        <details className="disclosure mt-auto border-t border-fg/10 pt-1 [&:not([open])]:mt-6">
          <summary className="flex min-h-11 items-center justify-between text-sm font-medium">
            Details
            {chevron}
          </summary>
          <Bullets items={p.bullets} className="pb-2 pt-3 text-sm" />
          {p.stack.length > 5 && <ChipList items={p.stack.slice(5)} className="pb-3 pt-2" />}
        </details>
      </div>
    </Spotlight>
  );
}

function Others() {
  return (
    <Spotlight as="article" id="p-others" className="lift flex h-full flex-col overflow-hidden">
      <div data-live className="relative aspect-[10/7] overflow-hidden">
        <CoverArt kind="others" />
      </div>
      <div className="p-6 sm:p-7">
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
      </div>
    </Spotlight>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const kinds = Object.keys(kindLabels).filter((k) => rest.some((p) => p.kinds.includes(k as never)));
  const labels = Object.fromEntries(kinds.map((k) => [k, kindLabels[k as keyof typeof kindLabels]]));

  const items: GridItem[] = [
    ...rest.map((p) => ({ id: p.id, kinds: p.kinds as string[], node: <Compact p={p} /> })),
    { id: 'others', kinds: ['all-only'], node: <Others /> },
  ];

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          index="03"
          label="Selected work"
          title={
            <>
              Work I can put <span className="italic mark">numbers</span> on.
            </>
          }
        >
          Three deep dives with the numbers that matter, then the smaller projects behind them.
        </SectionHeading>

        <div className="space-y-24 sm:space-y-32">
          {featured.map((p, i) => (
            <Featured key={p.id} p={p} i={i} />
          ))}
        </div>

        <div className="mt-28 sm:mt-36" data-reveal>
          <h3 className="mb-8 font-serif text-4xl leading-none tracking-tight sm:text-5xl">
            More <span className="italic mark">projects</span>
          </h3>
          <ProjectGrid items={items} labels={labels} />
        </div>
      </div>
    </section>
  );
}
