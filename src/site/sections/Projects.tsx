import { ArrowUpRight, X } from 'lucide-react';
import { kindLabels, otherProjects, projects, type Project } from '@/content/projects';
import { Cover } from '@/site/art/Cover';
import { Flow } from '@/site/ui/Flow';
import { Bullets, ChipList, SectionHead } from '@/site/ui/primitives';

const ids = [...projects.map((p) => p.id), 'others'];
const pad = (n: number) => String(n).padStart(2, '0');
const rowGrid = 'grid-cols-[2rem_1fr_1.5rem] gap-4 sm:grid-cols-[3rem_1fr_1.5rem] md:grid-cols-[3rem_1fr_16rem_9rem_1.5rem]';

function Row({ p, i }: { p: Project; i: number }) {
  return (
    <li data-kinds={p.kinds.join(' ')} data-reveal style={{ transitionDelay: `${(i % 5) * 50}ms` }}>
      <button type="button" data-case={p.id} aria-label={`Open case file: ${p.title}`} className={`wrow w-full px-1 py-6 text-left md:px-3 ${rowGrid}`}>
        <span className="hud num">{pad(i + 1)}</span>
        <span>
          <span className="display block text-[clamp(1.5rem,1.05rem+1.5vw,2.4rem)] leading-tight">{p.short}</span>
          <span className="hud mt-1.5 block md:hidden">{p.period}</span>
        </span>
        <span className="hidden text-[14px] text-muted md:block">{p.kinds.map((k) => kindLabels[k]).join(' · ')}</span>
        <span className="hud hidden md:block">{p.period}</span>
        <ArrowUpRight className="go h-5 w-5 text-faint" aria-hidden />
      </button>
    </li>
  );
}

function OthersRow({ i }: { i: number }) {
  return (
    <li data-kinds="all-only" data-reveal>
      <button type="button" data-case="others" aria-label="Open case file: smaller experiments" className={`wrow w-full px-1 py-6 text-left md:px-3 ${rowGrid}`}>
        <span className="hud num">{pad(i + 1)}</span>
        <span className="display block text-[clamp(1.5rem,1.05rem+1.5vw,2.4rem)] leading-tight">Smaller experiments</span>
        <span className="hidden text-[14px] text-muted md:block">4 projects</span>
        <span className="hud hidden md:block">2022 — 24</span>
        <ArrowUpRight className="go h-5 w-5 text-faint" aria-hidden />
      </button>
    </li>
  );
}

function CaseShell({ id, no, children }: { id: string; no: number; children: React.ReactNode }) {
  const prev = ids[(no - 1 + ids.length) % ids.length];
  const next = ids[(no + 1) % ids.length];
  return (
    <dialog id={`case-${id}`} className="case" data-lenis-prevent aria-label="Case file">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-fg/10 bg-bg/90 px-6 py-3.5 backdrop-blur-md sm:px-10">
        <p className="hud">
          Case file {pad(no + 1)} of {pad(ids.length)}
        </p>
        <button type="button" data-close className="btn btn-ghost !min-h-9 !px-3.5 !text-[13px]" aria-label="Close case file">
          Close <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
      <div className="px-6 pb-16 pt-10 sm:px-10">{children}</div>
      <div className="grid grid-cols-2 border-t border-fg/10">
        <button type="button" data-case-go={prev} className="p-6 text-left text-[15px] text-muted transition-colors hover:bg-fg/[0.04] hover:text-fg">
          ← Previous
        </button>
        <button type="button" data-case-go={next} className="border-l border-fg/10 p-6 text-right text-[15px] text-muted transition-colors hover:bg-fg/[0.04] hover:text-fg">
          Next →
        </button>
      </div>
    </dialog>
  );
}

function ProjectCase({ p, no }: { p: Project; no: number }) {
  return (
    <CaseShell id={p.id} no={no}>
      <p className="hud">
        {p.period} · {p.context}
      </p>
      <h3 className="display display-md mt-4 max-w-[24ch]">{p.title}</h3>
      <p className="lede mt-6 max-w-prose">{p.blurb}</p>

      <div className="mt-8 max-w-3xl" data-cover>
        <Cover kind={p.cover} />
      </div>

      {p.metrics && (
        <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3" aria-label={`${p.title} results`}>
          {p.metrics.map((m) => (
            <li key={m.label} className="border-t border-fg/10 pt-4">
              <p className="display num text-[clamp(1.8rem,1.3rem+1.4vw,2.8rem)] leading-none">{m.value}</p>
              <p className="mt-3 text-[13px] leading-snug text-muted">{m.label}</p>
            </li>
          ))}
        </ul>
      )}

      {p.flow && (
        <div className="mt-10">
          <p className="hud mb-3">Architecture</p>
          <Flow steps={p.flow} label={`${p.title} architecture`} />
        </div>
      )}

      <p className="hud mb-3 mt-10">Stack</p>
      <ChipList items={p.stack} />

      <p className="hud mb-4 mt-10">Build log</p>
      <Bullets items={p.bullets} />
    </CaseShell>
  );
}

function OthersCase({ no }: { no: number }) {
  return (
    <CaseShell id="others" no={no}>
      <p className="hud">2022 — 2024 · course and side projects</p>
      <h3 className="display display-md mt-4">Smaller experiments</h3>
      <div className="mt-8 max-w-3xl" data-cover>
        <Cover kind="others" />
      </div>
      <ul className="mt-10 border-t border-fg/10">
        {otherProjects.map((o) => (
          <li key={o.title} className="grid gap-2 border-b border-fg/10 py-5 sm:grid-cols-[14rem_1fr_9rem] sm:gap-6">
            <p className="display text-2xl leading-tight">{o.title}</p>
            <p className="text-[15px] text-muted">{o.text}</p>
            <p className="hud sm:text-right">{o.when}</p>
          </li>
        ))}
      </ul>
    </CaseShell>
  );
}

export function Projects() {
  const kinds = Object.keys(kindLabels).filter((k) => projects.some((p) => p.kinds.includes(k as never)));

  return (
    <>
      <section id="projects" aria-labelledby="projects-title" className="section relative">
        <div className="container-page">
          <SectionHead
            id="projects-title"
            no="03"
            label="Selected work"
            title={
              <>
                Work I can put <span className="em">numbers</span> on.
              </>
            }
          >
            Ten projects, each with a case file: results, architecture and how it was built. Pick one to open it.
          </SectionHead>

          <div data-filter-group role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-x-6 gap-y-2">
            {['all', ...kinds].map((k, i) => (
              <button
                key={k}
                type="button"
                data-filter={k}
                aria-pressed={i === 0}
                className="border-b border-transparent pb-1.5 text-[15px] text-muted transition-colors hover:text-fg aria-pressed:border-accent aria-pressed:text-fg"
              >
                {k === 'all' ? 'All' : kindLabels[k as keyof typeof kindLabels]}
              </button>
            ))}
          </div>

          <ul className="border-b border-fg/10">
            {projects.map((p, i) => (
              <Row key={p.id} p={p} i={i} />
            ))}
            <OthersRow i={projects.length} />
          </ul>
        </div>
      </section>

      {projects.map((p, i) => (
        <ProjectCase key={p.id} p={p} no={i} />
      ))}
      <OthersCase no={projects.length} />
    </>
  );
}
