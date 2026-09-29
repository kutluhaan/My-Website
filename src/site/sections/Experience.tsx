import { experience, type ExperienceTab } from '@/content/experience';
import { Bullets, ChipList, SectionHeading } from '@/site/ui/primitives';
import { Flow } from '@/site/ui/Flow';
import { Tabs } from '@/site/ui/Tabs';

function TabContent({ tab }: { tab: ExperienceTab }) {
  return (
    <div>
      <p className="eyebrow !text-accent">{tab.kicker}</p>
      <p className="mt-3 max-w-prose text-lg leading-relaxed">{tab.summary}</p>

      {tab.story && (
        <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 sm:p-8">
          <p className="eyebrow !text-accent">Case · {tab.story.title}</p>
          <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {tab.story.steps.map((step, i) => (
              <li key={step.label}>
                <p className="font-mono text-xs text-faint">0{i + 1}</p>
                <p className="mt-1 font-medium">{step.label}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-accent/25 pt-6 font-serif text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-tight">
            {tab.story.result}
          </p>
        </div>
      )}

      <Bullets items={tab.bullets} className="mt-8" />

      {tab.pipeline && (
        <div className="mt-8">
          <Flow steps={tab.pipeline} label={`${tab.label} pipeline`} />
        </div>
      )}

      <ChipList items={tab.stack} className="mt-8" />
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
              Where the work has <span className="italic">shipped</span>.
            </>
          }
        />

        <div className="border-t border-fg/10">
          {experience.map((exp) => (
            <article
              key={exp.id}
              id={exp.id}
              aria-label={`${exp.role}, ${exp.org}`}
              className="grid gap-8 border-b border-fg/10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12"
              data-reveal
            >
              <div className="lg:col-span-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">{exp.period}</p>
                <p className="mt-3 text-lg font-semibold tracking-tight">{exp.org}</p>
                <p className="mt-1 text-sm text-muted">{exp.place}</p>
              </div>

              <div className="lg:col-span-9">
                <h3 className="font-serif text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-none tracking-tight">
                  {exp.role}
                </h3>
                <p className="mt-4 max-w-prose text-muted">{exp.blurb}</p>

                {exp.tabs ? (
                  <div className="mt-8">
                    <Tabs
                      prefix={exp.id}
                      label={`${exp.org} projects`}
                      items={exp.tabs.map((tab) => ({
                        id: tab.id,
                        label: tab.label,
                        content: <TabContent tab={tab} />,
                      }))}
                    />
                  </div>
                ) : (
                  <>
                    {exp.bullets && <Bullets items={exp.bullets} className="mt-8" />}
                    {exp.stack && <ChipList items={exp.stack} className="mt-8" />}
                  </>
                )}

                {exp.more && (
                  <div className="mt-10 rounded-2xl border border-fg/10 bg-surface p-6">
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
