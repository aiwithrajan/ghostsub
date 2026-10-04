'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Skull, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  ArrowUpDown,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { DetectedSubscription } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface SubscriptionListProps {
  subscriptions: DetectedSubscription[];
  onSelectSubscription: (sub: DetectedSubscription) => void;
  onOpenLegalNotice: (sub: DetectedSubscription) => void;
  onToggleStatus: (id: string, newStatus: DetectedSubscription['status']) => void;
}

export const SubscriptionList: React.FC<SubscriptionListProps> = ({
  subscriptions,
  onSelectSubscription,
  onOpenLegalNotice,
  onToggleStatus,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'extreme' | 'creeps' | 'zombies'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'drain' | 'score' | 'name'>('score');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Keyboard navigation for rows (j/k, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => Math.min(subscriptions.length - 1, prev + 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault();
        if (filteredSubs[focusedIndex]) {
          onSelectSubscription(filteredSubs[focusedIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, subscriptions, onSelectSubscription]);

  // Filtering
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

  // Linear-style grouping
  const extremeRiskGroup = filteredSubs.filter(s => s.darkPattern.riskLevel === 'extreme');
  const creepOrZombieGroup = filteredSubs.filter(s => s.darkPattern.riskLevel !== 'extreme' && (s.priceCreep.detected || s.zombieStatus.isZombie));
  const standardGroup = filteredSubs.filter(s => s.darkPattern.riskLevel !== 'extreme' && !s.priceCreep.detected && !s.zombieStatus.isZombie);

  const groups = [
    { title: 'CRITICAL RETENTION TRAPS & ZOMBIES', items: extremeRiskGroup, color: 'text-rose-400' },
    { title: 'PRICE CREEPS & UNNOTICED DRIFT', items: creepOrZombieGroup, color: 'text-amber-400' },
    { title: 'STANDARD RECURRING CADENCE', items: standardGroup, color: 'text-[#8E929B]' },
  ].filter(g => g.items.length > 0);

  return (
    <div className="space-y-4">
      {/* Filters, Search & Sort Control Strip (Linear / Raycast style) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        {/* Filter Pills with Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all' as const, label: 'All', count: subscriptions.length },
            { id: 'extreme' as const, label: 'Extreme Risk', count: subscriptions.filter(s => s.darkPattern.riskLevel === 'extreme').length },
            { id: 'creeps' as const, label: 'Price Creeps', count: subscriptions.filter(s => s.priceCreep.detected).length },
            { id: 'zombies' as const, label: 'Zombies', count: subscriptions.filter(s => s.zombieStatus.isZombie).length },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer select-none whitespace-nowrap ${
                filterType === f.id
                  ? 'bg-[#14161A] text-[#F4F4F6] border border-white/[0.16]'
                  : 'text-[#8E929B] hover:text-[#F4F4F6] hover:bg-white/[0.04]'
              }`}
            >
              <span>{f.label}</span>
              <span className="font-mono text-[10px] text-[#5B5E66]">({f.count})</span>
            </button>
          ))}
        </div>

        {/* Search & Sort Dropdown */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative w-full sm:w-52">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5B5E66]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter subscriptions..."
              className="w-full pl-8 pr-3 py-1 rounded-md text-[12px] bg-[#0F1013] border border-white/[0.08] text-[#F4F4F6] placeholder-[#5B5E66] focus:outline-none focus:border-white/[0.16]"
            />
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#8E929B] bg-[#0F1013] border border-white/[0.08] px-2 py-1 rounded-md shrink-0">
            <ArrowUpDown className="w-3 h-3 text-[#5B5E66]" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#F4F4F6] text-[11px] focus:outline-none cursor-pointer"
            >
              <option value="score" className="bg-[#0F1013]">Vampire Score</option>
              <option value="drain" className="bg-[#0F1013]">Highest Cost</option>
              <option value="name" className="bg-[#0F1013]">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dense Rows Grouped by Severity */}
      {groups.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0F1013] border border-white/[0.08] text-[#8E929B]">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-[#F4F4F6]">No subscriptions matched filters</h3>
          <p className="text-xs text-[#5B5E66] mt-1">Try resetting the search query or active filter.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {/* Group Header with Count (Linear style) */}
              <div className="flex items-center justify-between px-3 py-1">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${group.color}`}>
                  {group.title}
                </span>
                <span className="text-[10px] font-mono text-[#5B5E66]">
                  {group.items.length} {group.items.length === 1 ? 'service' : 'services'}
                </span>
              </div>

              {/* Group Items Container */}
              <div className="rounded-lg border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06] bg-[#0F1013]">
                {group.items.map((sub) => {
                  const isCancelled = sub.status === 'cancelled';
                  return (
                    <div
                      key={sub.id}
                      onClick={() => onSelectSubscription(sub)}
                      className={`group flex items-center justify-between p-3.5 hover:bg-[#14161A] transition-colors cursor-pointer select-none ${
                        isCancelled ? 'opacity-50' : ''
                      }`}
                    >
                      {/* Left: Info */}
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        {/* Icon placeholder container */}
                        <div className="w-8 h-8 rounded-md bg-[#14161A] border border-white/[0.08] flex items-center justify-center shrink-0">
                          {sub.zombieStatus.isZombie ? (
                            <Skull className="w-4 h-4 text-amber-400" />
                          ) : sub.priceCreep.detected ? (
                            <TrendingUp className="w-4 h-4 text-rose-400" />
                          ) : (
                            <span className="text-xs font-bold font-mono text-[#8B7CFF]">
                              {sub.merchantName.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium text-[#F4F4F6] truncate group-hover:text-white">
                              {sub.merchantName}
                            </span>
                            {sub.zombieStatus.isZombie && (
                              <Badge variant="zombie">Zombie</Badge>
                            )}
                            {sub.priceCreep.detected && (
                              <Badge variant="creep">
                                {sub.initialAmount < sub.currentAmount
                                  ? `$${sub.initialAmount.toFixed(0)} → $${sub.currentAmount.toFixed(0)}`
                                  : 'Price Creep'}
                              </Badge>
                            )}
                            <Badge variant="neutral">{sub.category}</Badge>
                          </div>
                          <span className="text-[10px] font-mono text-[#5B5E66] block truncate mt-0.5">
                            {sub.rawDescriptor}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Slim Vampire Score bar & Calibrated confidence */}
                      <div className="hidden md:flex items-center gap-6 px-4 shrink-0">
                        {/* Slim score bar (3px) */}
                        <div className="w-24">
                          <div className="flex justify-between text-[9px] font-mono text-[#5B5E66] mb-1">
                            <span>VAMPIRE</span>
                            <span className="text-[#8E929B]">{sub.vampireScore}</span>
                          </div>
                          <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#8B7CFF]"
                              style={{ width: `${sub.vampireScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Confidence chip */}
                        <Badge variant="tabpfn">
                          TabPFN {(sub.confidenceScore * 100).toFixed(0)}%
                        </Badge>
                      </div>

                      {/* Right: Price & Quick Action */}
                      <div className="flex items-center gap-3 shrink-0 text-right">
                        <div>
                          <div className="text-[13px] font-bold font-mono text-[#F4F4F6] tabular-nums">
                            ${sub.currentAmount.toFixed(2)}
                            <span className="text-[10px] font-normal text-[#5B5E66] ml-1">/mo</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#5B5E66] block">
                            ${sub.annualImpact}/yr
                          </span>
                        </div>

                        {/* Hover Action */}
                        <div className="hidden sm:flex items-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenLegalNotice(sub);
                            }}
                            icon={<ShieldAlert className="w-3 h-3 text-[#8B7CFF]" />}
                          >
                            Armor
                          </Button>
                        </div>

                        <ChevronRight className="w-4 h-4 text-[#5B5E66] group-hover:text-[#F4F4F6] transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
