import { Search } from 'lucide-react';
import { projects } from '@/content/projects';
import { navItems } from '@/lib/site';

const links = [
  { label: 'GitHub', hint: 'External', href: 'github' },
  { label: 'LinkedIn', hint: 'External', href: 'linkedin' },
];

/** ⌘K command palette. Markup only; the behaviour layer filters and runs it. */
export function Palette({ github, linkedin, email, cv }: { github: string; linkedin: string; email: string; cv: string }) {
  const ext: Record<string, string> = { github, linkedin };
  return (
    <dialog id="palette" className="palette" aria-label="Command palette">
      <div className="flex items-center gap-3 border-b border-fg/[0.14] px-4">
        <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        <input
          data-palette-input
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="Jump to a section, project or link…"
          aria-label="Search sections, projects and links"
          className="h-14 w-full bg-transparent text-[15px] text-fg placeholder:text-faint focus:outline-none"
        />
        <kbd className="hud rounded-sm border border-fg/20 px-1.5 py-0.5 !text-[11px]">Esc</kbd>
      </div>
      <ul data-palette-list role="listbox" aria-label="Results" className="max-h-[50vh] overflow-y-auto py-2" data-lenis-prevent>
        <li role="presentation" className="hud px-4 pb-1 pt-2 !text-[11px]">Sections</li>
        {navItems.map((n, i) => (
          <li key={n.id} role="option" aria-selected="false" tabIndex={-1} data-cmd data-go={`#${n.id}`} data-q={`${n.label} ${n.id}`} className="palette-item">
            <span className="hud !text-accent">0{i + 1}</span>
            <span>{n.label}</span>
            <span className="hud ml-auto">Go to</span>
          </li>
        ))}
        <li role="presentation" className="hud px-4 pb-1 pt-4 !text-[11px]">Projects</li>
        {projects.map((p, i) => (
          <li key={p.id} role="option" aria-selected="false" tabIndex={-1} data-cmd data-case-open={p.id} data-q={`${p.short} ${p.title} ${p.kinds.join(' ')}`} className="palette-item">
            <span className="hud !text-accent">{String(i + 1).padStart(2, '0')}</span>
            <span>{p.short}</span>
            <span className="hud ml-auto">Case file</span>
          </li>
        ))}
        <li role="presentation" className="hud px-4 pb-1 pt-4 !text-[11px]">Actions</li>
        <li role="option" aria-selected="false" tabIndex={-1} data-cmd data-copy={email} data-q="copy email address" className="palette-item">
          <span className="hud !text-accent">⧉</span>
          <span>Copy email address</span>
          <span className="hud ml-auto">{email}</span>
        </li>
        <li role="option" aria-selected="false" tabIndex={-1} data-cmd data-href={cv} data-q="download cv resume pdf" className="palette-item">
          <span className="hud !text-accent">↓</span>
          <span>Download CV (PDF)</span>
          <span className="hud ml-auto">PDF</span>
        </li>
        <li role="option" aria-selected="false" tabIndex={-1} data-cmd data-theme-cmd data-q="toggle theme dark light" className="palette-item">
          <span className="hud !text-accent">◐</span>
          <span>Toggle dark / light theme</span>
          <span className="hud ml-auto">Theme</span>
        </li>
        {links.map((l) => (
          <li key={l.label} role="option" aria-selected="false" tabIndex={-1} data-cmd data-href={ext[l.href]} data-external data-q={l.label} className="palette-item">
            <span className="hud !text-accent">↗</span>
            <span>{l.label}</span>
            <span className="hud ml-auto">{l.hint}</span>
          </li>
        ))}
      </ul>
      <p data-palette-empty hidden className="hud px-4 py-8 text-center">No matches</p>
    </dialog>
  );
}
