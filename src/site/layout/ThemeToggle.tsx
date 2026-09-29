'use client';

import { Moon, Sun } from 'lucide-react';
import { iconButton } from '@/site/ui/primitives';

export function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* private mode: the choice just won't persist */
  }
}

export function ThemeToggle() {
  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle light / dark theme" className={iconButton}>
      <Moon className="theme-moon h-[18px] w-[18px]" aria-hidden />
      <Sun className="theme-sun h-[18px] w-[18px]" aria-hidden />
    </button>
  );
}
