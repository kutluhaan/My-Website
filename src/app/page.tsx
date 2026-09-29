import { About } from '@/site/sections/About';
import { Contact } from '@/site/sections/Contact';
import { Education } from '@/site/sections/Education';
import { Experience } from '@/site/sections/Experience';
import { Hero } from '@/site/sections/Hero';
import { OpenSource } from '@/site/sections/OpenSource';
import { Projects } from '@/site/sections/Projects';
import { Skills } from '@/site/sections/Skills';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <OpenSource />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
