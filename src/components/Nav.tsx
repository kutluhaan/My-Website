'use client';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#experience', label: 'Experience' },
  { href: '#tech-stack', label: 'Tech' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-obsidian-950/80 backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#hero"
            className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors shrink-0"
          >
            KA
          </a>
          <ul className="flex items-center gap-4 sm:gap-8 flex-wrap justify-end">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
