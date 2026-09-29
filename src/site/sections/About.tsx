import { profile } from '@/content/profile';
import { SectionHeading, vars } from '@/site/ui/primitives';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              Agentic AI that <span className="italic">holds up</span> in production.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7" data-reveal>
            <p className="font-serif text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)] leading-[1.22] tracking-[-0.01em]">
              {profile.pitch}
            </p>
            <p className="mt-8 max-w-prose text-muted">{profile.pitch2}</p>

            <div className="mt-10 max-w-prose rounded-2xl border border-fg/10 bg-surface p-5">
              <p className="eyebrow mb-2">Türkçe özet</p>
              <p lang="tr" className="text-[15px] leading-relaxed text-muted">
                {profile.pitchTr}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ol className="border-t border-fg/10">
              {profile.strengths.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-fg/10 py-6" data-reveal style={vars({ '--d': `${i * 90}ms` })}>
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="h3">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-[15px]" data-reveal>
              <dt className="eyebrow pt-1">Languages</dt>
              <dd>
                <ul className="space-y-1">
                  {profile.languages.map((l) => (
                    <li key={l.name}>
                      <span className="text-fg">{l.name}</span> <span className="text-muted">· {l.level}</span>
                    </li>
                  ))}
                </ul>
              </dd>
              <dt className="eyebrow pt-1">Open to</dt>
              <dd className="text-muted">{profile.regions.join(' · ')}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
