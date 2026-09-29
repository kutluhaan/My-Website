import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { profile } from '@/content/profile';
import { cvHref, mailto } from '@/lib/site';

const rows = [
  { icon: Mail, label: 'Email', value: profile.email, href: mailto, external: false },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/kutluhanayguzel', href: profile.linkedin, external: true },
  { icon: Github, label: 'GitHub', value: 'kutluhaan', href: profile.github, external: true },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}`, external: false },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative overflow-hidden">
      <div aria-hidden className="vignette absolute inset-0 -z-10 opacity-80" />
      <div className="container-page">
        <div className="flex items-center gap-4">
          <span className="hud !text-accent">06</span>
          <span aria-hidden data-reveal="line" className="h-px flex-1 bg-fg/20" />
          <span className="hud">Contact</span>
        </div>

        <h2 id="contact-title" data-split className="display mt-10 !text-[clamp(4.5rem,0.5rem+13.5vw,15rem)]">
          Let&rsquo;s build <span className="outline">something</span> real.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6" data-reveal>
            <p className="lede max-w-lg !text-fg/85">
              I&rsquo;m open to AI and backend engineering roles across Türkiye, Europe and remote. The fastest way to reach me is email.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={mailto} className="btn btn-primary" data-magnetic data-cursor="MAIL">
                Say hello
                <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
              </a>
              <a href={cvHref} className="btn btn-ghost" download data-magnetic data-cursor="PDF">
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
              <button type="button" data-copy={profile.email} className="btn btn-ghost" data-cursor="COPY">
                <span data-copy-label>Copy email</span>
              </button>
            </div>
            <p className="hud mt-8">
              Based in {profile.location} · UTC+3 · English &amp; Turkish day to day
            </p>
          </div>

          <ul className="border-b border-fg/[0.14] lg:col-span-6" data-reveal style={{ transitionDelay: '120ms' }}>
            {rows.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="border-t border-fg/[0.14]">
                <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="wrow grid-cols-[2.5rem_1fr_1.5rem] gap-4 px-2 py-5" data-cursor={label.toUpperCase()}>
                  <Icon className="h-[18px] w-[18px] text-accent" aria-hidden />
                  <span className="min-w-0">
                    <span className="hud block">{label}</span>
                    <span className="display mt-1 block truncate text-[clamp(1.4rem,1rem+1.4vw,2.2rem)] leading-none normal-case">{value}</span>
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
