'use client';

export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-obsidian-950" />
      {/* Circuitry / Grid pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-cyan-500/30"
            />
          </pattern>
          <linearGradient
            id="grid-glow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-glow)"
          className="animate-grid-pulse"
        />
      </svg>
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6, 182, 212, 0.08), transparent)',
        }}
      />
    </div>
  );
}
