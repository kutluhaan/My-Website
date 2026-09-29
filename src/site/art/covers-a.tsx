import { Bar, Card, Chrome, Frame, Pill, Txt, tm } from './kit';

/* ---- Trading ------------------------------------------------------------ */
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
];
const cy = (v: number) => 222 - v * 1.5;

export function TradingCover() {
  const closes = candles.map(([o, c], i) => `${i === 0 ? 'M' : 'L'}${68 + i * 24} ${cy((o + c) / 2)}`).join(' ');
  return (
    <Frame tone="mint" label="Candlestick chart with a moving average, buy and sell markers and risk badges">
      <Card x={24} y={22} w={352} h={210}>
        <Chrome x={42} y={40} />
        <Txt x={74} y={44} size={10} className="fill-faint">
          BIST30 · live
        </Txt>
        <Pill x={252} y={31} w={112} h={18} text="+65.41% simulated" fill="fill-mint/30" size={9} />
        {[100, 140, 180].map((y) => (
          <line key={y} x1={44} x2={356} y1={y} y2={y} className="stroke-fg/[0.07]" />
        ))}
        {candles.map(([o, c, h, l], i) => {
          const x = 68 + i * 24;
          const up = c >= o;
          return (
            <g key={i} className="a-pop tb" style={tm(i * 0.2, 10)}>
              <line x1={x} x2={x} y1={cy(h)} y2={cy(l)} className="stroke-fg/30" />
              <rect
                x={x - 6.5}
                y={cy(Math.max(o, c))}
                width={13}
                height={Math.max(5, Math.abs(cy(o) - cy(c)))}
                rx={2.5}
                className={up ? 'fill-mint' : 'fill-coral'}
              />
            </g>
          );
        })}
        <path d={closes} fill="none" pathLength={1} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="a-draw stroke-accent" style={tm(0.9, 10)} />
        <g className="a-pop tb" style={tm(3.1, 10)}>
          <path d={`M${68 + 3 * 24 - 7} ${cy(52) + 24} l7 -13 l7 13z`} className="fill-mint stroke-surface" strokeWidth={1.5} />
        </g>
        <g className="a-pop tb" style={tm(6.2, 10)}>
          <path d={`M${68 + 10 * 24 - 7} ${cy(84) - 26} l7 13 l7 -13z`} className="fill-coral stroke-surface" strokeWidth={1.5} />
        </g>
      </Card>
      <Pill x={40} y={222} w={78} h={22} text="Sharpe 1.4" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
      <Pill x={126} y={222} w={92} h={22} text="max DD −12%" />
      <Pill x={226} y={222} w={62} h={22} text="HITL ✓" fill="fill-sun/50" />
      <Pill x={296} y={222} w={72} h={22} text="Kafka·gRPC" />
    </Frame>
  );
}

/* ---- Cloud -------------------------------------------------------------- */
export function CloudCover() {
  return (
    <Frame tone="sky" label="Users hit a load balancer and ingress; autoscaled pods grow from two to ten">
      <Txt x={32} y={74} size={9.5} className="fill-faint">
        Locust · 2,000 users
      </Txt>
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={36 + (i % 4) * 17}
          cy={92 + Math.floor(i / 4) * 17}
          r={5.5}
          className="a-blink fill-accent/70"
          style={tm((i * 0.23) % 2, 2.2)}
        />
      ))}
      <line x1={104} x2={132} y1={124} y2={124} strokeWidth={1.5} className="a-dash stroke-fg/35" />
      <Card x={134} y={88} w={66} h={72}>
        <Txt x={167} y={110} size={10} anchor="middle" weight={600}>
          LB
        </Txt>
        <Txt x={167} y={122} size={8} anchor="middle" className="fill-faint">
          L4 · GCP
        </Txt>
        <line x1={144} x2={190} y1={130} y2={130} className="stroke-fg/10" />
        <Txt x={167} y={145} size={10} anchor="middle" weight={600}>
          NGINX
        </Txt>
        <Txt x={167} y={155} size={8} anchor="middle" className="fill-faint">
          L7 ingress
        </Txt>
      </Card>
      <line x1={200} x2={222} y1={124} y2={124} strokeWidth={1.5} className="a-dash stroke-fg/35" />
      <Card x={224} y={42} w={152} h={158}>
        <Txt x={236} y={62} size={9.5} className="fill-faint">
          FastAPI pods · k3s
        </Txt>
        {Array.from({ length: 10 }).map((_, i) => {
          const base = i < 2;
          return (
            <rect
              key={i}
              x={238 + (i % 5) * 26}
              y={76 + Math.floor(i / 5) * 30}
              width={20}
              height={20}
              rx={6}
              className={base ? 'fill-sky' : 'a-fade tb fill-sky/70'}
              style={base ? undefined : tm((i - 2) * 0.55, 9)}
            />
          );
        })}
        <Txt x={236} y={166} size={22} className="fill-fg" weight={600}>
          2→10
        </Txt>
        <Txt x={236} y={184} size={8.5} className="fill-faint">
          HPA on requests / s
        </Txt>
      </Card>
      <Card x={24} y={212} w={352} h={46}>
        <Txt x={38} y={239} size={9} className="fill-faint">
          RPS
        </Txt>
        <path d="M70 244 L112 240 L152 236 L192 227 L232 231 L272 221 L312 225 L354 218" fill="none" pathLength={1} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="a-draw stroke-accent" style={tm(0.5, 9)} />
        <Pill x={296} y={222} w={66} h={16} text="< 1 s" fill="fill-mint/40" size={8.5} stroke="stroke-transparent" />
      </Card>
    </Frame>
  );
}

