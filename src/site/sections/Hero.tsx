import { ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { heroMetrics, profile } from '@/content/profile';
import { asset, cvHref, mailto } from '@/lib/site';
import { photoFile } from '@/site/photo';
import { vars } from '@/site/ui/primitives';

function Portrait() {
  const src = photoFile ? asset(`/${photoFile}`) : undefined;
  return (
    <figure className="relative m-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-fg/10 bg-surface-2">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 h-full w-full object-cover object-[46%_20%] brightness-[0.94] saturate-[0.85]"
            src={src}
            width={800}
            height={800}
            alt="Kutluhan Aygüzel in a graduation gown and cap, smiling toward the camera"
            fetchPriority="high"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="display display-lg text-fg/60">KA</span>
          </div>
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
      </div>
      <figcaption className="hud mt-3 flex justify-between">
        <span>Sabancı University</span>
        <span>Class of 2025</span>
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      <div aria-hidden className="vignette absolute inset-0 -z-10" />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="hud rise flex items-center gap-3" style={vars({ '--d': '0ms' })}>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ok" />
              {profile.availability}
            </p>

            <h1 id="hero-title" className="display display-xl rise mt-8" style={vars({ '--d': '120ms' })}>
              Kutluhan
              <br />
              <span className="italic text-fg/70">Aygüzel</span>
            </h1>

            <p className="rise lede mt-9 max-w-[34rem] !text-fg/90" style={vars({ '--d': '260ms' })}>
              {profile.statement}
            </p>
            <p className="rise mt-3 max-w-[34rem] text-[15px] text-muted" style={vars({ '--d': '340ms' })}>
              {profile.headline} · {profile.status}
            </p>

            <div className="rise mt-10 flex flex-wrap items-center gap-3" style={vars({ '--d': '420ms' })}>
              <a href={mailto} className="btn btn-primary">
                Get in touch
                <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
              </a>
              <a href={cvHref} className="btn btn-ghost" download>
                <Download className="h-4 w-4" aria-hidden />
                CV
              </a>
              <div className="-ml-3 flex w-full items-center sm:ml-0 sm:w-auto">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid h-12 w-12 place-items-center text-muted transition-colors hover:text-fg">
                  <Github className="h-5 w-5" aria-hidden />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="grid h-12 w-12 place-items-center text-muted transition-colors hover:text-fg">
                  <Linkedin className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>
          </div>

          <div className="rise mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none" style={vars({ '--d': '200ms' })}>
            <Portrait />
          </div>
        </div>

        <ul aria-label="Selected results" className="mt-20 grid grid-cols-2 gap-y-10 border-t border-fg/10 pt-10 lg:mt-28 lg:grid-cols-4">
          {heroMetrics.map((m, i) => (
            <li key={m.label} data-reveal style={vars({ '--d': `${i * 90}ms` })} className="pr-6">
              <p className="display num text-[clamp(3rem,1.6rem+3.6vw,5.25rem)] leading-none">
                <span aria-hidden className="count" style={vars({ '--to': m.value })} />
                <span aria-hidden className="text-accent">
                  {m.suffix}
                </span>
                <span className="sr-only">
                  {m.value}
                  {m.suffix}
                </span>
              </p>
              <p className="mt-4 text-[15px] font-medium">{m.label}</p>
              <p className="mt-1.5 text-[13px] leading-snug text-muted">{m.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
