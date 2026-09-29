import { Box, Lab, Sheet, T, Tag, tm } from './hud';

/* ---- 01 Trading --------------------------------------------------------- */
const candles: Array<[number, number, number, number]> = [
  [40, 48, 52, 36],
  [48, 44, 50, 40],
  [44, 55, 58, 42],
  [55, 60, 64, 52],
  [60, 52, 62, 48],
  [52, 58, 61, 50],
  [58, 68, 72, 56],
  [68, 64, 70, 60],
  [64, 74, 78, 62],
  [74, 70, 76, 66],
  [70, 80, 84, 68],
  [80, 86, 90, 78],
  [86, 82, 90, 78],
  [82, 92, 96, 80],
];
const cy = (v: number) => 236 - v * 1.75;

export function Trading() {
  const cx = (i: number) => 44 + i * 18.5;
  const ma = candles.map(([o, c], i) => `${i === 0 ? 'M' : 'L'}${cx(i)} ${cy((o + c) / 2)}`).join(' ');
  return (
    <Sheet label="Candlestick chart with a moving average, buy and sell markers and risk readouts">
      {[80, 120, 160, 200].map((y) => (
        <line key={y} x1={30} x2={312} y1={y} y2={y} className="stroke-fg/[0.08]" />
      ))}
      <T x={30} y={62} className="fill-faint">
        BIST30 / MIN · LIVE
      </T>
      {candles.map(([o, c, h, l], i) => {
        const up = c >= o;
        return (
          <g key={i} className="a-pop tb" style={tm(i * 0.18, 10)}>
            <line x1={cx(i)} x2={cx(i)} y1={cy(h)} y2={cy(l)} className="stroke-fg/50" />
            <rect x={cx(i) - 4.5} y={cy(Math.max(o, c))} width={9} height={Math.max(4, Math.abs(cy(o) - cy(c)))} className={up ? 'fill-bg stroke-fg/80' : 'fill-fg/45 stroke-fg/45'} strokeWidth={1} />
          </g>
        );
      })}
      <path d={ma} fill="none" pathLength={1} strokeWidth={1.8} className="a-draw stroke-accent" style={tm(0.8, 10)} />
      <g className="a-pop tb" style={tm(3.2, 10)}>
        <path d={`M${cx(3) - 6} ${cy(52) + 20} l6 -11 l6 11z`} className="fill-accent" />
        <T x={cx(3)} y={cy(52) + 32} anchor="middle" className="fill-accent" size={7.5}>
          BUY
        </T>
      </g>
      <g className="a-pop tb" style={tm(6.4, 10)}>
        <path d={`M${cx(11) - 6} ${cy(90) - 22} l6 11 l6 -11z`} className="fill-fg" />
        <T x={cx(11)} y={cy(90) - 27} anchor="middle" className="fill-fg" size={7.5}>
          SELL
        </T>
      </g>
      {[
        ['SHARPE', '1.4', 84],
        ['MAX DD', '−12%', 134],
        ['SIM RET', '+65.41%', 184],
      ].map(([l, v, y]) => (
        <g key={l as string}>
          <line x1={324} x2={376} y1={(y as number) - 12} y2={(y as number) - 12} className="stroke-fg/30" />
          <T x={324} y={y as number} size={7.5}>
            {l as string}
          </T>
          <T x={324} y={(y as number) + 19} size={15} weight={600} className="fill-fg">
            {v as string}
          </T>
        </g>
      ))}
      <T x={30} y={262} size={7.5}>
        ML SIGNALS → GPT-4O AGENT → RISK GATE → C# → ALGOLAB
      </T>
    </Sheet>
  );
}

