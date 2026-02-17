/**
 * Layout selection utility for diverse component layouts
 * Feature: portfolio-redesign
 * Requirements: 3.2, 3.3, 3.5
 */

import type { Project, LayoutConfig } from '@/types';
import { STAGGER_DELAYS } from '@/config/animations';

// ============================================================================
// Layout Selection Logic
// ============================================================================

export class LayoutSelector {
  private previousLayouts: string[] = [];
  private readonly maxConsecutive = 2; // Maximum consecutive identical layouts

  /**
   * Select appropriate layout for a project
   * @param project - Project data
   * @param position - Position in sequence (0-indexed)
   * @param previousType - Type of previous layout (optional)
   * @returns Layout configuration
   */
  selectLayout(
    project: Project,
    position: number,
    previousType?: string
  ): LayoutConfig {
    let selectedType: LayoutConfig['type'];

    // First project: Use showcase for featured, card otherwise
    if (position === 0) {
      selectedType = project.featured ? 'showcase' : 'card';
    } else {
      selectedType = this.determineLayoutType(project, position, previousType);
    }

    // Track layout history
    this.previousLayouts.push(selectedType);
    if (this.previousLayouts.length > this.maxConsecutive) {
      this.previousLayouts.shift();
    }

    // Calculate animation delay with stagger
    const animationDelay = position * STAGGER_DELAYS.NORMAL;

    return {
      type: selectedType,
      position,
      animationDelay,
    };
  }

  /**
   * Determine layout type based on project characteristics and position
   */
  private determineLayoutType(
    project: Project,
    position: number,
    previousType?: string
  ): LayoutConfig['type'] {
    // Check if we need variety (avoid 3+ consecutive identical layouts)
    if (this.needsVariety()) {
      return this.selectVarietyLayout(project, previousType);
    }

    // Every 3-4 projects: Insert timeline or grid for variety
    if (position % 3 === 0 || position % 4 === 0) {
      return this.selectPeriodicLayout(project);
    }

    // Featured projects: Prefer showcase or grid
    if (project.featured) {
      return this.selectFeaturedLayout(previousType);
    }

    // Projects with images: Prefer visual layouts
    if (project.imageUrl || project.thumbnailUrl) {
      return this.selectVisualLayout(previousType);
    }

    // Projects without images: Use text or card
    return this.selectTextLayout(previousType);
  }

  /**
   * Check if variety is needed (too many consecutive identical layouts)
   */
  private needsVariety(): boolean {
    if (this.previousLayouts.length < this.maxConsecutive) {
      return false;
    }

    const lastTwo = this.previousLayouts.slice(-this.maxConsecutive);
    return lastTwo.every((type) => type === lastTwo[0]);
  }

  /**
   * Select a layout that provides variety
   */
  private selectVarietyLayout(
    project: Project,
    previousType?: string
  ): LayoutConfig['type'] {
    const lastType = this.previousLayouts[this.previousLayouts.length - 1];

    // Avoid repeating the last type
    const availableTypes: LayoutConfig['type'][] = ['card', 'showcase', 'timeline', 'grid', 'text'];
    const differentTypes = availableTypes.filter((type) => type !== lastType);

    // Prefer layouts that match project characteristics
    if (project.featured && differentTypes.includes('showcase')) {
      return 'showcase';
    }

    if ((project.imageUrl || project.thumbnailUrl) && differentTypes.includes('grid')) {
      return 'grid';
    }

    if (!project.imageUrl && !project.thumbnailUrl && differentTypes.includes('text')) {
      return 'text';
    }

    // Default to first different type
    return differentTypes[0] || 'card';
  }

  /**
   * Select periodic layout for variety (every 3-4 projects)
   */
  private selectPeriodicLayout(project: Project): LayoutConfig['type'] {
    // Alternate between timeline and grid
    const lastType = this.previousLayouts[this.previousLayouts.length - 1];

    if (lastType === 'timeline') {
      return 'grid';
    }

    if (lastType === 'grid') {
      return 'timeline';
    }

    // Default to timeline if neither was used recently
    return 'timeline';
  }

  /**
   * Select layout for featured projects
   */
  private selectFeaturedLayout(previousType?: string): LayoutConfig['type'] {
    // Avoid repeating previous type
    if (previousType === 'showcase') {
      return 'grid';
    }

    if (previousType === 'grid') {
      return 'showcase';
    }

    // Default to showcase for featured
    return 'showcase';
  }

  /**
   * Select layout for projects with images
   */
  private selectVisualLayout(previousType?: string): LayoutConfig['type'] {
    // Prefer showcase or grid
    if (previousType === 'showcase') {
      return 'grid';
    }

    if (previousType === 'grid') {
      return 'showcase';
    }

    // Default to showcase
    return 'showcase';
  }

  /**
   * Select layout for projects without images
   */
  private selectTextLayout(previousType?: string): LayoutConfig['type'] {
    // Prefer text or card
    if (previousType === 'text') {
      return 'card';
    }

    if (previousType === 'card') {
      return 'text';
    }

    // Default to text
    return 'text';
  }

  /**
   * Reset layout history
   */
  reset(): void {
    this.previousLayouts = [];
  }

  /**
   * Get layout history
   */
  getHistory(): string[] {
    return [...this.previousLayouts];
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a new layout selector instance
 */
export function createLayoutSelector(): LayoutSelector {
  return new LayoutSelector();
}

/**
 * Select layouts for multiple projects
 */
export function selectLayoutsForProjects(projects: Project[]): LayoutConfig[] {
  const selector = createLayoutSelector();
  return projects.map((project, index) => {
    const previousType = index > 0 ? selector.getHistory()[index - 1] : undefined;
    return selector.selectLayout(project, index, previousType);
  });
}
