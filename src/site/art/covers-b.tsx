import { Bar, Card, Chrome, Frame, Pill, Txt, tm } from './kit';

/* ---- GT-ARC text-to-video ---------------------------------------------- */
export function VideoCover() {
  return (
    <Frame tone="sun" label="A talking-head video frame with a sync waveform and latency dropping from 5.3 to 2.5 seconds">
      <Card x={60} y={20} w={280} h={172} r={16}>
        <rect x={72} y={32} width={256} height={118} rx={10} className="fill-sun/30" />
        <rect x={168} y={116} width={64} height={34} rx={17} className="fill-sky/70" />
        <circle cx={200} cy={92} r={29} className="fill-coral/45" />
        <path d="M171 88 a29 29 0 0 1 58 0 c-10 -11 -46 -11 -58 0z" className="fill-lilac" />
        <circle cx={190} cy={94} r={2.6} className="fill-fg" />
        <circle cx={210} cy={94} r={2.6} className="fill-fg" />
        <ellipse cx={200} cy={108} rx={8} ry={3.6} className="a-wave tb fill-coral" style={tm(0, 0.7)} />
        <Pill x={252} y={38} w={64} h={16} text="512×512" size={8.5} />
        <circle cx={92} cy={136} r={10} className="fill-surface stroke-fg/10" />
        <path d="M89 131 l9 5 l-9 5z" className="fill-accent" />
        <rect x={76} y={166} width={248} height={5} rx={2.5} className="fill-fg/15" />
        <rect x={76} y={166} width={150} height={5} rx={2.5} className="a-grow-x tb-l fill-accent" style={tm(0, 9)} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={250 + i * 9} y={132 - [8, 16, 10, 20, 12, 6][i] / 2} width={4} height={[8, 16, 10, 20, 12, 6][i]} rx={2} className="a-wave tb fill-accent/70" style={tm(i * 0.1, 0.9)} />
        ))}
      </Card>
      <Txt x={26} y={220} size={10} className="fill-faint">
        5.3 s
      </Txt>
      <rect x={68} y={211} width={190} height={11} rx={5.5} className="fill-coral/55" />
      <Txt x={26} y={246} size={10} className="fill-faint">
        2.5 s
      </Txt>
      <rect x={68} y={237} width={90} height={11} rx={5.5} className="a-grow-x tb-l fill-mint" style={tm(0.4, 9)} />
      <Pill x={286} y={222} w={70} h={24} text="−53%" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" size={11} />
    </Frame>
  );
}

/* ---- Banking DB --------------------------------------------------------- */
function Table({ x, hot }: { x: number; hot: 'coral' | 'mint' }) {
  return (
    <Card x={x} y={44} w={128} h={140}>
      <Txt x={x + 12} y={64} size={9.5} className="fill-faint">
        {hot === 'coral' ? 'account A' : 'account B'}
      </Txt>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          {i === 1 && <rect x={x + 6} y={74 + i * 32} width={116} height={26} rx={8} className={hot === 'coral' ? 'fill-coral/25' : 'fill-mint/30'} />}
          <circle cx={x + 20} cy={87 + i * 32} r={5} className="fill-fg/20" />
          <Bar x={x + 32} y={85 + i * 32} w={42} />
          <Bar x={x + 84} y={85 + i * 32} w={26} className={i === 1 ? (hot === 'coral' ? 'fill-coral' : 'fill-mint') : 'fill-fg/15'} />
        </g>
      ))}
    </Card>
  );
}

export function BankingCover() {
  return (
    <Frame tone="sky" label="Two account tables with a locked row while money moves between them safely">
      <Table x={26} hot="coral" />
      <Table x={246} hot="mint" />
      <line x1={158} x2={242} y1={130} y2={130} strokeWidth={1.6} className="a-dash stroke-fg/30" />
      <circle cx={158} cy={130} r={7} className="a-move-x fill-sun stroke-fg/20" style={tm(0, 2.6, { '--dx': '84px' })} />
      <circle cx={200} cy={82} r={20} className="fill-surface stroke-fg/10" />
      <g className="a-blink" style={tm(0, 2.6)}>
        <rect x={192} y={82} width={16} height={12} rx={3} className="fill-accent" />
        <path d="M195 82 v-4 a5 5 0 0 1 10 0 v4" fill="none" strokeWidth={2} className="stroke-accent" />
      </g>
      <Pill x={176} y={22} w={48} h={20} text="ACID" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
      <Pill x={54} y={206} w={292} h={30} text="SELECT … FOR UPDATE" size={12} fill="fill-surface" />
      <Pill x={54} y={246} w={130} h={20} text="deadlock-safe order" size={9} fill="fill-mint/40" stroke="stroke-transparent" />
      <Pill x={192} y={246} w={154} h={20} text="EXPLAIN before / after" size={9} />
    </Frame>
  );
}

