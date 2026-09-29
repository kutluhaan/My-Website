/**
 * Hero backdrop: a slow constellation of nodes that link up when close and
 * reach toward the pointer. Canvas 2D, DPR-capped, paused off-screen and while
 * the tab is hidden. With reduced motion it draws one still frame.
 */
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const BUCKETS = 6;

const rgb = (name: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = (v || fallback).split(/\s+/).slice(0, 3).join(',');
  return parts;
};

export function startNetwork(canvas: HTMLCanvasElement, opts: { reduced: boolean }) {
  const ctx = canvas.getContext('2d');
  const host = canvas.parentElement;
  if (!ctx || !host) return () => {};

  let w = 0;
  let h = 0;
  let dpr = 1;
  let nodes: Node[] = [];
  let visible = true;
  let raf = 0;
  let last = 0;
  const pointer = { x: -9999, y: -9999, on: false };
  let fg = '230,232,236';
  let accent = '245,176,52';
  let steel = '122,138,160';

  const readColors = () => {
    fg = rgb('--fg', '230 232 236');
    accent = rgb('--accent', '245 176 52');
    steel = rgb('--steel', '122 138 160');
  };

  const seed = () => {
    const count = Math.round(Math.min(96, Math.max(28, (w * h) / 15000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.1 + 0.5,
    }));
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    draw(0);
  };

  const LINK = 130;
  const REACH = 190;

  function draw(dt: number) {
    ctx!.clearRect(0, 0, w, h);
    const step = Math.min(dt, 48) / 16.67;

    for (const n of nodes) {
      if (!opts.reduced) {
        n.x += n.vx * step;
        n.y += n.vy * step;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
        if (pointer.on) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / 140) * 0.9 * step;
            const d = Math.sqrt(d2);
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }
      }
    }

    // node-to-node links, batched into alpha buckets (few stroke() calls)
    const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        if (dx > LINK || dx < -LINK) continue;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK * LINK) continue;
        const k = Math.min(BUCKETS - 1, Math.floor((1 - Math.sqrt(d2) / LINK) * BUCKETS));
        paths[k].moveTo(a.x, a.y);
        paths[k].lineTo(b.x, b.y);
      }
    }
    ctx!.lineWidth = 1;
    for (let k = 0; k < BUCKETS; k++) {
      ctx!.strokeStyle = `rgba(${steel},${(0.05 + (k / BUCKETS) * 0.3).toFixed(3)})`;
      ctx!.stroke(paths[k]);
    }

    // pointer links (accent)
    if (pointer.on) {
      for (const n of nodes) {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < REACH) {
          ctx!.strokeStyle = `rgba(${accent},${((1 - d / REACH) * 0.55).toFixed(3)})`;
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.stroke();
        }
      }
    }

    ctx!.fillStyle = `rgba(${fg},0.5)`;
    for (const n of nodes) {
      ctx!.fillRect(n.x - n.r / 2, n.y - n.r / 2, n.r * 1.4, n.r * 1.4);
    }
  }

  const frame = (t: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    draw(last ? t - last : 16.67);
    last = t;
    raf = requestAnimationFrame(frame);
  };
  const run = () => {
    if (opts.reduced || raf || !visible || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    pointer.on = true;
  };
  const onLeave = () => {
    pointer.on = false;
  };

  readColors();
  resize();
  const ro = new ResizeObserver(() => {
    const rect = host.getBoundingClientRect();
    if (Math.abs(rect.width - w) > 1 || Math.abs(rect.height - h) > 1) resize();
  });
  ro.observe(host);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) run();
  });
  io.observe(canvas);
  const mo = new MutationObserver(() => {
    readColors();
    if (opts.reduced) draw(0);
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const onVis = () => (document.hidden ? undefined : run());
  document.addEventListener('visibilitychange', onVis);
  host.addEventListener('pointermove', onMove, { passive: true });
  host.addEventListener('pointerleave', onLeave);
  run();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    mo.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    host.removeEventListener('pointermove', onMove);
    host.removeEventListener('pointerleave', onLeave);
  };
}
