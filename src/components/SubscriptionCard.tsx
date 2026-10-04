'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  TrendingUp, 
  Skull, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  RotateCcw
} from 'lucide-react';
import { DetectedSubscription } from '@/types';

interface SubscriptionCardProps {
  subscription: DetectedSubscription;
  onOpenLegalNotice: (sub: DetectedSubscription) => void;
  onToggleStatus: (id: string, newStatus: DetectedSubscription['status']) => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onOpenLegalNotice,
  onToggleStatus
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showTactics, setShowTactics] = useState(false);

  const isCancelled = subscription.status === 'cancelled';

  const getVampireColor = (score: number) => {
    if (score >= 80) return 'var(--gs-danger)';
    if (score >= 55) return 'var(--gs-accent)';
    return 'var(--gs-info)';
  };

  const getRiskStyles = (level: DetectedSubscription['darkPattern']['riskLevel']) => {
    switch (level) {
      case 'extreme':
        return { bg: 'var(--gs-danger-subtle)', color: 'var(--gs-danger)', border: 'rgba(244,63,94,0.25)' };
      case 'high':
        return { bg: 'var(--gs-warning-subtle)', color: 'var(--gs-warning)', border: 'rgba(245,158,11,0.25)' };
      case 'medium':
        return { bg: 'var(--gs-accent-subtle)', color: 'var(--gs-accent)', border: 'rgba(139,92,246,0.25)' };
      default:
        return { bg: 'var(--gs-bg-tertiary)', color: 'var(--gs-text-tertiary)', border: 'var(--gs-border)' };
    }
  };

  const vampireColor = getVampireColor(subscription.vampireScore);
  const riskStyle = getRiskStyles(subscription.darkPattern.riskLevel);

  return (
    <div
      className={`surface-card relative overflow-hidden transition-opacity duration-200 ${
        isCancelled ? 'opacity-60' : 'opacity-100'
      }`}
    >
      <div className="p-5">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {subscription.zombieStatus.isZombie && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold"
              style={{ background: 'var(--gs-warning-subtle)', color: 'var(--gs-warning)', border: '1px solid rgba(245,158,11,0.25)' }}
            >
              <Skull className="w-3 h-3" />
              <span>Zombie ({subscription.zombieStatus.monthsDormant}mo dormant)</span>
            </span>
          )}

          {subscription.priceCreep.detected && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold"
              style={{ background: 'var(--gs-danger-subtle)', color: 'var(--gs-danger)', border: '1px solid rgba(244,63,94,0.25)' }}
            >
              <TrendingUp className="w-3 h-3" />
              <span>+{subscription.priceCreep.percentage}% creep</span>
            </span>
          )}

          <span
            className="text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider"
            style={{ background: riskStyle.bg, color: riskStyle.color, border: `1px solid ${riskStyle.border}` }}
          >
            {subscription.darkPattern.riskLevel} risk
          </span>

          <span
            className="text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1 ml-auto"
            style={{ background: 'var(--gs-bg-tertiary)', color: 'var(--gs-text-tertiary)', border: '1px solid var(--gs-border)' }}
          >
            <Cpu className="w-3 h-3" style={{ color: 'var(--gs-success)' }} />
            <span>TabPFN {(subscription.confidenceScore * 100).toFixed(0)}%</span>
          </span>
        </div>

        {/* Main Content Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          
          {/* Left: Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-bold tracking-tight truncate" style={{ color: 'var(--gs-text-primary)' }}>
                {subscription.merchantName}
              </h3>
              <span
                className="text-[11px] px-1.5 py-0.5 rounded-md shrink-0"
                style={{ background: 'var(--gs-bg-tertiary)', color: 'var(--gs-text-tertiary)' }}
              >
                {subscription.category}
              </span>
            </div>
            <p className="text-[11px] font-mono mt-1 truncate" style={{ color: 'var(--gs-text-muted)' }}>
              {subscription.rawDescriptor}
            </p>

            {/* Dark pattern alert */}
            <div
              className="mt-3 p-2.5 rounded-lg text-[12px] flex items-start gap-2"
              style={{
                background: 'var(--gs-bg-primary)',
                border: '1px solid var(--gs-border)',
                color: 'var(--gs-text-secondary)',
              }}
            >
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--gs-warning)' }} />
              <span className="leading-relaxed">{subscription.darkPattern.cancellationTrapSummary}</span>
            </div>
          </div>

          {/* Right: Price & Vampire Score */}
          <div className="flex flex-row sm:flex-col items-end justify-between sm:justify-start gap-2 sm:text-right shrink-0">
            <div>
              <div className="text-xl font-extrabold" style={{ color: 'var(--gs-text-primary)' }}>
                ${subscription.currentAmount.toFixed(2)}
                <span className="text-[11px] font-normal ml-1" style={{ color: 'var(--gs-text-muted)' }}>/ mo</span>
              </div>
              <div className="text-[11px] font-mono" style={{ color: 'var(--gs-text-tertiary)' }}>
                ${subscription.annualImpact}/yr
              </div>
            </div>

            {/* Vampire meter */}
            <div className="w-32 mt-2">
              <div className="flex justify-between text-[10px] font-semibold mb-1" style={{ color: 'var(--gs-text-muted)' }}>
                <span>VAMPIRE</span>
                <span className="font-mono" style={{ color: 'var(--gs-text-primary)' }}>{subscription.vampireScore}</span>
              </div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--gs-bg-tertiary)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subscription.vampireScore}%` }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full rounded-full"
                  style={{ background: vampireColor }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div
          className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2"
          style={{ borderTop: '1px solid var(--gs-border)' }}
        >
          <div className="flex items-center gap-3">
            {subscription.priceCreep.history.length > 1 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-[11px] flex items-center gap-1 cursor-pointer font-medium transition-colors"
                style={{ color: 'var(--gs-text-tertiary)' }}
              >
                <span>{showHistory ? 'Hide' : 'View'} History ({subscription.priceCreep.history.length})</span>
                {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}

            <button
              onClick={() => setShowTactics(!showTactics)}
              className="text-[11px] flex items-center gap-1 cursor-pointer font-medium transition-colors"
              style={{ color: 'var(--gs-text-tertiary)' }}
            >
              <span>{showTactics ? 'Hide' : 'Unmask'} Tactics</span>
              {showTactics ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {isCancelled ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onToggleStatus(subscription.id, 'active')}
                className="flex items-center gap-1.5 px-3 py-[6px] rounded-lg text-[11px] font-medium cursor-pointer transition-colors"
                style={{
                  background: 'var(--gs-bg-tertiary)',
                  border: '1px solid var(--gs-border)',
                  color: 'var(--gs-text-secondary)',
                }}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reactivate</span>
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onToggleStatus(subscription.id, 'cancelled')}
                  className="flex items-center gap-1.5 px-3 py-[6px] rounded-lg text-[11px] font-medium cursor-pointer transition-colors"
                  style={{
                    background: 'var(--gs-success-subtle)',
                    border: '1px solid rgba(16,185,129,0.25)',
                    color: 'var(--gs-success)',
                  }}
                  title="Mark cancelled to add to recovered savings"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Mark Cancelled</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenLegalNotice(subscription)}
                  className="flex items-center gap-1.5 px-3.5 py-[6px] rounded-lg text-[11px] font-semibold cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, var(--gs-accent), var(--gs-accent-hover))',
                    color: 'white',
                    boxShadow: 'var(--gs-shadow-glow-accent)',
                  }}
                >
                  <ShieldAlert className="w-3 h-3" />
                  <span>FTC Armor</span>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Expanded: Billing History */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="mx-5 mb-4 p-3 rounded-lg text-[11px]"
              style={{ background: 'var(--gs-bg-primary)', border: '1px solid var(--gs-border)' }}
            >
              <span className="font-semibold block mb-2" style={{ color: 'var(--gs-text-secondary)' }}>
                Billing History (TabPFN Recorded):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {subscription.priceCreep.history.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-md"
                    style={{ background: 'var(--gs-bg-secondary)', border: '1px solid var(--gs-border)' }}
                  >
                    <span className="text-[10px] block" style={{ color: 'var(--gs-text-muted)' }}>{pt.date}</span>
                    <span className="font-mono font-semibold" style={{ color: 'var(--gs-text-primary)' }}>${pt.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded: Tactics */}
      <AnimatePresence>
        {showTactics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="mx-5 mb-4 p-3 rounded-lg text-[11px]"
              style={{ background: 'var(--gs-bg-primary)', border: '1px solid var(--gs-border)' }}
            >
              <span className="font-semibold block mb-1.5" style={{ color: 'var(--gs-danger)' }}>
                Retention Traps Unmasked:
              </span>
              <ul className="list-disc list-inside space-y-0.5" style={{ color: 'var(--gs-text-secondary)' }}>
                {subscription.darkPattern.tactics.map((tactic, idx) => (
                  <li key={idx}>{tactic}</li>
                ))}
              </ul>
              <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--gs-border)' }}>
                <span className="font-semibold block mb-1" style={{ color: 'var(--gs-accent)' }}>
                  Counter-Measures:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[10px]" style={{ color: 'var(--gs-text-tertiary)' }}>
                  {subscription.darkPattern.statutesToInvoke.map((statute, idx) => (
                    <li key={idx}>{statute}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
