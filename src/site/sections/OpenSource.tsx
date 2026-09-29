import { ArrowUpRight } from 'lucide-react';
import { openSource } from '@/content/projects';
import { Cover } from '@/site/art/Cover';
import { ChipList } from '@/site/ui/primitives';

export function OpenSource() {
  return (
    <section id="opensource" aria-labelledby="opensource-title" className="relative pb-[clamp(5rem,10vw,10rem)]">
      <div className="container-page">
        <div className="grid items-center gap-10 border-y border-fg/[0.12] py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-5" data-reveal="wipe">
            <Cover kind={openSource.cover} />
          </div>

          <div className="lg:col-span-7" data-reveal>
            <p className="hud flex items-center gap-4">
              <span className="text-accent">◆</span> Open source
            </p>
            <h2 id="opensource-title" data-split className="display display-md mt-5 max-w-[20ch] !leading-[0.92]">
              Upstream contributions to <span className="outline">SAGE</span>
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{openSource.body}</p>
            <ChipList items={openSource.areas} className="mt-6" />

            <ul className="mt-8 border-t border-fg/[0.12]">
              {openSource.repos.map((r) => (
                <li key={r.name} className="border-b border-fg/[0.12]">
                  <a href={r.href} target="_blank" rel="noopener noreferrer" data-cursor="GITHUB" className="wrow group grid-cols-[1fr_auto] gap-4 px-2 py-4">
                    <span>
                      <span className="block font-mono text-sm">{r.name}</span>
                      <span className="block text-sm text-muted">{r.note}</span>
                    </span>
                    <ArrowUpRight className="go h-5 w-5 text-faint" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="hud mt-5">
              Background reading:{' '}
              <a href={openSource.paper.href} className="link !text-fg" target="_blank" rel="noopener noreferrer">
                {openSource.paper.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
