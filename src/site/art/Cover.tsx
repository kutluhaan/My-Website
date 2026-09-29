import type { ReactNode } from 'react';
import type { CoverKind } from '@/content/covers';
import { cn } from '@/lib/utils';
import { BekoCover, BurotimeCover, CloudCover, CommerceCover, SageCover, TradingCover } from './covers-a';
import {
  AttentionCover,
  BankingCover,
  BioCover,
  DsaCover,
  ExpenseCover,
  OpenSourceCover,
  OthersCover,
  SirCover,
  TurkeyCover,
  VideoCover,
} from './covers-b';
import { BerlinScene, CampusScene, IstanbulScene } from './places';

const art: Record<CoverKind, () => ReactNode> = {
  trading: TradingCover,
  cloud: CloudCover,
  commerce: CommerceCover,
  beko: BekoCover,
  burotime: BurotimeCover,
  sage: SageCover,
  video: VideoCover,
  banking: BankingCover,
  dsa: DsaCover,
  expense: ExpenseCover,
  sir: SirCover,
  turkey: TurkeyCover,
  attention: AttentionCover,
  bio: BioCover,
  others: OthersCover,
  opensource: OpenSourceCover,
  istanbul: IstanbulScene,
  berlin: BerlinScene,
  campus: CampusScene,
};

/** The bare illustration (fills its parent). */
export function CoverArt({ kind }: { kind: CoverKind }) {
  const Art = art[kind];
  return <Art />;
}

/**
 * A framed illustration. Animations inside only run while it is on screen
 * (PageEffects toggles data-active on [data-live]). `tilt` adds the pointer tilt.
 */
export function Cover({
  kind,
  className,
  tilt = false,
  ratio = 'aspect-[10/7]',
}: {
  kind: CoverKind;
  className?: string;
  tilt?: boolean;
  ratio?: string;
}) {
  const Art = art[kind];
  return (
    <div className={cn(tilt && 'tilt', className)} data-tilt={tilt ? '' : undefined}>
      <div
        data-live
        className={cn('relative overflow-hidden rounded-[1.5rem] border border-fg/[0.08] bg-surface', ratio)}
        style={{ boxShadow: 'var(--shadow-2)' }}
      >
        <Art />
      </div>
    </div>
  );
}
