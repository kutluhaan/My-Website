import { ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { heroMetrics, profile } from '@/content/profile';
import { asset, cvHref, mailto } from '@/lib/site';
import { photoFile } from '@/site/photo';
import { vars } from '@/site/ui/primitives';

function Portrait() {
  const src = photoFile ? asset(`/${photoFile}`) : undefined;
  return (
    <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
      <div data-scan className="scan panel ticks aspect-[4/5] w-full">
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="base absolute inset-0 h-full w-full object-cover object-[46%_20%]" src={src} width={800} height={800} alt="Kutluhan Aygüzel in a graduation gown and cap, smiling toward the camera" fetchPriority="high" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="color object-cover object-[46%_20%]" src={src} width={800} height={800} alt="" aria-hidden />
          </>
        ) : (
          <div className="base absolute inset-0 grid place-items-center bg-surface-2">
            <span className="display display-lg text-fg/70">KA</span>
          </div>
        )}
        <i className="lines" />
        <i className="sweep" />
        <i className="xh-x" />
        <i className="xh-y" />

        {/* overlays sit on the photo, so they keep fixed light/amber colours in both themes */}
        <div className="on-photo pointer-events-none absolute inset-0 z-[4]">
          <div aria-hidden className="absolute left-[27%] top-[28%] h-[30%] w-[35%] border border-accent/70">
            <span className="absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-accent" />
            <span className="absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-accent" />
            <span className="absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-accent" />
            <span className="absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-accent" />
            <span className="hud absolute -top-5 left-0 whitespace-nowrap !text-[9px] !text-accent">SUBJECT · K.AYGÜZEL</span>
          </div>
          <p className="hud absolute left-3 top-3 !text-[10px] !text-fg/85">FIG.00 / PORTRAIT</p>
          <p className="hud absolute bottom-3 left-3 right-3 flex justify-between !text-[10px] !text-fg/90">
            <span>Sabancı Univ. · CSE</span>
            <span className="!text-accent">Class of 2025</span>
          </p>
        </div>
      </div>

      {/* illustrative agent trace, overlapping the plate */}
      <div aria-hidden className="panel absolute -bottom-6 -left-3 z-10 hidden w-[19rem] bg-bg/85 p-3.5 backdrop-blur-md sm:block lg:-left-16" data-parallax-y>
        <p className="hud mb-2 flex items-center justify-between !text-[9px]">
          <span>agent.trace</span>
          <span className="text-accent">illustrative</span>
        </p>
        <div className="space-y-1 font-mono text-[10px] leading-relaxed text-muted">
          <p className="term-line" style={vars({ '--d': '0s' })}>
            <span className="text-accent">$</span> agent.run(“warranty doc?”)
          </p>
          <p className="term-line" style={vars({ '--d': '1.2s' })}>
            ↳ guardrail <span className="text-ok">ok</span>
          </p>
          <p className="term-line" style={vars({ '--d': '2.4s' })}>
            ↳ router <span className="text-fg">tool_calling</span>
          </p>
          <p className="term-line" style={vars({ '--d': '3.6s' })}>
            ↳ tool <span className="text-fg">search_manual()</span> <span className="text-ok">✓</span>
          </p>
          <p className="term-line" style={vars({ '--d': '4.8s' })}>
            ↳ judge <span className="text-accent">0.97</span> <span className="blink">▍</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate min-h-[100svh] overflow-hidden pt-24 sm:pt-28">
      <div aria-hidden className="vignette absolute inset-0 -z-10" />
      <canvas data-network aria-hidden className="absolute inset-0 -z-10 h-full w-full" />

      <div className="container-page relative">
        <div data-scene className="scene">
          <p className="hud rise flex flex-wrap items-center gap-x-6 gap-y-1" style={vars({ '--d': '0ms' })}>
            <span className="text-accent">[SYS.001]</span>
            <span>Portfolio · {profile.updated}</span>
            <span className="hidden sm:inline">{`// ${profile.location}`}</span>
          </p>

          <div className="mt-8 grid items-end gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h1 id="hero-title" className="display display-xl !text-[clamp(4.25rem,0.6rem+13vw,14rem)]">
                <span className="mask-line">
                  <span style={vars({ '--d': '80ms' })}>Kutluhan</span>
                </span>
                <span className="mask-line">
                  <span className="outline" style={vars({ '--d': '220ms' })}>
                    Aygüzel
                  </span>
                </span>
              </h1>

              <p className="rise hud mt-8 flex items-center gap-3 !text-fg" style={vars({ '--d': '520ms' })}>
                <span aria-hidden className="h-2 w-2 bg-accent" />
                {profile.headline}
              </p>
              <p className="rise lede mt-5 max-w-[34rem] !text-fg/85" style={vars({ '--d': '600ms' })}>
                {profile.statement}
              </p>
              <p className="rise mt-3 max-w-[34rem] text-[15px] text-muted" style={vars({ '--d': '680ms' })}>
                {profile.status}. {profile.availability}.
              </p>

              <div className="rise mt-9 flex flex-wrap items-center gap-3" style={vars({ '--d': '760ms' })}>
                <a href={mailto} className="btn btn-primary" data-magnetic data-cursor="MAIL">
                  Get in touch
                  <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
                </a>
                <a href={cvHref} className="btn btn-ghost" download data-magnetic data-cursor="PDF">
                  <Download className="h-4 w-4" aria-hidden />
                  CV
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid h-[3.25rem] w-[3.25rem] place-items-center border border-fg/[0.28] text-fg transition-colors hover:border-accent hover:text-accent" data-magnetic>
                  <Github className="h-[18px] w-[18px]" aria-hidden />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="grid h-[3.25rem] w-[3.25rem] place-items-center border border-fg/[0.28] text-fg transition-colors hover:border-accent hover:text-accent" data-magnetic>
                  <Linkedin className="h-[18px] w-[18px]" aria-hidden />
                </a>
              </div>
            </div>

            <div className="rise lg:col-span-5" style={vars({ '--d': '0ms' })}>
              <Portrait />
            </div>
          </div>

          <ul aria-label="Selected results" className="mt-20 grid grid-cols-2 border-y border-fg/[0.12] lg:mt-24 lg:grid-cols-4">
            {heroMetrics.map((m, i) => (
              <li
                key={m.label}
                data-reveal
                style={vars({ '--d': `${i * 90}ms` })}
                className={`relative border-fg/[0.12] p-5 sm:p-7 ${i % 2 === 1 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i > 0 ? 'lg:border-l' : ''}`}
              >
                <p className="hud flex justify-between">
                  <span>{m.label}</span>
                  <span className="text-accent">0{i + 1}</span>
                </p>
                <p className="display display-md mt-5 num" style={{ fontSize: 'clamp(3.25rem,1.6rem+4vw,6rem)' }}>
                  <span aria-hidden className="count" style={vars({ '--to': m.value })} />
                  <span aria-hidden className="text-accent">
                    {m.suffix}
                  </span>
                  <span className="sr-only">
                    {m.value}
                    {m.suffix}
                  </span>
                </p>
                <p className="mt-4 text-[13px] leading-snug text-muted">{m.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
