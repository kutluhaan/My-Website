import type { ReactNode } from 'react';
import type { CoverKind } from '@/content/covers';
import { Figure } from './hud';
import { Beko, Burotime, Cloud, Commerce, Sage, Trading, Video } from './figs-a';
import {
  Attention,
  Banking,
  Berlin,
  Bio,
  Campus,
  Dsa,
  Expense,
  Istanbul,
  OpenSource,
  Others,
  Sir,
  Turkey,
} from './figs-b';

const registry: Record<CoverKind, { no: string; title: string; Art: () => ReactNode }> = {
  trading: { no: '01', title: 'LIVE TRADING', Art: Trading },
  cloud: { no: '02', title: 'AUTOSCALING', Art: Cloud },
  commerce: { no: '03', title: 'EVENT-DRIVEN COMMERCE', Art: Commerce },
  beko: { no: '04', title: 'AGENT TOOL ROUTING', Art: Beko },
  burotime: { no: '05', title: 'ORCHESTRATION', Art: Burotime },
  sage: { no: '06', title: 'VOICE AGENT', Art: Sage },
  video: { no: '07', title: 'TEXT TO VIDEO', Art: Video },
  banking: { no: '08', title: 'LEDGER LOCKING', Art: Banking },
  dsa: { no: '09', title: 'DATA STRUCTURES', Art: Dsa },
  expense: { no: '10', title: 'MOBILE + API', Art: Expense },
  sir: { no: '11', title: 'NETWORK SCIENCE', Art: Sir },
  turkey: { no: '12', title: 'DATA DASHBOARD', Art: Turkey },
  attention: { no: '13', title: 'MIXED REALITY', Art: Attention },
  bio: { no: '14', title: 'BIOSENSORS', Art: Bio },
  others: { no: '15', title: 'EXPERIMENTS', Art: Others },
  opensource: { no: '16', title: 'UPSTREAM', Art: OpenSource },
  istanbul: { no: 'L1', title: 'ISTANBUL', Art: Istanbul },
  berlin: { no: 'L2', title: 'BERLIN', Art: Berlin },
  campus: { no: 'L3', title: 'CAMPUS', Art: Campus },
};

/** A framed HUD figure for a piece of content. */
export function Cover({ kind, className, ratio }: { kind: CoverKind; className?: string; ratio?: string }) {
  const { no, title, Art } = registry[kind];
  return (
    <Figure no={no} title={title} className={className} ratio={ratio}>
      <Art />
    </Figure>
  );
}
