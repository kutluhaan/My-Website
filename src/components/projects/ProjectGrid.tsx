'use client';

/**
 * ProjectGrid component - masonry-style grid layout
 * Feature: portfolio-redesign
 * Requirements: 3.1, 6.2
 */

import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { useViewportObserver } from '@/hooks/useViewportObserver';

export interface ProjectGridProps {
  project: Project;
  animationDelay?: number;
  onClick?: () => void;
}

export function ProjectGrid({ project, animationDelay = 0, onClick }: ProjectGridProps) {
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
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      <GlassCard
        variant="elevated"
        interactive
        className="h-full overflow-hidden group cursor-pointer"
        onClick={onClick}
      >
        {/* Image with overlay */}
        {project.imageUrl && (
          <div className="relative h-56 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-slate-200 line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <GlassCardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech.name}
                variant="outline"
                className="text-xs bg-white/5 border-white/20 text-white"
              >
                {tech.name}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs bg-white/5 border-white/20 text-white"
              >
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          {/* Category badge */}
          {project.category && (
            <div className="mt-3">
              <Badge className="bg-violet-500/20 border-violet-500/50 text-violet-300 text-xs">
                {project.category.replace('-', ' ')}
              </Badge>
            </div>
          )}
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