/* ---- E-commerce --------------------------------------------------------- */
const tiles: Array<{ fill: string; shape: 'c' | 't' | 's' | 'd' }> = [
  { fill: 'fill-sky/55', shape: 'c' },
  { fill: 'fill-pink/55', shape: 't' },
  { fill: 'fill-mint/55', shape: 's' },
  { fill: 'fill-lilac/55', shape: 'd' },
];

export function CommerceCover() {
  return (
    <Frame tone="sun" label="A storefront whose orders fan out as Kafka events to stock, payment and email">
      <Card x={26} y={24} w={262} h={214}>
        <Chrome x={42} y={40} />
        <rect x={82} y={33} width={118} height={15} rx={7.5} className="fill-fg/[0.06]" />
        <circle cx={262} cy={41} r={11} className="fill-accent" />
        <circle cx={271} cy={32} r={6.5} className="a-bob fill-coral" />
        <Txt x={271} y={35} size={8} anchor="middle" className="fill-white" weight={700}>
          3
        </Txt>
        {tiles.map((t, i) => {
          const x = 42 + (i % 2) * 118;
          const y = 64 + Math.floor(i / 2) * 84;
          return (
            <g key={i}>
              <rect x={x} y={y} width={106} height={74} rx={12} className="fill-surface-2 stroke-fg/10" />
              <rect x={x + 8} y={y + 8} width={90} height={36} rx={8} className={t.fill} />
              {t.shape === 'c' && <circle cx={x + 53} cy={y + 26} r={11} className="fill-surface/80" />}
              {t.shape === 't' && <path d={`M${x + 42} ${y + 38} l11 -20 l11 20z`} className="fill-surface/80" />}
              {t.shape === 's' && <rect x={x + 42} y={y + 15} width={22} height={22} rx={5} className="fill-surface/80" />}
              {t.shape === 'd' && <path d={`M${x + 53} ${y + 14} l12 12 l-12 12 l-12 -12z`} className="fill-surface/80" />}
              <Bar x={x + 8} y={y + 54} w={46} />
              <rect x={x + 66} y={y + 50} width={32} height={14} rx={7} className="fill-accent/15" />
            </g>
          );
        })}
      </Card>
      <Txt x={302} y={44} size={9.5} className="fill-faint">
        Kafka events
      </Txt>
      {[
        ['order', 62],
        ['stock ↓', 112],
        ['email', 162],
      ].map(([label, y], i) => (
        <g key={label as string}>
          {i < 2 && <line x1={340} x2={340} y1={(y as number) + 28} y2={(y as number) + 48} strokeWidth={1.5} className="a-dash stroke-fg/35" />}
          <g className="a-pop tb" style={tm(i * 1.1, 6.6)}>
            <Card x={302} y={y as number} w={78} h={30} r={10}>
              <circle cx={318} cy={(y as number) + 15} r={4.5} className="fill-mint" />
              <Txt x={329} y={(y as number) + 19} size={10}>
                {label as string}
              </Txt>
            </Card>
          </g>
        </g>
      ))}
      <Pill x={302} y={212} w={78} h={22} text="4+ services" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
    </Frame>
  );
}

/* ---- BEKO agent --------------------------------------------------------- */
export function BekoCover() {
  return (
    <Frame tone="lilac" label="A chat window where an assistant calls a tool and answers with a citation">
      <Card x={48} y={22} w={304} h={242}>
        <circle cx={74} cy={46} r={10} className="fill-lilac" />
        <Bar x={92} y={42} w={72} />
        <circle cx={332} cy={46} r={4} className="fill-mint" />
        <rect x={180} y={68} width={150} height={34} rx={13} className="fill-accent" />
        <Bar x={192} y={80} w={112} className="fill-white/75" />
        <Bar x={192} y={90} w={66} className="fill-white/55" />
        <g className="a-pop tb" style={tm(0.6, 9)}>
          <rect x={68} y={114} width={172} height={30} rx={12} className="fill-surface-2 stroke-fg/10" />
          <rect x={76} y={122} width={118} height={14} rx={7} className="fill-mint/40" />
          <Txt x={84} y={132} size={8.5}>
            search_manual()
          </Txt>
          <circle cx={215} cy={129} r={7} className="fill-mint" />
          <path d="M211.5 129 l2.6 2.6 l4.6 -5" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="stroke-white" />
        </g>
        <g className="a-fade" style={tm(1.6, 9)}>
          <rect x={68} y={154} width={232} height={72} rx={13} className="fill-surface-2 stroke-fg/10" />
          <Bar x={80} y={168} w={196} className="fill-fg/20" />
          <Bar x={80} y={180} w={170} className="fill-fg/15" />
          <Bar x={80} y={192} w={120} className="fill-fg/15" />
          <rect x={80} y={205} width={70} height={14} rx={7} className="fill-lilac/40" />
          <Txt x={88} y={215} size={8.5}>
            [1] manual
          </Txt>
        </g>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={82 + i * 11} cy={244} r={3.2} className="a-type fill-fg/40" style={tm(i * 0.18)} />
        ))}
      </Card>
      <Pill x={296} y={10} w={72} h={22} text="6+ tools" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
    </Frame>
  );
}

