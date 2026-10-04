'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, CheckCircle2, ChevronRight, AlertTriangle, Calendar, Building, Sparkles } from 'lucide-react';
import { DetectedSubscription } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface SidePanelProps {
  subscription: DetectedSubscription | null;
  onClose: () => void;
  onOpenLegalNotice: (sub: DetectedSubscription) => void;
  onToggleStatus: (id: string, newStatus: DetectedSubscription['status']) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  subscription,
  onClose,
  onOpenLegalNotice,
  onToggleStatus,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!subscription) return null;

  const isCancelled = subscription.status === 'cancelled';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Panel (Desktop: Right slide-over, Mobile: Bottom Sheet) */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative z-10 w-full md:w-[480px] h-full bg-[#0F1013] border-l border-white/[0.08] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#0F1013]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E929B]">
                Subscription Inspector
              </span>
              <kbd className="text-[10px]">Esc</kbd>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[#8E929B] hover:text-[#F4F4F6] hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Merchant Identity & Price Hero */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant={subscription.darkPattern.riskLevel === 'extreme' ? 'extreme' : 'warning'}>
                  {subscription.darkPattern.riskLevel} risk
                </Badge>
                <Badge variant="tabpfn">
                  TabPFN {(subscription.confidenceScore * 100).toFixed(0)}% calibrated
                </Badge>
                {subscription.zombieStatus.isZombie && (
                  <Badge variant="zombie">Zombie</Badge>
                )}
                {subscription.priceCreep.detected && (
                  <Badge variant="creep">Price Creep</Badge>
                )}
              </div>

              <h2 className="text-xl font-bold text-[#F4F4F6] tracking-tight">
                {subscription.merchantName}
              </h2>
              <p className="text-[11px] font-mono text-[#8E929B] mt-0.5 truncate">
                {subscription.rawDescriptor}
              </p>

              {/* Big Copilot-style rate indicator */}
              <div className="mt-4 p-4 rounded-lg bg-[#14161A] border border-white/[0.08] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E929B] block">
                    Current Monthly Billing
                  </span>
                  <div className="text-2xl font-bold font-mono text-[#F4F4F6] tabular-nums mt-0.5">
                    ${subscription.currentAmount.toFixed(2)}
                    <span className="text-xs font-normal text-[#8E929B] ml-1">/ month</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E929B] block">
                    Annual Drain
                  </span>
                  <div className="text-base font-bold font-mono text-rose-400 tabular-nums mt-0.5">
                    ${subscription.annualImpact}/yr
                  </div>
                </div>
              </div>
            </div>

            {/* Retention Trap Briefing */}
            <div className="p-4 rounded-lg bg-[#14161A] border border-white/[0.08] space-y-2">
              <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Detected Retention Dark Pattern</span>
              </div>
              <p className="text-[12px] text-[#F4F4F6] leading-relaxed">
                {subscription.darkPattern.cancellationTrapSummary}
              </p>
              
              <div className="pt-2 border-t border-white/[0.06] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E929B] block">
                  Company Playbook Tactics:
                </span>
                <ul className="space-y-1 text-[11px] text-[#8E929B]">
                  {subscription.darkPattern.tactics.map((tactic, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 mt-0.5">•</span>
                      <span>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Billing Time Series (Origin / Copilot style) */}
            <div className="p-4 rounded-lg bg-[#14161A] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E929B]">
                  Billing Drift History ({subscription.priceCreep.history.length} statements)
                </span>
                {subscription.priceCreep.detected && (
                  <span className="text-[10px] text-rose-400 font-mono">
                    Hiked from ${subscription.initialAmount} to ${subscription.currentAmount}
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                {subscription.priceCreep.history.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 px-2 rounded bg-[#0F1013] text-[11px] border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-[#5B5E66]" />
                      <span className="text-[#8E929B] font-mono">{pt.date}</span>
                    </div>
                    <span className="font-mono text-[#F4F4F6] font-medium tabular-nums">
                      ${pt.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Countermeasures */}
            <div className="p-4 rounded-lg bg-[#14161A] border border-white/[0.08] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B7CFF] block">
                Statutory Defense to Invoke:
              </span>
              <ul className="space-y-1 text-[11px] text-[#8E929B]">
                {subscription.darkPattern.statutesToInvoke.map((statute, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#8B7CFF]">•</span>
                    <span>{statute}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Fixed Action Footer */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0F1013] flex items-center justify-between gap-3 shrink-0">
            <Button
              variant="ghost"
              onClick={() => {
                onToggleStatus(subscription.id, isCancelled ? 'active' : 'cancelled');
                onClose();
              }}
            >
              {isCancelled ? 'Mark as Active' : 'Mark Cancelled'}
            </Button>

            <Button
              variant="primary"
              size="md"
              icon={<ShieldAlert className="w-3.5 h-3.5" />}
              onClick={() => {
                onOpenLegalNotice(subscription);
              }}
            >
              Cancel with FTC Armor
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