/* ---- 02 Cloud ----------------------------------------------------------- */
export function Cloud() {
  return (
    <Sheet label="Requests hit a load balancer and ingress; autoscaled pods grow from two to ten">
      <T x={26} y={64}>
        LOCUST · 2,000 USERS
      </T>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={26} x2={96} y1={82 + i * 16} y2={82 + i * 16} strokeWidth={1.4} className="a-dash stroke-fg/45" style={tm(i * 0.2)} />
      ))}
      <Box x={112} y={78} w={68} h={96} />
      <T x={146} y={106} size={9} anchor="middle" className="fill-fg" weight={600}>
        LB · L4
      </T>
      <T x={146} y={118} size={7} anchor="middle">
        GCP
      </T>
      <line x1={118} x2={174} y1={134} y2={134} className="stroke-fg/25" />
      <T x={146} y={152} size={9} anchor="middle" className="fill-fg" weight={600}>
        NGINX · L7
      </T>
      <T x={146} y={164} size={7} anchor="middle">
        INGRESS
      </T>
      <line x1={180} x2={214} y1={126} y2={126} strokeWidth={1.4} className="a-dash stroke-accent" />
      <T x={218} y={64}>
        FASTAPI PODS · K3S
      </T>
      {Array.from({ length: 10 }).map((_, i) => {
        const x = 218 + (i % 5) * 32;
        const y = 78 + Math.floor(i / 5) * 40;
        return i < 2 ? (
          <rect key={i} x={x} y={y} width={24} height={30} className="fill-fg/70" />
        ) : (
          <rect key={i} x={x} y={y} width={24} height={30} strokeWidth={1.2} className="a-fade tb fill-accent/15 stroke-accent" style={tm((i - 2) * 0.55, 9)} />
        );
      })}
      <T x={218} y={176} size={22} weight={700} className="fill-fg">
        2 → 10
      </T>
      <T x={300} y={176} size={7.5}>
        PODS · HPA ON REQ/S
      </T>
      <line x1={26} x2={376} y1={250} y2={250} className="stroke-fg/25" />
      <path d="M26 246 L80 242 L134 236 L188 224 L242 230 L296 214 L350 218 L376 208" fill="none" pathLength={1} strokeWidth={1.6} className="a-draw stroke-accent" style={tm(0.4, 9)} />
      <T x={26} y={214}>
        RPS
      </T>
      <Tag x={320} y={186} w={56} text="< 1 S" />
    </Sheet>
  );
}

/* ---- 03 Commerce -------------------------------------------------------- */
export function Commerce() {
  return (
    <Sheet label="A storefront whose orders fan out as Kafka events to stock, payment and email">
      <Box x={24} y={44} w={214} h={196} />
      <line x1={24} x2={238} y1={66} y2={66} className="stroke-fg/30" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={32 + i * 9} y={52} width={5} height={5} className="fill-fg/40" />
      ))}
      <Box x={82} y={50} w={110} h={11} className="stroke-fg/25 fill-none" />
      <T x={206} y={59}>
        CART 3
      </T>
      {[0, 1, 2, 3].map((i) => {
        const x = 34 + (i % 2) * 100;
        const y = 76 + Math.floor(i / 2) * 82;
        return (
          <g key={i}>
            <Box x={x} y={y} w={92} h={62} className="stroke-fg/35 fill-fg/[0.03]" />
            <line x1={x} y1={y} x2={x + 92} y2={y + 46} className="stroke-fg/[0.12]" />
            <line x1={x + 92} y1={y} x2={x} y2={y + 46} className="stroke-fg/[0.12]" />
            <line x1={x} x2={x + 92} y1={y + 46} y2={y + 46} className="stroke-fg/25" />
            <rect x={x + 6} y={y + 52} width={36} height={4} className="fill-fg/25" />
            <rect x={x + 60} y={y + 51} width={26} height={7} className={i === 0 ? 'fill-accent' : 'fill-fg/30'} />
          </g>
        );
      })}
      <T x={262} y={62}>
        KAFKA TOPICS
      </T>
      {[
        ['ORDER', 96],
        ['STOCK', 148],
        ['MAIL', 200],
      ].map(([l, y], i) => (
        <g key={l as string}>
          <line x1={262} x2={376} y1={y as number} y2={y as number} className="stroke-fg/35" />
          <T x={262} y={(y as number) - 8} size={8} className="fill-fg">
            {l as string}
          </T>
          <rect x={262} y={(y as number) - 4} width={8} height={8} className="a-move-x fill-accent" style={tm(i * 0.9, 3.2, { '--dx': '104px' })} />
        </g>
      ))}
      <Lab x={262} y={216} w={114} text="4+ SERVICES · JWT" />
    </Sheet>
  );
}

