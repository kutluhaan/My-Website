import { ArrowUpRight, Download, Github, Linkedin, Phone } from 'lucide-react';
import { profile } from '@/content/profile';
import { cvHref, mailto } from '@/lib/site';

const rows = [
  { icon: Linkedin, label: 'LinkedIn', value: 'in/kutluhanayguzel', href: profile.linkedin, external: true },
  { icon: Github, label: 'GitHub', value: 'kutluhaan', href: profile.github, external: true },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}`, external: false },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative overflow-hidden">
      <div aria-hidden className="vignette absolute inset-0 -z-10" />
      <div className="container-page">
        <p data-reveal className="hud flex items-center gap-3">
          <span className="text-accent">06</span>
          <span aria-hidden className="h-px w-8 bg-fg/20" />
          Contact
        </p>

        <h2 id="contact-title" data-reveal className="display display-xl mt-8 max-w-[14ch]" style={{ transitionDelay: '80ms' }}>
          Let&rsquo;s build something <span className="em">real</span>.
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6" data-reveal>
            <p className="lede max-w-lg !text-fg/85">
              I&rsquo;m open to AI and backend engineering roles across Türkiye, Europe and remote. The fastest way to reach me is email.
            </p>
            <a href={mailto} className="display mt-8 block break-words text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-tight underline decoration-fg/25 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent">
              {profile.email}
            </a>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={mailto} className="btn btn-primary">
                Say hello
                <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
              </a>
              <a href={cvHref} className="btn btn-ghost" download>
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
              <button type="button" data-copy={profile.email} className="btn btn-ghost">
                <span data-copy-label>Copy email</span>
              </button>
            </div>
            <p className="hud mt-8">Based in {profile.location} · UTC+3 · English and Turkish day to day</p>
          </div>

          <ul className="border-b border-fg/10 lg:col-span-6 lg:self-end" data-reveal style={{ transitionDelay: '120ms' }}>
            {rows.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="wrow grid-cols-[2rem_1fr_1.5rem] gap-4 px-2 py-5">
                  <Icon className="h-[18px] w-[18px] text-accent" aria-hidden />
                  <span className="min-w-0">
                    <span className="hud block">{label}</span>
                    <span className="mt-0.5 block truncate text-lg">{value}</span>
                  </span>
                  <ArrowUpRight className="go h-5 w-5 text-faint" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
