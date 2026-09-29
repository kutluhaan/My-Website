import { profile } from '@/content/profile';
import { KV, SectionHead, vars } from '@/site/ui/primitives';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section relative">
      <div className="container-page">
        <SectionHead
          id="about-title"
          no="01"
          label="Profile"
          title={
            <>
              Agentic AI that <span className="em">holds up</span> in production.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8">
            <p data-reveal className="text-[clamp(1.35rem,1rem+1.4vw,2.1rem)] leading-[1.35] tracking-[-0.01em] text-fg/90">
              {profile.pitch}
            </p>
            <p data-reveal className="mt-8 max-w-prose text-muted">
              {profile.pitch2}
            </p>
          </div>

          <aside className="lg:col-span-4" data-reveal>
            <dl>
              <KV k="Location">{profile.location}</KV>
              <KV k="Languages">
                <ul className="space-y-1">
                  {profile.languages.map((l) => (
                    <li key={l.name}>
                      {l.name} <span className="text-faint">· {l.level}</span>
                    </li>
                  ))}
                </ul>
              </KV>
              <KV k="Open to">{profile.regions.join(' · ')}</KV>
              <KV k="Türkçe özet">
                <span lang="tr" className="text-[14px] leading-relaxed text-muted">
                  {profile.pitchTr}
                </span>
              </KV>
              <div className="border-t border-fg/10" />
            </dl>
          </aside>
        </div>

        <ul className="mt-20 grid gap-10 border-t border-fg/10 pt-12 md:grid-cols-3 md:gap-12">
          {profile.strengths.map((s, i) => (
            <li key={s.title} data-reveal style={vars({ '--d': `${i * 100}ms` })}>
              <p className="hud text-accent">0{i + 1}</p>
              <h3 className="display mt-4 text-[clamp(1.6rem,1.2rem+0.9vw,2.1rem)]">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
