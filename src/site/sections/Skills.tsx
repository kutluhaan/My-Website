import { skillGroups, skillsNote } from '@/content/skills';
import { cn } from '@/lib/utils';
import { StackLayers } from '@/site/art/misc';
import { ChipList, SectionHeading, vars } from '@/site/ui/primitives';
import { Spotlight } from '@/site/ui/Spotlight';

const span: Record<string, string> = {
  languages: 'lg:col-span-2',
  'data-stores': 'lg:col-span-2',
  ml: 'lg:col-span-2',
  frontend: 'lg:col-span-3',
  process: 'lg:col-span-3',
};

const dot: Record<string, string> = {
  ai: 'bg-lilac',
  backend: 'bg-sky',
  cloud: 'bg-mint',
  languages: 'bg-sun',
  'data-stores': 'bg-coral',
  ml: 'bg-pink',
  frontend: 'bg-sky',
  process: 'bg-mint',
};

function Ticker({ reverse }: { reverse?: boolean }) {
  const all = skillGroups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const words = reverse ? all.slice(half) : all.slice(0, half);
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden}>
      {words.map((w) => (
        <span key={w} className="whitespace-nowrap rounded-full border border-fg/[0.08] bg-surface px-4 py-2 font-mono text-xs text-muted">
          {w}
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee-wrap overflow-hidden" aria-hidden>
      <div className="marquee" style={vars({ '--speed': reverse ? '70s' : '80s', animationDirection: reverse ? 'reverse' : 'normal' })}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}

export function Skills() {
  const core = skillGroups.filter((g) => g.core);
  const rest = skillGroups.filter((g) => !g.core);

  return (
    <section id="stack" aria-labelledby="stack-title" className="section">
      <div className="container-page">
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-12 sm:mb-20">
          <div className="lg:col-span-7">
            <SectionHeading
              id="stack-title"
              index="04"
              label="Stack"
              title={
                <>
                  The whole path, <span className="italic mark">model to metal</span>.
                </>
              }
            >
              {skillsNote}
            </SectionHeading>
          </div>
          <div data-reveal="scale" data-live className="mx-auto w-full max-w-md lg:col-span-5">
            <StackLayers />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {core.map((g, i) => (
            <div key={g.id} data-reveal style={vars({ '--d': `${i * 90}ms` })}>
              <Spotlight as="section" className="h-full p-6 sm:p-7">
                <h3 className="flex items-center gap-3 font-serif text-4xl leading-none tracking-tight">
                  <span aria-hidden className={cn('h-3 w-3 shrink-0 rounded-full', dot[g.id])} />
                  {g.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-faint">{g.items.length} skills</p>
                <ChipList items={g.items} className="mt-6" />
              </Spotlight>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {rest.map((g, i) => (
            <div key={g.id} data-reveal style={vars({ '--d': `${i * 70}ms` })} className={cn(span[g.id] ?? 'lg:col-span-2')}>
              <Spotlight as="section" className="h-full p-5 sm:p-6">
                <h3 className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
                  <span aria-hidden className={cn('h-2.5 w-2.5 shrink-0 rounded-full', dot[g.id])} />
                  {g.title}
                </h3>
                <ChipList items={g.items} className="mt-4" />
              </Spotlight>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-3">
          <Ticker />
          <Ticker reverse />
        </div>
      </div>
    </section>
  );
}