/* ---- Bürotime orchestration -------------------------------------------- */
const agents: Array<[number, number]> = [
  [200, 58],
  [314, 115],
  [271, 200],
  [129, 200],
  [86, 115],
];

export function BurotimeCover() {
  return (
    <Frame tone="pink" label="An orchestrator sends work to five agents in parallel and pauses for a human when unsure">
      {agents.map(([x, y], i) => (
        <g key={i}>
          <line x1={200} y1={140} x2={x} y2={y} strokeWidth={1.4} className="stroke-fg/20" />
          <g className="a-fade" style={tm(i * 0.05, 3.4)}>
            <line x1={200} y1={140} x2={x} y2={y} strokeWidth={2.2} strokeLinecap="round" className="a-dash stroke-accent" />
          </g>
        </g>
      ))}
      <line x1={252} y1={214} x2={216} y2={236} strokeWidth={1.6} className="a-dash stroke-coral" />
      <circle cx={200} cy={140} r={34} className="fill-accent" />
      <Txt x={200} y={143} size={8.5} anchor="middle" className="fill-white" weight={600}>
        Orchestrator
      </Txt>
      {agents.map(([x, y], i) => (
        <g key={i} className="a-bob" style={tm(i * 0.4, 4.5)}>
          <circle cx={x} cy={y} r={21} className="fill-surface stroke-fg/15" />
          <Txt x={x} y={y + 3.5} size={10} anchor="middle" weight={600}>
            A{i + 1}
          </Txt>
        </g>
      ))}
      <circle cx={200} cy={246} r={16} className="fill-sun" />
      <path d="M194 250 v-8 M198 251 v-11 M202 251 v-11 M206 250 v-9" fill="none" strokeWidth={2.4} strokeLinecap="round" className="stroke-fg/70" />
      <Txt x={224} y={250} size={9} className="fill-faint">
        ask-human
      </Txt>
      <Pill x={24} y={24} w={122} h={22} text="concurrent · ~12 s" fill="fill-surface" />
      <Pill x={276} y={24} w={100} h={22} text="LangGraph ×5+" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
    </Frame>
  );
}

/* ---- OPACA / SAGE voice ------------------------------------------------- */
const wave = [10, 22, 34, 20, 42, 30, 50, 26, 44, 18, 36, 24, 40, 16, 28, 12];

export function SageCover() {
  return (
    <Frame tone="sky" label="A microphone feeds a waveform; a bilingual assistant answers in Turkish and English">
      <circle cx={70} cy={140} r={26} className="fill-accent" />
      <rect x={65} y={126} width={10} height={20} rx={5} className="fill-white" />
      <path d="M61 140 a9 9 0 0 0 18 0 M70 149 v7" fill="none" strokeWidth={2} strokeLinecap="round" className="stroke-white" />
      {[0, 1.5].map((d) => (
        <circle key={d} cx={70} cy={140} r={38} fill="none" strokeWidth={1.6} className="a-pop tb stroke-accent/40" style={tm(d, 3)} />
      ))}
      {wave.map((h, i) => (
        <rect
          key={i}
          x={116 + i * 8.5}
          y={140 - h / 2}
          width={4.5}
          height={h}
          rx={2.25}
          className="a-wave tb fill-accent/75"
          style={tm(i * 0.07, 1.15)}
        />
      ))}
      <g className="a-pop tb" style={tm(0.4, 6)}>
        <rect x={262} y={78} width={114} height={38} rx={14} className="fill-surface stroke-fg/10" />
        <Txt x={276} y={102} size={13}>
          Merhaba!
        </Txt>
      </g>
      <g className="a-pop tb" style={tm(2.4, 6)}>
        <rect x={262} y={128} width={114} height={38} rx={14} className="fill-accent" />
        <Txt x={276} y={152} size={13} className="fill-white">
          Hello!
        </Txt>
      </g>
      <Pill x={24} y={24} w={70} h={22} text="TR / EN" />
      <Pill x={56} y={198} w={168} h={24} text="speaker ✓ ECAPA-TDNN" fill="fill-mint/40" stroke="stroke-transparent" />
      <Pill x={232} y={198} w={68} h={24} text="< 4 s" fill="fill-accent" ink="fill-accent-fg" stroke="stroke-transparent" />
      <Pill x={56} y={232} w={244} h={22} text="Whisper → SAGE agent → Coqui XTTS" />
    </Frame>
  );
}
