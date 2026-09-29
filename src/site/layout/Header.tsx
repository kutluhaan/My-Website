import { Menu, Moon, Search, Sun } from 'lucide-react';
import { profile } from '@/content/profile';
import { navItems } from '@/lib/site';

/** Fixed top bar: name, quiet navigation, search and theme. */
export function Header() {
  return (
    <header
      data-header
      className="no-print fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-500 data-[solid]:border-fg/10 data-[solid]:bg-bg/85 data-[solid]:backdrop-blur-md"
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-serif text-[1.35rem] leading-none tracking-tight">
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-spy
              className="relative px-3.5 py-2 text-[14px] text-muted transition-colors hover:text-fg aria-[current=true]:text-fg"
            >
              {item.label}
              <span aria-hidden className="absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-expo [[aria-current=true]>&]:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" data-open-palette aria-label="Search (Ctrl or Command K)" className="grid h-10 w-10 place-items-center text-muted transition-colors hover:text-fg">
            <Search className="h-[18px] w-[18px]" aria-hidden />
          </button>
          <button type="button" data-theme-toggle aria-label="Toggle dark / light theme" className="grid h-10 w-10 place-items-center text-muted transition-colors hover:text-fg">
            <Sun className="theme-sun h-[18px] w-[18px]" aria-hidden />
            <Moon className="theme-moon h-[18px] w-[18px]" aria-hidden />
          </button>
          <button type="button" data-menu-btn aria-controls="mobile-nav" aria-expanded="false" aria-label="Open menu" className="grid h-10 w-10 place-items-center text-fg lg:hidden">
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" data-menu aria-label="Mobile" hidden className="border-t border-fg/10 bg-bg/95 backdrop-blur-md lg:hidden">
        <ul className="container-page py-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} data-menu-link className="block border-b border-fg/[0.08] py-4 font-serif text-3xl last:border-b-0">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