/* ---- Data structures ---------------------------------------------------- */
const treeNodes: Array<[number, number, number]> = [
  [200, 58, 30],
  [132, 114, 18],
  [268, 114, 42],
  [96, 174, 10],
  [166, 174, 24],
  [234, 174, 36],
  [304, 174, 50],
];
const treeEdges: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
];

export function DsaCover() {
  const path = [0, 2, 5];
  return (
    <Frame tone="lilac" label="A balanced binary search tree with a lookup path lighting up">
      {treeEdges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={treeNodes[a][0]} y1={treeNodes[a][1]} x2={treeNodes[b][0]} y2={treeNodes[b][1]} strokeWidth={2} className="stroke-fg/25" />
      ))}
      {treeNodes.map(([x, y, n], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={18} className="fill-surface stroke-fg/15" />
          <Txt x={x} y={y + 4} size={11} anchor="middle" weight={600}>
            {n}
          </Txt>
        </g>
      ))}
      {path.map((idx, k) => {
        const [x, y, n] = treeNodes[idx];
        return (
          <g key={idx} className="a-pop tb" style={tm(k * 0.9, 6)}>
            <circle cx={x} cy={y} r={18} className="fill-accent" />
            <Txt x={x} y={y + 4} size={11} anchor="middle" weight={600} className="fill-white">
              {n}
            </Txt>
          </g>
        );
      })}
      <path d="M64 108 q-26 36 6 66" fill="none" strokeWidth={2} strokeLinecap="round" className="a-dash stroke-coral" />
      <Txt x={24} y={150} size={9} className="fill-coral">
        rotate
      </Txt>
      <Pill x={24} y={24} w={86} h={22} text="find(36)" />
      <Pill x={286} y={24} w={90} h={22} text="RAII · C++" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
      <Pill x={104} y={226} w={192} h={26} text="AVL · red-black · O(log n)" size={10.5} />
    </Frame>
  );
}

/* ---- Expense tracker ---------------------------------------------------- */
const arcs: Array<{ start: number; frac: number; cls: string; d: number }> = [
  { start: 0, frac: 0.4, cls: 'stroke-sky', d: 0 },
  { start: 0.4, frac: 0.25, cls: 'stroke-coral', d: 0.5 },
  { start: 0.65, frac: 0.2, cls: 'stroke-mint', d: 1 },
  { start: 0.85, frac: 0.15, cls: 'stroke-sun', d: 1.5 },
];

export function ExpenseCover() {
  return (
    <Frame tone="coral" label="A phone showing a spending donut chart, categories and monthly bars">
      <Card x={140} y={12} w={120} h={256} r={24}>
        <rect x={176} y={20} width={48} height={6} rx={3} className="fill-fg/15" />
        <g transform="rotate(-90 200 96)">
          <circle cx={200} cy={96} r={34} fill="none" strokeWidth={13} className="stroke-fg/[0.07]" />
          {arcs.map((a) => (
            <circle
              key={a.start}
              cx={200}
              cy={96}
              r={34}
              fill="none"
              strokeWidth={13}
              pathLength={1}
              strokeDasharray={`${a.frac - 0.012} ${1 - a.frac + 0.012}`}
              strokeDashoffset={-a.start}
              className={`a-fade ${a.cls}`}
              style={tm(a.d * 0.4, 8)}
            />
          ))}
        </g>
        <Txt x={200} y={94} size={11} anchor="middle" weight={600}>
          May
        </Txt>
        <Txt x={200} y={107} size={8} anchor="middle" className="fill-faint">
          spending
        </Txt>
        {['fill-sky', 'fill-coral', 'fill-mint'].map((c, i) => (
          <g key={c}>
            <circle cx={158} cy={150 + i * 22} r={5} className={c} />
            <Bar x={170} y={148 + i * 22} w={50 - i * 8} />
            <Bar x={226} y={148 + i * 22} w={20} className="fill-fg/25" />
          </g>
        ))}
        {[24, 38, 30, 46, 34].map((h, i) => (
          <rect key={i} x={158 + i * 18} y={250 - h} width={11} height={h} rx={4} className="a-grow-y tb-b fill-accent/70" style={tm(i * 0.15, 7)} />
        ))}
      </Card>
      <Card x={28} y={120} w={96} h={70} r={14}>
        <Txt x={40} y={140} size={8.5} className="fill-faint">
          trend
        </Txt>
        <path d="M38 176 L58 160 L76 168 L96 148 L114 152" fill="none" pathLength={1} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="a-draw stroke-accent" style={tm(0, 8)} />
      </Card>
      <Pill x={280} y={64} w={80} h={22} text="JWT ✓" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
      <Pill x={270} y={112} w={102} h={22} text="aggregation" />
      <Pill x={266} y={160} w={110} h={22} text="10+ endpoints" fill="fill-sun/50" />
    </Frame>
  );
}

