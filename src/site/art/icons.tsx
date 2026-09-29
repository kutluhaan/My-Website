/** Square-cornered line icons for the capability columns. */
const base = { viewBox: '0 0 48 48', width: 44, height: 44, fill: 'none', strokeWidth: 1.4, 'aria-hidden': true } as const;

export function ChartIcon() {
  return (
    <svg {...base}>
      {[10, 18, 26, 34].map((h, i) => (
        <rect key={i} x={8 + i * 10} y={40 - h} width={6} height={h} className="stroke-fg/70" />
      ))}
      <path d="M6 16 L18 12 L28 16 L42 6" className="stroke-accent" strokeWidth={1.8} />
    </svg>
  );
}
export function LayersIcon() {
  return (
    <svg {...base}>
      <path d="M24 6 L42 15 L24 24 L6 15z" className="stroke-accent" />
      <path d="M6 24 L24 33 L42 24 M6 33 L24 42 L42 33" className="stroke-fg/70" />
    </svg>
  );
}
export function CandlesIcon() {
  return (
    <svg {...base}>
      {[
        [10, 16, 26],
        [22, 10, 22],
        [34, 14, 30],
      ].map(([x, y, h], i) => (
        <g key={i}>
          <line x1={x + 3} x2={x + 3} y1={y - 5} y2={y + h - 6} className="stroke-fg/60" />
          <rect x={x} y={y} width={6} height={h - 12} className={i === 1 ? 'fill-accent stroke-accent' : 'stroke-fg/80'} />
        </g>
      ))}
    </svg>
  );
}
