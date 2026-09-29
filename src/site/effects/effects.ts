/**
 * Framework-free page effects, shared by the Next app (PageEffects) and the
 * standalone preview build. Everything is opt-in through data attributes:
 *   [data-reveal]     fades/slides in once when scrolled into view
 *   [data-live]       gets data-active while on screen (pauses SVG animation off-screen)
 *   [data-progress]   scroll progress bar (scaleX)
 *   [data-timeline]   sets --tl (0..1) as the section scrolls past
 *   [data-parallax]   pointer parallax: sets --px / --py (-1..1) for .px children
 *   [data-tilt]       pointer tilt: sets --rx / --ry
 *   .spotlight        cursor-follow highlight (--mx / --my)
 */
export function initEffects(): () => void {
  const cleanups: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(
    target: Window | Document | HTMLElement,
    type: K | string,
    fn: (e: any) => void,
    opts?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, fn as EventListener, opts);
    cleanups.push(() => target.removeEventListener(type, fn as EventListener, opts));
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  /* reveal + live ------------------------------------------------------- */
  const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  const lives = Array.from(document.querySelectorAll<HTMLElement>('[data-live]'));
  if ('IntersectionObserver' in window) {
    const ioReveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-in', '');
            ioReveal.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
    );
    reveals.forEach((el) => ioReveal.observe(el));
    const ioLive = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.setAttribute('data-active', '');
          else entry.target.removeAttribute('data-active');
        });
      },
      { rootMargin: '80px 0px' },
    );
    lives.forEach((el) => ioLive.observe(el));
    cleanups.push(() => {
      ioReveal.disconnect();
      ioLive.disconnect();
    });
  } else {
    reveals.forEach((el) => el.setAttribute('data-in', ''));
    lives.forEach((el) => el.setAttribute('data-active', ''));
  }

  /* scroll: progress bar + timelines ------------------------------------ */
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  const timelines = Array.from(document.querySelectorAll<HTMLElement>('[data-timeline]'));
  let raf = 0;
  const update = () => {
    raf = 0;
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    }
    const mid = window.innerHeight * 0.6;
    timelines.forEach((el) => {
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (mid - r.top) / Math.max(1, r.height)));
      el.style.setProperty('--tl', p.toFixed(3));
    });
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  on(window, 'scroll', schedule, { passive: true });
  on(window, 'resize', schedule);
  update();
  cleanups.push(() => raf && cancelAnimationFrame(raf));

  /* pointer effects ------------------------------------------------------ */
  if (fine && !reduce) {
    document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((box) => {
      on(box, 'pointermove', (e: PointerEvent) => {
        const r = box.getBoundingClientRect();
        box.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        box.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
      on(box, 'pointerleave', () => {
        box.style.setProperty('--px', '0');
        box.style.setProperty('--py', '0');
      });
    });
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      on(el, 'pointermove', (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-y * 9).toFixed(2)}deg`);
      });
      on(el, 'pointerleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });
  }
  if (fine) {
    on(document, 'pointermove', (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.('.spotlight') as HTMLElement | null;
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty('--mx', `${e.clientX - r.left}px`);
      t.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
