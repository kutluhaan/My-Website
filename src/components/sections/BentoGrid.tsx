'use client';

import { motion } from 'framer-motion';
import { experience } from '@/lib/constants';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function BentoGrid() {
  return (
    <section
      id="experience"
      className="py-24 relative"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          id="experience-heading"
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>
        <motion.p
          className="text-slate-400 text-lg mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Key roles and architectural impact across AI, systems, and engineering
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={item}
              className="group relative rounded-xl border border-slate-700/50 bg-obsidian-800/50 p-6 overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-slate-400 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {exp.period}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {exp.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 p-4 -mb-6 bg-obsidian-900/95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 rounded-b-xl">
                  <p className="text-cyan-400 text-xs font-mono">
                    Key Impact: {exp.impact}
                  </p>
                </div>
                <div className="h-12" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
