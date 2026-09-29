import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { profile } from '@/content/profile';
import { asset, siteOrigin, siteUrl } from '@/lib/site';
import { CommandPalette } from '@/site/layout/CommandPalette';
import { Footer } from '@/site/layout/Footer';
import { Header } from '@/site/layout/Header';
import { PageEffects } from '@/site/layout/PageEffects';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const title = `${profile.name} · Software Engineer, AI`;
const description =
  'Software engineer building production agentic AI systems: 98% tool-calling and 97% RAG retrieval accuracy, backed by deep backend and infrastructure work (FastAPI, Kafka, gRPC, Kubernetes). Istanbul, open to Türkiye, Europe and remote.';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title,
  description,
  alternates: { canonical: siteUrl },
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    'agentic AI',
    'LLM',
    'RAG',
    'LangGraph',
    'tool calling',
    'FastAPI',
    'Kafka',
    'Kubernetes',
    'software engineer',
    'Istanbul',
  ],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: profile.name,
    title,
    description,
    images: [{ url: asset('/og.png'), width: 1200, height: 630, alt: `${profile.name}, Software Engineer — AI` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [asset('/og.png')],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FAFBFC',
  colorScheme: 'light',
};

// Runs before first paint: restores a saved theme and arms scroll-reveal.
const bootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}})();`;

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.headline,
  url: siteUrl,
  address: { '@type': 'PostalAddress', addressLocality: 'Istanbul', addressCountry: 'TR' },
  sameAs: [profile.github, profile.linkedin],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Sabancı University' },
  worksFor: { '@type': 'Organization', name: 'Semper Tech' },
  knowsAbout: ['Agentic AI', 'Retrieval-augmented generation', 'LLM evaluation', 'Microservices', 'Kubernetes'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-fg"
        >
          Skip to main content
        </a>
        <PageEffects />
        <Header />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