/* ---- 04 BEKO agent ------------------------------------------------------ */
export function Beko() {
  return (
    <Sheet label="A chat where an agent calls one of six tools and answers with a citation">
      <Box x={24} y={44} w={206} h={196} />
      <line x1={24} x2={230} y1={64} y2={64} className="stroke-fg/25" />
      <T x={34} y={58}>
        SESSION · TR / EN
      </T>
      <rect x={108} y={76} width={112} height={26} className="fill-accent" />
      <rect x={116} y={83} width={86} height={3} className="fill-accent-fg/70" />
      <rect x={116} y={91} width={54} height={3} className="fill-accent-fg/50" />
      <g className="a-pop tb" style={tm(0.6, 9)}>
        <Box x={34} y={112} w={148} h={26} className="stroke-accent fill-accent/10" />
        <T x={42} y={129} className="fill-fg" size={8.5}>
          TOOL search_manual()
        </T>
        <T x={174} y={129} anchor="end" className="fill-accent" weight={700}>
          OK
        </T>
      </g>
      <g className="a-fade" style={tm(1.6, 9)}>
        <rect x={34} y={150} width={172} height={4} className="fill-fg/35" />
        <rect x={34} y={160} width={150} height={4} className="fill-fg/25" />
        <rect x={34} y={170} width={104} height={4} className="fill-fg/25" />
        <Lab x={34} y={184} w={68} text="[1] MANUAL" />
      </g>
      <rect x={34} y={218} width={7} height={11} className="blink fill-accent" />
      <T x={252} y={62}>
        6+ TOOLS
      </T>
      {['search_manual', 'lookup_order', 'device_status', 'create_ticket', 'schedule', 'escalate'].map((n, i) => (
        <g key={n}>
          <Box x={252} y={72 + i * 27} w={124} h={21} className={i === 0 ? 'stroke-accent fill-accent/10' : 'stroke-fg/25 fill-none'} />
          <T x={260} y={86 + i * 27} size={8} className={i === 0 ? 'fill-fg' : 'fill-faint'}>
            {n}
          </T>
          {i === 0 && <rect x={362} y={80} width={6} height={6} className="a-blink fill-accent" />}
        </g>
      ))}
    </Sheet>
  );
}

/* ---- 05 Bürotime orchestration ----------------------------------------- */
const agents: Array<[number, number]> = [
  [200, 66],
  [312, 112],
  [270, 196],
  [130, 196],
  [88, 112],
];

export function Burotime() {
  return (
    <Sheet label="An orchestrator sends work to five agents in parallel and pauses for a human when unsure">
      {agents.map(([x, y], i) => (
        <g key={i}>
          <line x1={200} y1={140} x2={x} y2={y} strokeWidth={1} className="stroke-fg/25" />
          <g className="a-fade" style={tm(i * 0.05, 3.4)}>
            <line x1={200} y1={140} x2={x} y2={y} strokeWidth={1.6} className="a-dash stroke-accent" />
          </g>
        </g>
      ))}
      <line x1={260} y1={210} x2={216} y2={240} strokeWidth={1.2} className="a-dash stroke-fg/60" />
      <rect x={172} y={112} width={56} height={56} className="fill-bg stroke-accent" strokeWidth={1.4} />
      <T x={200} y={138} anchor="middle" className="fill-fg" size={8} weight={700}>
        ORCH
      </T>
      <T x={200} y={150} anchor="middle" size={6.5}>
        LANGGRAPH
      </T>
      {agents.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 17} y={y - 17} width={34} height={34} className="fill-bg stroke-fg/50" strokeWidth={1} />
          <T x={x} y={y + 3.5} anchor="middle" className="fill-fg" size={9} weight={600}>
            A{i + 1}
          </T>
        </g>
      ))}
      <rect x={185} y={232} width={30} height={30} className="fill-bg stroke-fg/50" strokeDasharray="3 3" />
      <rect x={193} y={240} width={5} height={14} className="fill-fg/70" />
      <rect x={202} y={240} width={5} height={14} className="fill-fg/70" />
      <T x={224} y={250}>
        ASK-HUMAN · WS INTERRUPT
      </T>
      <Lab x={24} y={46} w={130} text="CONCURRENT · ~12 S" />
      <Tag x={294} y={46} w={82} text="5+ AGENTS" />
    </Sheet>
  );
}

