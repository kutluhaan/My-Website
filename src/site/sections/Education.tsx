import { ExternalLink } from 'lucide-react';
import {
  activities,
  courseraCertificates,
  education,
  nvidiaCertificates,
  otherLearning,
  type Certificate,
} from '@/content/education';
import { SectionHead, vars } from '@/site/ui/primitives';

const chevron = (
  <svg className="chev h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function CertRow({ c }: { c: Certificate }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-fg/10 py-4">
      <div className="min-w-0">
        <p className="leading-snug">
          {c.title}
          {c.note && <span className="ml-2 whitespace-nowrap text-[13px] text-accent">· {c.note}</span>}
        </p>
        <p className="hud mt-1">
          {c.issuer} · {c.date}
        </p>
      </div>
      {c.href ? (
        <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-accent">
          <span aria-hidden>Verify</span>
          <span className="sr-only">Verify certificate: {c.title}</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      ) : (
        <span />
      )}
    </li>
  );
}

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section relative">
      <div className="container-page">
        <SectionHead
          id="education-title"
          no="05"
          label="Credentials"
          title={
            <>
              Foundations, <span className="em">verified</span>.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5" data-reveal>
            <p className="hud text-accent">{education.period}</p>
            <h3 className="display display-md mt-4">{education.school}</h3>
            <p className="mt-5 text-lg">{education.degree}</p>
            <p className="hud mt-2">
              {education.place} · {education.graduated}
            </p>
            <ul className="dots mt-6 text-[15px] leading-8 text-muted">
              {education.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <details className="disclosure mt-8 border-y border-fg/10">
              <summary className="flex min-h-14 items-center justify-between text-[15px]">
                Relevant coursework
                {chevron}
              </summary>
              <dl className="space-y-6 pb-6 pt-2">
                {education.coursework.map((g) => (
                  <div key={g.area}>
                    <dt className="hud mb-2 text-accent">{g.area}</dt>
                    <dd className="text-[15px] leading-relaxed text-muted">{g.courses.join(' · ')}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </div>

          <div className="space-y-14 lg:col-span-7" data-reveal style={vars({ '--d': '100ms' })}>
            <div>
              <h3 className="display text-[2rem] leading-tight">NVIDIA Deep Learning Institute</h3>
              <p className="hud mt-2">Certificates of competency</p>
              <ul className="mt-5 border-b border-fg/10">
                {nvidiaCertificates.map((c) => (
                  <CertRow key={c.title} c={c} />
                ))}
              </ul>
            </div>

            <div>
              <h3 className="display text-[2rem] leading-tight">Coursera · IBM and DeepLearning.AI</h3>
              <p className="hud mt-2">Each one has a public verification link</p>
              <ul className="mt-5 border-b border-fg/10">
                {courseraCertificates.map((c) => (
                  <CertRow key={c.title} c={c} />
                ))}
              </ul>
            </div>

            <details className="disclosure border-y border-fg/10">
              <summary className="flex min-h-14 items-center justify-between text-[15px]">
                More learning · courses and programmes
                {chevron}
              </summary>
              <ul className="pb-2">
                {otherLearning.map((c) => (
                  <li key={c.title} className="border-t border-fg/[0.08] py-4">
                    <p className="leading-snug">{c.title}</p>
                    <p className="hud mt-1">
                      {c.issuer} · {c.date}
                      {c.note && <span className="ml-2 text-accent">· {c.note}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>

        <div className="mt-20 sm:mt-28" data-reveal>
          <p className="hud mb-6">Beyond the code</p>
          <div className="grid gap-10 border-t border-fg/10 pt-10 md:grid-cols-2 md:gap-14">
            {activities.map((a) => (
              <article key={a.role}>
                <p className="hud">{a.period}</p>
                <h3 className="display mt-3 text-[1.9rem] leading-tight">{a.role}</h3>
                <p className="mt-1 text-[14px] text-accent">{a.org}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
