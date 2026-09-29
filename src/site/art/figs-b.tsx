import { Box, Lab, Sheet, T, Tag, tm } from './hud';

/* ---- 08 Banking DB ------------------------------------------------------ */
function Ledger({ x, name }: { x: number; name: string }) {
  return (
    <g>
      <Box x={x} y={52} w={112} h={130} />
      <T x={x + 8} y={68}>
        {name}
      </T>
      <line x1={x} x2={x + 112} y1={76} y2={76} className="stroke-fg/25" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x + 8} y={88 + i * 22} width={44} height={4} className="fill-fg/25" />
          <rect x={x + 64} y={88 + i * 22} width={40} height={4} className={i === 1 ? 'fill-accent' : 'fill-fg/25'} />
        </g>
      ))}
      <rect x={x + 2} y={104} width={108} height={16} className="fill-accent/10 stroke-accent" strokeWidth={1} />
    </g>
  );
}

export function Banking() {
  return (
    <Sheet label="Two ledgers with a locked row while money moves between them atomically">
      <Ledger x={26} name="ACCOUNT A" />
      <Ledger x={262} name="ACCOUNT B" />
      <line x1={140} x2={260} y1={112} y2={112} strokeWidth={1.2} className="a-dash stroke-fg/50" />
      <rect x={142} y={106} width={10} height={10} className="a-move-x fill-accent" style={tm(0, 2.6, { '--dx': '106px' })} />
      <rect x={180} y={64} width={40} height={40} className="fill-bg stroke-fg/50" />
      <g className="a-blink" style={tm(0, 2.6)}>
        <rect x={190} y={82} width={20} height={14} className="fill-accent" />
        <path d="M194 82 v-6 a6 6 0 0 1 12 0 v6" fill="none" strokeWidth={2} className="stroke-accent" />
      </g>
      <T x={200} y={52} anchor="middle" className="fill-accent" weight={700}>
        ACID
      </T>
      <Box x={26} y={204} w={348} h={30} className="stroke-fg/40 fill-fg/[0.03]" />
      <T x={40} y={223} size={12} className="fill-fg">
        SELECT … FOR UPDATE
      </T>
      <T x={26} y={256} size={7.5}>
        PESSIMISTIC ROW LOCK · DEADLOCK-SAFE ORDER · EXPLAIN BEFORE / AFTER
      </T>
    </Sheet>
  );
}

/* ---- 09 Data structures ------------------------------------------------- */
const tree: Array<[number, number, number]> = [
  [200, 72, 30],
  [132, 128, 18],
  [268, 128, 42],
  [96, 188, 10],
  [166, 188, 24],
  [234, 188, 36],
  [304, 188, 50],
];
const edges: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
];

export function Dsa() {
  return (
    <Sheet label="A balanced binary search tree with a lookup path lighting up">
      {edges.map(([a, b]) => (
        <line key={`${a}${b}`} x1={tree[a][0]} y1={tree[a][1]} x2={tree[b][0]} y2={tree[b][1]} className="stroke-fg/35" />
      ))}
      {tree.map(([x, y, n], i) => (
        <g key={i}>
          <rect x={x - 17} y={y - 17} width={34} height={34} className="fill-bg stroke-fg/50" />
          <T x={x} y={y + 4} anchor="middle" size={11} className="fill-fg" weight={600}>
            {n}
          </T>
        </g>
      ))}
      {[0, 2, 5].map((idx, k) => {
        const [x, y, n] = tree[idx];
        return (
          <g key={idx} className="a-pop tb" style={tm(k * 0.9, 6)}>
            <rect x={x - 17} y={y - 17} width={34} height={34} className="fill-accent" />
            <T x={x} y={y + 4} anchor="middle" size={11} className="fill-accent-fg" weight={700}>
              {n}
            </T>
          </g>
        );
      })}
      <path d="M64 120 q-24 40 6 70" fill="none" strokeWidth={1.2} className="a-dash stroke-accent" />
      <T x={26} y={160} className="fill-accent">
        ROTATE
      </T>
      <Lab x={26} y={46} w={80} text="FIND(36)" />
      <Tag x={290} y={46} w={86} text="RAII · C++" />
      <T x={200} y={250} anchor="middle" size={9} className="fill-muted">
        AVL · RED-BLACK · O(LOG N)
      </T>
    </Sheet>
  );
}

/* ---- 10 Expense tracker ------------------------------------------------- */
const arcs = [
  { s: 0, f: 0.4, c: 'stroke-accent' },
  { s: 0.4, f: 0.25, c: 'stroke-steel' },
  { s: 0.65, f: 0.2, c: 'stroke-fg/60' },
  { s: 0.85, f: 0.15, c: 'stroke-fg/25' },
];

