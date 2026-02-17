/**
 * Core TypeScript types for portfolio redesign
 * Feature: portfolio-redesign
 */

// ============================================================================
// Project Data Models
// ============================================================================

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
  iconUrl?: string;
}

export type ProjectCategory = 
  | 'web-application'
  | 'mobile-application'
  | 'api-service'
  | 'library'
  | 'tool'
  | 'other';

export interface ProjectMetrics {
  users?: number;
  stars?: number;
  performance?: string;
  impact?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: Technology[];
  category: ProjectCategory;
  featured: boolean;
  startDate: string;
  endDate?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  metrics?: ProjectMetrics;
}

// ============================================================================
// Background System Models
// ============================================================================

export interface TransformProperties {
  translateX?: number;
  translateY?: number;
  scale?: number;
  rotate?: number;
}

export interface BackgroundLayer {
  id: string;
  type: 'gradient' | 'mesh' | 'particles' | 'shapes';
  opacity: number;
  transform: TransformProperties;
  colors: string[];
}

export interface BackgroundState {
  scrollProgress: number;
  activeSection: string;
  transitionProgress: number;
}

export interface BackgroundConfig {
  layers: BackgroundLayer[];
  transitionDuration: number;
  sectionMappings: Record<string, BackgroundLayer[]>;
}

export interface BackgroundTheme {
  colors: string[];
  intensity: 'low' | 'medium' | 'high';
  animation: 'subtle' | 'moderate' | 'dynamic';
}

// ============================================================================
// Animation System Models
// ============================================================================

export interface AnimationConfig {
  type: 'fade' | 'slide' | 'scale' | 'blur';
  duration: number;
  delay: number;
  easing: string;
  stagger?: number;
}

export interface ViewportTrigger {
  threshold: number;
  triggerOnce: boolean;
  rootMargin: string;
}

export interface AnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
  progress: number;
}

export interface AnimationPresets {
  entrance: AnimationConfig;
  hover: AnimationConfig;
  scroll: AnimationConfig;
  transition: AnimationConfig;
}

export interface ResponsiveAnimations {
  mobile: AnimationPresets;
  tablet: AnimationPresets;
  desktop: AnimationPresets;
}

// ============================================================================
// Component System Models
// ============================================================================

export interface GlassmorphismProps {
  blur?: number;
  opacity?: number;
  borderOpacity?: number;
  shadowIntensity?: 'low' | 'medium' | 'high';
  className?: string;
  children: React.ReactNode;
}

export interface GlassCardProps extends GlassmorphismProps {
  variant?: 'default' | 'elevated' | 'flat';
  interactive?: boolean;
  animateOnView?: boolean;
}

export interface GlassPanelProps extends GlassmorphismProps {
  variant?: 'default' | 'bordered' | 'subtle';
}

export interface GlassButtonProps extends Omit<GlassmorphismProps, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface GlassModalProps extends GlassmorphismProps {
  open?: boolean;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface LayoutConfig {
  type: 'card' | 'showcase' | 'timeline' | 'grid' | 'text';
  position: number;
  animationDelay: number;
}

// ============================================================================
// Portfolio Configuration Models
// ============================================================================

export interface ContactData {
  email: string;
  linkedin?: string;
  github?: string;
  phone?: string;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  dribbble?: string;
  behance?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  contact: ContactData;
  social: SocialLinks;
  cvUrl: string;
}

export interface SectionConfig {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
  backgroundTheme: BackgroundTheme;
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  fontFamily: {
    heading: string;
    body: string;
  };
  glassmorphism: {
    defaultBlur: number;
    defaultOpacity: number;
  };
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  sections: SectionConfig[];
  theme: ThemeConfig;
  seo: SEOConfig;
}

// ============================================================================
// Navigation System Models
// ============================================================================

export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

export interface NavState {
  activeSection: string;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
}

export interface ScrollSpyConfig {
  offset: number;
  smooth: boolean;
  duration: number;
}

// ============================================================================
// CTA System Models
// ============================================================================

export interface CTAConfig {
  type: 'contact' | 'download' | 'external';
  label: string;
  icon?: string;
  variant: 'primary' | 'secondary';
  action: () => void;
}
