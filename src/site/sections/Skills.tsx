import { skillGroups, skillsNote } from '@/content/skills';
import { cn } from '@/lib/utils';
import { ChipList, SectionHeading, vars } from '@/site/ui/primitives';
import { Spotlight } from '@/site/ui/Spotlight';

const span: Record<string, string> = {
  languages: 'lg:col-span-2',
  'data-stores': 'lg:col-span-2',
  ml: 'lg:col-span-2',
  frontend: 'lg:col-span-3',
  process: 'lg:col-span-3',
};

export function Skills() {
  const core = skillGroups.filter((g) => g.core);
  const rest = skillGroups.filter((g) => !g.core);

  return (
    <section id="stack" aria-labelledby="stack-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="stack-title"
          index="04"
          label="Stack"
          title={
            <>
              The whole path, <span className="italic">model to metal</span>.
            </>
          }
        >
          {skillsNote}
        </SectionHeading>

        <div className="grid gap-4 lg:grid-cols-3">
          {core.map((g, i) => (
            <div key={g.id} data-reveal style={vars({ '--d': `${i * 90}ms` })}>
              <Spotlight as="section" className="h-full p-6 sm:p-7">
                <h3 className="font-serif text-4xl leading-none tracking-tight">{g.title}</h3>
                <p className="mt-2 font-mono text-xs text-faint">{g.items.length} skills</p>
                <ChipList items={g.items} className="mt-6" />
              </Spotlight>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {rest.map((g, i) => (
            <div
              key={g.id}
              data-reveal
              style={vars({ '--d': `${i * 70}ms` })}
              className={cn(span[g.id] ?? 'lg:col-span-2')}
            >
              <Spotlight as="section" className="h-full p-5 sm:p-6">
                <h3 className="text-[15px] font-semibold tracking-tight">{g.title}</h3>
                <ChipList items={g.items} className="mt-4" />
              </Spotlight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