export function Expense() {
  return (
    <Sheet label="A phone showing a spending donut chart, categories and monthly bars">
      <Box x={140} y={26} w={120} h={230} className="stroke-fg/50 fill-bg/60" />
      <rect x={184} y={32} width={32} height={3} className="fill-fg/30" />
      <g transform="rotate(-90 200 100)">
        {arcs.map((a) => (
          <circle key={a.s} cx={200} cy={100} r={30} fill="none" strokeWidth={9} pathLength={1} strokeDasharray={`${a.f - 0.015} ${1 - a.f + 0.015}`} strokeDashoffset={-a.s} className={`a-fade ${a.c}`} style={tm(a.s * 2.5, 8)} />
        ))}
      </g>
      <T x={200} y={104} anchor="middle" className="fill-fg" size={10} weight={600}>
        MAY
      </T>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={154} y={152 + i * 18} width={7} height={7} className={['fill-accent', 'fill-steel', 'fill-fg/50'][i]} />
          <rect x={168} y={154 + i * 18} width={52 - i * 8} height={3} className="fill-fg/25" />
          <rect x={228} y={154 + i * 18} width={20} height={3} className="fill-fg/40" />
        </g>
      ))}
      {[24, 38, 30, 46, 34].map((h, i) => (
        <rect key={i} x={154 + i * 19} y={250 - h} width={11} height={h} className="a-grow-y tb-b fill-fg/45" style={tm(i * 0.15, 7)} />
      ))}
      <Box x={26} y={110} w={96} h={64} className="stroke-fg/30 fill-none" />
      <T x={34} y={126}>
        TREND
      </T>
      <path d="M34 164 L52 150 L70 158 L90 138 L112 142" fill="none" pathLength={1} strokeWidth={1.6} className="a-draw stroke-accent" style={tm(0, 8)} />
      <Tag x={282} y={70} w={94} text="JWT AUTH" />
      <Lab x={282} y={116} w={94} text="AGGREGATION" />
      <Lab x={282} y={162} w={94} text="10+ ENDPOINTS" />
    </Sheet>
  );
}

/* ---- 11 SIR network ----------------------------------------------------- */
const hub: [number, number] = [200, 140];
const lines: Array<Array<[number, number]>> = [
  [[36, 214], [94, 182], [148, 156], hub, [258, 122], [316, 94], [368, 60]],
  [[152, 44], [176, 92], hub, [226, 192], [252, 246]],
  [[226, 192], [278, 176], [338, 184]],
  [[148, 156], [112, 120], [70, 100]],
];
const stations = Array.from(new Map(lines.flat().map((p) => [p.join(','), p] as const)).values());

export function Sir() {
  return (
    <Sheet label="A rail network where an infection spreads outward from a busy transfer hub, then recovers">
      {lines.map((l, i) => (
        <polyline key={i} points={l.map((p) => p.join(',')).join(' ')} fill="none" strokeWidth={1.4} className="stroke-fg/40" />
      ))}
      {stations.map(([x, y]) => {
        const isHub = x === hub[0] && y === hub[1];
        const s = isHub ? 18 : 9;
        const d = Math.hypot(x - hub[0], y - hub[1]);
        return <rect key={`${x}-${y}`} x={x - s / 2} y={y - s / 2} width={s} height={s} strokeWidth={1} className="a-sir stroke-bg" style={tm(d * 0.011, 10)} />;
      })}
      <T x={216} y={174}>
        TRANSFER HUB
      </T>
      <Lab x={26} y={46} w={84} text="S → I → R" />
      <Tag x={262} y={46} w={114} text="64+ MONTE CARLO" />
      <T x={26} y={262} size={7.5}>
        BETWEENNESS CENTRALITY = SPREAD RISK
      </T>
    </Sheet>
  );
}

