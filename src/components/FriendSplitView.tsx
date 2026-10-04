'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Sparkles, 
  Music, 
  Tv, 
  Utensils, 
  Tent, 
  ArrowRight, 
  Share2, 
  Check, 
  HeartHandshake
} from 'lucide-react';
import { DetectedSubscription, FriendSubscription, FriendSynergy, FriendGoal } from '@/types';
import { calculateFriendSynergies } from '@/lib/friend-split';
import { KEVIN_FRIEND_SUBSCRIPTIONS, DEFAULT_FRIEND_GOAL } from '@/lib/demo-data';

interface FriendSplitViewProps {
  userSubs: DetectedSubscription[];
  recoveredSavingsAnnual: number;
}

export const FriendSplitView: React.FC<FriendSplitViewProps> = ({
  userSubs,
  recoveredSavingsAnnual
}) => {
  const [friendName] = useState('Kevin (Roommate)');
  const [friendSubs] = useState<FriendSubscription[]>(KEVIN_FRIEND_SUBSCRIPTIONS);
  const [goal, setGoal] = useState<FriendGoal>(DEFAULT_FRIEND_GOAL);
  const [copiedLink, setCopiedLink] = useState(false);

  const { synergies, totalAnnualSavings } = calculateFriendSynergies(userSubs, friendSubs);
  
  const totalFunding = recoveredSavingsAnnual + totalAnnualSavings;
  const progressPercent = Math.min(100, Math.round((totalFunding / goal.targetCost) * 100));

  const handleShareSummary = () => {
    const summary = `Hey Kevin! I ran our subscriptions through GhostSub:\n- We can save $${totalAnnualSavings}/yr by merging our Spotify and Disney+ accounts.\n- Our Lake Tahoe trip goal ($${goal.targetCost}) is already ${progressPercent}% funded! Check it out: https://ghostsub.onrender.com`;
    navigator.clipboard.writeText(summary);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music': return <Music className="w-4 h-4" />;
      case 'Tv': return <Tv className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-5 rounded-xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--gs-bg-secondary), var(--gs-bg-tertiary))',
          border: '1px solid var(--gs-border)',
          boxShadow: 'var(--gs-shadow-md)',
        }}
      >
        {/* Accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, var(--gs-info), transparent)', opacity: 0.5 }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--gs-info)' }}>
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Cooperative Subscription Synergy</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--gs-text-primary)' }}>
              Friend-Split Protocol: You &amp; {friendName}
            </h2>
            <p className="text-[12px] mt-1 max-w-2xl leading-relaxed" style={{ color: 'var(--gs-text-secondary)' }}>
              GhostSub matches your active subscriptions with {friendName}&apos;s profile 
              to find duplicate accounts and unlock Family/Duo tier savings.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShareSummary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold cursor-pointer shrink-0 transition-colors"
            style={{
              background: 'var(--gs-info)',
              color: 'white',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
            }}
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Copied!' : 'Share with Kevin'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Goal Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="surface-card p-5 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-lg"
              style={{
                background: 'var(--gs-warning-subtle)',
                border: '1px solid rgba(245,158,11,0.2)',
              }}
            >
              <Tent className="w-5 h-5" style={{ color: 'var(--gs-warning)' }} />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider block" style={{ color: 'var(--gs-warning)' }}>
                Joint Experience Fund
              </span>
              <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--gs-text-primary)' }}>
                {goal.title}
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--gs-text-tertiary)' }}>{goal.tagline}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-extrabold" style={{ color: 'var(--gs-text-primary)' }}>
              ${totalFunding}
              <span className="text-sm font-normal ml-1" style={{ color: 'var(--gs-text-muted)' }}>/ ${goal.targetCost}</span>
            </div>
            <span className="text-[11px] font-semibold" style={{ color: 'var(--gs-success)' }}>
              {progressPercent}% funded
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full h-2 rounded-full overflow-hidden mb-2"
          style={{ background: 'var(--gs-bg-tertiary)' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--gs-warning), var(--gs-success), var(--gs-info))',
            }}
          />
        </div>

        <div className="flex justify-between text-[10px]" style={{ color: 'var(--gs-text-muted)' }}>
          <span>Recovered: <strong>${recoveredSavingsAnnual}/yr</strong></span>
          <span>Merges: <strong>${totalAnnualSavings}/yr</strong></span>
          <span>Remaining: <strong>${Math.max(0, goal.targetCost - totalFunding)}</strong></span>
        </div>
      </motion.div>

      {/* Synergies Grid */}
      <div>
        <h3
          className="text-[12px] font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
          style={{ color: 'var(--gs-text-tertiary)' }}
        >
          <Users className="w-3.5 h-3.5" style={{ color: 'var(--gs-info)' }} />
          <span>Duplicate Services Found ({synergies.length})</span>
        </h3>

        {synergies.length === 0 ? (
          <div
            className="p-8 rounded-xl text-center text-[12px]"
            style={{ background: 'var(--gs-bg-secondary)', border: '1px solid var(--gs-border)', color: 'var(--gs-text-tertiary)' }}
          >
            <Users className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--gs-text-muted)' }} />
            <p>No duplicate subscriptions detected between profiles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {synergies.map((syn, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.15 + idx * 0.08 }}
                className="surface-card p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="p-2 rounded-lg"
                        style={{ background: 'var(--gs-bg-tertiary)', color: 'var(--gs-info)' }}
                      >
                        {getServiceIcon(syn.iconName)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[14px]" style={{ color: 'var(--gs-text-primary)' }}>{syn.service}</h4>
                        <span className="text-[10px]" style={{ color: 'var(--gs-text-muted)' }}>Both paying individual plans</span>
                      </div>
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                      style={{
                        background: 'var(--gs-success-subtle)',
                        color: 'var(--gs-success)',
                        border: '1px solid rgba(16,185,129,0.2)',
                      }}
                    >
                      +${syn.annualSavings}/yr
                    </span>
                  </div>

                  {/* Price comparison */}
                  <div
                    className="grid grid-cols-3 gap-2 p-2.5 rounded-lg text-center text-[11px] mb-3"
                    style={{ background: 'var(--gs-bg-primary)', border: '1px solid var(--gs-border)' }}
                  >
                    <div>
                      <span className="text-[9px] block" style={{ color: 'var(--gs-text-muted)' }}>You</span>
                      <strong style={{ color: 'var(--gs-text-primary)' }}>${syn.userCost.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] block" style={{ color: 'var(--gs-text-muted)' }}>Kevin</span>
                      <strong style={{ color: 'var(--gs-text-primary)' }}>${syn.friendCost.toFixed(2)}</strong>
                    </div>
                    <div style={{ borderLeft: '1px solid var(--gs-border)' }}>
                      <span className="text-[9px] block font-semibold" style={{ color: 'var(--gs-success)' }}>Family</span>
                      <strong style={{ color: 'var(--gs-success)' }}>${syn.familyPlanCost.toFixed(2)}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--gs-text-secondary)' }}>
                    {syn.recommendation}
                  </p>
                </div>

                <div
                  className="mt-3 pt-2.5 flex items-center justify-between text-[11px]"
                  style={{ borderTop: '1px solid var(--gs-border)' }}
                >
                  <span style={{ color: 'var(--gs-text-muted)' }}>
                    Split: ${(syn.familyPlanCost / 2).toFixed(2)} each
                  </span>
                  <span
                    className="font-semibold flex items-center gap-1 cursor-pointer"
                    style={{ color: 'var(--gs-info)' }}
                  >
                    <span>Merge Setup</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
