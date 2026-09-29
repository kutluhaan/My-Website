import { Frame, Pill, tm } from './kit';

/** Little scenic vignettes for the places in the story. Decorative, flat, animated. */

function Cloud({ x, y, s = 1, d = 0 }: { x: number; y: number; s?: number; d?: number }) {
  return (
    <g className="a-drift" style={tm(d, 16)}>
      <path
        d={`M${x} ${y} a${10 * s} ${10 * s} 0 0 1 ${6 * s} ${-18 * s} a${16 * s} ${16 * s} 0 0 1 ${30 * s} ${3 * s} a${9 * s} ${9 * s} 0 0 1 ${2 * s} ${15 * s}z`}
        className="fill-surface/80"
      />
    </g>
  );
}

export function IstanbulScene() {
  return (
    <Frame tone="coral" decor={false} label="Istanbul skyline at sunrise: Galata Tower, a domed mosque with minarets and a ferry">
      <rect width="400" height="150" className="fill-sun/25" />
      <circle cx="300" cy="96" r="38" className="fill-sun" />
      <circle cx="300" cy="96" r="56" className="fill-sun/30" />
      <Cloud x={40} y={64} d={0} />
      <Cloud x={230} y={40} s={0.8} d={3} />
      {/* mosque */}
      <g className="fill-fg/30">
        <path d="M192 206 a44 44 0 0 1 88 0z" />
        <path d="M178 206 a22 22 0 0 1 22 -22 v22z M272 206 v-22 a22 22 0 0 1 22 22z" />
        <rect x="166" y="118" width="9" height="88" rx="3" />
        <path d="M164 118 l6.5 -22 l6.5 22z" />
        <rect x="298" y="118" width="9" height="88" rx="3" />
        <path d="M296 118 l6.5 -22 l6.5 22z" />
        <rect x="130" y="150" width="34" height="56" rx="3" />
        <rect x="309" y="150" width="40" height="56" rx="3" />
      </g>
      <circle cx="236" cy="150" r="3.5" className="fill-accent/60" />
      {/* galata tower */}
      <g className="fill-fg/40">
        <rect x="70" y="112" width="30" height="94" rx="4" />
        <rect x="64" y="104" width="42" height="9" rx="3" />
        <path d="M68 104 L85 62 L102 104z" />
        <rect x="83" y="52" width="4" height="12" rx="2" />
      </g>
      {[124, 140, 156, 172].map((y) => (
        <rect key={y} x="82" y={y} width="6" height="8" rx="3" className="fill-sun/80" />
      ))}
      {/* sea */}
      <rect y="206" width="400" height="74" className="fill-sky/45" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${20 + i * 130} ${226 + i * 12} q20 -8 40 0 t40 0 t40 0`} fill="none" strokeWidth="2.5" strokeLinecap="round" className="a-drift stroke-surface/70" style={tm(i * 1.2, 7)} />
      ))}
      <g className="a-drift" style={tm(0, 14)}>
        <path d="M250 240 h70 l-8 12 h-54z" className="fill-surface" />
        <rect x="270" y="226" width="30" height="14" rx="3" className="fill-accent" />
        <rect x="276" y="230" width="6" height="6" rx="1" className="fill-white/80" />
        <rect x="286" y="230" width="6" height="6" rx="1" className="fill-white/80" />
      </g>
      {[
        [140, 84],
        [168, 66],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q6 -8 12 0 q6 -8 12 0`} fill="none" strokeWidth="2" strokeLinecap="round" className="a-bob stroke-fg/40" style={tm(i * 0.8, 3)} />
      ))}
      <Pill x={22} y={22} w={152} h={22} text="Istanbul · home base" />
    </Frame>
  );
}

