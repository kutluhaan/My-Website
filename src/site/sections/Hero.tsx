import { ArrowUpRight, Download, Github, Linkedin, MapPin } from 'lucide-react';
import { heroMetrics, profile } from '@/content/profile';
import { cvHref, mailto } from '@/lib/site';
import { AgentGraph } from '@/site/visuals/AgentGraph';
import { vars } from '@/site/ui/primitives';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-24 sm:pt-28">
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="hero-glow absolute -right-48 -top-56 -z-10 h-[40rem] w-[40rem] max-w-[120vw]"
      />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="rise eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 !text-muted" style={vars({ '--d': '0ms' })}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-fg/15 bg-surface/70 px-3.5 py-2">
                <span aria-hidden className="pulse-dot h-2 w-2 rounded-full bg-ok" />
                {profile.headline}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {profile.location}
              </span>
            </p>

            <h1 id="hero-title" className="display mt-6">
              <span className="mask-line">
                <span style={vars({ '--d': '60ms' })}>Kutluhan</span>
              </span>
              <span className="mask-line">
                <span className="italic" style={vars({ '--d': '170ms' })}>
                  Aygüzel
                </span>
              </span>
            </h1>

            <p className="rise lede mt-7 max-w-[34rem] !text-fg/85" style={vars({ '--d': '420ms' })}>
              {profile.statement}
            </p>

            <p className="rise mt-3 max-w-[34rem] text-[15px] text-muted" style={vars({ '--d': '520ms' })}>
              {profile.status}. {profile.availability}.
            </p>

            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={vars({ '--d': '620ms' })}>
              <a href={mailto} className="btn btn-primary">
                Get in touch
                <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
              </a>
              <a href={cvHref} className="btn btn-secondary" download>
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-fg/15 text-muted transition-colors hover:border-fg/40 hover:text-fg"
              >
                <Github className="h-[18px] w-[18px]" aria-hidden />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-fg/15 text-muted transition-colors hover:border-fg/40 hover:text-fg"
              >
                <Linkedin className="h-[18px] w-[18px]" aria-hidden />
              </a>
            </div>
          </div>

          <div className="rise lg:col-span-5" style={vars({ '--d': '380ms' })}>
            <AgentGraph />
          </div>
        </div>

        <ul
          aria-label="Selected results"
          className="rise mt-12 grid grid-cols-2 border-t border-fg/10 sm:mt-14 lg:grid-cols-4"
          style={vars({ '--d': '760ms' })}
        >
          {heroMetrics.map((m, i) => (
            <li
              key={m.label}
              className={`border-b border-fg/10 py-5 pr-4 sm:py-6 lg:border-b-0 lg:pr-8 ${
                i % 2 === 1 ? 'pl-4 sm:pl-6' : ''
              } ${i > 0 ? 'lg:border-l lg:pl-8' : ''} ${i === 2 ? 'max-lg:pl-0' : ''}`}
            >
              <p className="font-serif text-[clamp(2.75rem,1.8rem+3vw,4.5rem)] leading-none tracking-tight num">
                <span aria-hidden className="count" style={vars({ '--to': m.value })} />
                <span aria-hidden className="text-accent">
                  {m.suffix}
                </span>
                <span className="sr-only">
                  {m.value}
                  {m.suffix}
                </span>
              </p>
              <p className="mt-3 text-[15px] font-medium leading-snug">{m.label}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">{m.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
