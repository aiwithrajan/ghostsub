'use client';

import React from 'react';
import { Skull, TrendingUp, Users, ArrowDownRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { DetectedSubscription } from '@/types';
import { Button } from '@/components/ui/Button';

interface HeroInsightStripProps {
  subscriptions: DetectedSubscription[];
  friendSavingsAnnual: number;
  onReviewClick: () => void;
}

export const HeroInsightStrip: React.FC<HeroInsightStripProps> = ({
  subscriptions,
  friendSavingsAnnual,
  onReviewClick,
}) => {
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const monthlyDrain = activeSubs.reduce((sum, s) => sum + s.currentAmount, 0);
  const annualDrain = activeSubs.reduce((sum, s) => sum + s.annualImpact, 0);

  const zombies = activeSubs.filter(s => s.zombieStatus.isZombie);
  const priceCreeps = activeSubs.filter(s => s.priceCreep.detected);

  // Find most prominent price creep formatted in Origin style: "$1 to $38.99/mo"
  const topCreep = priceCreeps.sort((a, b) => b.priceCreep.diff - a.priceCreep.diff)[0];
  const creepFormat = topCreep
    ? `$${topCreep.initialAmount.toFixed(0)} to $${topCreep.currentAmount.toFixed(2)}/mo`
    : 'None detected';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-8">
      {/* Lead Insight Card (Origin style - 7 cols) */}
      <div className="lg:col-span-7 p-6 rounded-xl bg-[#0F1013] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
        {/* Soft Radial Glow behind the hero number (Allowed Glow #1) */}
        <div
          className="absolute -top-12 -left-12 w-64 h-64 pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 124, 255, 0.12) 0%, transparent 70%)',
          }}
        />

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E929B] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
              VAMPIRE DRAIN AUDIT
            </span>
            <span className="text-[11px] font-mono text-[#8E929B]">
              TabPFN In-Memory Analysis
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F4F6]">
            We found {activeSubs.length} vampires costing you ${annualDrain.toLocaleString()}/year
          </h2>

          <p className="text-[13px] text-[#8E929B] mt-1.5 max-w-xl leading-relaxed">
            Recurring auto-debits unmasked from your statements, including silent contract locks and multi-step cancellation traps.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-[#F4F4F6] tabular-nums tracking-tight">
              ${monthlyDrain.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-[#8E929B]">/ month active drain</span>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<ArrowDownRight className="w-3.5 h-3.5" />}
            onClick={onReviewClick}
          >
            Review &amp; cancel
          </Button>
        </div>
      </div>

      {/* 3 Compact Stat Cards (Origin style - 5 cols stacked) */}
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
        {/* Stat 1: Zombie Resurrections */}
        <div className="p-4 rounded-xl bg-[#0F1013] border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E929B] block">
              Zombie Resurrections
            </span>
            <div className="text-base font-bold font-mono text-[#F4F4F6] mt-0.5">
              {zombies.length > 0 ? `${zombies.length} flagged (${zombies[0].merchantName.split(' ')[0]})` : 'None found'}
            </div>
            <span className="text-[11px] text-[#8E929B] block mt-0.5">
              {zombies.length > 0 ? 'Dormant charge resurfaced' : 'Zero unannounced debits'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Skull className="w-4 h-4" />
          </div>
        </div>

        {/* Stat 2: Silent Price Hikes (Origin style: "$1 to $38.99/mo") */}
        <div className="p-4 rounded-xl bg-[#0F1013] border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E929B] block">
              Silent Price Hikes
            </span>
            <div className="text-base font-bold font-mono text-[#F4F4F6] mt-0.5">
              {creepFormat}
            </div>
            <span className="text-[11px] text-[#8E929B] block mt-0.5">
              {priceCreeps.length} services raised rates
            </span>
          </div>
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {/* Stat 3: Friend-Split Savings */}
        <div className="p-4 rounded-xl bg-[#0F1013] border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E929B] block">
              Friend-Split Protocol
            </span>
            <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
              +${friendSavingsAnnual}/year
            </div>
            <span className="text-[11px] text-[#8E929B] block mt-0.5">
              Merge Spotify &amp; Disney+ with Kevin
            </span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
