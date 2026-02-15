'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';

export function Terminal() {
  return (
    <section
      id="contact"
      className="py-24 relative"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          id="contact-heading"
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Terminal
        </motion.h2>
        <motion.p
          className="text-slate-400 text-lg mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Get in touch — read contact info or download CV
        </motion.p>

        <motion.div
          className="max-w-2xl rounded-xl border border-slate-700/50 bg-obsidian-900/90 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-obsidian-800/80 border-b border-slate-700/50">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <span className="ml-4 font-mono text-slate-500 text-sm">
              contact@portfolio
            </span>
          </div>
          <div className="p-6 font-mono text-sm space-y-3">
            <p>
              <span className="text-cyan-400">$</span>{' '}
              <span className="text-slate-500">cat contact.txt</span>
            </p>
            <div className="text-slate-300 space-y-1 pl-2 border-l-2 border-cyan-500/30">
              <p>email: {siteConfig.contact.email}</p>
              <p>phone: {siteConfig.contact.phone}</p>
              <p>linkedin: {siteConfig.contact.linkedin}</p>
              <p>website: {siteConfig.contact.website}</p>
            </div>
            <p className="pt-4">
              <span className="text-cyan-400">$</span>{' '}
              <span className="text-slate-500">./download-cv</span>
            </p>
            <div className="flex gap-4 pt-2">
              <Button
                onClick={() => window.open(`mailto:${siteConfig.contact.email}`)}
                aria-label="Send email"
              >
                Contact
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(siteConfig.contact.linkedin, '_blank')}
                aria-label="Open LinkedIn"
              >
                LinkedIn
              </Button>
              <Button
                variant="ghost"
                asChild
              >
                <a
                  href={siteConfig.cvPdfPath}
                  download="Kutluhan-Ayguzel-CV.pdf"
                  aria-label="Download CV as PDF"
                >
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
