import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { profile } from '@/content/profile';
import { cvHref, mailto } from '@/lib/site';
import { CopyButton } from '@/site/ui/CopyButton';

const rows = [
  { icon: Mail, label: 'Email', value: profile.email, href: mailto, external: false },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/kutluhanayguzel', href: profile.linkedin, external: true },
  { icon: Github, label: 'GitHub', value: 'kutluhaan', href: profile.github, external: true },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}`, external: false },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] border border-fg/10 bg-surface p-7 sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="hero-glow pointer-events-none absolute -bottom-64 -left-32 h-[34rem] w-[34rem]"
          />

          <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7" data-reveal>
              <p className="eyebrow flex items-center gap-4">
                <span className="text-accent">06</span>
                <span aria-hidden className="h-px w-10 bg-fg/20" />
                Contact
              </p>
              <h2
                id="contact-title"
                className="display mt-6 !text-[clamp(3.25rem,1.6rem+7.4vw,8rem)]"
              >
                Let&rsquo;s build
                <br />
                <span className="italic">something real.</span>
              </h2>
              <p className="lede mt-8 max-w-lg">
                I&rsquo;m open to AI and backend engineering roles across Türkiye, Europe and remote. The
                fastest way to reach me is email.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href={mailto} className="btn btn-primary">
                  Say hello
                  <ArrowUpRight className="arrow h-4 w-4" aria-hidden />
                </a>
                <a href={cvHref} className="btn btn-secondary" download>
                  <Download className="h-4 w-4" aria-hidden />
                  Download CV
                </a>
                <CopyButton text={profile.email} label="Copy email" />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-16" data-reveal style={{ transitionDelay: '120ms' }}>
              <ul className="border-t border-fg/10">
                {rows.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label} className="border-b border-fg/10">
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 py-5"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-accent" aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="eyebrow block">{label}</span>
                        <span className="mt-1 block truncate text-[17px]">{value}</span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">
                Based in {profile.location}, working in UTC+3. English and Turkish day to day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
