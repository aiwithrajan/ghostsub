'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Ghost, 
  Users, 
  TableProperties, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles,
  Command
} from 'lucide-react';

import { RawTransaction, DetectedSubscription } from '@/types';
import { SAMPLE_RAW_TRANSACTIONS, KEVIN_FRIEND_SUBSCRIPTIONS } from '@/lib/demo-data';
import { runTabPFNAnalysis } from '@/lib/tabpfn-engine';
import { calculateFriendSynergies } from '@/lib/friend-split';

import { Navbar } from '@/components/Navbar';
import { LinearHero } from '@/components/LinearHero';
import { LinearSubscriptionCanvas } from '@/components/LinearSubscriptionCanvas';
import { SidePanel } from '@/components/ui/SidePanel';
import { CommandPalette } from '@/components/CommandPalette';
import { LegalNoticeModal } from '@/components/LegalNoticeModal';
import { FriendSplitView } from '@/components/FriendSplitView';
import { PrivacyManifestoModal } from '@/components/PrivacyManifestoModal';
import { CSVUploadModal } from '@/components/CSVUploadModal';

export default function Home() {
  const [transactions, setTransactions] = useState<RawTransaction[]>(SAMPLE_RAW_TRANSACTIONS);
  const [subscriptions, setSubscriptions] = useState<DetectedSubscription[]>(() => runTabPFNAnalysis(SAMPLE_RAW_TRANSACTIONS));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'vampire' | 'friend_split' | 'transactions'>('vampire');

  // Modals & Drawers
  const [selectedSubForInspector, setSelectedSubForInspector] = useState<DetectedSubscription | null>(null);
  const [selectedSubForNotice, setSelectedSubForNotice] = useState<DetectedSubscription | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Deep-link support for demo video recording and tab navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'friend_split' || tab === 'transactions' || tab === 'vampire') {
        setActiveTab(tab);
      }
      if (params.get('inspector') === 'true' && subscriptions.length > 1) {
        setSelectedSubForInspector(subscriptions[1]);
      }
      if (params.get('modal') === 'legal' && subscriptions.length > 1) {
        setSelectedSubForNotice(subscriptions[1]);
      }
    }
  }, [subscriptions]);

  // Synchronize when transactions change (CSV upload or demo load)
  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const detected = runTabPFNAnalysis(transactions);
      setSubscriptions(detected);
      setIsAnalyzing(false);
    }, 120);

    return () => clearTimeout(timer);
  }, [transactions]);

  // Global Keyboard shortcuts (Cmd+K, Cmd+U, Cmd+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        setIsUploadModalOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleLoadDemo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Mark Cancelled with Confetti
  const handleToggleStatus = (id: string, newStatus: DetectedSubscription['status']) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    
    if (newStatus === 'cancelled') {
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleLoadDemo = () => {
    setIsAnalyzing(true);
    setTransactions(SAMPLE_RAW_TRANSACTIONS);
  };

  const { totalAnnualSavings: friendSavingsAnnual } = calculateFriendSynergies(
    subscriptions,
    KEVIN_FRIEND_SUBSCRIPTIONS
  );

  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const cancelledSubs = subscriptions.filter(s => s.status === 'cancelled');
  const recoveredAnnual = cancelledSubs.reduce((sum, s) => sum + s.annualImpact, 0);

  const tabs = [
    { id: 'vampire' as const, label: 'Vampire Radar', count: subscriptions.length },
    { id: 'friend_split' as const, label: 'Friend-Split Synergy', badge: `+$${friendSavingsAnnual}/yr` },
    { id: 'transactions' as const, label: 'Parsed Statements', count: transactions.length },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white">
      {/* Linear Navbar */}
      <Navbar
        onLoadDemo={handleLoadDemo}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenCommandPalette={() => setIsCmdPaletteOpen(true)}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10">
        
        {/* Linear Hero Section & 4-Column Feature Cards */}
        <LinearHero
          subscriptions={subscriptions}
          friendSavingsAnnual={friendSavingsAnnual}
          onReviewClick={() => {
            setActiveTab('vampire');
            canvasRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* View Switcher Tabs (Linear Pill Switcher) */}
        <div ref={canvasRef} className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-[#8A8F98] hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="text-[11px] font-mono text-[#525660]">
                      ({tab.count})
                    </span>
                  )}
                  {tab.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {tab.badge}
                    </span>
                  )}

                  {/* Linear Active Tab Line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B7CFF] shadow-[0_0_8px_rgba(139,124,255,0.6)]" />
                  )}
                </button>
              );
            })}
          </div>

          {recoveredAnnual > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Recovered: +${recoveredAnnual.toLocaleString()}/yr</span>
            </div>
          )}
        </div>

        {/* Tab 1: Vampire Radar Canvas (Linear Issue-style items) */}
        {activeTab === 'vampire' && (
          <LinearSubscriptionCanvas
            subscriptions={subscriptions}
            onSelectSubscription={(sub) => setSelectedSubForInspector(sub)}
            onOpenLegalNotice={(sub) => setSelectedSubForNotice(sub)}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {/* Tab 2: Friend-Split Synergy */}
        {activeTab === 'friend_split' && (
          <div className="linear-window rounded-2xl p-6">
            <FriendSplitView
              userSubs={subscriptions}
              recoveredSavingsAnnual={recoveredAnnual}
            />
          </div>
        )}

        {/* Tab 3: Raw Transaction Statement View */}
        {activeTab === 'transactions' && (
          <div className="linear-window rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Parsed Statement Records</h3>
                <p className="text-xs text-[#8A8F98] mt-0.5">
                  Extracted in-memory. Drift slopes &amp; intervals classified via TabPFN Bayesian priors.
                </p>
              </div>
              <span className="text-xs font-mono text-[#8A8F98] bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                {transactions.length} transactions loaded
              </span>
            </div>

            <div className="overflow-x-auto max-h-[580px]">
              <table className="w-full text-left text-[12px] text-[#8A8F98]">
                <thead className="bg-[#0A0B0D] uppercase text-[10px] font-mono text-[#525660] sticky top-0 border-b border-white/[0.08]">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Raw Descriptor</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] font-mono">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 px-4 text-[#525660]">{tx.date}</td>
                      <td className="py-2.5 px-4 font-sans text-white">{tx.description}</td>
                      <td className="py-2.5 px-4 text-[#8A8F98]">{tx.category || 'General'}</td>
                      <td className="py-2.5 px-4 text-right text-white font-semibold tabular-nums">
                        ${tx.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Linear Minimalist Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050506] py-6 text-[12px] text-[#525660]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-white/[0.08] flex items-center justify-center">
              <Ghost className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-white">GhostSub</span>
            <span>— Sovereign Financial Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-[#8A8F98]">
            <span>Prior Labs TabPFN</span>
            <span>•</span>
            <span>Google Gemma-2</span>
            <span>•</span>
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-white hover:underline cursor-pointer"
            >
              Why Open Innovation Matters
            </button>
          </div>
        </div>
      </footer>

      {/* Slide-over Inspector Side Panel (Linear style) */}
      <SidePanel
        subscription={selectedSubForInspector}
        onClose={() => setSelectedSubForInspector(null)}
        onOpenLegalNotice={(sub) => setSelectedSubForNotice(sub)}
        onToggleStatus={handleToggleStatus}
      />

      {/* Raycast Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        subscriptions={subscriptions}
        onSelectSubscription={(sub) => setSelectedSubForInspector(sub)}
        onSelectTab={(tab) => setActiveTab(tab)}
        onLoadDemo={handleLoadDemo}
        onOpenUpload={() => setIsUploadModalOpen(true)}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
      />

      {/* FTC Armor Modal */}
      <LegalNoticeModal
        subscription={selectedSubForNotice}
        onClose={() => setSelectedSubForNotice(null)}
      />

      {/* Privacy Manifesto Modal */}
      <PrivacyManifestoModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* CSV Upload Modal */}
      <CSVUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onTransactionsLoaded={(newTxs) => setTransactions(newTxs)}
        onLoadDemo={handleLoadDemo}
      />
    </div>
  );
}
