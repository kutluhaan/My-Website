import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Lazy load below-fold components
const BentoGrid = dynamic(() => import('@/components/sections/BentoGrid').then(mod => ({ default: mod.BentoGrid })), {
  loading: () => <div className="min-h-screen" />,
});

const TechStack = dynamic(() => import('@/components/sections/TechStack').then(mod => ({ default: mod.TechStack })), {
  loading: () => <div className="min-h-[50vh]" />,
});

const Projects = dynamic(() => import('@/components/sections/Projects').then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="min-h-screen" />,
});

const Terminal = dynamic(() => import('@/components/sections/Terminal').then(mod => ({ default: mod.Terminal })), {
  loading: () => <div className="min-h-[50vh]" />,
});

const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="min-h-[40vh]" />,
});

export default function Home() {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <BentoGrid />
      </ErrorBoundary>
      <ErrorBoundary>
        <TechStack />
      </ErrorBoundary>
      <ErrorBoundary>
        <Projects />
      </ErrorBoundary>
      <ErrorBoundary>
        <CTASection />
      </ErrorBoundary>
      <ErrorBoundary>
        <Terminal />
      </ErrorBoundary>
    </>
  );
}