/* ---- 06 OPACA / SAGE voice --------------------------------------------- */
const wave = [10, 22, 34, 20, 42, 30, 50, 26, 44, 18, 36, 24, 40, 16, 28, 12, 22, 8];

export function Sage() {
  return (
    <Sheet label="A microphone feeds a waveform; a bilingual assistant answers in Turkish and English">
      <Box x={40} y={104} w={44} h={64} className="stroke-accent fill-none" />
      <rect x={54} y={116} width={16} height={26} className="fill-accent" />
      <path d="M50 148 v4 h24 v-4 M62 152 v10" fill="none" strokeWidth={1.4} className="stroke-accent" />
      <T x={62} y={92} anchor="middle">
        MIC
      </T>
      {wave.map((h, i) => (
        <rect key={i} x={106 + i * 8} y={136 - h / 2} width={3} height={h} className="a-wave tb fill-fg/70" style={tm(i * 0.07, 1.15)} />
      ))}
      <g className="a-pop tb" style={tm(0.4, 6)}>
        <Box x={262} y={84} w={114} h={34} className="stroke-fg/40 fill-none" />
        <T x={272} y={105} className="fill-fg" size={11}>
          MERHABA
        </T>
      </g>
      <g className="a-pop tb" style={tm(2.4, 6)}>
        <rect x={262} y={128} width={114} height={34} className="fill-accent" />
        <T x={272} y={149} className="fill-accent-fg" size={11} weight={700}>
          HELLO
        </T>
      </g>
      {[
        ['WHISPER', 40],
        ['SAGE AGENT', 132],
        ['XTTS', 240],
      ].map(([l, x], i) => (
        <g key={l as string}>
          <Box x={x as number} y={196} w={i === 1 ? 92 : 78} h={24} className="stroke-fg/40 fill-none" />
          <T x={(x as number) + (i === 1 ? 46 : 39)} y={211} anchor="middle" className="fill-fg" size={8}>
            {l as string}
          </T>
        </g>
      ))}
      <line x1={118} x2={132} y1={208} y2={208} className="stroke-fg/50" />
      <line x1={224} x2={240} y1={208} y2={208} className="stroke-fg/50" />
      <T x={40} y={244}>
        ECAPA-TDNN SPEAKER ID
      </T>
      <Tag x={322} y={196} w={54} text="< 4 S" h={24} />
    </Sheet>
  );
}

/* ---- 07 GT-ARC text to video ------------------------------------------- */
export function Video() {
  return (
    <Sheet label="A talking-head video frame with a sync waveform and latency dropping from 5.3 to 2.5 seconds">
      <Box x={56} y={44} w={288} h={130} />
      <circle cx={200} cy={100} r={26} className="stroke-fg/60 fill-none" strokeWidth={1.2} />
      <path d="M150 174 v-14 c0 -18 22 -26 50 -26 c28 0 50 8 50 26 v14" fill="none" strokeWidth={1.2} className="stroke-fg/60" />
      <line x1={188} x2={212} y1={114} y2={114} className="a-wave tb stroke-accent" strokeWidth={2} style={tm(0, 0.7)} />
      <g className="a-scan" style={tm(0, 4, { '--dy': '120px' })}>
        <rect x={57} y={46} width={286} height={2} className="fill-accent" />
      </g>
      <T x={64} y={58}>
        512×512
      </T>
      <T x={336} y={58} anchor="end">
        SYNCNET 7.29
      </T>
      <rect x={56} y={186} width={288} height={3} className="fill-fg/20" />
      <rect x={56} y={186} width={170} height={3} className="a-grow-x tb-l fill-accent" style={tm(0, 9)} />
      <T x={56} y={222}>
        5.3 S
      </T>
      <rect x={96} y={213} width={190} height={9} className="fill-fg/30" />
      <T x={56} y={248}>
        2.5 S
      </T>
      <rect x={96} y={239} width={90} height={9} className="a-grow-x tb-l fill-accent" style={tm(0.4, 9)} />
      <Tag x={306} y={230} w={70} text="−53%" h={20} />
    </Sheet>
  );
}
