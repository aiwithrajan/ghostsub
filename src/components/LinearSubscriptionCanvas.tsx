'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Skull, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  ArrowUpDown,
  Filter,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { DetectedSubscription } from '@/types';
import { BrandIcon } from '@/components/BrandIcon';

interface LinearSubscriptionCanvasProps {
  subscriptions: DetectedSubscription[];
  onSelectSubscription: (sub: DetectedSubscription) => void;
  onOpenLegalNotice: (sub: DetectedSubscription) => void;
  onToggleStatus: (id: string, newStatus: DetectedSubscription['status']) => void;
}

export const LinearSubscriptionCanvas: React.FC<LinearSubscriptionCanvasProps> = ({
  subscriptions,
  onSelectSubscription,
  onOpenLegalNotice,
  onToggleStatus,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'extreme' | 'creeps' | 'zombies'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'drain' | 'name'>('score');

  const filteredSubs = subscriptions
    .filter(sub => {
      if (filterType === 'extreme') return sub.darkPattern.riskLevel === 'extreme';
      if (filterType === 'creeps') return sub.priceCreep.detected;
      if (filterType === 'zombies') return sub.zombieStatus.isZombie;
      return true;
    })
    .filter(sub => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        sub.merchantName.toLowerCase().includes(q) ||
        sub.rawDescriptor.toLowerCase().includes(q) ||
        sub.category.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'drain') return b.currentAmount - a.currentAmount;
      if (sortBy === 'score') return b.vampireScore - a.vampireScore;
      return a.merchantName.localeCompare(b.merchantName);
    });

  return (
    <div className="linear-window rounded-2xl p-6 space-y-6">
      
      {/* Canvas Top Bar: Filters, Search, Sort (Linear Work Item Control) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        {/* Filter Pills with Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all' as const, label: 'All', count: subscriptions.length },
            { id: 'extreme' as const, label: 'Critical Traps', count: subscriptions.filter(s => s.darkPattern.riskLevel === 'extreme').length },
            { id: 'creeps' as const, label: 'Price Creeps', count: subscriptions.filter(s => s.priceCreep.detected).length },
            { id: 'zombies' as const, label: 'Zombies', count: subscriptions.filter(s => s.zombieStatus.isZombie).length },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterType === f.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#8A8F98] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{f.label}</span>
              <span className={`text-[10px] font-mono ${filterType === f.id ? 'text-black/60' : 'text-[#525660]'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#525660]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search subscriptions..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-[12px] bg-[#0E1013] border border-white/[0.08] text-white placeholder-[#525660] focus:outline-none focus:border-white/[0.2] transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-[#8A8F98] bg-[#0E1013] border border-white/[0.08] px-2.5 py-1.5 rounded-lg shrink-0">
            <ArrowUpDown className="w-3 h-3 text-[#525660]" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-white text-[11px] focus:outline-none cursor-pointer"
            >
              <option value="score" className="bg-[#0E1013]">Vampire Severity</option>
              <option value="drain" className="bg-[#0E1013]">Monthly Cost</option>
              <option value="name" className="bg-[#0E1013]">Merchant Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscription List in Linear Work Item Cards (matching Image 2) */}
      {filteredSubs.length === 0 ? (
        <div className="p-16 text-center rounded-xl bg-[#0E1013] border border-white/[0.06] text-[#8A8F98]">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-white">No subscriptions matched</h3>
          <p className="text-xs text-[#525660] mt-1">Try resetting the search query or active filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSubs.map((sub, index) => {
            const isCancelled = sub.status === 'cancelled';
            const issueId = `GHOST-0${index + 1}`;

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubscription(sub)}
                className={`linear-card rounded-xl p-5 cursor-pointer relative overflow-hidden group ${
                  isCancelled ? 'opacity-40' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Brand Icon & Core Metadata */}
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <BrandIcon name={sub.merchantName} className="w-11 h-11" />

                    <div className="min-w-0 flex-1 space-y-1.5">
                      {/* Issue ID, Title, Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono text-[#525660] font-medium">
                          {issueId}
                        </span>
                        <h3 className="text-[15px] font-bold text-white tracking-tight group-hover:text-[#8B7CFF] transition-colors">
                          {sub.merchantName}
                        </h3>
                        
                        {sub.zombieStatus.isZombie && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            <Skull className="w-3 h-3" />
                            <span>Zombie ({sub.zombieStatus.monthsDormant}mo gap)</span>
                          </span>
                        )}

                        {sub.priceCreep.detected && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-rose-500/10 text-rose-300 border border-rose-500/30">
                            <TrendingUp className="w-3 h-3" />
                            <span>Price Creep: ${sub.initialAmount.toFixed(0)} → ${sub.currentAmount.toFixed(0)}</span>
                          </span>
                        )}

                        <span className="text-[10px] font-mono text-[#8A8F98] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                          {sub.category}
                        </span>
                      </div>

                      {/* Bank Descriptor */}
                      <p className="text-[11px] font-mono text-[#525660] truncate">
                        Descriptor: {sub.rawDescriptor}
                      </p>

                      {/* Dark Pattern Alert Box */}
                      <div className="p-2.5 rounded-lg bg-[#08090B] border border-white/[0.06] text-[12px] text-[#8A8F98] flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed text-[#D0D4DC]">{sub.darkPattern.cancellationTrapSummary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle / Right: Vampire Meter & Pricing & Buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-6 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                    
                    {/* Vampire Severity Slider Meter */}
                    <div className="w-32 shrink-0">
                      <div className="flex justify-between text-[10px] font-mono text-[#8A8F98] mb-1">
                        <span>VAMPIRE DRAIN</span>
                        <span className="text-white font-bold">{sub.vampireScore}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-[#8B7CFF]"
                          style={{ width: `${sub.vampireScore}%` }}
                        />
                      </div>
                      <div className="text-[9px] font-mono text-[#525660] mt-1 text-right">
                        TabPFN {(sub.confidenceScore * 100).toFixed(0)}% confidence
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold font-mono text-white tabular-nums tracking-tight">
                        ${sub.currentAmount.toFixed(2)}
                        <span className="text-xs font-normal text-[#8A8F98] ml-1">/mo</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#8A8F98] block">
                        ${sub.annualImpact}/yr
                      </span>
                    </div>

                    {/* Linear Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {isCancelled ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStatus(sub.id, 'active');
                          }}
                          className="px-3 py-1.5 rounded-full text-[11px] font-medium text-[#8A8F98] hover:text-white bg-white/[0.04] border border-white/[0.08] cursor-pointer transition-all"
                        >
                          Reactivate
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleStatus(sub.id, 'cancelled');
                            }}
                            className="px-3 py-1.5 rounded-full text-[11px] font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer transition-all"
                          >
                            Mark Cancelled
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLegalNotice(sub);
                            }}
                            className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white bg-[#8B7CFF] hover:bg-[#7A69FA] shadow-[0_0_14px_rgba(139,124,255,0.35)] cursor-pointer transition-all flex items-center gap-1.5"
                          >
                            <ShieldAlert className="w-3 h-3" />
                            <span>FTC Armor</span>
                          </button>
                        </>
                      )}

                      <ChevronRight className="w-4 h-4 text-[#525660] group-hover:text-white transition-colors ml-1" />
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
