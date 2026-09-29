import type { Metadata, Viewport } from 'next';
import { Archivo, Martian_Mono } from 'next/font/google';
import { profile } from '@/content/profile';
import { asset, cvHref, siteOrigin, siteUrl } from '@/lib/site';
import { Behavior } from '@/site/behavior/Behavior';
import { Footer } from '@/site/layout/Footer';
import { Header, Rail } from '@/site/layout/Header';
import { Palette } from '@/site/layout/Palette';
import './globals.css';

// Archivo is a variable font with a width axis: at wdth 62 it is the extra-condensed display face.
const sans = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = Martian_Mono({
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
  themeColor: '#07080A',
  colorScheme: 'dark light',
};

// Runs before first paint: restores a saved theme (dark is the default) and arms scroll-reveal.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('theme')==='light')d.dataset.theme='light'}catch(e){}})();`;

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
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body className="grain">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:text-accent-fg"
        >
          Skip to main content
        </a>
        <div aria-hidden data-progress className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left scale-x-0 bg-accent" />
        <div aria-hidden className="cols">
          <div className="container-page h-full">
            <div className="grid h-full grid-cols-4 lg:grid-cols-12">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} className={i > 3 ? 'hidden lg:block' : ''} />
              ))}
            </div>
          </div>
        </div>
        <Header />
        <Rail />
        <main id="main-content" tabIndex={-1} className="relative z-[1] outline-none">
          {children}
        </main>
        <div className="relative z-[1]">
          <Footer />
        </div>
        <Palette github={profile.github} linkedin={profile.linkedin} email={profile.email} cv={cvHref} />
        <div aria-hidden className="cur cur-dot" data-cur-dot />
        <div aria-hidden className="cur cur-ring" data-cur-ring>
          <span />
        </div>
        <Behavior />
      </body>
    </html>
  );
}
