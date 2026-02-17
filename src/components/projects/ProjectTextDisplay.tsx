'use client';

/**
 * ProjectTextDisplay component - typography-focused layout for projects without images
 * Feature: portfolio-redesign
 * Requirements: 3.1, 3.2, 6.2
 */

import { GlassPanel } from '@/components/ui/glass-panel';
import { GlassButton } from '@/components/ui/glass-button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { useViewportObserver } from '@/hooks/useViewportObserver';

export interface ProjectTextDisplayProps {
  project: Project;
  animationDelay?: number;
  onClick?: () => void;
}

export function ProjectTextDisplay({ project, animationDelay = 0, onClick }: ProjectTextDisplayProps) {
  const [ref, isVisible] = useViewportObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      <GlassPanel
        variant="subtle"
        className="p-8 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={onClick}
      >
        {/* Header with decorative element */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-1 h-16 bg-gradient-to-b from-cyan-500 to-violet-500 rounded-full shrink-0" />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>
            {project.category && (
              <Badge className="bg-violet-500/20 border-violet-500/50 text-violet-300 text-xs">
                {project.category.replace('-', ' ')}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-slate-300 text-base leading-relaxed mb-4">
            {project.description}
          </p>
          {project.longDescription && (
            <p className="text-slate-400 text-sm leading-relaxed">
              {project.longDescription}
            </p>
          )}
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Metrics */}
        {project.metrics && (Object.keys(project.metrics).length > 0) && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Impact
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {project.metrics.users && (
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1">Users</p>
                  <p className="text-white font-semibold text-lg">{project.metrics.users.toLocaleString()}</p>
                </div>
              )}
              {project.metrics.stars && (
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1">Stars</p>
                  <p className="text-white font-semibold text-lg">{project.metrics.stars.toLocaleString()}</p>
                </div>
              )}
              {project.metrics.performance && (
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1">Performance</p>
                  <p className="text-white font-semibold text-sm">{project.metrics.performance}</p>
                </div>
              )}
              {project.metrics.impact && (
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1">Impact</p>
                  <p className="text-white font-semibold text-sm">{project.metrics.impact}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="flex gap-3 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <span className="text-white">View Live →</span>
              </GlassButton>
            )}
            {project.repoUrl && (
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => window.open(project.repoUrl, '_blank')}
              >
                <span className="text-white">Source Code</span>
              </GlassButton>
            )}
          </div>
        )}
      </GlassPanel>
    </div>
  );
}
