'use client';

/**
 * ProjectShowcase component - large featured project display
 * Feature: portfolio-redesign
 * Requirements: 3.1, 3.5, 6.2
 */

import { useState } from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GlassButton } from '@/components/ui/glass-button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { useViewportObserver } from '@/hooks/useViewportObserver';

export interface ProjectShowcaseProps {
  project: Project;
  animationDelay?: number;
  onClick?: () => void;
}

export function ProjectShowcase({ project, animationDelay = 0, onClick }: ProjectShowcaseProps) {
  const [ref, isVisible] = useViewportObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      <GlassPanel
        variant="bordered"
        className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        onClick={onClick}
      >
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Section */}
          {project.imageUrl && (
            <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-cyan-500/20 border-cyan-500/50 text-cyan-300">
                    Featured
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">
                {project.title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-4">
                {project.description}
              </p>

              {isExpanded && project.longDescription && (
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.longDescription}
                </p>
              )}

              {project.longDescription && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors mb-4"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className="bg-white/5 border-white/20 text-white"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {project.metrics.users && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-slate-400 text-xs">Users</p>
                      <p className="text-white font-semibold">{project.metrics.users.toLocaleString()}</p>
                    </div>
                  )}
                  {project.metrics.stars && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-slate-400 text-xs">Stars</p>
                      <p className="text-white font-semibold">{project.metrics.stars.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {project.liveUrl && (
                <GlassButton
                  variant="primary"
                  size="md"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="flex-1"
                >
                  <span className="text-white">View Live</span>
                </GlassButton>
              )}
              {project.repoUrl && (
                <GlassButton
                  variant="secondary"
                  size="md"
                  onClick={() => window.open(project.repoUrl, '_blank')}
                  className="flex-1"
                >
                  <span className="text-white">Source Code</span>
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
