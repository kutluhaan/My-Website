'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download } from 'lucide-react';
import { siteConfig } from '@/lib/constants';
import { CTAButton } from '@/components/ui/cta-button';
import { ContactModal } from '@/components/ContactModal';

const codeSnippet = `// Architecting intelligent systems
const philosophy = {
  scale: "microservices",
  intelligence: "agentic AI",
  precision: "distributed systems",
};

async function build() {
  return await optimize(
    systems,
    { latency: "minimal", accuracy: "maximum" }
  );
}`;

export function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleDownloadCV = () => {
    window.open(siteConfig.cvPdfPath, '_blank');
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        aria-label="Hero section"
      >
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            className="flex-1 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.p
              className="text-cyan-400 font-mono text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              AI Engineer & Systems Architect
            </motion.p>
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {siteConfig.name.split(' ').map((word, i) => (
                <motion.span
                  key={word}
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="text-xl text-slate-400 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {siteConfig.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <CTAButton
                variant="primary"
                size="lg"
                icon={<Mail className="w-5 h-5" />}
                onClick={() => setIsContactModalOpen(true)}
              >
                Get in Touch
              </CTAButton>
              <CTAButton
                variant="secondary"
                size="lg"
                icon={<Download className="w-5 h-5" />}
                onClick={handleDownloadCV}
              >
                Download CV
              </CTAButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="relative rounded-xl border border-slate-700/50 bg-obsidian-900/80 p-6 font-mono text-sm overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5" />
              <div className="flex gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <pre className="relative text-slate-300 overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
