import Lenis from 'lenis';

/**
 * Interaction layer. Plain DOM + data-attributes, no framework: the page is
 * server-rendered and complete without it; this only adds motion and input.
 * Everything that moves respects prefers-reduced-motion.
 */

const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

export function init(): () => void {
  const cleanups: Array<() => void> = [];
  const on = (target: EventTarget, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };

  const html = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wide = () => matchMedia('(min-width: 1024px)').matches;

  /* ---------------------------------------------------------------- scroll */
  let lenis: Lenis | null = null;
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
    cleanups.push(() => lenis?.destroy());
  }

  let lockCount = 0;
  const lockScroll = () => {
    if (lockCount++ === 0) {
      // keep the layout still when the scrollbar disappears
      const bar = window.innerWidth - html.clientWidth;
      if (bar > 0) html.style.paddingRight = `${bar}px`;
      lenis?.stop();
      html.style.overflow = 'hidden';
    }
  };
  const unlockScroll = () => {
    if (lockCount > 0 && --lockCount === 0) {
      html.style.overflow = '';
      html.style.paddingRight = '';
      lenis?.start();
    }
  };

  // Sections below the fold are content-visibility:auto (cheap first paint). Before any jump we lay
  // everything out once so the target offset is exact, then leave it that way.
  const settleLayout = () => {
    if (!html.classList.contains('cv-off')) {
      html.classList.add('cv-off');
      void html.offsetHeight;
    }
  };

  const scrollToEl = (el: Element | null) => {
    if (!el) return;
    settleLayout();
    if (el.id === 'top') {
      lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo(0, 0);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - 63;
    if (lenis) lenis.scrollTo(top, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo(0, top);
  };

  /* ------------------------------------------------------------- reveals */
  if ('IntersectionObserver' in window) {
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.in = '';
          revealIO.unobserve(e.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    qa('[data-reveal]').forEach((el) => revealIO.observe(el));
    cleanups.push(() => revealIO.disconnect());

    const liveIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.setAttribute('data-active', '');
          else el.removeAttribute('data-active');
        }),
      { rootMargin: '80px' },
    );
    qa('[data-live]').forEach((el) => liveIO.observe(el));
    cleanups.push(() => liveIO.disconnect());
  } else {
    qa('[data-reveal]').forEach((el) => ((el as HTMLElement).dataset.in = ''));
    qa('[data-live]').forEach((el) => el.setAttribute('data-active', ''));
  }

  /* -------------------------------------------------------- scroll driven */
  const header = q('[data-header]');
  const sections = qa<HTMLElement>('main section[id]');
  const spies = qa<HTMLAnchorElement>('[data-spy]');
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      header?.toggleAttribute('data-solid', y > 24);

      let current = '';
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= vh * 0.4) current = s.id;
      });
      spies.forEach((a) => {
        const on = current !== '' && a.getAttribute('href') === `#${current}`;
        if (on) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  };
  if (lenis) lenis.on('scroll', onScroll);
  on(window, 'scroll', onScroll, { passive: true });
  on(window, 'resize', onScroll, { passive: true });
  onScroll();

  /* --------------------------------------------------------------- theme */
  const toggleTheme = () => {
    const light = html.dataset.theme === 'light';
    if (light) delete html.dataset.theme;
    else html.dataset.theme = 'light';
    try {
      localStorage.setItem('theme', light ? 'dark' : 'light');
    } catch {
      /* storage unavailable */
    }
    q('meta[name="theme-color"]')?.setAttribute('content', light ? '#07080A' : '#EEF0F3');
  };

  /* ---------------------------------------------------- dialogs (cases) */
  let lastTrigger: HTMLElement | null = null;
  const caseDialogs = () => qa<HTMLDialogElement>('dialog.case');

  const openCase = (id: string, from?: HTMLElement | null) => {
    const dlg = q<HTMLDialogElement>(`#case-${CSS.escape(id)}`);
    if (!dlg || dlg.open) return;
    const previous = caseDialogs().find((d) => d.open);
    if (!previous) lastTrigger = from ?? (document.activeElement as HTMLElement | null);
    lockScroll();
    dlg.removeAttribute('data-closing');
    dlg.showModal();
    dlg.scrollTop = 0;
    qa('[data-live]', dlg).forEach((el) => el.setAttribute('data-active', ''));
    if (previous) {
      // stacked swap: the new file slides over the old one, then the old one is dropped
      window.setTimeout(() => previous.close(), reduced ? 0 : 720);
    }
  };

  const closeCase = (dlg: HTMLDialogElement) => {
    if (!dlg.open || dlg.hasAttribute('data-closing')) return;
    if (reduced) {
      dlg.close();
      return;
    }
    dlg.setAttribute('data-closing', '');
    const done = () => {
      dlg.removeAttribute('data-closing');
      dlg.close();
    };
    dlg.addEventListener('animationend', done, { once: true });
    window.setTimeout(() => dlg.isConnected && dlg.hasAttribute('data-closing') && done(), 600);
  };

  caseDialogs().forEach((dlg) => {
    on(dlg, 'cancel', (e) => {
      e.preventDefault();
      closeCase(dlg);
    });
    on(dlg, 'close', () => {
      unlockScroll();
      if (!caseDialogs().some((d) => d.open)) {
        lastTrigger?.focus?.({ preventScroll: true });
        lastTrigger = null;
      }
    });
    on(dlg, 'click', (e) => {
      // a click on the backdrop lands on the dialog element itself
      if (e.target === dlg) closeCase(dlg);
    });
  });

  /* ------------------------------------------------------------ palette */
  const palette = q<HTMLDialogElement>('#palette');
  const pInput = q<HTMLInputElement>('[data-palette-input]');
  const pItems = palette ? qa<HTMLElement>('[data-cmd]', palette) : [];
  const pHeads = palette ? qa<HTMLElement>('li[role="presentation"]', palette) : [];
  const pEmpty = q('[data-palette-empty]');
  let pActive = 0;

  const visibleItems = () => pItems.filter((i) => !i.hidden);
  const setActive = (n: number) => {
    const list = visibleItems();
    if (!list.length) return;
    pActive = (n + list.length) % list.length;
    list.forEach((el, i) => el.setAttribute('aria-selected', String(i === pActive)));
    list[pActive].scrollIntoView({ block: 'nearest' });
  };
  const filterPalette = () => {
    const terms = (pInput?.value ?? '').toLowerCase().split(/\s+/).filter(Boolean);
    pItems.forEach((el) => {
      const hay = `${el.dataset.q ?? ''} ${el.textContent ?? ''}`.toLowerCase();
      el.hidden = !terms.every((t) => hay.includes(t));
    });
    pHeads.forEach((h) => {
      let n = h.nextElementSibling as HTMLElement | null;
      let any = false;
      while (n && n.getAttribute('role') !== 'presentation') {
        if (!n.hidden) any = true;
        n = n.nextElementSibling as HTMLElement | null;
      }
      h.hidden = !any;
    });
    if (pEmpty) pEmpty.hidden = visibleItems().length > 0;
    setActive(0);
  };
  const openPalette = () => {
    if (!palette || palette.open) return;
    lastTrigger = document.activeElement as HTMLElement | null;
    lockScroll();
    if (pInput) pInput.value = '';
    filterPalette();
    palette.showModal();
    pInput?.focus();
  };
  const closePalette = () => palette?.open && palette.close();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.append(ta);
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      ta.remove();
      return ok;
    }
  };

  const runCommand = (el: HTMLElement) => {
    const go = el.dataset.go;
    const caseId = el.dataset.caseOpen;
    if (go) {
      closePalette();
      window.setTimeout(() => scrollToEl(q(go)), 60);
    } else if (caseId) {
      closePalette();
      window.setTimeout(() => openCase(caseId), 60);
    } else if (el.dataset.copy) {
      copy(el.dataset.copy).then((ok) => {
        const label = el.querySelector('span:nth-child(2)');
        if (label) label.textContent = ok ? 'Copied to clipboard ✓' : 'Copy failed';
        window.setTimeout(closePalette, 700);
      });
    } else if (el.dataset.href) {
      closePalette();
      window.open(el.dataset.href, '_blank', 'noopener');
    } else if (el.hasAttribute('data-theme-cmd')) {
      toggleTheme();
      closePalette();
    }
  };

  if (palette) {
    on(palette, 'close', () => {
      unlockScroll();
      lastTrigger?.focus?.({ preventScroll: true });
      // restore the copy label for next time
      const c = q('[data-copy][data-cmd] span:nth-child(2)', palette);
      if (c) c.textContent = 'Copy email address';
    });
    on(palette, 'click', (e) => {
      if (e.target === palette) closePalette();
    });
    on(pInput!, 'input', filterPalette);
    on(palette, 'keydown', (e) => {
      const k = e as KeyboardEvent;
      if (k.key === 'ArrowDown') {
        k.preventDefault();
        setActive(pActive + 1);
      } else if (k.key === 'ArrowUp') {
        k.preventDefault();
        setActive(pActive - 1);
      } else if (k.key === 'Enter') {
        const el = visibleItems()[pActive];
        if (el) {
          k.preventDefault();
          runCommand(el);
        }
      }
    });
    pItems.forEach((el) => {
      el.addEventListener('click', () => runCommand(el));
      el.addEventListener('pointermove', () => {
        const i = visibleItems().indexOf(el);
        if (i !== -1 && i !== pActive) setActive(i);
      });
    });
  }

  on(document, 'keydown', (e) => {
    const k = e as KeyboardEvent;
    const t = k.target as HTMLElement | null;
    const typing = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
    if ((k.metaKey || k.ctrlKey) && k.key.toLowerCase() === 'k') {
      k.preventDefault();
      palette?.open ? closePalette() : openPalette();
    } else if (k.key === '/' && !typing && !k.metaKey && !k.ctrlKey && !k.altKey) {
      k.preventDefault();
      openPalette();
    }
  });

  /* --------------------------------------------------- mobile menu */
  const menu = q('[data-menu]');
  const menuBtn = q('[data-menu-btn]');
  const setMenu = (open: boolean) => {
    if (!menu || !menuBtn) return;
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  on(window, 'resize', () => wide() && setMenu(false), { passive: true });
  on(document, 'keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Escape' && menu && !menu.hidden) setMenu(false);
  });

  /* ------------------------------------------------- delegated clicks */
  on(document, 'click', (e) => {
    const target = e.target as Element;
    const el = (sel: string) => target.closest<HTMLElement>(sel);

    const c = el('[data-case]');
    if (c) return openCase(c.dataset.case!, c);

    const go = el('[data-case-go]');
    if (go) {
      const from = lastTrigger;
      return openCase(go.dataset.caseGo!, from);
    }

    const close = el('[data-close]');
    if (close) {
      const dlg = close.closest('dialog');
      if (dlg) closeCase(dlg as HTMLDialogElement);
      return;
    }

    if (el('[data-open-palette]')) return openPalette();
    if (el('[data-theme-toggle]')) return toggleTheme();
    if (el('[data-menu-btn]')) return setMenu(!!menu?.hidden);

    const filter = el('[data-filter]');
    if (filter) return applyFilter(filter);

    const tab = el('[role="tab"]');
    if (tab) return selectTab(tab);

    const cp = el('[data-copy]');
    if (cp && !cp.hasAttribute('data-cmd')) {
      const label = cp.querySelector<HTMLElement>('[data-copy-label]');
      const before = label?.textContent ?? '';
      copy(cp.dataset.copy!).then((ok) => {
        if (label) {
          label.textContent = ok ? 'Copied ✓' : 'Press Ctrl+C';
          window.setTimeout(() => (label.textContent = before), 2000);
        }
      });
      return;
    }

    const a = el('a[href^="#"]') as HTMLAnchorElement | null;
    if (a && !a.closest('dialog')) {
      const id = a.getAttribute('href')!.slice(1);
      const dest = id ? document.getElementById(id) : null;
      if (dest) {
        e.preventDefault();
        setMenu(false);
        scrollToEl(dest);
        try {
          history.replaceState(null, '', `#${id}`);
        } catch {
          /* sandboxed frame */
        }
      }
    }
  });

  /* ----------------------------------------------------------- filters */
  function applyFilter(btn: HTMLElement) {
    const group = btn.closest('[data-filter-group]');
    if (!group) return;
    const key = btn.dataset.filter!;
    qa('[data-filter]', group).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const list = group.parentElement ? qa<HTMLElement>('li[data-kinds]', group.parentElement) : [];
    let n = 0;
    list.forEach((li) => {
      const kinds = (li.dataset.kinds ?? '').split(' ');
      const show = key === 'all' || (kinds.includes(key) && !kinds.includes('all-only'));
      li.hidden = !show;
      if (show) {
        li.dataset.in = '';
        if (!reduced) {
          li.animate(
            [
              { opacity: 0, transform: 'translateY(14px)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 600, delay: n * 45, easing: EXPO, fill: 'backwards' },
          );
        }
        n++;
      }
    });
  }

  /* -------------------------------------------------------------- tabs */
  function selectTab(tab: HTMLElement, focus = false) {
    const list = tab.closest('[role="tablist"]');
    const root = tab.closest('[data-tabs]');
    if (!list || !root) return;
    qa('[role="tab"]', list).forEach((t) => {
      const sel = t === tab;
      t.setAttribute('aria-selected', String(sel));
      t.tabIndex = sel ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !sel;
    });
    if (focus) tab.focus();
  }
  on(document, 'keydown', (e) => {
    const k = e as KeyboardEvent;
    const tab = (k.target as Element | null)?.closest?.('[role="tab"]') as HTMLElement | null;
    if (!tab) return;
    const tabs = qa('[role="tab"]', tab.closest('[role="tablist"]')!);
    const i = tabs.indexOf(tab);
    const next = k.key === 'ArrowRight' ? i + 1 : k.key === 'ArrowLeft' ? i - 1 : k.key === 'Home' ? 0 : k.key === 'End' ? tabs.length - 1 : -1;
    if (next === -1) return;
    k.preventDefault();
    selectTab(tabs[(next + tabs.length) % tabs.length], true);
  });

  /* -------------------------------------------------------- smooth-scroll loop */
  if (lenis) {
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    cleanups.push(() => cancelAnimationFrame(raf));
  }

  // Programmatic hash on load (e.g. /#projects) gets the same smooth offset
  if (location.hash.length > 1) {
    const dest = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (dest) window.setTimeout(() => scrollToEl(dest), 250);
  }

  return () => cleanups.forEach((fn) => fn());
}
