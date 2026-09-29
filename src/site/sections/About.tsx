import { profile } from '@/content/profile';
import { CandlesIcon, ChartIcon, LayersIcon } from '@/site/art/icons';
import { KV, SectionHead, vars } from '@/site/ui/primitives';

const icons = { chart: ChartIcon, layers: LayersIcon, candles: CandlesIcon } as const;

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
              Agentic AI that <span className="outline">holds up</span> in production.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <p data-scrub className="scrub text-[clamp(1.6rem,0.9rem+2.4vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.015em]">
              {profile.pitch}
            </p>
            <p data-reveal className="mt-10 max-w-prose text-muted">
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
                <span lang="tr" className="text-[14px] leading-relaxed text-muted [font-family:ui-sans-serif,system-ui,sans-serif]">
                  {profile.pitchTr}
                </span>
              </KV>
              <div className="border-t border-fg/[0.12]" />
            </dl>
          </aside>
        </div>

        <ul className="mt-20 grid border-y border-fg/[0.12] md:grid-cols-3">
          {profile.strengths.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.title} data-reveal style={vars({ '--d': `${i * 100}ms` })} className={`p-6 sm:p-8 ${i ? 'border-t border-fg/[0.12] md:border-l md:border-t-0' : ''}`}>
                <div className="flex items-start justify-between">
                  <Icon />
                  <span className="hud !text-accent">0{i + 1}</span>
                </div>
                <h3 className="display mt-8 text-[clamp(1.6rem,1.1rem+1.2vw,2.3rem)] leading-[0.95]">{s.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
