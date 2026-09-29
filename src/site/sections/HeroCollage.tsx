import { AgentGraph } from '@/site/visuals/AgentGraph';
import { tm } from '@/site/art/kit';
import { vars } from '@/site/ui/primitives';

/** Floating cards around the agent loop. Pointer parallax lives in [data-parallax]. */

function Layer({
  depth,
  className,
  rot,
  fy,
  dur,
  delay,
  children,
}: {
  depth: number;
  className: string;
  rot: number;
  fy?: number;
  dur?: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div className={`px absolute ${className}`} style={vars({ '--depth': depth })}>
      <div
        className="floaty"
        style={vars({ '--r': `${rot}deg`, '--fy': `${fy ?? 10}px`, '--dur': `${dur ?? 7}s`, '--d': `${delay ?? 0}s` })}
      >
        {children}
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div data-live className="card p-3.5">
      <div className="flex items-center gap-2">
        <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full bg-lilac/50 font-mono text-[10px] font-semibold">
          AI
        </span>
        <span className="text-[13px] font-medium">Agent</span>
        <span aria-hidden className="ml-auto h-2 w-2 rounded-full bg-mint" />
      </div>
      <div className="mt-3 ml-auto w-[78%] rounded-2xl rounded-br-md bg-accent px-3 py-2 text-[11px] leading-snug text-accent-fg">
        Where is my warranty document?
      </div>
      <div className="a-pop mt-2 inline-flex items-center gap-1.5 rounded-full bg-mint/35 px-2.5 py-1 font-mono text-[10px]" style={tm(0.6, 9)}>
        <span aria-hidden className="grid h-3.5 w-3.5 place-items-center rounded-full bg-mint text-[8px] text-fg">✓</span>
        search_manual()
      </div>
      <div className="mt-2 flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="a-type h-1.5 w-1.5 rounded-full bg-fg/40" style={tm(i * 0.18)} />
        ))}
      </div>
    </div>
  );
}

function MetricCard() {
  return (
    <div data-live className="card p-4">
      <p className="eyebrow !text-[10px]">tool-calling</p>
      <p className="mt-1 font-serif text-[2.6rem] leading-none tracking-tight">
        98<span className="text-accent">%</span>
      </p>
      <svg viewBox="0 0 120 34" className="mt-2 h-8 w-full" aria-hidden>
        <path d="M2 28 L20 24 L38 26 L56 16 L74 18 L92 8 L118 4" fill="none" pathLength={1} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="a-draw stroke-mint" style={tm(0, 8)} />
      </svg>
      <span className="mt-1 inline-flex rounded-full bg-mint/35 px-2 py-0.5 font-mono text-[10px]">in production</span>
    </div>
  );
}

function PodsCard() {
  return (
    <div data-live className="card p-3.5">
      <p className="eyebrow !text-[10px]">HPA · requests / s</p>
      <div className="mt-2.5 grid grid-cols-5 gap-1.5" aria-hidden>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={i < 2 ? 'h-5 rounded-md bg-sky' : 'a-fade h-5 rounded-md bg-sky/60'} style={i < 2 ? undefined : tm((i - 2) * 0.55, 9)} />
        ))}
      </div>
      <p className="mt-2 font-serif text-2xl leading-none">
        2 → 10 <span className="font-mono text-[10px] text-faint">pods</span>
      </p>
    </div>
  );
}

function VoiceCard() {
  const h = [10, 18, 26, 14, 30, 20, 34, 16, 24, 12, 22, 10];
  return (
    <div data-live className="card flex items-center gap-2.5 px-3.5 py-3">
      <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-fg">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      </span>
      <span aria-hidden className="flex h-8 items-center gap-[3px]">
        {h.map((v, i) => (
          <span key={i} className="a-wave w-[3px] rounded-full bg-accent/70" style={{ height: v, ...tm(i * 0.07, 1.1) }} />
        ))}
      </span>
      <span className="hidden font-mono text-[10px] text-faint xl:inline">TR ⇄ EN</span>
    </div>
  );
}

function Sticker({ children, className, rot, d }: { children: string; className: string; rot: number; d: number }) {
  return (
    <div className={`px absolute ${className}`} style={vars({ '--depth': 44 })}>
      <span
        className="floaty inline-block rounded-full border border-fg/[0.08] bg-surface px-3 py-1.5 font-mono text-[11px] shadow-[0_8px_20px_-10px_rgb(30_41_66/0.35)]"
        style={vars({ '--r': `${rot}deg`, '--fy': '6px', '--dur': '5s', '--d': `${d}s` })}
      >
        {children}
      </span>
    </div>
  );
}

export function HeroCollage() {
  return (
    <div data-parallax className="relative mx-auto h-[30rem] w-full max-w-[36rem] sm:h-[34rem] lg:max-w-none">
      <div aria-hidden className="absolute inset-x-[4%] inset-y-[6%] rotate-[3deg] rounded-[3rem] bg-gradient-to-br from-sky/35 via-lilac/25 to-mint/35" />
      <Layer depth={10} className="left-[0%] top-[12%] w-[62%]" rot={-1.2} fy={6} dur={9}>
        <AgentGraph />
      </Layer>
      <Layer depth={30} className="right-[0%] top-[0%] w-[39%]" rot={4} fy={9} dur={7} delay={0.6}>
        <ChatCard />
      </Layer>
      <Layer depth={38} className="bottom-[1%] left-[-1%] w-[36%]" rot={-5} fy={12} dur={8} delay={1.2}>
        <MetricCard />
      </Layer>
      <Layer depth={22} className="bottom-[3%] right-[0%] w-[40%]" rot={3} fy={8} dur={6.5} delay={0.3}>
        <PodsCard />
      </Layer>
      <Layer depth={48} className="right-[0%] top-[41%] w-[40%]" rot={-2} fy={7} dur={7.5} delay={1.8}>
        <VoiceCard />
      </Layer>
      <Sticker className="left-[40%] top-[1%]" rot={-4} d={0.2}>vLLM</Sticker>
      <Sticker className="bottom-[30%] left-[1%]" rot={5} d={0.9}>Kafka</Sticker>
      <Sticker className="bottom-[0%] left-[44%]" rot={-3} d={1.4}>gRPC</Sticker>
    </div>
  );
}
