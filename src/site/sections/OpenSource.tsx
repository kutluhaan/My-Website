import { ArrowUpRight } from 'lucide-react';
import { openSource } from '@/content/projects';
import { ChipList } from '@/site/ui/primitives';

export function OpenSource() {
  return (
    <section id="opensource" aria-labelledby="opensource-title" className="relative pb-[clamp(5rem,9vw,9rem)]">
      <div className="container-page">
        <div className="grid gap-12 border-y border-fg/10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-6" data-reveal>
            <p className="hud text-accent">Open source</p>
            <h2 id="opensource-title" className="display display-md mt-5 max-w-[18ch]">
              Upstream contributions to <span className="em">SAGE</span>
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{openSource.body}</p>
            <ChipList items={openSource.areas} className="mt-7" />
          </div>

          <div className="lg:col-span-6" data-reveal style={{ transitionDelay: '100ms' }}>
            <ul className="border-b border-fg/10">
              {openSource.repos.map((r) => (
                <li key={r.name}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="wrow grid-cols-[1fr_auto] gap-4 px-2 py-5">
                    <span>
                      <span className="block font-mono text-[14px]">{r.name}</span>
                      <span className="mt-0.5 block text-[14px] text-muted">{r.note}</span>
                    </span>
                    <ArrowUpRight className="go h-5 w-5 text-faint" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="hud mt-5">
              Background reading:{' '}
              <a href={openSource.paper.href} className="link" target="_blank" rel="noopener noreferrer">
                {openSource.paper.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
