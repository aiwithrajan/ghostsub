'use client';

import React from 'react';
import { Skull, TrendingUp, Users, ArrowDownRight, ShieldAlert, Sparkles, ChevronRight, Lock } from 'lucide-react';
import { DetectedSubscription } from '@/types';

interface LinearHeroProps {
  subscriptions: DetectedSubscription[];
  friendSavingsAnnual: number;
  onReviewClick: () => void;
}

export const LinearHero: React.FC<LinearHeroProps> = ({
  subscriptions,
  friendSavingsAnnual,
  onReviewClick,
}) => {
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const monthlyDrain = activeSubs.reduce((sum, s) => sum + s.currentAmount, 0);
  const annualDrain = activeSubs.reduce((sum, s) => sum + s.annualImpact, 0);

  const zombies = activeSubs.filter(s => s.zombieStatus.isZombie);
  const priceCreeps = activeSubs.filter(s => s.priceCreep.detected);

  return (
    <div className="pt-6 pb-6">
      {/* Linear 2-Column Split Hero (matching Image 2 from linear.app) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Headline & Live Metric Chips */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#8A8F98]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
            <span>FINANCIAL DEFENSE PROTOCOL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-white leading-[1.08] font-sans">
            Sovereign intelligence.<br />
            <span className="text-[#8A8F98]">Zero unnotified charges.</span>
          </h1>

          {/* 4 Compact Linear Metric Cards in a single clean row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="p-2.5 rounded-lg bg-[#0E1013] border border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase text-[#8A8F98] block">Monthly Drain</span>
              <span className="text-base font-bold font-mono text-white tabular-nums">${monthlyDrain.toFixed(2)}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0E1013] border border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase text-amber-400 block">Zombies</span>
              <span className="text-base font-bold font-mono text-white tabular-nums">{zombies.length} Flagged</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0E1013] border border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase text-rose-400 block">Price Creep</span>
              <span className="text-base font-bold font-mono text-white tabular-nums">{priceCreeps.length} Hikes</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0E1013] border border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block">Friend Synergy</span>
              <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">+${friendSavingsAnnual}/yr</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Description & Direct Action Link */}
        <div className="lg:col-span-5 space-y-4 lg:pt-5">
          <p className="text-[13px] sm:text-[14px] text-[#8A8F98] leading-relaxed">
            GhostSub deploys TabPFN Bayesian priors to spot dormant zombie charges and silent rate hikes in-memory, then arms you with Gemma-2 FTC Click-to-Cancel demand notices with zero token tracking.
          </p>

          <div className="pt-1 flex items-center gap-4 text-xs font-mono">
            <button
              onClick={onReviewClick}
              className="text-white hover:text-[#8B7CFF] flex items-center gap-1 font-sans font-medium text-[13px] cursor-pointer transition-colors"
            >
              <span>Review {activeSubs.length} active vampires</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
            <span className="text-[#525660]">•</span>
            <span className="text-[#8A8F98]">100% In-Memory</span>
          </div>
        </div>

      </div>
    </div>
  );
};
