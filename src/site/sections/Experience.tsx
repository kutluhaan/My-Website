import { experience, type Experience as Entry, type ExperienceTab, type Stat } from '@/content/experience';
import { Cover, CoverArt } from '@/site/art/Cover';
import { Bullets, ChipList, SectionHeading, vars } from '@/site/ui/primitives';
import { Flow } from '@/site/ui/Flow';
import { Tabs } from '@/site/ui/Tabs';

const statTone = ['bg-mint/25', 'bg-sky/30', 'bg-lilac/30', 'bg-sun/35'];

function Stats({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {stats.map((s, i) => (
        <li key={s.label} className={`rounded-2xl p-4 ${statTone[i % 4]}`}>
          <p className="num font-serif text-[clamp(1.9rem,1.5rem+1vw,2.6rem)] leading-none tracking-tight">{s.value}</p>
          <p className="mt-2 text-[13px] leading-snug text-fg/90">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}

function Details({ label, items }: { label: string; items: string[] }) {
  return (
    <details className="disclosure mt-6 rounded-2xl border border-fg/[0.08] bg-surface px-5 py-1">
      <summary className="flex min-h-12 items-center justify-between gap-4 text-[15px] font-medium">
        <span>
          {label} <span className="ml-1 font-mono text-xs font-normal text-faint">{items.length} points</span>
        </span>
        <svg className="chev h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
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
          <p className="eyebrow !text-accent">{tab.kicker}</p>
          <p className="mt-3 max-w-prose text-lg leading-relaxed">{tab.summary}</p>
          <div className="mt-6">
            <Stats stats={tab.stats} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <Cover kind={tab.cover} tilt />
        </div>
      </div>

      {tab.story && (
        <div className="mt-8 rounded-[1.75rem] bg-gradient-to-br from-lilac/25 via-sky/20 to-mint/20 p-6 sm:p-8">
          <p className="eyebrow !text-accent">Case · {tab.story.title}</p>
          <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {tab.story.steps.map((step, i) => (
              <li key={step.label} className="relative">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-surface font-mono text-[11px] shadow-[var(--shadow-1)]">
                  {i + 1}
                </span>
                <p className="mt-3 font-medium">{step.label}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-fg/10 pt-6 font-serif text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-tight">
            <span className="mark">{tab.story.result}</span>
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

function Meta({ exp }: { exp: Entry }) {
  return (
    <div className="lg:col-span-3">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">{exp.period}</p>
      <p className="mt-3 text-lg font-semibold tracking-tight">{exp.org}</p>
      <p className="mt-1 text-sm text-muted">{exp.place}</p>
      <div className="mt-5 hidden max-w-[16rem] lg:block">
        <div
          data-live
          className="relative aspect-[10/7] overflow-hidden rounded-2xl border border-fg/[0.08]"
          style={{ boxShadow: 'var(--shadow-1)' }}
        >
          <CoverArt kind={exp.scene} />
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Experience"
          title={
            <>
              Where the work has <span className="italic mark">shipped</span>.
            </>
          }
        />

        <div data-timeline className="relative">
          {/* rail: faint track + a coloured line that draws itself while you scroll */}
          <div aria-hidden className="absolute bottom-0 left-[6px] top-1 w-px bg-fg/10 lg:left-[calc(25%-1.9rem)]" />
          <div aria-hidden className="rail absolute bottom-0 left-[5px] top-1 w-[3px] rounded-full bg-gradient-to-b from-accent via-lilac to-mint lg:left-[calc(25%-1.9rem-1px)]" />

          {experience.map((exp) => (
            <article
              key={exp.id}
              id={exp.id}
              aria-label={`${exp.role}, ${exp.org}`}
              className="relative grid gap-8 py-12 pl-9 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:pl-0"
              data-reveal
            >
              <span
                aria-hidden
                className="absolute left-0 top-[3.6rem] h-[15px] w-[15px] rounded-full border-[3px] border-accent bg-surface shadow-[0_0_0_5px_rgb(var(--bg))] lg:left-[calc(25%-1.9rem-6px)] sm:top-[4.1rem]"
              />
              <Meta exp={exp} />

              <div className="lg:col-span-9">
                <h3 className="font-serif text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-none tracking-tight">{exp.role}</h3>
                <p className="mt-4 max-w-prose text-muted">{exp.blurb}</p>

                {exp.tabs ? (
                  <div className="mt-8">
                    <Tabs
                      prefix={exp.id}
                      label={`${exp.org} projects`}
                      items={exp.tabs.map((tab) => ({ id: tab.id, label: tab.label, content: <TabContent tab={tab} /> }))}
                    />
                  </div>
                ) : (
                  <div className="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-10">
                    <div className="lg:col-span-3">
                      {exp.stats && <Stats stats={exp.stats} />}
                      {exp.stack && <ChipList items={exp.stack} className="mt-6" />}
                      {exp.bullets &&
                        (exp.bullets.length > 1 ? (
                          <Details label="Full details" items={exp.bullets} />
                        ) : (
                          <Bullets items={exp.bullets} className="mt-2" />
                        ))}
                    </div>
                    {exp.cover && (
                      <div className="lg:col-span-2">
                        <Cover kind={exp.cover} tilt />
                      </div>
                    )}
                  </div>
                )}

                {exp.more && (
                  <div className="mt-8 rounded-2xl bg-surface-2 p-6">
                    <p className="eyebrow mb-4">Also at {exp.org}</p>
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
