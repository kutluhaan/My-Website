import { experience, type Experience as Entry, type ExperienceTab, type Stat } from '@/content/experience';
import { Cover } from '@/site/art/Cover';
import { Flow } from '@/site/ui/Flow';
import { Bullets, ChipList, SectionHead } from '@/site/ui/primitives';

function Readouts({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid grid-cols-2 border border-fg/[0.12]">
      {stats.map((s, i) => (
        <li
          key={s.label}
          className={`p-4 sm:p-5 ${i % 2 ? 'border-l border-fg/[0.12]' : ''} ${i > 1 ? 'border-t border-fg/[0.12]' : ''} ${stats.length > 1 && stats.length % 2 && i === stats.length - 1 ? 'col-span-2 !border-l-0' : ''}`}
        >
          <p className="display num text-[clamp(2rem,1.3rem+1.6vw,3.25rem)]">{s.value}</p>
          <p className="hud mt-2 !normal-case !tracking-[0.04em] !text-muted">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}

const chevron = (
  <svg className="chev h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function Details({ label, items }: { label: string; items: string[] }) {
  return (
    <details className="disclosure mt-7 border border-fg/[0.12] px-5 py-1">
      <summary className="flex min-h-12 items-center justify-between gap-4">
        <span className="hud !text-fg">
          {label} <span className="ml-2 text-faint">{items.length} pts</span>
        </span>
        {chevron}
      </summary>
      <Bullets items={items} className="pb-4 pt-3" />
    </details>
  );
}

function TabContent({ tab }: { tab: ExperienceTab }) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-3">
          <p className="hud !text-accent">{tab.kicker}</p>
          <p className="mt-3 max-w-prose text-lg leading-relaxed">{tab.summary}</p>
          <div className="mt-6">
            <Readouts stats={tab.stats} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <Cover kind={tab.cover} />
        </div>
      </div>

      {tab.story && (
        <div className="mt-8 border border-fg/[0.12] border-l-2 border-l-accent bg-surface p-6 sm:p-8">
          <p className="hud !text-accent">Case file · {tab.story.title}</p>
          <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {tab.story.steps.map((step, i) => (
              <li key={step.label}>
                <p className="hud !text-accent">0{i + 1}</p>
                <p className="display mt-2 text-xl leading-none">{step.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="display display-md mt-8 border-t border-fg/[0.12] pt-6 !leading-[0.95]">
            <span className="text-accent">▸</span> {tab.story.result}
          </p>
        </div>
      )}

      {tab.pipeline && (
        <div className="mt-8">
          <Flow steps={tab.pipeline} label={`${tab.label} pipeline`} />
        </div>
      )}

      <ChipList items={tab.stack} className="mt-7" />
      <Details label="Full details" items={tab.bullets} />
    </div>
  );
}

function Tabs({ entry }: { entry: Entry }) {
  const tabs = entry.tabs!;
  return (
    <div data-tabs>
      <div role="tablist" aria-label={`${entry.org} projects`} className="flex flex-wrap">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${entry.id}-tab-${t.id}`}
            aria-selected={i === 0}
            aria-controls={`${entry.id}-panel-${t.id}`}
            tabIndex={i === 0 ? 0 : -1}
            data-cursor="SWITCH"
            className="hud -ml-px border border-fg/[0.2] px-5 py-3.5 transition-colors first:ml-0 hover:!text-fg aria-selected:border-accent aria-selected:bg-accent aria-selected:!text-accent-fg"
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${entry.id}-panel-${t.id}`} aria-labelledby={`${entry.id}-tab-${t.id}`} hidden={i !== 0} tabIndex={0} className="tab-panel pt-8">
          <TabContent tab={t} />
        </div>
      ))}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section relative">
      <div className="container-page">
        <SectionHead
          id="experience-title"
          no="02"
          label="Experience"
          title={
            <>
              Where the work has <span className="outline">shipped</span>.
            </>
          }
        />

        <div data-timeline className="relative">
          <div aria-hidden className="absolute bottom-0 left-[3px] top-0 w-px bg-fg/[0.14] lg:left-[calc(25%-1.55rem)]" />
          <div aria-hidden className="rail absolute bottom-0 left-[2px] top-0 w-[3px] bg-accent lg:left-[calc(25%-1.55rem-1px)]" />

          {experience.map((exp, i) => (
            <article key={exp.id} id={exp.id} aria-label={`${exp.role}, ${exp.org}`} data-reveal className="relative grid gap-8 border-t border-fg/[0.12] py-12 pl-8 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:pl-0">
              <span aria-hidden className="absolute left-0 top-[3.7rem] h-[7px] w-[7px] bg-accent shadow-[0_0_0_5px_rgb(var(--bg))] sm:top-[4.7rem] lg:left-[calc(25%-1.55rem-2px)]" />
              <div className="lg:col-span-3">
                <p className="hud !text-accent">EXP.0{i + 1}</p>
                <p className="hud mt-2">{exp.period}</p>
                <p className="display mt-4 text-[clamp(1.6rem,1.2rem+1vw,2.2rem)] leading-[0.95]">{exp.org}</p>
                <p className="mt-2 text-sm text-muted">{exp.place}</p>
                <div className="mt-6 hidden max-w-[17rem] lg:block">
                  <Cover kind={exp.scene} />
                </div>
              </div>

              <div className="lg:col-span-9">
                <h3 className="display display-md">{exp.role}</h3>
                <p className="mt-5 max-w-prose text-muted">{exp.blurb}</p>

                {exp.tabs ? (
                  <div className="mt-9">
                    <Tabs entry={exp} />
                  </div>
                ) : (
                  <div className="mt-9 grid gap-8 lg:grid-cols-5 lg:gap-10">
                    <div className="lg:col-span-3">
                      {exp.stats && <Readouts stats={exp.stats} />}
                      {exp.stack && <ChipList items={exp.stack} className="mt-6" />}
                      {exp.bullets && (exp.bullets.length > 1 ? <Details label="Full details" items={exp.bullets} /> : <Bullets items={exp.bullets} className="mt-2" />)}
                    </div>
                    {exp.cover && (
                      <div className="lg:col-span-2">
                        <Cover kind={exp.cover} />
                      </div>
                    )}
                  </div>
                )}

                {exp.more && (
                  <div className="mt-8 border border-fg/[0.12] bg-surface p-6">
                    <p className="hud mb-4">Also at {exp.org}</p>
                    <Bullets items={exp.more} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
