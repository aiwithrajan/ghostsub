'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, Cpu, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PrivacyManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyManifestoModal: React.FC<PrivacyManifestoModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-3xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
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
            style={{ background: 'var(--gs-bg-secondary)', borderBottom: '1px solid var(--gs-border)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-lg"
                style={{ background: 'var(--gs-info-subtle)', border: '1px solid rgba(6,182,212,0.2)' }}
              >
                <Lock className="w-5 h-5" style={{ color: 'var(--gs-info)' }} />
              </div>
              <div>
                <h2 className="text-base font-bold" style={{ color: 'var(--gs-text-primary)' }}>
                  Why Open Innovation Matters
                </h2>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--gs-text-tertiary)' }}>
                  The Sovereign Financial Defense Manifesto
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg cursor-pointer transition-colors"
              style={{ background: 'var(--gs-bg-tertiary)', color: 'var(--gs-text-tertiary)', border: '1px solid var(--gs-border)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto space-y-5 flex-1 text-sm" style={{ color: 'var(--gs-text-secondary)' }}>
            
            {/* Quote Block */}
            <div
              className="p-4 rounded-lg text-[13px] leading-relaxed"
              style={{
                background: 'linear-gradient(135deg, var(--gs-info-subtle), var(--gs-accent-subtle))',
                border: '1px solid rgba(6,182,212,0.15)',
              }}
            >
              <p className="font-semibold mb-2" style={{ color: 'var(--gs-text-primary)' }}>
                &ldquo;Your bank statement is an unredacted diary of your entire life.&rdquo;
              </p>
              <p className="text-[12px]" style={{ color: 'var(--gs-text-secondary)' }}>
                It documents where you buy medication, who you dine with, how much rent you pay, and your lifestyle habits. 
                Yet commercial &ldquo;subscription killer&rdquo; apps demand full banking credentials, upload raw statements to corporate clouds, and sell consumer trends to hedge funds and ad brokers.
              </p>
            </div>

            {/* Comparison */}
            <div>
              <h3 className="text-[13px] font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--gs-text-primary)' }}>
                <ShieldCheck className="w-4 h-4" style={{ color: 'var(--gs-success)' }} />
                <span>Closed Cloud vs. GhostSub Open-Source</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Closed */}
                <div
                  className="p-4 rounded-lg space-y-2 text-[12px]"
                  style={{ background: 'var(--gs-danger-subtle)', border: '1px solid rgba(244,63,94,0.15)' }}
                >
                  <div className="flex items-center gap-1.5 font-semibold mb-2" style={{ color: 'var(--gs-danger)' }}>
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Closed Proprietary Model</span>
                  </div>
                  <ul className="space-y-2" style={{ color: 'var(--gs-text-tertiary)' }}>
                    {[
                      'Raw banking CSVs sent to third-party servers.',
                      'Charges $8\u201312/month to cancel your other fees.',
                      'Prompt history retained for model training.',
                      'Vendor lock-in: data held hostage.',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <X className="w-3 h-3 shrink-0 mt-0.5" style={{ color: 'var(--gs-danger)' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Open */}
                <div
                  className="p-4 rounded-lg space-y-2 text-[12px]"
                  style={{ background: 'var(--gs-success-subtle)', border: '1px solid rgba(16,185,129,0.15)' }}
                >
                  <div className="flex items-center gap-1.5 font-semibold mb-2" style={{ color: 'var(--gs-success)' }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>GhostSub Open-Weights Stack</span>
                  </div>
                  <ul className="space-y-2" style={{ color: 'var(--gs-text-secondary)' }}>
                    {[
                      { bold: '100% In-Memory:', text: 'Zero financial data leaves your machine.' },
                      { bold: 'TabPFN AI:', text: 'Bayesian priors analyze drift without uploads.' },
                      { bold: 'Gemma-2 Legal:', text: 'Open-weights FTC notices with zero token tracking.' },
                      { bold: '$0 Forever:', text: 'Fully open-source under Apache 2.0 / MIT.' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" style={{ color: 'var(--gs-success)' }} />
                        <span><strong>{item.bold}</strong> {item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Architecture */}
            <div
              className="p-4 rounded-lg font-mono text-[11px]"
              style={{ background: 'var(--gs-bg-primary)', border: '1px solid var(--gs-border)' }}
            >
              <span className="font-semibold block mb-2 font-sans text-[12px]" style={{ color: 'var(--gs-text-tertiary)' }}>
                Zero-Knowledge Architecture:
              </span>
              <div className="space-y-0.5 overflow-x-auto" style={{ color: 'var(--gs-text-muted)' }}>
                <div>[User Bank CSV / Statement]</div>
                <div>       |</div>
                <div>       v (Client-Side Parsing via PapaParse)</div>
                <div>[Sanitized Vectors: (Interval, Drift, Amount)]</div>
                <div>       |</div>
                <div>       |--&gt; [TabPFN Engine] --&gt; Flag Creep &amp; Zombies</div>
                <div>       |</div>
                <div>       \--&gt; [Gemma-2 Core] --&gt; Dark Patterns &amp; FTC Notices</div>
                <div>       |</div>
                <div>       v (Direct Screen Output)</div>
                <div>[1-Click Revocation Notice to Merchant]</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="p-4 flex items-center justify-between shrink-0"
            style={{ background: 'var(--gs-bg-secondary)', borderTop: '1px solid var(--gs-border)' }}
          >
            <span className="text-[11px]" style={{ color: 'var(--gs-text-muted)' }}>
              Hacktoberfest 2026 &middot; Built for Kevin &amp; Open-Source
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[12px] font-semibold cursor-pointer"
              style={{ background: 'var(--gs-bg-tertiary)', border: '1px solid var(--gs-border)', color: 'var(--gs-text-secondary)' }}
            >
              Got it
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
