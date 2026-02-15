'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/constants';

const techIcons: Record<string, string> = {
  Python: '🐍',
  React: '⚛️',
  Flask: '🔥',
  MySQL: '🗄️',
  Docker: '🐳',
  NLP: '🧠',
  GCP: '☁️',
  Kubernetes: '☸️',
  'Load Balancing': '⚖️',
  NetworkX: '🔗',
  Java: '☕',
  'Spring Boot': '🌱',
  MongoDB: '🍃',
  JUnit: '✅',
  'CI/CD': '🔄',
  BERT: '🤖',
  RoBERTa: '🤖',
  'TF-IDF': '📊',
  RPC: '📡',
  'Monte Carlo': '🎲',
  'Graph Theory': '📈',
};

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 relative"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          id="projects-heading"
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Proof of Work
        </motion.h2>
        <motion.p
          className="text-slate-400 text-lg mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Selected systems and projects
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full group hover:border-cyan-500/20 transition-all duration-300">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="text-xs"
                      >
                        <span className="mr-1">{techIcons[t] || '•'}</span>
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                {(project.github || project.live) && (
                  <CardFooter className="gap-2">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} on GitHub`}
                        >
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button variant="default" size="sm" asChild>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} live`}
                        >
                          Live
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
