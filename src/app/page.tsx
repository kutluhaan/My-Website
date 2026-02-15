import { Hero } from '@/components/sections/Hero';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { TechStack } from '@/components/sections/TechStack';
import { Projects } from '@/components/sections/Projects';
import { Terminal } from '@/components/sections/Terminal';

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <TechStack />
      <Projects />
      <Terminal />
    </>
  );
}
