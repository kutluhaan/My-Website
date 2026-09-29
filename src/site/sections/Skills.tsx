import { skillGroups, skillsNote } from '@/content/skills';
import { cn } from '@/lib/utils';
import { Figure } from '@/site/art/hud';
import { StackLayers } from '@/site/art/figs-b';
import { SectionHead, vars } from '@/site/ui/primitives';

const pad = (n: number) => String(n).padStart(2, '0');

/** Capability matrix: every group is a row of a hardware-style spec table. */
export function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="stack" aria-labelledby="stack-title" className="section relative">
      <div className="container-page">
        <SectionHead
          id="stack-title"
          no="04"
          label="Stack"
          title={
            <>
              Model to <span className="outline">metal</span>.
            </>
          }
        >
          {skillsNote}
        </SectionHead>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28" data-reveal>
              <Figure no="17" title="STACK LAYERS" ratio="aspect-[6/5]">
                <div className="absolute inset-0 grid place-items-center p-6 pt-9">
                  <StackLayers />
                </div>
              </Figure>
              <dl className="mt-6 grid grid-cols-3 border border-fg/[0.12]">
                {[
                  ['Groups', skillGroups.length],
                  ['Tools', total],
                  ['Layers', 3],
                ].map(([k, v], i) => (
                  <div key={k} className={cn('p-4', i && 'border-l border-fg/[0.12]')}>
                    <dt className="hud">{k}</dt>
                    <dd className="display num mt-2 text-4xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {skillGroups.map((g, i) => (
              <li
                key={g.id}
                data-reveal
                style={vars({ '--d': `${(i % 4) * 60}ms` })}
                className="group relative border-t border-fg/[0.12] py-7 last:border-b sm:py-8"
              >
                <span aria-hidden className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-x-100" />
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display flex items-baseline gap-4 text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] leading-none">
                    <span className="hud !text-accent">{pad(i + 1)}</span>
                    {g.title}
                  </h3>
                  <p className="hud shrink-0">
                    {g.core && <span className="mr-3 text-accent">◆ core</span>}
                    {pad(g.items.length)}
                  </p>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5 sm:pl-12">
                  {g.items.map((item) => (
                    <li key={item}>
                      <span className={cn('chip transition-colors duration-300 hover:border-accent hover:text-fg', g.core && 'border-fg/[0.24] !text-fg/80')}>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
