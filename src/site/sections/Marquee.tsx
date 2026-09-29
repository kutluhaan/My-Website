import { profile } from '@/content/profile';
import { vars } from '@/site/ui/primitives';

function Sparkle() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="mx-8 h-4 w-4 shrink-0 text-accent" fill="currentColor">
      <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4z" />
    </svg>
  );
}

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {profile.marquee.map((name) => (
        <div key={name} className="flex items-center">
          <span className="whitespace-nowrap font-serif text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] italic leading-none text-fg/80">
            {name}
          </span>
          <Sparkle />
        </div>
      ))}
    </div>
  );
}

/** A slow ticker of the places and programmes behind the work. */
export function Marquee() {
  return (
    <section
      aria-label="Companies, labs and programmes I have worked with or learned from"
      className="marquee-wrap relative overflow-hidden border-y border-fg/[0.07] bg-surface/70 py-7"
    >
      <div className="marquee" style={vars({ '--speed': '60s' })}>
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