/* ---- SIR network -------------------------------------------------------- */
const hub: [number, number] = [200, 140];
const lines: Array<{ cls: string; pts: Array<[number, number]> }> = [
  { cls: 'stroke-sky', pts: [[36, 208], [94, 178], [148, 154], hub, [258, 122], [316, 96], [368, 60]] },
  { cls: 'stroke-lilac', pts: [[152, 36], [176, 90], hub, [226, 192], [252, 246]] },
  { cls: 'stroke-coral', pts: [[226, 192], [278, 176], [338, 182]] },
  { cls: 'stroke-mint', pts: [[148, 154], [112, 118], [70, 98]] },
];
const stations = Array.from(
  new Map(lines.flatMap((l) => l.pts).map((p) => [p.join(','), p] as const)).values(),
);

export function SirCover() {
  return (
    <Frame tone="mint" label="A rail network where an infection spreads outward from a busy transfer hub, then recovers">
      {lines.map((l, i) => (
        <polyline key={i} points={l.pts.map((p) => p.join(',')).join(' ')} fill="none" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" className={`${l.cls} opacity-60`} />
      ))}
      {stations.map(([x, y]) => {
        const isHub = x === hub[0] && y === hub[1];
        const dist = Math.hypot(x - hub[0], y - hub[1]);
        return (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={isHub ? 12 : 7}
            strokeWidth={2.5}
            className="a-sir stroke-surface"
            style={tm(dist * 0.011, 10)}
          />
        );
      })}
      <Txt x={216} y={172} size={9} className="fill-faint">
        transfer hub
      </Txt>
      <Pill x={24} y={24} w={92} h={22} text="S → I → R" />
      <Pill x={262} y={24} w={114} h={22} text="64+ Monte Carlo" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
      <Pill x={24} y={240} w={132} h={22} text="betweenness = risk" fill="fill-surface" />
    </Frame>
  );
}

/* ---- Turkey dashboard --------------------------------------------------- */
export function TurkeyCover() {
  return (
    <Frame tone="sun" label="A small dashboard with bars, a donut and a line chart built from TÜİK data">
      <Pill x={24} y={22} w={142} h={22} text="TÜİK · 40+ datasets" />
      {['migration', 'economy', 'election'].map((t, i) => (
        <Pill key={t} x={174 + i * 66} y={22} w={60} h={22} text={t} size={8} fill="fill-surface/70" />
      ))}
      <Card x={24} y={56} w={168} h={112}>
        {[44, 66, 52, 78, 60, 88].map((h, i) => (
          <rect key={i} x={40 + i * 24} y={152 - h} width={15} height={h} rx={4.5} className={`a-grow-y tb-b ${i % 2 ? 'fill-coral/80' : 'fill-sky'}`} style={tm(i * 0.14, 8)} />
        ))}
      </Card>
      <Card x={204} y={56} w={82} h={112}>
        <g transform="rotate(-90 245 112)">
          {[
            { s: 0, f: 0.5, c: 'stroke-mint' },
            { s: 0.5, f: 0.3, c: 'stroke-lilac' },
            { s: 0.8, f: 0.2, c: 'stroke-sun' },
          ].map((a) => (
            <circle key={a.s} cx={245} cy={112} r={24} fill="none" strokeWidth={12} pathLength={1} strokeDasharray={`${a.f - 0.02} ${1 - a.f + 0.02}`} strokeDashoffset={-a.s} className={`a-fade ${a.c}`} style={tm(a.s * 0.8, 8)} />
          ))}
        </g>
      </Card>
      <Card x={298} y={56} w={78} h={112}>
        <path d="M310 148 L326 128 L340 136 L354 100 L366 108" fill="none" pathLength={1} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="a-draw stroke-accent" style={tm(0, 8)} />
      </Card>
      <Card x={24} y={180} w={352} h={76}>
        <path d="M40 240 C 80 210, 110 236, 150 218 S 220 200, 260 214 S 330 196, 360 204 V 246 H 40Z" className="fill-accent/10" />
        <path d="M40 240 C 80 210, 110 236, 150 218 S 220 200, 260 214 S 330 196, 360 204" fill="none" pathLength={1} strokeWidth={2.4} strokeLinecap="round" className="a-draw stroke-accent" style={tm(0.5, 8)} />
        <Txt x={40} y={200} size={9} className="fill-faint">
          Flask · Bootstrap · Matplotlib
        </Txt>
      </Card>
    </Frame>
  );
}

