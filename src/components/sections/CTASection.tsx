'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, ArrowRight } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import { ContactModal } from '@/components/ContactModal';
import { siteConfig } from '@/lib/constants';

export function CTASection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleDownloadCV = () => {
    window.open(siteConfig.cvPdfPath, '_blank');
  };

  return (
    <>
      <section
        id="cta"
        className="py-24 relative"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-12 md:p-16 overflow-hidden backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h2
                id="cta-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ready to Build Something Amazing?
              </motion.h2>
              
              <motion.p
                className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Let&apos;s discuss how I can help architect and build scalable AI systems
                that drive real business impact.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <CTAButton
                  variant="primary"
                  size="lg"
                  icon={<Mail className="w-5 h-5" />}
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Start a Conversation
                  <ArrowRight className="w-5 h-5 ml-1" />
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  size="lg"
                  icon={<Download className="w-5 h-5" />}
                  onClick={handleDownloadCV}
                >
                  Download Full CV
                </CTAButton>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap gap-6 justify-center text-sm text-slate-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Available for opportunities
                </span>
                <span>•</span>
                <span>Response within 24 hours</span>
              </motion.div>
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
