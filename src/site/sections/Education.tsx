import { ExternalLink, PenLine, Star } from 'lucide-react';
import {
  activities,
  courseraCertificates,
  education,
  nvidiaCertificates,
  otherLearning,
  type Certificate,
} from '@/content/education';
import { asset } from '@/lib/site';
import { Cover } from '@/site/art/Cover';
import { photoFile } from '@/site/photo';
import { SectionHead, vars } from '@/site/ui/primitives';

const chevron = (
  <svg className="chev h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function CertRow({ c, code }: { c: Certificate; code: string }) {
  return (
    <li className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-4 border-t border-fg/[0.12] py-4">
      <span aria-hidden className="grid h-11 w-11 place-items-center border border-fg/[0.2] font-mono text-[10px] font-bold tracking-widest text-accent">
        {code}
      </span>
      <div className="min-w-0">
        <p className="leading-snug">
          {c.title}
          {c.note && <span className="hud ml-2 whitespace-nowrap border border-accent/60 px-1.5 py-0.5 !text-[9px] !text-accent">{c.note}</span>}
        </p>
        <p className="hud mt-1.5">
          {c.issuer} · {c.date}
        </p>
      </div>
      {c.href ? (
        <a href={c.href} target="_blank" rel="noopener noreferrer" className="hud inline-flex items-center gap-1.5 transition-colors hover:!text-accent" data-cursor="VERIFY">
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

const nvCodes = ['NLP', 'CAI', 'DL', 'CUDA'];
const cCodes = ['ML', 'NN', 'SQL', 'PY'];

export function Education() {
  const src = photoFile ? asset(`/${photoFile}`) : undefined;

  return (
    <section id="education" aria-labelledby="education-title" className="section relative">
      <div className="container-page">
        <SectionHead
          id="education-title"
          no="05"
          label="Credentials"
          title={
            <>
              Foundations, <span className="outline">verified</span>.
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* degree */}
          <div className="lg:col-span-6" data-reveal>
            <div className="lg:sticky lg:top-28">
              <div className="grid grid-cols-5 gap-4">
                <div className="relative col-span-2">
                  <div data-scan className="scan panel ticks absolute inset-0">
                    {src ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="base absolute inset-0 h-full w-full object-cover object-[46%_22%]" src={src} width={800} height={800} alt="Kutluhan Aygüzel at his graduation from Sabancı University" loading="lazy" decoding="async" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="color object-cover object-[46%_22%]" src={src} width={800} height={800} alt="" aria-hidden loading="lazy" decoding="async" />
                      </>
                    ) : null}
                    <i className="lines" />
                    <i className="sweep" />
                    <p className="hud absolute bottom-2 left-2 z-[4] !text-[9px] !text-accent">Jun 2025</p>
                  </div>
                </div>
                <div className="col-span-3">
                  <Cover kind="campus" />
                </div>
              </div>

              <p className="hud mt-8 !text-accent">{education.period}</p>
              <h3 className="display display-md mt-3">{education.school}</h3>
              <p className="mt-4 text-lg">{education.degree}</p>
              <p className="hud mt-2">
                {education.place} · {education.graduated}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {education.facts.map((f) => (
                  <li key={f} className="chip">
                    {f}
                  </li>
                ))}
              </ul>

              <details className="disclosure mt-8 border-y border-fg/[0.14]">
                <summary className="hud flex min-h-14 items-center justify-between !text-fg" data-cursor="TOGGLE">
                  Relevant coursework
                  {chevron}
                </summary>
                <dl className="space-y-6 pb-6 pt-2">
                  {education.coursework.map((g) => (
                    <div key={g.area}>
                      <dt className="hud mb-2 !text-accent">{g.area}</dt>
                      <dd className="text-[15px] leading-relaxed text-muted">{g.courses.join(' · ')}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </div>
          </div>

          {/* certificates */}
          <div className="space-y-12 lg:col-span-6" data-reveal style={vars({ '--d': '100ms' })}>
            <div>
              <h3 className="display text-4xl leading-none">NVIDIA Deep Learning Institute</h3>
              <p className="hud mt-3">Certificates of competency</p>
              <ul className="mt-5 border-b border-fg/[0.12]">
                {nvidiaCertificates.map((c, i) => (
                  <CertRow key={c.title} c={c} code={nvCodes[i]} />
                ))}
              </ul>
            </div>

            <div>
              <h3 className="display text-4xl leading-none">Coursera · IBM &amp; DeepLearning.AI</h3>
              <p className="hud mt-3">Each one has a public verification link</p>
              <ul className="mt-5 border-b border-fg/[0.12]">
                {courseraCertificates.map((c, i) => (
                  <CertRow key={c.title} c={c} code={cCodes[i]} />
                ))}
              </ul>
            </div>

            <details className="disclosure border-y border-fg/[0.14]">
              <summary className="hud flex min-h-14 items-center justify-between !text-fg" data-cursor="TOGGLE">
                More learning · courses and programmes
                {chevron}
              </summary>
              <ul className="pb-2">
                {otherLearning.map((c) => (
                  <li key={c.title} className="border-t border-fg/[0.1] py-4">
                    <p className="leading-snug">{c.title}</p>
                    <p className="hud mt-1.5">
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
          <p className="hud mb-6 flex items-center gap-4">
            <span className="text-accent">05.1</span>
            <span aria-hidden className="h-px flex-1 bg-fg/[0.14]" />
            Beyond the code
          </p>
          <div className="grid border-y border-fg/[0.12] md:grid-cols-2">
            {activities.map((a, i) => (
              <article key={a.role} className={`flex gap-5 p-6 sm:p-8 ${i ? 'border-t border-fg/[0.12] md:border-l md:border-t-0' : ''}`}>
                <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center border border-accent text-accent">
                  {i ? <PenLine className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                </span>
                <div>
                  <p className="hud">{a.period}</p>
                  <h3 className="display mt-2 text-3xl leading-none">{a.role}</h3>
                  <p className="hud mt-2 !text-accent">{a.org}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{a.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