/* ---- PURE: attention detection ----------------------------------------- */
export function AttentionCover() {
  const tones = ['fill-lilac', 'fill-coral', 'fill-sun'];
  return (
    <Frame tone="pink" label="A row of addressable LEDs chasing while an eye follows, comparing physical and virtual reflexes">
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={i} cx={46 + i * 34} cy={84} r={10} className={`a-blink ${tones[i % 3]}`} style={tm(i * 0.3, 3)} />
      ))}
      <ellipse cx={200} cy={158} rx={52} ry={28} className="fill-surface stroke-fg/15" />
      <circle cx={200} cy={158} r={17} className="a-eye fill-accent" />
      <circle cx={200} cy={158} r={7} className="a-eye fill-white" />
      <Txt x={24} y={226} size={9.5} className="fill-faint">
        physical
      </Txt>
      <rect x={92} y={217} width={110} height={11} rx={5.5} className="a-grow-x tb-l fill-mint" style={tm(0, 8)} />
      <Txt x={24} y={248} size={9.5} className="fill-faint">
        virtual
      </Txt>
      <rect x={92} y={239} width={150} height={11} rx={5.5} className="a-grow-x tb-l fill-coral" style={tm(0.5, 8)} />
      <Pill x={24} y={24} w={126} h={22} text="LilyPad · HC-06" />
      <Pill x={262} y={24} w={114} h={22} text="mixed reality" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
    </Frame>
  );
}

