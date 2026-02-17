'use client';

/**
 * ProjectCardStandard component - standard card layout for projects
 * Feature: portfolio-redesign
 * Requirements: 3.1, 6.2
 */

import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { useViewportObserver } from '@/hooks/useViewportObserver';

export interface ProjectCardStandardProps {
  project: Project;
  animationDelay?: number;
  onClick?: () => void;
}

export function ProjectCardStandard({ project, animationDelay = 0, onClick }: ProjectCardStandardProps) {
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
      <GlassCard
        variant="default"
        interactive
        className="h-full hover:scale-[1.02] transition-transform duration-300"
        onClick={onClick}
      >
        {project.imageUrl && (
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <GlassCardHeader>
          <GlassCardTitle className="text-white">{project.title}</GlassCardTitle>
          <GlassCardDescription className="text-slate-300">
            {project.description}
          </GlassCardDescription>
        </GlassCardHeader>

        <GlassCardContent>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge
                key={tech.name}
                variant="outline"
                className="text-xs bg-white/5 border-white/20 text-white"
              >
                {tech.name}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge
                variant="outline"
                className="text-xs bg-white/5 border-white/20 text-white"
              >
                +{project.technologies.length - 5}
              </Badge>
            )}
          </div>
        </GlassCardContent>

        {(project.liveUrl || project.repoUrl) && (
          <GlassCardFooter className="gap-2">
            {project.liveUrl && (
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <span className="text-white">Live Demo</span>
              </GlassButton>
            )}
            {project.repoUrl && (
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => window.open(project.repoUrl, '_blank')}
              >
                <span className="text-white">Repository</span>
              </GlassButton>
            )}
          </GlassCardFooter>
        )}
      </GlassCard>
    </div>
  );
}
