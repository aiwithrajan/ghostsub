'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Ghost, Users, TableProperties, UploadCloud, RefreshCw, BookOpen, ShieldAlert, X } from 'lucide-react';
import { DetectedSubscription } from '@/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptions: DetectedSubscription[];
  onSelectSubscription: (sub: DetectedSubscription) => void;
  onSelectTab: (tab: 'vampire' | 'friend_split' | 'transactions') => void;
  onLoadDemo: () => void;
  onOpenUpload: () => void;
  onOpenPrivacy: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  subscriptions,
  onSelectSubscription,
  onSelectTab,
  onLoadDemo,
  onOpenUpload,
  onOpenPrivacy,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredSubs = subscriptions.filter(s =>
    s.merchantName.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  const actions = [
    { id: 'tab-vampire', label: 'View Vampire Radar', icon: <Ghost className="w-4 h-4 text-rose-400" />, action: () => { onSelectTab('vampire'); onClose(); } },
    { id: 'tab-friend', label: 'View Friend-Split Synergy', icon: <Users className="w-4 h-4 text-[#8B7CFF]" />, action: () => { onSelectTab('friend_split'); onClose(); } },
    { id: 'tab-statement', label: 'View Parsed Statement', icon: <TableProperties className="w-4 h-4 text-[#10B981]" />, action: () => { onSelectTab('transactions'); onClose(); } },
    { id: 'act-demo', label: 'Load Kevin\'s Demo Statement', icon: <RefreshCw className="w-4 h-4 text-[#8B7CFF]" />, action: () => { onLoadDemo(); onClose(); } },
    { id: 'act-upload', label: 'Upload Bank Statement (CSV)', icon: <UploadCloud className="w-4 h-4 text-cyan-400" />, action: () => { onOpenUpload(); onClose(); } },
    { id: 'act-privacy', label: 'Why Open Matters (Manifesto)', icon: <BookOpen className="w-4 h-4 text-emerald-400" />, action: () => { onOpenPrivacy(); onClose(); } },
  ].filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative z-10 w-full max-w-xl bg-[#0F1013] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Search Input Bar */}
          <div className="p-3.5 border-b border-white/[0.08] flex items-center gap-3">
            <Search className="w-4 h-4 text-[#8E929B] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
              placeholder="Search subscriptions, jump to tabs, or run actions..."
              className="w-full bg-transparent text-[13px] text-[#F4F4F6] placeholder-[#5B5E66] focus:outline-none"
            />
            <kbd className="text-[10px]">Esc</kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
            {/* Subscriptions Section */}
            {filteredSubs.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B5E66] px-2 block mb-1">
                  Subscriptions ({filteredSubs.length})
                </span>
                <div className="space-y-0.5">
                  {filteredSubs.map((sub, i) => (
                    <button
                      key={sub.id}
                      onClick={() => { onSelectSubscription(sub); onClose(); }}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-white/[0.04] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
                        <span className="text-[13px] font-medium text-[#F4F4F6] truncate">
                          {sub.merchantName}
                        </span>
                        <span className="text-[10px] font-mono text-[#5B5E66]">{sub.category}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[12px] font-mono font-medium text-[#8E929B] group-hover:text-[#F4F4F6]">
                          ${sub.currentAmount.toFixed(2)}/mo
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions Section */}
            {actions.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B5E66] px-2 block mb-1">
                  Navigation &amp; Actions
                </span>
                <div className="space-y-0.5">
                  {actions.map((act) => (
                    <button
                      key={act.id}
                      onClick={act.action}
                      className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <span className="p-1 rounded bg-[#14161A] border border-white/[0.06]">
                        {act.icon}
                      </span>
                      <span className="text-[13px] text-[#F4F4F6]">{act.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredSubs.length === 0 && actions.length === 0 && (
              <div className="p-8 text-center text-[#5B5E66] text-xs">
                No matching subscriptions or actions found.
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-2.5 border-t border-white/[0.06] bg-[#0A0B0D] flex items-center justify-between text-[11px] text-[#5B5E66]">
            <span>Tip: Press ⌘K anywhere to summon</span>
            <div className="flex items-center gap-2">
              <span>Select <kbd>↵</kbd></span>
              <span>Close <kbd>Esc</kbd></span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