/* ---- 12 Turkey dashboard ------------------------------------------------ */
export function Turkey() {
  return (
    <Sheet label="A small dashboard with bars, a donut and a line chart built from TÜİK data">
      <T x={26} y={52}>
        TÜİK · 40+ DATASETS
      </T>
      <Box x={26} y={64} w={170} h={110} />
      {[44, 66, 52, 78, 60, 88].map((h, i) => (
        <rect key={i} x={44 + i * 25} y={164 - h} width={14} height={h} className={`a-grow-y tb-b ${i % 2 ? 'fill-accent' : 'fill-fg/50'}`} style={tm(i * 0.14, 8)} />
      ))}
      <Box x={208} y={64} w={82} h={110} />
      <g transform="rotate(-90 249 120)">
        {[
          { s: 0, f: 0.5, c: 'stroke-accent' },
          { s: 0.5, f: 0.3, c: 'stroke-steel' },
          { s: 0.8, f: 0.2, c: 'stroke-fg/40' },
        ].map((a) => (
          <circle key={a.s} cx={249} cy={120} r={24} fill="none" strokeWidth={9} pathLength={1} strokeDasharray={`${a.f - 0.02} ${1 - a.f + 0.02}`} strokeDashoffset={-a.s} className={`a-fade ${a.c}`} style={tm(a.s * 1.5, 8)} />
        ))}
      </g>
      <Box x={302} y={64} w={72} h={110} />
      <path d="M312 156 L326 132 L340 142 L354 100 L366 108" fill="none" pathLength={1} strokeWidth={1.6} className="a-draw stroke-accent" style={tm(0, 8)} />
      <Box x={26} y={186} w={348} h={66} />
      <path d="M36 240 C 80 208, 110 236, 150 218 S 220 200, 260 214 S 330 196, 364 204" fill="none" pathLength={1} strokeWidth={1.6} className="a-draw stroke-accent" style={tm(0.5, 8)} />
      <T x={36} y={202} size={7.5}>
        FLASK · BOOTSTRAP · MATPLOTLIB
      </T>
    </Sheet>
  );
}

/* ---- 13 PURE attention -------------------------------------------------- */
export function Attention() {
  return (
    <Sheet label="A row of addressable LEDs chasing while an eye follows, comparing physical and virtual reflexes">
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={36 + i * 34} y={82} width={16} height={16} className="a-blink fill-accent" style={tm(i * 0.3, 3)} />
      ))}
      <T x={36} y={70}>
        ADDRESSABLE LED STRIP
      </T>
      <path d="M148 168 C 174 134, 226 134, 252 168 C 226 202, 174 202, 148 168z" fill="none" strokeWidth={1.2} className="stroke-fg/60" />
      <rect x={186} y={154} width={28} height={28} className="a-blink fill-accent" style={tm(0, 5)} />
      <T x={26} y={228}>
        PHYSICAL
      </T>
      <rect x={96} y={219} width={110} height={9} className="a-grow-x tb-l fill-fg/60" style={tm(0, 8)} />
      <T x={26} y={252}>
        VIRTUAL
      </T>
      <rect x={96} y={243} width={150} height={9} className="a-grow-x tb-l fill-accent" style={tm(0.5, 8)} />
      <Tag x={262} y={40} w={114} text="MIXED REALITY" />
    </Sheet>
  );
}

/* ---- 14 PURE biosensors ------------------------------------------------- */
function Hex({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pts = Array.from({ length: 6 })
    .map((_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    })
    .join(' ');
  return <polygon points={pts} fill="none" strokeWidth={1.2} className="stroke-fg/50" />;
}

export function Bio() {
  return (
    <Sheet label="A pulse-like sensor signal next to a molecule ring">
      <Box x={26} y={70} w={226} h={112} />
      <line x1={26} x2={252} y1={126} y2={126} className="stroke-fg/[0.1]" />
      <path d="M34 126 h36 l8 -28 l12 54 l10 -46 l8 18 h28 l8 -22 l12 46 l10 -38 l6 14 h48" fill="none" pathLength={1} strokeWidth={1.8} className="a-draw stroke-accent" style={tm(0, 7)} />
      <g className="a-spin tb" style={tm(0, 40)}>
        <Hex cx={308} cy={100} r={26} />
        <Hex cx={354} cy={126} r={26} />
        <Hex cx={308} cy={152} r={26} />
        <rect x={304} y={96} width={8} height={8} className="fill-accent" />
        <rect x={350} y={122} width={8} height={8} className="fill-steel" />
        <rect x={304} y={148} width={8} height={8} className="fill-fg/60" />
      </g>
      <T x={26} y={58}>
        BIOSENSOR SIGNAL
      </T>
      <Lab x={26} y={204} w={190} text="LITERATURE + DATA ANALYSIS" />
      <Tag x={224} y={204} w={84} text="OCT–DEC 22" />
    </Sheet>
  );
}

/* ---- 15 Smaller experiments -------------------------------------------- */
export function Others() {
  const tile = (i: number) => ({ x: 30 + (i % 2) * 176, y: 46 + Math.floor(i / 2) * 106 });
  const names = ['RAIN ML', 'FPGA · VERILOG', 'JWST · FITS', 'C# · UNITY'];
  return (
    <Sheet label="Four small doodles: rain, an FPGA chip, a telescope sparkle and a game controller">
      {[0, 1, 2, 3].map((i) => {
        const { x, y } = tile(i);
        return (
          <g key={i}>
            <Box x={x} y={y} w={164} h={94} className="stroke-fg/30 fill-fg/[0.03]" />
            <T x={x + 8} y={y + 14}>
              {names[i]}
            </T>
          </g>
        );
      })}
      <path d="M78 116 a12 12 0 0 1 8 -22 a18 18 0 0 1 34 4 a11 11 0 0 1 -2 18z" fill="none" strokeWidth={1.2} className="stroke-fg/60" />
      {[86, 100, 114].map((x, k) => (
        <line key={x} x1={x} x2={x - 4} y1={122} y2={134} strokeWidth={1.6} className="a-blink stroke-accent" style={tm(k * 0.3, 1.6)} />
      ))}
      <rect x={256} y={82} width={44} height={44} className="fill-bg stroke-fg/60" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <line x1={264 + k * 9} x2={264 + k * 9} y1={74} y2={82} className="stroke-fg/50" />
          <line x1={264 + k * 9} x2={264 + k * 9} y1={126} y2={134} className="stroke-fg/50" />
        </g>
      ))}
      <rect x={272} y={98} width={12} height={12} className="a-blink fill-accent" style={tm(0, 1.4)} />
      <path d="M108 204 l5 14 l14 5 l-14 5 l-5 14 l-5 -14 l-14 -5 l14 -5z" fill="none" strokeWidth={1.2} className="a-spin tb stroke-fg/60" style={tm(0, 24)} />
      <rect x={250} y={196} width={62} height={34} className="fill-bg stroke-fg/60" />
      <path d="M266 206 v14 M259 213 h14" fill="none" strokeWidth={2} className="stroke-fg/60" />
      <rect x={288} y={208} width={7} height={7} className="fill-accent" />
      <rect x={298} y={216} width={7} height={7} className="fill-fg/50" />
    </Sheet>
  );
}

