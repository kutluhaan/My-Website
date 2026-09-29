import { profile } from '@/content/profile';
import { vars } from '@/site/ui/primitives';

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {profile.marquee.map((name) => (
        <div key={name} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-muted">{name}</span>
          <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
        </div>
      ))}
    </div>
  );
}

/** A slow ticker of the places and programmes behind the work. */
export function Ticker() {
  return (
    <section aria-label="Companies, labs and programmes I have worked with or learned from" className="marquee-wrap relative overflow-hidden border-y border-fg/[0.12] bg-surface py-5">
      <div className="marquee" style={vars({ '--speed': '70s' })}>
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
