import { profile } from '@/content/profile';

/** A quiet, static line of the places and programmes behind the work. */
export function Ticker() {
  return (
    <section aria-label="Companies, labs and programmes I have worked with or learned from" className="border-y border-fg/10 py-7">
      <div className="container-page flex flex-col gap-3 lg:flex-row lg:items-baseline lg:gap-10">
        <p className="hud shrink-0">Worked with and learned from</p>
        <ul className="dots text-[15px] leading-8 text-muted">
          {profile.marquee.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
