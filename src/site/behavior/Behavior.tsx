'use client';

import { useEffect } from 'react';

/** Mounts the vanilla interaction layer after hydration (code-split, so it never blocks first paint). */
export function Behavior() {
  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    import('./index').then((m) => {
      if (!cancelled) stop = m.init();
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);
  return null;
}
