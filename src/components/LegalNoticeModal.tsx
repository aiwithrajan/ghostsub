'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  Copy, 
  Check, 
  Download, 
  Scale, 
  AlertOctagon, 
  Sparkles,
  Building,
  CreditCard
} from 'lucide-react';
import { DetectedSubscription } from '@/types';
import { generateFTCClickToCancelNotice, generateBankDisputeAffidavit, getGemmaDarkPatternBriefing } from '@/lib/gemma-engine';

interface LegalNoticeModalProps {
  subscription: DetectedSubscription | null;
  onClose: () => void;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  subscription,
  onClose
}) => {
  if (!subscription) return null;

  const [noticeType, setNoticeType] = useState<'ftc' | 'bank'>('ftc');
  const [userName, setUserName] = useState('Kevin Miller');
  const [userEmail, setUserEmail] = useState('kevin.miller@example.com');
  const [lastFour, setLastFour] = useState('4819');
  const [copied, setCopied] = useState(false);

  const darkBrief = getGemmaDarkPatternBriefing(subscription);

  const noticeText = noticeType === 'ftc'
    ? generateFTCClickToCancelNotice({
        subscription,
        userName,
        userEmail,
        lastFourCard: lastFour
      })
    : generateBankDisputeAffidavit({
        subscription,
        userName,
        lastFourCard: lastFour
      });

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([noticeText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${subscription.merchantName.replace(/\s+/g, '_')}_Cancellation_Notice.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-4xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
          style={{
            background: 'var(--gs-bg-primary)',
            border: '1px solid var(--gs-border)',
            borderRadius: 'var(--gs-radius-xl)',
            boxShadow: 'var(--gs-shadow-lg)',
          }}
        >
          {/* Header */}
          <div
            className="p-5 flex items-center justify-between shrink-0"
            style={{
              background: 'var(--gs-bg-secondary)',
              borderBottom: '1px solid var(--gs-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--gs-accent-subtle)',
                  border: '1px solid rgba(139,92,246,0.2)',
                }}
              >
                <Scale className="w-5 h-5" style={{ color: 'var(--gs-accent)' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold" style={{ color: 'var(--gs-text-primary)' }}>
                    Legal Cancellation Armor
                  </h2>
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                    style={{
                      background: 'var(--gs-accent-subtle)',
                      color: 'var(--gs-accent)',
                    }}
                  >
                    Gemma-2
                  </span>
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--gs-text-tertiary)' }}>
                  Target: <strong style={{ color: 'var(--gs-text-primary)' }}>{subscription.merchantName}</strong> (${subscription.currentAmount}/mo)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{
                background: 'var(--gs-bg-tertiary)',
                color: 'var(--gs-text-tertiary)',
                border: '1px solid var(--gs-border)',
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto space-y-5 flex-1 text-sm" style={{ color: 'var(--gs-text-secondary)' }}>
            
            {/* Dark Pattern Alert */}
            <div
              className="p-4 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, var(--gs-danger-subtle), var(--gs-accent-subtle))',
                border: '1px solid rgba(244,63,94,0.2)',
              }}
            >
              <div className="flex items-start gap-3">
                <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--gs-danger)' }} />
                <div>
                  <h4 className="font-semibold text-[13px]" style={{ color: 'var(--gs-danger)' }}>{darkBrief.headline}</h4>
                  <p className="text-[12px] mt-1" style={{ color: 'var(--gs-text-secondary)' }}>{darkBrief.trapDescription}</p>
                  <p className="text-[11px] mt-1.5" style={{ color: 'var(--gs-text-tertiary)' }}>
                    <strong>Why this works:</strong> {darkBrief.defenseStrategy}
                  </p>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg"
              style={{ background: 'var(--gs-bg-secondary)', border: '1px solid var(--gs-border)' }}
            >
              {[
                { label: 'Full Name', value: userName, setter: setUserName, type: 'text', placeholder: 'Kevin Miller' },
                { label: 'Account Email', value: userEmail, setter: setUserEmail, type: 'email', placeholder: 'kevin@example.com' },
                { label: 'Card Last 4', value: lastFour, setter: setLastFour, type: 'text', placeholder: '4819', maxLength: 4, mono: true },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-[11px] font-semibold mb-1" style={{ color: 'var(--gs-text-tertiary)' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    maxLength={field.maxLength}
                    className={`w-full px-3 py-1.5 rounded-md text-[12px] focus:outline-none transition-colors ${field.mono ? 'font-mono' : ''}`}
                    style={{
                      background: 'var(--gs-bg-primary)',
                      border: '1px solid var(--gs-border)',
                      color: 'var(--gs-text-primary)',
                    }}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Notice Type Tabs */}
            <div className="flex gap-1" style={{ borderBottom: '1px solid var(--gs-border)' }}>
              {[
                { id: 'ftc' as const, icon: Sparkles, label: 'FTC Click-to-Cancel Demand' },
                { id: 'bank' as const, icon: Building, label: 'Bank Stop-Payment Affidavit' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setNoticeType(tab.id)}
                  className="pb-2.5 px-3 text-[12px] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  style={{
                    borderBottom: `2px solid ${noticeType === tab.id ? 'var(--gs-accent)' : 'transparent'}`,
                    color: noticeType === tab.id ? 'var(--gs-text-primary)' : 'var(--gs-text-tertiary)',
                  }}
                >
                  <tab.icon className="w-3.5 h-3.5" style={{ color: noticeType === tab.id ? 'var(--gs-accent)' : 'var(--gs-text-muted)' }} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Letter Preview */}
            <div className="relative">
              <pre
                className="p-4 rounded-lg text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-72 select-all"
                style={{
                  background: 'var(--gs-bg-primary)',
                  border: '1px solid var(--gs-border)',
                  color: 'var(--gs-text-secondary)',
                }}
              >
                {noticeText}
              </pre>
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium cursor-pointer"
                  style={{
                    background: 'var(--gs-bg-elevated)',
                    border: '1px solid var(--gs-border-hover)',
                    color: 'var(--gs-text-primary)',
                    boxShadow: 'var(--gs-shadow-sm)',
                  }}
                >
                  {copied ? <Check className="w-3 h-3" style={{ color: 'var(--gs-success)' }} /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium cursor-pointer"
                  style={{
                    background: 'var(--gs-bg-elevated)',
                    border: '1px solid var(--gs-border-hover)',
                    color: 'var(--gs-text-primary)',
                    boxShadow: 'var(--gs-shadow-sm)',
                  }}
                >
                  <Download className="w-3 h-3" style={{ color: 'var(--gs-info)' }} />
                  <span>.TXT</span>
                </motion.button>
              </div>
            </div>

            {/* Instructions */}
            <div
              className="p-3.5 rounded-lg text-[11px] space-y-1"
              style={{ background: 'var(--gs-bg-secondary)', border: '1px solid var(--gs-border)', color: 'var(--gs-text-tertiary)' }}
            >
              <span className="font-semibold block" style={{ color: 'var(--gs-text-secondary)' }}>How to Deploy:</span>
              <p>1. Copy and email to the merchant&apos;s support, or paste into their cancellation form.</p>
              <p>2. If they demand a phone call, cite Paragraph 2 &mdash; written revocation is legally binding (FTC + EFTA 15 U.S.C. 1693e).</p>
              <p>3. If billed again, forward the Bank Affidavit for an instant chargeback.</p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="p-4 flex items-center justify-between shrink-0"
            style={{
              background: 'var(--gs-bg-secondary)',
              borderTop: '1px solid var(--gs-border)',
            }}
          >
            <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--gs-text-tertiary)' }}>
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--gs-success)' }} />
              <span>Generated in-memory via Gemma-2 legal knowledge</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[12px] font-semibold cursor-pointer transition-colors"
              style={{
                background: 'var(--gs-bg-tertiary)',
                border: '1px solid var(--gs-border)',
                color: 'var(--gs-text-secondary)',
              }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
