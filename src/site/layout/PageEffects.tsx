'use client';

import { useEffect } from 'react';
import { initEffects } from '@/site/effects/effects';

/**
 * Mounts the shared page effects (reveal, live illustrations, scroll progress,
 * timelines, pointer parallax / tilt) and renders the progress bar.
 * Without JS the .js class is never added, so content is simply visible.
 */
export function PageEffects() {
  useEffect(() => initEffects(), []);

  return (
    <div aria-hidden className="no-print pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div data-progress className="h-full origin-left scale-x-0 rounded-r-full bg-accent" />
    </div>
  );
}