/* ---- 16 Open source ----------------------------------------------------- */
export function OpenSource() {
  return (
    <Sheet label="A git graph where feature branches merge back into main">
      <line x1={26} x2={376} y1={140} y2={140} strokeWidth={2} className="stroke-fg/40" />
      {[52, 110, 170, 232, 296, 356].map((x) => (
        <rect key={x} x={x - 5} y={135} width={10} height={10} className="fill-bg stroke-fg/60" />
      ))}
      <T x={26} y={126}>
        MAIN
      </T>
      <path d="M110 140 C 122 84, 136 84, 158 84 H 250 C 274 84, 286 90, 296 140" fill="none" pathLength={1} strokeWidth={2} className="a-draw stroke-accent" style={tm(0, 9)} />
      {[178, 232].map((x, i) => (
        <rect key={x} x={x - 5} y={79} width={10} height={10} className="a-pop tb fill-accent" style={tm(0.8 + i * 0.5, 9)} />
      ))}
      <g className="a-pop tb" style={tm(1.2, 9)}>
        <Tag x={168} y={48} w={92} text="PR · MERGED" />
      </g>
      <path d="M170 140 C 182 204, 196 204, 220 204 H 300 C 330 204, 342 194, 356 140" fill="none" pathLength={1} strokeWidth={2} className="a-draw stroke-steel" style={tm(2.2, 9)} />
      {[246, 292].map((x, i) => (
        <rect key={x} x={x - 5} y={199} width={10} height={10} className="a-pop tb fill-steel" style={tm(3 + i * 0.5, 9)} />
      ))}
      <Lab x={26} y={46} w={120} text="OPACA-LLM-UI" />
      <T x={26} y={252} size={7.5}>
        SELF-HOSTED MODELS · SESSION MGMT · UI / UX
      </T>
    </Sheet>
  );
}

