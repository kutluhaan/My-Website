import type { CSSProperties } from 'react';

/**
 * Illustrative agent loop: request → guardrail → LLM router → tools →
 * response, with a continuous evaluation loop underneath. Pure SVG + CSS
 * (no JS): a 9 s trace highlights each hop in turn. Reduced-motion users get
 * the static diagram.
 */

const W = 112;
const H = 52;

interface NodeProps {
  x: number;
  y: number;
  label: string;
  sub?: string;
  hot?: boolean;
  delay?: number;
}

function Node({ x, y, label, sub, hot, delay }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={W}
        height={H}
        rx={12}
        className={hot ? 'fill-accent/10 stroke-accent/50' : 'fill-surface-2 stroke-fg/20'}
      />
      {delay !== undefined && (
        <rect
          x={x}
          y={y}
          width={W}
          height={H}
          rx={12}
          fill="none"
          strokeWidth={1.75}
          className="g-glow stroke-accent"
          style={{ '--d': `${delay}s` } as CSSProperties}
        />
      )}
      <text x={x + 14} y={y + 23} className="fill-fg font-mono" fontSize={13} fontWeight={500}>
        {label}
      </text>
      {sub && (
        <text x={x + 14} y={y + 40} className="fill-faint font-mono" fontSize={10}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Edge({ d, delay, dashed }: { d: string; delay: number; dashed?: boolean }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        strokeWidth={1.25}
        className="stroke-fg/25"
        strokeDasharray={dashed ? '2 4' : undefined}
      />
      <path
        d={d}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        className="g-trace stroke-accent"
        style={{ '--d': `${delay}s` } as CSSProperties}
      />
    </>
  );
}

export function AgentGraph() {
  return (
    <figure className="card relative p-5 sm:p-6">
      <figcaption className="eyebrow mb-4 flex items-center justify-between gap-3">
        <span>agent loop</span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
          illustrative composite
        </span>
      </figcaption>

      <svg
        viewBox="0 0 440 360"
        role="img"
        aria-label="Diagram of an agent loop: a request passes a guardrail to an LLM router, which calls retrieval, typed tools or a human, returns a grounded response, and is continuously evaluated."
        className="h-auto w-full"
      >
        {/* edges */}
        <Edge d="M120 130 H164" delay={0} />
        <Edge d="M220 104 V72" delay={1.4} />
        <Edge d="M276 122 C298 122 298 46 320 46" delay={2.6} />
        <Edge d="M276 130 H320" delay={3.4} />
        <Edge d="M276 138 C298 138 298 214 320 214" delay={4.2} dashed />
        <Edge d="M164 138 C142 138 142 214 120 214" delay={5.2} />
        <Edge d="M220 156 V280" delay={6.4} dashed />

        {/* nodes */}
        <Node x={8} y={104} label="Request" sub="text · voice" delay={0.2} />
        <Node x={164} y={20} label="Guardrail" sub="Llama Guard" delay={1.6} />
        <Node x={164} y={104} label="LLM router" sub="tool calling" hot delay={0.8} />
        <Node x={320} y={20} label="RAG" sub="Qdrant" delay={2.8} />
        <Node x={320} y={104} label="Agent tools" sub="6+ typed" delay={3.6} />
        <Node x={320} y={188} label="Ask human" sub="HITL interrupt" />
        <Node x={8} y={188} label="Response" sub="grounded" delay={5.4} />

        {/* evaluation bar */}
        <g>
          <rect x={8} y={280} width={424} height={60} rx={12} className="fill-surface-2 stroke-fg/20" />
          <rect
            x={8}
            y={280}
            width={424}
            height={60}
            rx={12}
            fill="none"
            strokeWidth={1.75}
            className="g-glow stroke-accent"
            style={{ '--d': '6.6s' } as CSSProperties}
          />
          <text x={24} y={305} className="fill-fg font-mono" fontSize={13} fontWeight={500}>
            Evaluation
          </text>
          <text x={24} y={324} className="fill-faint font-mono" fontSize={10}>
            LLM-as-a-Judge · human review · 300+ scenarios
          </text>
          <text
            x={416}
            y={314}
            textAnchor="end"
            className="fill-accent font-mono"
            fontSize={15}
            fontWeight={500}
          >
            98 · 97
          </text>
        </g>
      </svg>
    </figure>
  );
}
