import { profile } from '@/content/profile';

/** Set by next.config.js so client code can prefix public assets on GitHub Pages. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const siteOrigin = 'https://kutluhaan.github.io';
export const siteUrl = `${siteOrigin}${basePath}/`;

export const asset = (path: string) => `${basePath}${path}`;

export const cvHref = asset('/Kutluhan_Ayguzel_CV.pdf');

export const navItems = [
  { id: 'about', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'education', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const;

export const mailto = `mailto:${profile.email}`;
