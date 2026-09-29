'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, CornerDownLeft, Search } from 'lucide-react';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { cvHref, mailto, navItems } from '@/lib/site';
import { cn } from '@/lib/utils';
import { toggleTheme } from './ThemeToggle';

interface Item {
  id: string;
  group: 'Go to' | 'Projects' | 'Actions';
  label: string;
  hint?: string;
  run: () => void;
}

const goTo = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const openUrl = (href: string) => () => {
  window.open(href, '_blank', 'noopener,noreferrer');
};

/** ⌘K / Ctrl+K / "/" command menu: jump anywhere, copy the email, switch theme. */
export function CommandPalette() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);

  const items = useMemo<Item[]>(
    () => [
      ...navItems.map<Item>((n) => ({ id: `nav-${n.id}`, group: 'Go to', label: n.label, run: goTo(n.id) })),
      { id: 'nav-opensource', group: 'Go to', label: 'Open source', run: goTo('opensource') },
      ...projects.map<Item>((p) => ({
        id: `p-${p.id}`,
        group: 'Projects',
        label: p.title,
        hint: p.period,
        run: goTo(`p-${p.id}`),
      })),
      { id: 'a-mail', group: 'Actions', label: 'Send an email', hint: profile.email, run: () => (window.location.href = mailto) },
      {
        id: 'a-copy',
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        run: () => {
          void navigator.clipboard?.writeText(profile.email);
          setCopied(true);
        },
      },
      { id: 'a-cv', group: 'Actions', label: 'Download CV (PDF)', run: openUrl(cvHref) },
      { id: 'a-gh', group: 'Actions', label: 'Open GitHub', hint: 'github.com/kutluhaan', run: openUrl(profile.github) },
      { id: 'a-in', group: 'Actions', label: 'Open LinkedIn', hint: 'in/kutluhanayguzel', run: openUrl(profile.linkedin) },
      { id: 'a-theme', group: 'Actions', label: 'Toggle light / dark theme', run: toggleTheme },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ''} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  const close = useCallback(() => dialog.current?.close(), []);

  const open = useCallback(() => {
    setQuery('');
    setCursor(0);
    setCopied(false);
    if (!dialog.current?.open) dialog.current?.showModal();
    requestAnimationFrame(() => input.current?.focus());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open();
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', open);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', open);
    };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    document.getElementById(`cmd-opt-${cursor}`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const choose = (item?: Item) => {
    if (!item) return;
    item.run();
    if (item.id !== 'a-copy') close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(filtered[cursor]);
    }
  };

  let lastGroup = '';

  return (
    <dialog
      ref={dialog}
      className="palette no-print"
      aria-label="Command menu"
      onClick={(e) => e.target === dialog.current && close()}
    >
      <div className="flex items-center gap-3 border-b border-fg/10 px-4">
        <Search className="h-4 w-4 shrink-0 text-faint" aria-hidden />
        <input
          ref={input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={filtered[cursor] ? `cmd-opt-${cursor}` : undefined}
          aria-label="Search sections, projects and actions"
          placeholder="Jump to a section, project or action…"
          className="h-14 w-full bg-transparent text-base text-fg placeholder:text-faint focus:outline-none"
          autoComplete="off"
          spellCheck={false}
        />
        <kbd className="rounded border border-fg/15 px-1.5 py-1 font-mono text-[10px] leading-none text-faint">esc</kbd>
      </div>

      <ul id="cmd-list" role="listbox" aria-label="Results" className="max-h-[calc(70vh-8rem)] overflow-y-auto p-2">
        {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">Nothing matches “{query}”.</li>}
        {filtered.map((item, i) => {
          const heading = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          return (
            <li key={item.id} role="presentation">
              {heading && <p className="eyebrow px-3 pb-1.5 pt-3">{heading}</p>}
              <div
                id={`cmd-opt-${i}`}
                role="option"
                aria-selected={i === cursor}
                onMouseMove={() => setCursor(i)}
                onClick={() => choose(item)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm',
                  i === cursor ? 'bg-fg/[0.07] text-fg' : 'text-muted',
                )}
              >
                <span className="min-w-0 truncate">{item.id === 'a-copy' && copied ? 'Copied to clipboard ✓' : item.label}</span>
                <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-faint">
                  {item.hint}
                  {i === cursor ? (
                    item.group === 'Actions' ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /> : <CornerDownLeft className="h-3.5 w-3.5" aria-hidden />
                  ) : null}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
