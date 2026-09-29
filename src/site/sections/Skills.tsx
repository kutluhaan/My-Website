import { skillGroups, skillsNote } from '@/content/skills';
import { SectionHead } from '@/site/ui/primitives';

const pad = (n: number) => String(n).padStart(2, '0');

/** Skills as quiet rows: group on the left, a plain run of tools on the right. */
export function Skills() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="section relative">
      <div className="container-page">
        <SectionHead
          id="stack-title"
          no="04"
          label="Stack"
          title={
            <>
              From model to <span className="em">metal</span>.
            </>
          }
        >
          {skillsNote}
        </SectionHead>

        <ol className="border-b border-fg/10">
          {skillGroups.map((g, i) => (
            <li key={g.id} data-reveal className="grid gap-4 border-t border-fg/10 py-8 lg:grid-cols-12 lg:gap-10">
              <h3 className="display flex items-baseline gap-4 text-[clamp(1.5rem,1.1rem+1vw,2.1rem)] leading-tight lg:col-span-4">
                <span className="num font-sans text-[13px] text-accent">{pad(i + 1)}</span>
                {g.title}
              </h3>
              <ul className={`dots text-[16px] leading-8 lg:col-span-8 ${g.core ? 'text-fg/90' : 'text-muted'}`}>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