export function BerlinScene() {
  return (
    <Frame tone="sky" decor={false} label="Berlin skyline: the TV tower, the Brandenburg Gate and city blocks">
      <rect width="400" height="150" className="fill-lilac/20" />
      <circle cx="90" cy="70" r="30" className="fill-sun/80" />
      <Cloud x={230} y={56} d={1} />
      <Cloud x={300} y={98} s={0.7} d={4} />
      {/* blocks */}
      <g className="fill-fg/20">
        <rect x="240" y="148" width="40" height="58" rx="3" />
        <rect x="286" y="126" width="34" height="80" rx="3" />
        <rect x="326" y="160" width="48" height="46" rx="3" />
        <rect x="14" y="170" width="44" height="36" rx="3" />
      </g>
      {[
        [252, 160],
        [264, 176],
        [296, 140],
        [306, 160],
        [296, 180],
        [338, 174],
        [356, 190],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="6" height="8" rx="1.5" className="a-blink fill-sun" style={tm(i * 0.6, 4)} />
      ))}
      {/* brandenburg gate */}
      <g className="fill-fg/35">
        <rect x="62" y="144" width="120" height="12" rx="2" />
        <rect x="70" y="132" width="104" height="12" rx="2" />
        <rect x="104" y="112" width="36" height="20" rx="3" />
        <path d="M112 112 l10 -18 l10 18z" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={70 + i * 19} y="156" width="9" height="50" rx="2" />
        ))}
      </g>
      {/* tv tower */}
      <g className="fill-fg/40">
        <path d="M204 206 L207 100 h6 L216 206z" />
        <circle cx="210" cy="104" r="17" />
        <rect x="209" y="46" width="2.6" height="42" />
      </g>
      <rect x="192" y="102" width="36" height="3" className="fill-surface/70" />
      <circle cx="210" cy="50" r="3" className="a-blink fill-coral" style={tm(0, 1.6)} />
      <rect y="206" width="400" height="74" className="fill-mint/30" />
      <path d="M0 214 h400" strokeWidth="2" className="stroke-fg/15" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={30 + i * 100} y="238" width="60" height="6" rx="3" className="fill-fg/10" />
      ))}
      <Pill x={22} y={22} w={166} h={22} text="Berlin · GT-ARC 2024" />
    </Frame>
  );
}

export function CampusScene() {
  return (
    <Frame tone="mint" decor={false} label="A modern campus building with a tree and a graduation cap floating above it">
      <rect width="400" height="150" className="fill-sky/25" />
      <circle cx="330" cy="70" r="32" className="fill-sun/85" />
      <Cloud x={50} y={70} d={0} />
      <rect x="40" y="130" width="250" height="76" rx="6" className="fill-surface stroke-fg/15" />
      <rect x="30" y="122" width="270" height="14" rx="4" className="fill-fg/30" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={54 + i * 27} y="146" width="14" height="48" rx="4" className={i % 3 === 1 ? 'fill-accent/40' : 'fill-sky/50'} />
      ))}
      <rect y="206" width="400" height="74" className="fill-mint/40" />
      <path d="M120 206 L150 280 h100 L220 206z" className="fill-surface/70" />
      <g>
        <rect x="322" y="150" width="8" height="56" rx="3" className="fill-fg/35" />
        <circle cx="326" cy="136" r="24" className="fill-mint" />
        <circle cx="308" cy="150" r="16" className="fill-mint/80" />
        <circle cx="346" cy="152" r="16" className="fill-mint/80" />
      </g>
      <g className="a-bob" style={tm(0, 4)}>
        <path d="M150 72 L200 52 L250 72 L200 92z" className="fill-accent" />
        <path d="M172 82 v22 c0 8 56 8 56 0 v-22" className="fill-accent/70" />
        <line x1="250" y1="72" x2="250" y2="100" strokeWidth="3" strokeLinecap="round" className="stroke-sun" />
        <circle cx="250" cy="104" r="5" className="fill-sun" />
      </g>
      <Pill x={22} y={22} w={188} h={22} text="Sabancı University · CSE" />
    </Frame>
  );
}
