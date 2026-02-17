'use client';

/**
 * ProjectTimeline component - chronological timeline layout
 * Feature: portfolio-redesign
 * Requirements: 3.1, 6.2
 */

import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { useViewportObserver } from '@/hooks/useViewportObserver';

export interface ProjectTimelineProps {
  project: Project;
  animationDelay?: number;
  onClick?: () => void;
}

export function ProjectTimeline({ project, animationDelay = 0, onClick }: ProjectTimelineProps) {
  const [ref, isVisible] = useViewportObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-transparent" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-3 h-3 -ml-[5px] rounded-full bg-cyan-500 ring-4 ring-cyan-500/20" />

      {/* Content */}
      <div className="ml-8">
        <GlassCard variant="flat" className="hover:scale-[1.01] transition-transform duration-300 cursor-pointer" onClick={onClick}>
          <GlassCardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <GlassCardTitle className="text-white">{project.title}</GlassCardTitle>
                <GlassCardDescription className="text-slate-300 mt-1">
                  {project.description}
                </GlassCardDescription>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-cyan-400 font-medium">
                  {formatDate(project.startDate)}
                </p>
                {project.endDate && (
                  <p className="text-xs text-slate-400">
                    to {formatDate(project.endDate)}
                  </p>
                )}
                {!project.endDate && (
                  <p className="text-xs text-emerald-400">
                    Ongoing
                  </p>
                )}
              </div>
            </div>
          </GlassCardHeader>

          <GlassCardContent>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech) => (
                <Badge
                  key={tech.name}
                  variant="outline"
                  className="text-xs bg-white/5 border-white/20 text-white"
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}
