import { Menu, Moon, Search, Sun } from 'lucide-react';
import { profile } from '@/content/profile';
import { navItems } from '@/lib/site';

/** Fixed top bar: identity, numbered nav, live Istanbul clock, search, theme. */
export function Header() {
  return (
    <header
      data-header
      className="no-print fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-500 data-[solid]:border-fg/10 data-[solid]:bg-bg/80 data-[solid]:backdrop-blur-md"
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3" data-cursor="TOP">
          <span aria-hidden className="grid h-8 w-8 place-items-center border border-accent font-mono text-[11px] font-bold text-accent">
            KA
          </span>
          <span className="sr-only sm:hidden">{profile.name}, back to top</span>
          <span className="hud hidden !text-fg sm:block">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-spy
              data-scramble
              className="hud group relative px-3.5 py-2 transition-colors hover:!text-fg aria-[current=true]:!text-fg"
            >
              <span className="mr-2 text-accent">0{i + 1}</span>
              {item.label}
              <span aria-hidden className="absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-expo group-aria-[current=true]:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hud hidden items-center gap-2 xl:flex" title="Local time in Istanbul">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ok" />
            IST <span data-clock className="num !text-fg">--:--:--</span>
          </span>
          <button type="button" data-open-palette className="btn btn-ghost !min-h-10 !gap-2 !px-3" data-cursor="SEARCH">
            <Search className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only lg:not-sr-only">Search</span>
            <kbd aria-hidden className="hidden text-[10px] text-faint lg:inline">
              ⌘K
            </kbd>
          </button>
          <button type="button" data-theme-toggle aria-label="Toggle dark / light theme" className="grid h-10 w-10 place-items-center border border-fg/[0.28] text-fg transition-colors hover:border-accent hover:text-accent">
            <Sun className="theme-sun h-4 w-4" aria-hidden />
            <Moon className="theme-moon h-4 w-4" aria-hidden />
          </button>
          <a href="#contact" className="btn btn-primary !min-h-10 hidden sm:inline-flex" data-magnetic>
            Contact
          </a>
          <button type="button" data-menu-btn aria-controls="mobile-nav" aria-expanded="false" aria-label="Open menu" className="grid h-10 w-10 place-items-center border border-fg/[0.28] lg:hidden">
            <Menu className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" data-menu aria-label="Mobile" hidden className="border-t border-fg/10 bg-bg/95 backdrop-blur-md lg:hidden">
        <ul className="container-page py-2">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} data-menu-link className="flex items-baseline gap-4 border-b border-fg/[0.08] py-4 last:border-b-0">
                <span className="hud !text-accent">0{i + 1}</span>
                <span className="display text-3xl">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/** Right-hand section rail (desktop only). */
export function Rail() {
  return (
    <nav aria-label="Sections" className="no-print fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col items-end gap-3">
        {navItems.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} data-spy className="hud group flex items-center gap-3 transition-colors hover:!text-fg aria-[current=true]:!text-accent">
              <span className="translate-x-2 opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                {item.label}
              </span>
              <span aria-hidden className="block h-px w-4 bg-current transition-all duration-500 ease-expo group-hover:w-8 group-aria-[current=true]:w-8" />
              <span className="sr-only">0{i + 1}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
