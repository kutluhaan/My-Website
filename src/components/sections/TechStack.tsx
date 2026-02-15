'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { techStack } from '@/lib/constants';

const categories = [
  {
    title: 'Core Architecture',
    subtitle: 'Distributed Systems, Microservices',
    skills: techStack.core,
    variant: 'default' as const,
  },
  {
    title: 'Frontend Mastery',
    subtitle: 'Next.js, React, Performance',
    skills: techStack.frontend,
    variant: 'violet' as const,
  },
  {
    title: 'Cloud / DevOps',
    subtitle: 'AWS, CI/CD, Infrastructure',
    skills: techStack.cloud,
    variant: 'secondary' as const,
  },
];

export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="py-24 relative"
      aria-labelledby="tech-heading"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          id="tech-heading"
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tech Stack Radar
        </motion.h2>
        <motion.p
          className="text-slate-400 text-lg mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Skills organized by architectural domain
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-slate-700/50 hover:border-cyan-500/20 transition-colors duration-300">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white">
                    {category.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{category.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={category.variant}
                        className="cursor-default hover:scale-105 transition-transform"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
