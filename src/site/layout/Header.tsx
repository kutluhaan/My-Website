'use client';

import { useEffect, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { navItems } from '@/lib/site';
import { profile } from '@/content/profile';
import { cn } from '@/lib/utils';
import { iconButton } from '@/site/ui/primitives';
import { ThemeToggle } from './ThemeToggle';

const spyIds = [...navItems.map((n) => n.id), 'opensource'];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: the section crossing the upper-middle of the viewport is "current".
  useEffect(() => {
    const els = spyIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === 'opensource' ? 'projects' : entry.target.id);
        });
      },
      { rootMargin: '-38% 0px -58% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const openPalette = () => window.dispatchEvent(new Event('open-palette'));

  return (
    <header
      className={cn(
        'no-print fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-fg/10 bg-bg/90 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 rounded-full" aria-label={`${profile.name}, back to top`}>
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-fg font-serif text-xl leading-none text-bg"
          >
            K
          </span>
          <span className="hidden text-[15px] font-medium tracking-tight sm:inline">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={cn(
                'relative rounded-full px-3.5 py-2 text-sm transition-colors',
                active === item.id ? 'text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-3.5 -bottom-px h-px bg-accent transition-transform duration-300 ease-out',
                  active === item.id ? 'scale-x-100' : 'scale-x-0',
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search sections and projects"
            className={cn(
              iconButton,
              'lg:w-auto lg:gap-2 lg:px-3.5 lg:font-mono lg:text-xs',
            )}
          >
            <Search className="h-[17px] w-[17px]" aria-hidden />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden rounded border border-fg/15 px-1.5 py-0.5 text-[10px] leading-none text-faint lg:inline">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary hidden !min-h-10 !px-4 !text-sm sm:inline-flex">
            Get in touch
          </a>
          <button
            type="button"
            className={cn(iconButton, 'md:hidden')}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-fg/10 md:hidden"
      >
        <ul className="container-page flex flex-col py-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-fg/[0.07] py-4 font-serif text-3xl leading-none last:border-b-0"
              >
                {item.label}
                <span aria-hidden className="font-mono text-xs text-faint">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
