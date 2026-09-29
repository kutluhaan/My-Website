import fs from 'node:fs';
import path from 'node:path';
import { profile } from '@/content/profile';
import { asset } from '@/lib/site';
import { CandlesIcon, ChartIcon, LayersIcon } from '@/site/art/misc';
import { CoverArt } from '@/site/art/Cover';
import { SectionHeading, vars } from '@/site/ui/primitives';
import { Spotlight } from '@/site/ui/Spotlight';

const icons = { chart: ChartIcon, layers: LayersIcon, candles: CandlesIcon } as const;

/** Drop a portrait at public/profile.(jpg|png|webp) and it replaces the monogram. */
const photo = ['profile.jpg', 'profile.jpeg', 'profile.png', 'profile.webp'].find((f) =>
  fs.existsSync(path.join(process.cwd(), 'public', f)),
);

function Polaroid({
  className,
  rot,
  caption,
  ratio,
  children,
  delay = 0,
}: {
  className: string;
  rot: number;
  caption: string;
  ratio: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <figure
      data-reveal="scale"
      className={`lift absolute rounded-[1.25rem] border border-fg/[0.08] bg-surface p-2.5 pb-10 ${className}`}
      style={vars({ rotate: `${rot}deg`, boxShadow: 'var(--shadow-2)', '--d': `${delay}ms` })}
    >
      <div data-live className={`relative overflow-hidden rounded-xl ${ratio}`}>
        {children}
      </div>
      <figcaption className="absolute inset-x-0 bottom-2.5 text-center font-serif text-[1.15rem] italic leading-none text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

function Portrait() {
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset(`/${photo}`)} alt={`${profile.name}`} className="h-full w-full object-cover" />;
  }
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br from-sky/50 via-lilac/40 to-pink/45">
      <svg aria-hidden viewBox="0 0 200 250" className="absolute inset-0 h-full w-full">
        <circle cx="160" cy="46" r="60" className="fill-sun/45" />
        <circle cx="30" cy="230" r="70" className="fill-mint/40" />
        <path d="M100 6 l5 14 l14 5 l-14 5 l-5 14 l-5 -14 l-14 -5 l14 -5z" className="a-spin tb fill-surface/90" style={vars({ '--t': '18s' })} />
      </svg>
      <span className="relative font-serif text-[6.5rem] italic leading-none text-fg/85">KA</span>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              Agentic AI that <span className="italic mark">holds up</span> in production.
            </>
          }
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-7" data-reveal>
            <p className="font-serif text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)] leading-[1.22] tracking-[-0.01em]">
              {profile.pitch}
            </p>
            <p className="mt-7 max-w-prose text-muted">{profile.pitch2}</p>

            <dl className="mt-9 grid max-w-xl grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-4 text-[15px]">
              <dt className="eyebrow pt-1">Languages</dt>
              <dd className="flex flex-wrap gap-2">
                {profile.languages.map((l) => (
                  <span key={l.name} className="chip !whitespace-normal !text-fg">
                    {l.name} <span className="ml-1.5 text-faint">{l.level}</span>
                  </span>
                ))}
              </dd>
              <dt className="eyebrow pt-1">Open to</dt>
              <dd className="flex flex-wrap gap-2">
                {profile.regions.map((r) => (
                  <span key={r} className="chip !text-fg">
                    {r}
                  </span>
                ))}
              </dd>
            </dl>

            <div className="mt-9 max-w-xl rounded-2xl bg-surface-2 p-5">
              <p className="eyebrow mb-2">Türkçe özet</p>
              <p lang="tr" className="text-[15px] leading-relaxed text-muted">
                {profile.pitchTr}
              </p>
            </div>
          </div>

          <div className="relative mx-auto h-[36rem] w-full max-w-[30rem] lg:col-span-5 lg:max-w-none">
            <div aria-hidden className="absolute inset-6 rounded-[3rem] bg-gradient-to-br from-sun/30 via-pink/20 to-sky/30" />
            <Polaroid className="left-[2%] top-[0%] w-[52%]" rot={-4} caption="Kutluhan" ratio="aspect-[4/5]">
              <Portrait />
            </Polaroid>
            <Polaroid className="right-[0%] top-[16%] w-[54%]" rot={3.5} caption="Istanbul, home base" ratio="aspect-[10/7]" delay={120}>
              <CoverArt kind="istanbul" />
            </Polaroid>
            <Polaroid className="bottom-[0%] left-[16%] w-[54%]" rot={-2} caption="Berlin, GT-ARC 2024" ratio="aspect-[10/7]" delay={240}>
              <CoverArt kind="berlin" />
            </Polaroid>
          </div>
        </div>

        <ul className="mt-20 grid gap-4 md:grid-cols-3">
          {profile.strengths.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.title} data-reveal style={vars({ '--d': `${i * 100}ms` })}>
                <Spotlight className="h-full p-6 sm:p-7">
                  <Icon />
                  <h3 className="h3 mt-5">{s.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </Spotlight>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
