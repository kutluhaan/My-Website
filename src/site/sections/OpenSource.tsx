import { ArrowUpRight, GitPullRequest } from 'lucide-react';
import { openSource } from '@/content/projects';
import { Spotlight } from '@/site/ui/Spotlight';

export function OpenSource() {
  return (
    <section id="opensource" aria-labelledby="opensource-title" className="pb-[clamp(4.5rem,9vw,8.5rem)]">
      <div className="container-page">
        <Spotlight className="grid gap-10 p-6 sm:p-9 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow flex items-center gap-3">
              <GitPullRequest className="h-4 w-4 text-accent" aria-hidden />
              Open source
            </p>
            <h2
              id="opensource-title"
              className="mt-6 font-serif text-[clamp(2rem,1.4rem+2.2vw,3.5rem)] leading-[1.04] tracking-[-0.018em]"
            >
              {openSource.title}
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{openSource.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {openSource.areas.map((a) => (
                <li key={a} className="chip">
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5" data-reveal>
            <ul className="border-t border-fg/10">
              {openSource.repos.map((r) => (
                <li key={r.name} className="border-b border-fg/10">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block font-mono text-sm">{r.name}</span>
                      <span className="block text-sm text-muted">{r.note}</span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">
              Background reading:{' '}
              <a href={openSource.paper.href} className="link" target="_blank" rel="noopener noreferrer">
                {openSource.paper.label}
              </a>
            </p>
          </div>
        </Spotlight>
      </div>
    </section>
  );
}