/* ---- PURE: biosensors --------------------------------------------------- */
function Hex({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pts = Array.from({ length: 6 })
    .map((_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    })
    .join(' ');
  return <polygon points={pts} fill="none" strokeWidth={2} strokeLinejoin="round" className="stroke-accent/70" />;
}

export function BioCover() {
  return (
    <Frame tone="lilac" label="A pulse-like sensor signal next to a molecule ring">
      <Card x={24} y={70} w={222} h={110}>
        <path d="M36 128 h34 l8 -26 l12 52 l10 -44 l8 18 h26 l8 -22 l12 46 l10 -38 l6 14 h36" fill="none" pathLength={1} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className="a-draw stroke-accent" style={tm(0, 7)} />
        <line x1={36} x2={234} y1={128} y2={128} className="stroke-fg/[0.07]" />
      </Card>
      <g className="a-spin tb" style={tm(0, 30)}>
        <Hex cx={310} cy={96} r={26} />
        <Hex cx={356} cy={122} r={26} />
        <Hex cx={310} cy={148} r={26} />
        <circle cx={310} cy={96} r={5} className="fill-coral" />
        <circle cx={356} cy={122} r={5} className="fill-mint" />
        <circle cx={310} cy={148} r={5} className="fill-sun" />
      </g>
      <Pill x={24} y={24} w={110} h={22} text="biosensors" />
      <Pill x={24} y={200} w={170} h={24} text="literature + data analysis" fill="fill-surface" />
      <Pill x={202} y={200} w={96} h={24} text="10 Oct – Dec" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
    </Frame>
  );
}

/* ---- Smaller experiments ------------------------------------------------ */
export function OthersCover() {
  const tile = (i: number) => ({ x: 30 + (i % 2) * 176, y: 26 + Math.floor(i / 2) * 116 });
  return (
    <Frame tone="sky" label="Four small doodles: rain, an FPGA chip, a telescope sparkle and a game controller" decor={false}>
      {[0, 1, 2, 3].map((i) => {
        const { x, y } = tile(i);
        const fills = ['fill-sky/40', 'fill-mint/40', 'fill-lilac/40', 'fill-sun/50'];
        return <rect key={i} x={x} y={y} width={164} height={104} rx={18} className={fills[i]} />;
      })}
      {/* rain */}
      <g className="a-bob" style={tm(0, 5)}>
        <path d="M74 70 a14 14 0 0 1 8 -26 a20 20 0 0 1 38 4 a12 12 0 0 1 -2 22z" className="fill-surface" />
        {[84, 98, 112].map((x, k) => (
          <line key={x} x1={x} x2={x - 4} y1={80} y2={94} strokeWidth={2.4} strokeLinecap="round" className="a-blink stroke-accent" style={tm(k * 0.3, 1.6)} />
        ))}
      </g>
      <Txt x={42} y={44} size={9} className="fill-faint">Rain ML</Txt>
      {/* fpga */}
      <rect x={252} y={56} width={52} height={52} rx={8} className="fill-surface stroke-fg/20" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <line x1={262 + k * 11} x2={262 + k * 11} y1={48} y2={56} strokeWidth={2.4} strokeLinecap="round" className="stroke-fg/40" />
          <line x1={262 + k * 11} x2={262 + k * 11} y1={108} y2={116} strokeWidth={2.4} strokeLinecap="round" className="stroke-fg/40" />
        </g>
      ))}
      <circle cx={278} cy={82} r={6} className="a-blink fill-accent" style={tm(0, 1.4)} />
      <Txt x={216} y={44} size={9} className="fill-faint">FPGA · Verilog</Txt>
      {/* sparkle */}
      <path d="M112 196 l7 20 l20 7 l-20 7 l-7 20 l-7 -20 l-20 -7 l20 -7z" className="a-spin tb fill-surface" style={tm(0, 20)} />
      <circle cx={140} cy={204} r={4} className="a-blink fill-sun" style={tm(0, 2)} />
      <Txt x={42} y={160} size={9} className="fill-faint">JWST · FITS</Txt>
      {/* controller */}
      <rect x={244} y={196} width={76} height={40} rx={20} className="fill-surface stroke-fg/20" />
      <path d="M262 210 v12 M256 216 h12" fill="none" strokeWidth={3} strokeLinecap="round" className="stroke-fg/50" />
      <circle cx={296} cy={212} r={4.5} className="fill-coral" />
      <circle cx={306} cy={222} r={4.5} className="fill-mint" />
      <Txt x={216} y={160} size={9} className="fill-faint">C# · Unity</Txt>
    </Frame>
  );
}

/* ---- Open source -------------------------------------------------------- */
export function OpenSourceCover() {
  return (
    <Frame tone="mint" label="A git graph where feature branches merge back into main">
      <line x1={28} x2={372} y1={140} y2={140} strokeWidth={4} strokeLinecap="round" className="stroke-fg/20" />
      {[56, 116, 176, 236, 300, 356].map((x) => (
        <circle key={x} cx={x} cy={140} r={7} className="fill-surface stroke-fg/25" strokeWidth={2} />
      ))}
      <Txt x={28} y={126} size={9} className="fill-faint">main</Txt>
      <path d="M116 140 C 128 84, 142 84, 164 84 H 258 C 282 84, 292 90, 300 140" fill="none" pathLength={1} strokeWidth={4} strokeLinecap="round" className="a-draw stroke-accent" style={tm(0, 9)} />
      {[180, 240].map((x, i) => (
        <circle key={x} cx={x} cy={84} r={7} className="a-pop tb fill-accent" style={tm(0.8 + i * 0.5, 9)} />
      ))}
      <Pill x={160} y={46} w={104} h={22} text="PR · merged" fill="fill-mint/50" stroke="stroke-transparent" className="a-pop tb" />
      <path d="M176 140 C 188 200, 202 200, 226 200 H 306 C 336 200, 346 190, 356 140" fill="none" pathLength={1} strokeWidth={4} strokeLinecap="round" className="a-draw stroke-lilac" style={tm(2.2, 9)} />
      {[250, 296].map((x, i) => (
        <circle key={x} cx={x} cy={200} r={7} className="a-pop tb fill-lilac" style={tm(3 + i * 0.5, 9)} />
      ))}
      <Pill x={24} y={24} w={124} h={22} text="opaca-llm-ui" />
      <Pill x={24} y={236} w={128} h={22} text="self-hosted models" size={9} />
      <Pill x={160} y={236} w={126} h={22} text="session mgmt" size={9} />
      <Pill x={294} y={236} w={82} h={22} text="UI / UX" size={9} />
    </Frame>
  );
}
