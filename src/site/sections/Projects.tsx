import { projects } from '@/content/projects';
import { Bullets, ChipList, SectionHeading, vars } from '@/site/ui/primitives';
import { Flow } from '@/site/ui/Flow';
import { ProjectGrid } from './ProjectGrid';

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          index="03"
          label="Selected work"
          title={
            <>
              Work I can put <span className="italic">numbers</span> on.
            </>
          }
        >
          Three deep dives with the numbers that matter, then the smaller projects behind them.
        </SectionHeading>

        <div className="space-y-6 sm:space-y-8">
          {featured.map((p, i) => (
            <article
              key={p.id}
              id={`p-${p.id}`}
              aria-labelledby={`p-${p.id}-title`}
              className="card p-6 sm:p-9 lg:p-12"
              data-reveal
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <p className="eyebrow flex items-center gap-3">
                  <span className="text-accent">0{i + 1}</span>
                  <span aria-hidden className="h-px w-6 bg-fg/20" />
                  {p.period}
                </p>
                <p className="font-mono text-xs text-faint">{p.context}</p>
              </div>

              <h3
                id={`p-${p.id}-title`}
                className="mt-6 max-w-4xl font-serif text-[clamp(2.1rem,1.4rem+2.6vw,3.9rem)] leading-[1.02] tracking-[-0.018em]"
              >
                {p.title}
              </h3>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{p.blurb}</p>

              {p.metrics && (
                <ul
                  className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-fg/10 pt-8 sm:grid-cols-3 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
                  style={vars({ '--cols': Math.min(p.metrics.length, 6) })}
                  aria-label={`${p.title} results`}
                >
                  {p.metrics.map((m) => (
                    <li key={m.label}>
                      <p className="num font-serif text-[clamp(2rem,1.6rem+1.2vw,3rem)] leading-none tracking-tight">
                        {m.value}
                      </p>
                      <p className="mt-2 text-[13px] leading-snug text-muted">{m.label}</p>
                    </li>
                  ))}
                </ul>
              )}

              {p.flow && (
                <div className="mt-10">
                  <Flow steps={p.flow} label={`${p.title} architecture`} />
                </div>
              )}

              <ChipList items={p.stack} className="mt-8" />

              <details className="disclosure mt-8 border-t border-fg/10 pt-2">
                <summary className="flex min-h-12 items-center justify-between gap-4 text-[15px] font-medium">
                  <span>How it was built</span>
                  <svg className="chev h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <Bullets items={p.bullets} className="pb-4 pt-4" />
              </details>
            </article>
          ))}
        </div>

        <div className="mt-24 sm:mt-32" data-reveal>
          <h3 className="mb-8 font-serif text-4xl leading-none tracking-tight sm:text-5xl">More projects</h3>
          <ProjectGrid projects={rest} />
        </div>
      </div>
    </section>
  );
}
