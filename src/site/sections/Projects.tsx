import { ArrowUpRight, X } from 'lucide-react';
import { kindLabels, otherProjects, projects, type Project } from '@/content/projects';
import { Cover } from '@/site/art/Cover';
import { Flow } from '@/site/ui/Flow';
import { Bullets, ChipList, SectionHead } from '@/site/ui/primitives';

const ids = [...projects.map((p) => p.id), 'others'];
const pad = (n: number) => String(n).padStart(2, '0');

function Row({ p, i }: { p: Project; i: number }) {
  return (
    <li data-kinds={p.kinds.join(' ')} data-reveal style={{ transitionDelay: `${(i % 5) * 50}ms` }}>
      <button
        type="button"
        data-case={p.id}
        data-cursor="OPEN"
        aria-label={`Open case file: ${p.title}`}
        className="wrow w-full grid-cols-[2.5rem_1fr_1.5rem] gap-4 px-1 py-6 text-left sm:grid-cols-[4rem_1fr_1.5rem] md:grid-cols-[4rem_1fr_15rem_7rem_1.5rem] md:px-3"
      >
        <span className="hud !text-accent">{pad(i + 1)}</span>
        <span>
          <span className="display block text-[clamp(1.7rem,1rem+2.6vw,3.4rem)] leading-[0.95]">
            {p.short}
            {p.featured && <span className="hud ml-3 align-middle !text-accent">◆ featured</span>}
          </span>
          <span className="hud mt-2 block md:hidden">{p.period}</span>
        </span>
        <span className="hidden flex-wrap gap-1.5 md:flex">
          {p.kinds.map((k) => (
            <span key={k} className="chip">
              {kindLabels[k]}
            </span>
          ))}
        </span>
        <span className="hud hidden md:block">{p.period}</span>
        <ArrowUpRight className="go h-5 w-5 text-faint" aria-hidden />
      </button>
    </li>
  );
}

function OthersRow({ i }: { i: number }) {
  return (
    <li data-kinds="all-only" data-reveal>
      <button type="button" data-case="others" data-cursor="OPEN" aria-label="Open case file: smaller experiments" className="wrow w-full grid-cols-[2.5rem_1fr_1.5rem] gap-4 px-1 py-6 text-left sm:grid-cols-[4rem_1fr_1.5rem] md:grid-cols-[4rem_1fr_15rem_7rem_1.5rem] md:px-3">
        <span className="hud !text-accent">{pad(i + 1)}</span>
        <span className="display block text-[clamp(1.7rem,1rem+2.6vw,3.4rem)] leading-[0.95]">Smaller experiments</span>
        <span className="hidden md:block">
          <span className="chip">4 projects</span>
        </span>
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
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-fg/[0.14] bg-bg/90 px-5 py-3.5 backdrop-blur-md sm:px-10">
        <p className="hud">
          Case file <span className="text-accent">{pad(no + 1)}</span> / {pad(ids.length)}
        </p>
        <button type="button" data-close className="btn btn-ghost !min-h-9 !px-3" aria-label="Close case file" data-cursor="CLOSE">
          Esc <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
      <div className="px-5 pb-16 pt-10 sm:px-10">{children}</div>
      <div className="grid grid-cols-2 border-t border-fg/[0.14]">
        <button type="button" data-case-go={prev} className="hud p-6 text-left transition-colors hover:bg-accent/10 hover:!text-accent" data-cursor="PREV">
          ← Previous
        </button>
        <button type="button" data-case-go={next} className="hud border-l border-fg/[0.14] p-6 text-right transition-colors hover:bg-accent/10 hover:!text-accent" data-cursor="NEXT">
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
      <h3 className="display display-md mt-4 max-w-[22ch] !leading-[0.92]">{p.title}</h3>
      <p className="lede mt-6 max-w-prose">{p.blurb}</p>

      <div className="mt-8 max-w-3xl" data-cover>
        <Cover kind={p.cover} />
      </div>

      {p.metrics && (
        <ul className="mt-8 grid grid-cols-2 border border-fg/[0.12] sm:grid-cols-3" aria-label={`${p.title} results`}>
          {p.metrics.map((m, i) => (
            <li key={m.label} className={`p-4 sm:p-5 ${i % 2 ? 'border-l border-fg/[0.12] sm:border-l-0' : ''} ${i % 3 ? 'sm:border-l sm:border-fg/[0.12]' : ''} ${i > 1 ? 'border-t border-fg/[0.12]' : ''} ${i > 2 ? 'sm:border-t' : 'sm:border-t-0'}`}>
              <p className="display num text-[clamp(1.8rem,1.2rem+1.6vw,3rem)]">{m.value}</p>
              <p className="hud mt-2 !normal-case !tracking-[0.04em] !text-muted">{m.label}</p>
            </li>
          ))}
        </ul>
      )}

      {p.flow && (
        <div className="mt-8">
          <p className="hud mb-3">Architecture</p>
          <Flow steps={p.flow} label={`${p.title} architecture`} />
        </div>
      )}

      <p className="hud mb-3 mt-8">Stack</p>
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
      <h3 className="display display-md mt-4 !leading-[0.92]">Smaller experiments</h3>
      <div className="mt-8 max-w-3xl" data-cover>
        <Cover kind="others" />
      </div>
      <ul className="mt-8 border-t border-fg/[0.12]">
        {otherProjects.map((o) => (
          <li key={o.title} className="grid gap-2 border-b border-fg/[0.12] py-5 sm:grid-cols-[14rem_1fr_9rem] sm:gap-6">
            <p className="display text-2xl leading-none">{o.title}</p>
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
              Work I can put <span className="outline">numbers</span> on.
            </>
          }
        >
          Ten projects, each with a case file: results, architecture and how it was built. Hover to preview, click to open.
        </SectionHead>

        <div data-filter-group role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2">
          {['all', ...kinds].map((k, i) => (
            <button key={k} type="button" data-filter={k} aria-pressed={i === 0} data-cursor="FILTER" className="hud border border-fg/[0.2] px-4 py-2.5 transition-colors hover:!text-fg aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:!text-accent-fg">
              {k === 'all' ? 'All' : kindLabels[k as keyof typeof kindLabels]}
            </button>
          ))}
        </div>

        <div className="hud mb-3 hidden grid-cols-[4rem_1fr_15rem_7rem_1.5rem] gap-4 px-3 md:grid">
          <span>No.</span>
          <span>Project</span>
          <span>Domain</span>
          <span>Period</span>
          <span />
        </div>
        <ul className="border-b border-fg/[0.12]">
          {projects.map((p, i) => (
            <Row key={p.id} p={p} i={i} />
          ))}
          <OthersRow i={projects.length} />
        </ul>
      </div>

    </section>

      {/* floating preview, filled by the behaviour layer */}
      <div aria-hidden data-preview className="preview">
        <div data-preview-slot />
      </div>

      {projects.map((p, i) => (
        <ProjectCase key={p.id} p={p} no={i} />
      ))}
      <OthersCase no={projects.length} />
    </>
  );
}
