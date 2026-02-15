import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { GridBackground } from '@/components/GridBackground';
import { Nav } from '@/components/Nav';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Kutluhan Aygüzel | AI Engineer & Systems Architect',
  description:
    'Portfolio of Kutluhan Aygüzel - Architecting intelligent systems that scale. AI, Distributed Systems, Microservices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-obsidian-950 text-white min-h-screen`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-obsidian-950 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <GridBackground />
        <Nav />
        <main id="main-content" tabIndex={-1}>{children}</main>
      </body>
    </html>
  );
}