/* ---- Locations ---------------------------------------------------------- */
export function Istanbul() {
  return (
    <Sheet label="Istanbul skyline: Galata Tower, a domed mosque with minarets, the sea">
      <circle cx={318} cy={92} r={34} fill="none" strokeWidth={1.2} className="stroke-accent" />
      <line x1={0} x2={400} y1={206} y2={206} className="stroke-fg/50" />
      <path d="M186 206 a46 46 0 0 1 92 0 M172 206 a24 24 0 0 1 24 -24 M268 206 a24 24 0 0 1 24 24 M164 206 v-96 l7 -22 l7 22 v96 M296 206 v-96 l7 -22 l7 22 v96 M70 206 V112 h28 v94 M62 112 h44 M66 112 l19 -44 l19 44" fill="none" strokeWidth={1.4} strokeLinejoin="round" className="stroke-fg/70" />
      {[126, 142, 158, 174].map((y) => (
        <rect key={y} x={82} y={y} width={5} height={7} className="fill-accent/70" />
      ))}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${20 + i * 130} ${228 + i * 10} q20 -8 40 0 t40 0 t40 0`} fill="none" strokeWidth={1} className="a-blink stroke-fg/40" style={tm(i * 0.6, 4)} />
      ))}
      <T x={22} y={262}>
        41.0082°N  28.9784°E
      </T>
    </Sheet>
  );
}

export function Berlin() {
  return (
    <Sheet label="Berlin skyline: the TV tower, the Brandenburg Gate and city blocks">
      <circle cx={84} cy={80} r={30} fill="none" strokeWidth={1.2} className="stroke-accent" />
      <line x1={0} x2={400} y1={206} y2={206} className="stroke-fg/50" />
      <path d="M204 206 L208 106 h4 L216 206 M196 104 a14 14 0 0 1 28 0 a14 14 0 0 1 -28 0 M209 90 V44 M238 206 v-58 h38 v58 M282 206 v-84 h34 v84 M322 206 v-44 h48 v44 M60 206 v-52 h124 v52 M68 154 v-14 h108 v14 M104 140 v-24 h36 v24 M112 116 l10 -20 l10 20" fill="none" strokeWidth={1.4} strokeLinejoin="round" className="stroke-fg/70" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={74 + i * 20} x2={74 + i * 20} y1={154} y2={206} className="stroke-fg/50" />
      ))}
      <rect x={207} y={40} width={4} height={4} className="blink fill-accent" />
      <T x={22} y={262}>
        52.5200°N  13.4050°E
      </T>
    </Sheet>
  );
}

export function Campus() {
  return (
    <Sheet label="A modern campus building with a tree">
      <circle cx={330} cy={80} r={30} fill="none" strokeWidth={1.2} className="stroke-accent" />
      <line x1={0} x2={400} y1={206} y2={206} className="stroke-fg/50" />
      <path d="M40 206 v-76 h250 v76 M30 130 h270 M30 130 v-8 h270 v8" fill="none" strokeWidth={1.4} className="stroke-fg/70" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={54 + i * 27} y={146} width={14} height={48} className={i % 3 === 1 ? 'fill-accent/30 stroke-accent' : 'fill-none stroke-fg/40'} strokeWidth={1} />
      ))}
      <path d="M326 206 v-56 M326 150 l-22 -10 M326 150 l22 -10 M326 150 v-36 M326 128 l-14 -14 M326 128 l14 -14" fill="none" strokeWidth={1.4} className="stroke-fg/60" />
      <T x={22} y={262}>
        SABANCI UNIVERSITY · TUZLA
      </T>
    </Sheet>
  );
}

/* ---- Stack layers ------------------------------------------------------- */
export function StackLayers() {
  const layers = [
    { label: 'AI & LLM', sub: 'AGENTS · RAG · EVALS', y: 30, accent: true },
    { label: 'BACKEND', sub: 'FASTAPI · KAFKA · GRPC', y: 108 },
    { label: 'CLOUD & DEVOPS', sub: 'DOCKER · K8S · CI/CD', y: 186 },
  ];
  return (
    <svg viewBox="0 0 360 300" className="h-auto w-full" role="img" aria-label="Three layers: AI and LLM systems on top, backend services in the middle, cloud and DevOps at the base">
      {layers.map((l, i) => (
        <g key={l.label} className="a-fade tb" style={tm(i * 0.5, 6)}>
          <path d={`M180 ${l.y + 52} L330 ${l.y + 20} L180 ${l.y - 12} L30 ${l.y + 20}z`} fill="none" strokeWidth={1.2} className={l.accent ? 'stroke-accent' : 'stroke-fg/60'} strokeLinejoin="round" />
          <path d={`M30 ${l.y + 20} v12 L180 ${l.y + 64} L330 ${l.y + 32} v-12 M180 ${l.y + 52} v12`} fill="none" strokeWidth={1.2} className="stroke-fg/30" />
          <text x="180" y={l.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="0.1em" className="fill-fg font-mono">
            {l.label}
          </text>
          <text x="180" y={l.y + 38} textAnchor="middle" fontSize="8" letterSpacing="0.1em" className="fill-faint font-mono">
            {l.sub}
          </text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <line key={i} x1="180" x2="180" y1={92 + i * 78} y2={104 + i * 78} strokeWidth="1.6" className="a-dash stroke-accent" />
      ))}
    </svg>
  );
}
