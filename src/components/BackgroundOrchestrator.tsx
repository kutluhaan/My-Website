'use client';

/**
 * BackgroundOrchestrator Component
 * 
 * Manages the dynamic background system that responds to scroll position
 * and section changes. Coordinates background layers and smooth transitions.
 * 
 * Feature: portfolio-redesign
 * Requirements: 1.1, 1.2
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import type { BackgroundState, BackgroundLayer, BackgroundConfig } from '@/types';
import { throttle } from '@/utils/scroll';
import { getScrollProgress, getActiveSection } from '@/utils/scroll';
import { PERFORMANCE_THRESHOLDS } from '@/config/animations';

// ============================================================================
// Default Configuration
// ============================================================================

const DEFAULT_TRANSITION_DURATION = 800; // milliseconds

// Default section-to-theme mappings
const DEFAULT_SECTION_MAPPINGS: Record<string, BackgroundLayer[]> = {
  hero: [
    {
      id: 'hero-gradient-1',
      type: 'gradient',
      opacity: 0.8,
      transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
      colors: ['#06b6d4', '#8b5cf6', '#0f0f17'],
    },
    {
      id: 'hero-gradient-2',
      type: 'mesh',
      opacity: 0.4,
      transform: { translateX: 30, translateY: -30, scale: 1.3, rotate: 45 },
      colors: ['#06b6d4', '#0a0a0f'],
    },
  ],
  experience: [
    {
      id: 'experience-gradient-1',
      type: 'gradient',
      opacity: 0.7,
      transform: { translateX: -20, translateY: 20, scale: 1.1, rotate: -15 },
      colors: ['#8b5cf6', '#06b6d4', '#0f0f17'],
    },
    {
      id: 'experience-mesh-1',
      type: 'mesh',
      opacity: 0.3,
      transform: { translateX: 40, translateY: -10, scale: 1.2, rotate: 30 },
      colors: ['#8b5cf6', '#0a0a0f'],
    },
  ],
  'tech-stack': [
    {
      id: 'tech-gradient-1',
      type: 'gradient',
      opacity: 0.6,
      transform: { translateX: 10, translateY: -20, scale: 1.15, rotate: 20 },
      colors: ['#06b6d4', '#0f0f17', '#8b5cf6'],
    },
    {
      id: 'tech-gradient-2',
      type: 'gradient',
      opacity: 0.4,
      transform: { translateX: -30, translateY: 30, scale: 1.25, rotate: -25 },
      colors: ['#8b5cf6', '#06b6d4'],
    },
  ],
  projects: [
    {
      id: 'projects-gradient-1',
      type: 'gradient',
      opacity: 0.75,
      transform: { translateX: 0, translateY: 0, scale: 1, rotate: 0 },
      colors: ['#8b5cf6', '#06b6d4', '#0f0f17'],
    },
    {
      id: 'projects-mesh-1',
      type: 'mesh',
      opacity: 0.35,
      transform: { translateX: -40, translateY: 20, scale: 1.2, rotate: -20 },
      colors: ['#06b6d4', '#0a0a0f'],
    },
  ],
  cta: [
    {
      id: 'cta-gradient-1',
      type: 'gradient',
      opacity: 0.8,
      transform: { translateX: 20, translateY: -15, scale: 1.1, rotate: 15 },
      colors: ['#06b6d4', '#8b5cf6', '#0f0f17'],
    },
    {
      id: 'cta-gradient-2',
      type: 'mesh',
      opacity: 0.5,
      transform: { translateX: -25, translateY: 25, scale: 1.3, rotate: -30 },
      colors: ['#8b5cf6', '#06b6d4'],
    },
  ],
  contact: [
    {
      id: 'contact-gradient-1',
      type: 'gradient',
      opacity: 0.7,
      transform: { translateX: 0, translateY: 10, scale: 1.05, rotate: 10 },
      colors: ['#06b6d4', '#0f0f17', '#8b5cf6'],
    },
    {
      id: 'contact-mesh-1',
      type: 'mesh',
      opacity: 0.4,
      transform: { translateX: 35, translateY: -20, scale: 1.2, rotate: 25 },
      colors: ['#06b6d4', '#0a0a0f'],
    },
  ],
};

// ============================================================================
// Component Props
// ============================================================================

interface BackgroundOrchestratorProps {
  sectionIds?: string[];
  sectionMappings?: Record<string, BackgroundLayer[]>;
  transitionDuration?: number;
  className?: string;
}

// ============================================================================
// BackgroundOrchestrator Component
// ============================================================================

export function BackgroundOrchestrator({
  sectionIds = ['hero', 'experience', 'tech-stack', 'projects', 'cta', 'contact'],
  sectionMappings = DEFAULT_SECTION_MAPPINGS,
  transitionDuration = DEFAULT_TRANSITION_DURATION,
  className = '',
}: BackgroundOrchestratorProps) {
  // State management
  const [backgroundState, setBackgroundState] = useState<BackgroundState>({
    scrollProgress: 0,
    activeSection: sectionIds[0] || 'hero',
    transitionProgress: 0,
  });

  const [currentLayers, setCurrentLayers] = useState<BackgroundLayer[]>(
    sectionMappings[sectionIds[0]] || []
  );

  // Refs for tracking transitions
  const transitionStartTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const previousSection = useRef<string>(sectionIds[0] || 'hero');

  // ============================================================================
  // Scroll Handler
  // ============================================================================

  const handleScroll = useCallback(() => {
    // Calculate scroll progress
    const scrollProgress = getScrollProgress();

    // Detect active section
    const activeSection = getActiveSection(sectionIds, 100);

    // Update background state
    setBackgroundState((prev) => ({
      ...prev,
      scrollProgress,
      activeSection: activeSection || prev.activeSection,
    }));

    // Trigger transition if section changed
    if (activeSection && activeSection !== previousSection.current) {
      previousSection.current = activeSection;
      transitionStartTime.current = performance.now();
      
      // Start transition animation
      animateTransition(activeSection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds]);

  // Throttled scroll handler for performance
  const throttledHandleScroll = useCallback(
    throttle(() => handleScroll(), PERFORMANCE_THRESHOLDS.THROTTLE_DELAY),
    [handleScroll]
  );

  // ============================================================================
  // Transition Animation
  // ============================================================================

  const animateTransition = useCallback(
    (targetSection: string) => {
      const targetLayers = sectionMappings[targetSection];
      if (!targetLayers) return;

      const animate = (currentTime: number) => {
        if (!transitionStartTime.current) return;

        const elapsed = currentTime - transitionStartTime.current;
        const progress = Math.min(elapsed / transitionDuration, 1);

        // Update transition progress
        setBackgroundState((prev) => ({
          ...prev,
          transitionProgress: progress,
        }));

        // Interpolate layers
        setCurrentLayers((prevLayers) => {
          return targetLayers.map((targetLayer, index) => {
            const prevLayer = prevLayers[index];
            if (!prevLayer) return targetLayer;

            return {
              ...targetLayer,
              opacity: lerp(prevLayer.opacity, targetLayer.opacity, progress),
              transform: {
                translateX: lerp(
                  prevLayer.transform.translateX || 0,
                  targetLayer.transform.translateX || 0,
                  progress
                ),
                translateY: lerp(
                  prevLayer.transform.translateY || 0,
                  targetLayer.transform.translateY || 0,
                  progress
                ),
                scale: lerp(
                  prevLayer.transform.scale || 1,
                  targetLayer.transform.scale || 1,
                  progress
                ),
                rotate: lerp(
                  prevLayer.transform.rotate || 0,
                  targetLayer.transform.rotate || 0,
                  progress
                ),
              },
            };
          });
        });

        // Continue animation if not complete
        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          transitionStartTime.current = null;
          setCurrentLayers(targetLayers);
        }
      };

      // Start animation
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    },
    [sectionMappings, transitionDuration]
  );

  // ============================================================================
  // Effects
  // ============================================================================

  // Set up scroll listener
  useEffect(() => {
    // Initial scroll position
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleScroll, throttledHandleScroll]);

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {currentLayers.map((layer) => (
        <BackgroundLayerRenderer key={layer.id} layer={layer} />
      ))}
    </div>
  );
}

// ============================================================================
// Background Layer Renderer
// ============================================================================

interface BackgroundLayerRendererProps {
  layer: BackgroundLayer;
}

function BackgroundLayerRenderer({ layer }: BackgroundLayerRendererProps) {
  const { id, type, opacity, transform, colors } = layer;

  // Build transform string
  const transformString = `
    translateX(${transform.translateX || 0}px)
    translateY(${transform.translateY || 0}px)
    scale(${transform.scale || 1})
    rotate(${transform.rotate || 0}deg)
  `.trim();

  // Build gradient based on type
  const getBackgroundStyle = () => {
    switch (type) {
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${colors.join(', ')})`,
        };
      case 'mesh':
        return {
          background: `radial-gradient(circle at 20% 50%, ${colors[0]} 0%, transparent 50%),
                       radial-gradient(circle at 80% 80%, ${colors[1]} 0%, transparent 50%)`,
        };
      case 'particles':
      case 'shapes':
        // Placeholder for future implementation
        return {
          background: `linear-gradient(135deg, ${colors.join(', ')})`,
        };
      default:
        return {};
    }
  };

  return (
    <div
      className="absolute inset-0 transition-all duration-300 ease-out"
      style={{
        opacity,
        transform: transformString,
        willChange: 'transform, opacity',
        ...getBackgroundStyle(),
      }}
    />
  );
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Linear interpolation between two values
 */
function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

// ============================================================================
// Exports
// ============================================================================

export default BackgroundOrchestrator;
