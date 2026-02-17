'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/lib/constants';
import { Project } from '@/types';
import { GlassModal } from '@/components/ui/glass-modal';
import { selectLayoutsForProjects } from '@/utils/layoutSelector';
import {
  ProjectCardStandard,
  ProjectShowcase,
  ProjectTimeline,
  ProjectGrid,
  ProjectTextDisplay,
} from '@/components/projects';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Use layout selector to determine diverse layouts
  const projectLayouts = useMemo(() => selectLayoutsForProjects(projects), []);

  const handleProjectClick = (project: Project) => {
    if (project.longDescription) {
      setSelectedProject(project);
    }
  };

  const renderProject = (project: Project, index: number) => {
    const layout = projectLayouts[index];
    const commonProps = {
      project,
      onClick: () => handleProjectClick(project),
      delay: layout.animationDelay,
    };

    switch (layout.type) {
      case 'showcase':
        return <ProjectShowcase key={project.id} {...commonProps} />;
      case 'timeline':
        return <ProjectTimeline key={project.id} {...commonProps} />;
      case 'grid':
        return <ProjectGrid key={project.id} {...commonProps} />;
      case 'text':
        return <ProjectTextDisplay key={project.id} {...commonProps} />;
      case 'card':
      default:
        return <ProjectCardStandard key={project.id} {...commonProps} />;
    }
  };

  return (
    <>
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
            Selected systems and projects showcasing diverse technical capabilities
          </motion.p>

          <div className="space-y-8">
            {projects.map((project, index) => renderProject(project, index))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <GlassModal
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        size="lg"
      >
        {selectedProject && (
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              {selectedProject.featured && (
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-sm">
                  Featured
                </span>
              )}
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              {selectedProject.longDescription}
            </p>

            {selectedProject.metrics && (
              <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <h4 className="text-sm font-semibold text-cyan-400 mb-3">Project Metrics</h4>
                {selectedProject.metrics.performance && (
                  <p className="text-sm text-slate-300 mb-2">
                    <span className="text-slate-400">Performance:</span> {selectedProject.metrics.performance}
                  </p>
                )}
                {selectedProject.metrics.impact && (
                  <p className="text-sm text-slate-300 mb-2">
                    <span className="text-slate-400">Impact:</span> {selectedProject.metrics.impact}
                  </p>
                )}
                {selectedProject.metrics.users && (
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-400">Users:</span> {selectedProject.metrics.users.toLocaleString()}
                  </p>
                )}
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-cyan-400 mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1 bg-slate-700/30 border border-slate-600/30 text-slate-300 rounded-md text-xs"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {selectedProject.repoUrl && (
                <button className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 text-slate-300 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repository
                  </a>
                </button>
              )}
              {selectedProject.liveUrl && (
                <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View Live <ExternalLink className="w-4 h-4" />
                  </a>
                </button>
              )}
            </div>
          </div>
        )}
      </GlassModal>
    </>
  );
}
