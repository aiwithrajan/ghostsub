'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Skull, TrendingUp, Users, ShieldAlert, Sparkles, ArrowUpRight } from 'lucide-react';
import { DetectedSubscription } from '@/types';

interface StatsSummaryProps {
  subscriptions: DetectedSubscription[];
  friendSavingsAnnual: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' as const },
  }),
};

interface StatCardProps {
  index: number;
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  detail: string;
  footer: React.ReactNode;
  accentColor: string;
  badge?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  index,
  icon,
  label,
  value,
  suffix,
  detail,
  footer,
  accentColor,
  badge,
}) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="surface-card relative overflow-hidden p-5 group"
    style={{
      borderColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
    }}
  >
    {/* Subtle gradient glow at top */}
    <div
      className="absolute top-0 left-0 right-0 h-[1px]"
      style={{
        background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
        opacity: 0.4,
      }}
    />

    <div className="flex items-center justify-between mb-3">
      <span
        className="text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
        style={{ color: accentColor }}
      >
        {icon}
        {label}
      </span>
      {badge && (
        <span
          className="text-[10px] px-2 py-0.5 rounded-md font-mono font-medium"
          style={{
            background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
            color: accentColor,
          }}
        >
          {badge}
        </span>
      )}
    </div>

    <div className="flex items-baseline gap-1.5">
      <span className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--gs-text-primary)' }}>
        {value}
      </span>
      {suffix && (
        <span className="text-xs font-medium" style={{ color: 'var(--gs-text-tertiary)' }}>
          {suffix}
        </span>
      )}
    </div>

    <p className="text-[11px] mt-2" style={{ color: 'var(--gs-text-tertiary)' }}>
      {detail}
    </p>

    <div
      className="mt-3 pt-2.5 text-[11px] font-medium flex items-center gap-1"
      style={{ borderTop: '1px solid var(--gs-border)', color: `color-mix(in srgb, ${accentColor} 80%, white)` }}
    >
      {footer}
    </div>
  </motion.div>
);

export const StatsSummary: React.FC<StatsSummaryProps> = ({
  subscriptions,
  friendSavingsAnnual
}) => {
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const cancelledSubs = subscriptions.filter(s => s.status === 'cancelled');

  const monthlyDrain = activeSubs.reduce((sum, s) => sum + s.currentAmount, 0);
  const annualDrain = activeSubs.reduce((sum, s) => sum + s.annualImpact, 0);

  const annualRecovered = cancelledSubs.reduce((sum, s) => sum + s.annualImpact, 0);

  const zombies = activeSubs.filter(s => s.zombieStatus.isZombie);
  const priceCreeps = activeSubs.filter(s => s.priceCreep.detected);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      
      <StatCard
        index={0}
        icon={<DollarSign className="w-3.5 h-3.5" />}
        label="Monthly Drain"
        value={`$${monthlyDrain.toFixed(2)}`}
        suffix="/ month"
        detail={`$${annualDrain.toLocaleString()}/yr lost to recurring charges`}
        badge={`${activeSubs.length} active`}
        accentColor="var(--gs-danger)"
        footer={
          annualRecovered > 0 ? (
            <>
              <Sparkles className="w-3 h-3" />
              <span>Recovered: <strong>${annualRecovered.toLocaleString()}/yr</strong></span>
            </>
          ) : (
            <>
              <ArrowUpRight className="w-3 h-3" />
              <span>Analyze to find savings</span>
            </>
          )
        }
      />

      <StatCard
        index={1}
        icon={<Skull className="w-3.5 h-3.5" />}
        label="Zombie Charges"
        value={`${zombies.length}`}
        suffix="resurrected"
        detail={zombies.length > 0 ? `Dormant then rebilled (e.g. ${zombies[0].merchantName})` : 'No dormant resurrections detected'}
        badge="TabPFN"
        accentColor="var(--gs-warning)"
        footer={
          <>
            <ShieldAlert className="w-3 h-3" />
            <span>Requires stop-payment notice</span>
          </>
        }
      />

      <StatCard
        index={2}
        icon={<TrendingUp className="w-3.5 h-3.5" />}
        label="Price Creep"
        value={`${priceCreeps.length}`}
        suffix="silent hikes"
        detail={`Up to +${Math.max(...priceCreeps.map(p => p.priceCreep.percentage), 0).toFixed(0)}% without consent`}
        badge="Drift Slope"
        accentColor="var(--gs-accent)"
        footer={<span>Detected via TabPFN linear drift analysis</span>}
      />

      <StatCard
        index={3}
        icon={<Users className="w-3.5 h-3.5" />}
        label="Friend-Split Savings"
        value={`$${friendSavingsAnnual}`}
        suffix="/ year"
        detail="Merge duplicate plans into Family/Duo tiers"
        badge="With Kevin"
        accentColor="var(--gs-info)"
        footer={
          <>
            <Sparkles className="w-3 h-3" />
            <span>Lake Tahoe Cabin Trip fund</span>
          </>
        }
      />

    </div>
  );
};
