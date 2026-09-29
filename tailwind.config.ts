import type { Config } from 'tailwindcss';

// Every color is a CSS variable holding an "R G B" triplet (see globals.css),
// so theming and opacity modifiers (bg-fg/10, stroke-accent/60) both work.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/site/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      none: '0px',
      DEFAULT: '0px',
      full: '9999px', // only for status dots
    },
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        'surface-3': token('surface-3'),
        fg: token('fg'),
        muted: token('muted'),
        faint: token('faint'),
        accent: token('accent'),
        'accent-fg': token('accent-fg'),
        steel: token('steel'),
        ok: token('ok'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        page: '90rem',
        prose: '60ch',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
