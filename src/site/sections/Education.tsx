import { BadgeCheck, ExternalLink } from 'lucide-react';
import {
  activities,
  courseraCertificates,
  education,
  nvidiaCertificates,
  otherLearning,
  type Certificate,
} from '@/content/education';
import { SectionHeading, vars } from '@/site/ui/primitives';
import { Spotlight } from '@/site/ui/Spotlight';

function CertRow({ c }: { c: Certificate }) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-fg/10 py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="leading-snug">
          {c.title}
          {c.note && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 align-middle font-mono text-[11px] text-accent">
              <BadgeCheck className="h-3 w-3" aria-hidden />
              {c.note}
            </span>
          )}
        </p>
        <p className="mt-1 font-mono text-xs text-faint">
          {c.issuer} · {c.date}
        </p>
      </div>
      {c.href && (
        <a
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify certificate: ${c.title}`}
          className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
        >
          Verify <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      )}
    </li>
  );
}

const chevron = (
  <svg className="chev h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="education-title"
          index="05"
          label="Education"
          title={
            <>
              Foundations and <span className="italic">credentials</span>.
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="self-start lg:sticky lg:top-24 lg:col-span-6" data-reveal>
            <Spotlight className="p-6 sm:p-9">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">{education.period}</p>
              <h3 className="mt-4 font-serif text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-none tracking-tight">
                {education.school}
              </h3>
              <p className="mt-3 text-lg">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">
                {education.place} · {education.graduated}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {education.facts.map((f) => (
                  <li key={f} className="chip">
                    {f}
                  </li>
                ))}
              </ul>

              <details className="disclosure mt-8 border-t border-fg/10 pt-1">
                <summary className="flex min-h-12 items-center justify-between text-[15px] font-medium">
                  Relevant coursework
                  {chevron}
                </summary>
                <dl className="space-y-5 pb-3 pt-3">
                  {education.coursework.map((g) => (
                    <div key={g.area}>
                      <dt className="eyebrow mb-2">{g.area}</dt>
                      <dd className="text-[15px] leading-relaxed text-muted">{g.courses.join(' · ')}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </Spotlight>
          </div>

          <div className="space-y-6 lg:col-span-6" data-reveal style={vars({ '--d': '100ms' })}>
            <div className="card p-6 sm:p-8">
              <h3 className="h3">NVIDIA Deep Learning Institute</h3>
              <p className="mt-1 text-sm text-muted">Certificates of Competency</p>
              <ul className="mt-3">
                {nvidiaCertificates.map((c) => (
                  <CertRow key={c.title} c={c} />
                ))}
              </ul>
            </div>

            <div className="card p-6 sm:p-8">
              <h3 className="h3">Coursera · IBM and DeepLearning.AI</h3>
              <p className="mt-1 text-sm text-muted">Each one has a public verification link</p>
              <ul className="mt-3">
                {courseraCertificates.map((c) => (
                  <CertRow key={c.title} c={c} />
                ))}
              </ul>
            </div>

            <details className="disclosure card px-6 py-1 sm:px-8">
              <summary className="flex min-h-14 items-center justify-between font-medium">
                More learning · courses and programmes
                {chevron}
              </summary>
              <ul className="pb-3">
                {otherLearning.map((c) => (
                  <CertRow key={c.title} c={c} />
                ))}
              </ul>
            </details>
          </div>
        </div>

        <div className="mt-16 sm:mt-24" data-reveal>
          <p className="eyebrow mb-6">Beyond the code</p>
          <div className="grid gap-4 md:grid-cols-2">
            {activities.map((a) => (
              <Spotlight key={a.role} as="article" className="p-6 sm:p-7">
                <p className="font-mono text-xs text-faint">{a.period}</p>
                <h3 className="h3 mt-3">{a.role}</h3>
                <p className="mt-1 text-sm text-muted">{a.org}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{a.text}</p>
              </Spotlight>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
