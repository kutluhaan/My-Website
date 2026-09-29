import Lenis from 'lenis';
import { startNetwork } from './network';

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
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
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

  /* --------------------------------------------------------- split words */
  const splitWords = (el: HTMLElement, mode: 'mask' | 'scrub') => {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    let index = 0;
    const walk = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent ?? '';
          if (!text.trim()) return;
          const frag = document.createDocumentFragment();
          text.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.append(document.createTextNode(' '));
              return;
            }
            const i = index++;
            if (mode === 'mask') {
              const wrap = document.createElement('span');
              wrap.className = 'sw-w';
              const inner = document.createElement('span');
              inner.className = 'sw-i';
              inner.style.setProperty('--i', String(i));
              inner.textContent = part;
              wrap.append(inner);
              frag.append(wrap);
            } else {
              const s = document.createElement('span');
              s.className = 'sw-s';
              s.style.setProperty('--i', String(i));
              s.textContent = part;
              frag.append(s);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(el);
    if (mode === 'scrub') el.style.setProperty('--n', String(index));
  };
  qa('[data-split]').forEach((el) => splitWords(el, 'mask'));
  const scrubs = qa('[data-scrub]');
  scrubs.forEach((el) => splitWords(el, 'scrub'));

  /* ------------------------------------------------------------- reveals */
  if ('IntersectionObserver' in window) {
    // A clip-path'd element (wipe) reports as not intersecting, so those are watched through their parent
    const watch = new Map<Element, HTMLElement[]>();
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          watch.get(e.target)?.forEach((el) => (el.dataset.in = ''));
          revealIO.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    qa('[data-reveal], [data-split]').forEach((el) => {
      const host = el.dataset.reveal === 'wipe' && el.parentElement ? el.parentElement : el;
      watch.set(host, [...(watch.get(host) ?? []), el]);
      revealIO.observe(host);
    });
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
    qa('[data-reveal], [data-split]').forEach((el) => ((el as HTMLElement).dataset.in = ''));
    qa('[data-live]').forEach((el) => el.setAttribute('data-active', ''));
  }

  /* -------------------------------------------------------- scroll driven */
  const header = q('[data-header]');
  const bar = q('[data-progress]');
  const scene = q('[data-scene]');
  const timelines = qa('[data-timeline]');
  // Measuring inside a content-visibility:auto section forces its layout, so only touch nearby sections
  const nearby = (el: Element, vh: number) => {
    const r = (el.closest('section') ?? el).getBoundingClientRect();
    return r.bottom > -vh && r.top < vh * 2;
  };
  const parallax = qa('[data-parallax-y]');
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
      const max = Math.max(1, document.documentElement.scrollHeight - vh);

      header?.toggleAttribute('data-solid', y > 24);
      if (bar) bar.style.transform = `scaleX(${clamp(y / max)})`;

      if (scene && !reduced) {
        scene.style.setProperty('--sp', clamp(y / (scene.offsetHeight * 0.95)).toFixed(4));
      }
      parallax.forEach((el) => {
        if (!reduced) el.style.transform = `translate3d(0, ${(-clamp(y / vh) * 70).toFixed(1)}px, 0)`;
      });

      timelines.forEach((el) => {
        if (!nearby(el, vh)) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--tl', clamp((vh * 0.62 - r.top) / r.height).toFixed(4));
      });

      scrubs.forEach((el) => {
        if (!nearby(el, vh)) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const p = clamp((vh * 0.88 - r.top) / (vh * 0.88 - vh * 0.42 + r.height));
        el.style.setProperty('--p', p.toFixed(4));
      });

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

  /* --------------------------------------------------------------- clock */
  const clock = q('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const tick = () => {
      if (!document.hidden) clock.textContent = fmt.format(new Date());
    };
    tick();
    const id = window.setInterval(tick, 1000);
    cleanups.push(() => clearInterval(id));
  }

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
    hidePreview();
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

  /* ------------------------------------------------------- work preview */
  const preview = q('[data-preview]');
  const slot = q('[data-preview-slot]');
  const items = new Map<string, HTMLElement>();
  const pv = { x: 0, y: 0, tx: 0, ty: 0, rot: 0, on: false };
  const usePreview = finePointer && !!preview && !!slot;

  function hidePreview() {
    pv.on = false;
    preview?.classList.remove('on');
  }
  const showPreview = (id: string) => {
    if (!usePreview || !wide()) return;
    let item = items.get(id);
    if (!item) {
      const src = q(`#case-${CSS.escape(id)} [data-cover]`);
      if (!src) return;
      item = document.createElement('div');
      item.className = 'preview-item';
      const clone = src.cloneNode(true) as HTMLElement;
      clone.removeAttribute('data-cover');
      clone.className = 'w-full';
      qa('[data-live]', clone).forEach((el) => el.setAttribute('data-active', ''));
      item.append(clone);
      slot!.append(item);
      items.set(id, item);
    }
    items.forEach((el, key) => el.classList.toggle('on', key === id));
    pv.on = true;
    preview!.classList.add('on');
  };

  if (usePreview) {
    qa('[data-case]').forEach((row) => {
      const id = row.dataset.case!;
      row.addEventListener('pointerenter', () => showPreview(id));
      row.addEventListener('pointerleave', hidePreview);
      row.addEventListener('focus', () => showPreview(id));
      row.addEventListener('blur', hidePreview);
    });
    on(document, 'pointermove', (e) => {
      const p = e as PointerEvent;
      pv.tx = p.clientX;
      pv.ty = p.clientY;
    });
  }

  /* -------------------------------------------------------------- cursor */
  const dot = q('[data-cur-dot]');
  const ring = q('[data-cur-ring]');
  const ringLabel = ring?.querySelector('span') ?? null;
  const cur = { x: -100, y: -100, rx: -100, ry: -100, seen: false };

  if (finePointer && dot && ring) {
    on(document, 'pointermove', (e) => {
      const p = e as PointerEvent;
      cur.x = p.clientX;
      cur.y = p.clientY;
      if (!cur.seen) {
        cur.seen = true;
        cur.rx = cur.x;
        cur.ry = cur.y;
        dot.classList.add('on');
        ring.classList.add('on');
      }
      const t = (p.target as Element | null)?.closest?.('a, button, summary, input, [data-cursor], [role="option"]') as HTMLElement | null;
      const label = t?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '';
      ring.classList.toggle('hot', !!t);
      if (ringLabel && ringLabel.textContent !== label) ringLabel.textContent = label;
    });
    on(document.documentElement, 'pointerleave', () => {
      dot.classList.remove('on');
      ring.classList.remove('on');
      cur.seen = false;
    });
  }

  /* ------------------------------------------------ portrait scan spotlight */
  const scans = qa('[data-scan]').map((el) => ({ el, hover: false, vis: false, x: 0, y: 0, tx: 0, ty: 0, init: false }));
  if (scans.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const s = scans.find((k) => k.el === e.target);
        if (s) s.vis = e.isIntersecting;
      });
    });
    scans.forEach((s) => {
      io.observe(s.el);
      s.el.addEventListener('pointermove', (e) => {
        const r = s.el.getBoundingClientRect();
        s.hover = true;
        s.tx = (e as PointerEvent).clientX - r.left;
        s.ty = (e as PointerEvent).clientY - r.top;
      });
      s.el.addEventListener('pointerleave', () => {
        s.hover = false;
      });
    });
    cleanups.push(() => io.disconnect());
  }

  /* ---------------------------------------------------------- magnetic */
  if (finePointer && !reduced) {
    qa('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e as PointerEvent).clientX - (r.left + r.width / 2);
        const dy = (e as PointerEvent).clientY - (r.top + r.height / 2);
        el.style.transform = `translate3d(${(dx * 0.22).toFixed(1)}px, ${(dy * 0.32).toFixed(1)}px, 0)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------- nav text scramble */
  if (!reduced) {
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_-+';
    qa('[data-scramble]').forEach((el) => {
      const node = Array.from(el.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim());
      if (!node) return;
      const original = node.textContent ?? '';
      let timer = 0;
      const run = () => {
        clearInterval(timer);
        const letters = original.trim().length;
        let frame = 0;
        timer = window.setInterval(() => {
          frame++;
          let out = '';
          let seen = 0;
          for (const ch of original) {
            if (/\s/.test(ch)) out += ch;
            else out += seen++ < frame / 1.6 ? ch : glyphs[Math.floor(Math.random() * glyphs.length)];
          }
          node.textContent = out;
          if (frame / 1.6 >= letters) {
            clearInterval(timer);
            node.textContent = original;
          }
        }, 28);
      };
      el.addEventListener('pointerenter', run);
      cleanups.push(() => {
        clearInterval(timer);
        node.textContent = original;
      });
    });
  }

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
    hidePreview();
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

  /* ----------------------------------------------------- network canvas */
  const canvas = q<HTMLCanvasElement>('canvas[data-network]');
  if (canvas) cleanups.push(startNetwork(canvas, { reduced }));

  /* -------------------------------------------------------- master loop */
  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);

    if (cur.seen && ring && dot) {
      cur.rx += (cur.x - cur.rx) * (reduced ? 1 : 0.18);
      cur.ry += (cur.y - cur.ry) * (reduced ? 1 : 0.18);
      dot.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      ring.style.transform = `translate3d(${cur.rx}px, ${cur.ry}px, 0)`;
    }

    if (pv.on && preview) {
      const w = preview.offsetWidth || 400;
      const h = preview.offsetHeight || 280;
      const tx = Math.min(pv.tx + 36, window.innerWidth - w - 24);
      const ty = clamp(pv.ty - h / 2, 88, window.innerHeight - h - 24);
      if (!pv.x && !pv.y) {
        pv.x = tx;
        pv.y = ty;
      }
      const dx = tx - pv.x;
      pv.x += dx * 0.14;
      pv.y += (ty - pv.y) * 0.14;
      pv.rot += (clamp(dx * 0.05, -4, 4) - pv.rot) * 0.15;
      preview.style.transform = `translate3d(${pv.x.toFixed(1)}px, ${pv.y.toFixed(1)}px, 0) rotate(${pv.rot.toFixed(2)}deg)`;
    }

    if (scans.length && !reduced) {
      scans.forEach((s) => {
        if (!s.vis) return;
        const r = s.el.getBoundingClientRect();
        if (!s.hover) {
          const t = time / 1000;
          s.tx = r.width * (0.5 + 0.2 * Math.sin(t * 0.55));
          s.ty = r.height * (0.42 + 0.14 * Math.cos(t * 0.8));
        }
        if (!s.init) {
          s.x = s.tx;
          s.y = s.ty;
          s.init = true;
        }
        s.x += (s.tx - s.x) * (s.hover ? 0.22 : 0.08);
        s.y += (s.ty - s.y) * (s.hover ? 0.22 : 0.08);
        s.el.style.setProperty('--mx', `${s.x.toFixed(1)}px`);
        s.el.style.setProperty('--my', `${s.y.toFixed(1)}px`);
      });
    }

    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  cleanups.push(() => cancelAnimationFrame(raf));

  // Programmatic hash on load (e.g. /#projects) gets the same smooth offset
  if (location.hash.length > 1) {
    const dest = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (dest) window.setTimeout(() => scrollToEl(dest), 250);
  }

  return () => cleanups.forEach((fn) => fn());
}
