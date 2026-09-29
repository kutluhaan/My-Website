import { experience, type Experience as Entry, type ExperienceTab, type Stat } from '@/content/experience';
import { Flow } from '@/site/ui/Flow';
import { Bullets, ChipList, SectionHead } from '@/site/ui/primitives';

function Readouts({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
      {stats.map((s) => (
        <li key={s.label} className="border-t border-fg/10 pt-4">
          <p className="display num text-[clamp(2rem,1.4rem+1.5vw,3rem)] leading-none">{s.value}</p>
          <p className="mt-3 text-[13px] leading-snug text-muted">{s.label}</p>
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
    <details className="disclosure mt-8 border-y border-fg/10">
      <summary className="flex min-h-14 items-center justify-between gap-4 text-[15px]">
        <span>
          {label} <span className="ml-2 text-faint">{items.length} points</span>
        </span>
        {chevron}
      </summary>
      <Bullets items={items} className="pb-6 pt-2" />
    </details>
  );
}

function TabContent({ tab }: { tab: ExperienceTab }) {
  return (
    <div>
      <p className="hud text-accent">{tab.kicker}</p>
      <p className="mt-3 max-w-prose text-lg leading-relaxed">{tab.summary}</p>
      <div className="mt-8">
        <Readouts stats={tab.stats} />
      </div>

      {tab.story && (
        <div className="mt-10 rounded-sm border border-fg/10 bg-surface p-6 sm:p-8">
          <p className="hud text-accent">{tab.story.title}</p>
          <ol className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {tab.story.steps.map((step, i) => (
              <li key={step.label}>
                <p className="hud">0{i + 1}</p>
                <p className="display mt-2 text-[1.35rem] leading-tight">{step.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="display mt-8 border-t border-fg/10 pt-6 text-[clamp(1.4rem,1.1rem+1vw,2rem)] leading-tight">
            <span className="em">→</span> {tab.story.result}
          </p>
        </div>
      )}

      {tab.pipeline && (
        <div className="mt-8">
          <Flow steps={tab.pipeline} label={`${tab.label} pipeline`} />
        </div>
      )}

      <ChipList items={tab.stack} className="mt-8" />
      <Details label="Full details" items={tab.bullets} />
    </div>
  );
}

function Tabs({ entry }: { entry: Entry }) {
  const tabs = entry.tabs!;
  return (
    <div data-tabs>
      <div role="tablist" aria-label={`${entry.org} projects`} className="flex flex-wrap gap-x-7 border-b border-fg/10">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${entry.id}-tab-${t.id}`}
            aria-selected={i === 0}
            aria-controls={`${entry.id}-panel-${t.id}`}
            tabIndex={i === 0 ? 0 : -1}
            className="-mb-px border-b border-transparent pb-3.5 text-[15px] text-muted transition-colors hover:text-fg aria-selected:border-accent aria-selected:text-fg"
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
              Where the work has <span className="em">shipped</span>.
            </>
          }
        />

        <div>
          {experience.map((exp) => (
            <article key={exp.id} id={exp.id} aria-label={`${exp.role}, ${exp.org}`} data-reveal className="grid gap-8 border-t border-fg/10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-3">
                <p className="hud">{exp.period}</p>
                <p className="display mt-4 text-[clamp(1.6rem,1.2rem+0.9vw,2.1rem)] leading-tight">{exp.org}</p>
                <p className="mt-2 text-[14px] text-muted">{exp.place}</p>
              </div>

              <div className="lg:col-span-9">
                <h3 className="display display-md">{exp.role}</h3>
                <p className="mt-5 max-w-prose text-muted">{exp.blurb}</p>

                {exp.tabs ? (
                  <div className="mt-10">
                    <Tabs entry={exp} />
                  </div>
                ) : (
                  <div className="mt-10">
                    {exp.stats && <Readouts stats={exp.stats} />}
                    {exp.stack && <ChipList items={exp.stack} className="mt-8" />}
                    {exp.bullets && (exp.bullets.length > 1 ? <Details label="Full details" items={exp.bullets} /> : <Bullets items={exp.bullets} className="mt-4" />)}
                  </div>
                )}

                {exp.more && (
                  <div className="mt-10 rounded-sm border border-fg/10 bg-surface p-6">
                    <p className="hud mb-4">Also at {exp.org}</p>
                    <Bullets items={exp.more} />
                  </div>
                )}
              </div>
            </article>
          ))}
          <div className="border-t border-fg/10" />
        </div>
      </div>
    </section>
  );
}
