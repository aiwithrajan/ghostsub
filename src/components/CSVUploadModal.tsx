'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';
import { X, UploadCloud, FileSpreadsheet, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { RawTransaction } from '@/types';

interface CSVUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransactionsLoaded: (txs: RawTransaction[]) => void;
  onLoadDemo: () => void;
}

export const CSVUploadModal: React.FC<CSVUploadModalProps> = ({
  isOpen,
  onClose,
  onTransactionsLoaded,
  onLoadDemo
}) => {
  const [error, setError] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [previewCount, setPreviewCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsing(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rows = results.data as Record<string, string>[];
          if (!rows || rows.length === 0) {
            throw new Error('No rows found in uploaded CSV file.');
          }

          // Auto-detect columns
          const firstRow = rows[0];
          const keys = Object.keys(firstRow);

          const dateKey = keys.find(k => /date|posted|trans_date/i.test(k));
          const descKey = keys.find(k => /desc|merchant|payee|name|memo/i.test(k));
          const amountKey = keys.find(k => /amount|debit|charge|total/i.test(k));

          if (!dateKey || !descKey || !amountKey) {
            throw new Error(`Could not detect Date, Description, or Amount columns. Found: ${keys.join(', ')}`);
          }

          const parsedTransactions: RawTransaction[] = rows
            .map((row, index) => {
              const rawAmount = parseFloat(String(row[amountKey] || '0').replace(/[^0-9.-]+/g, ''));
              return {
                id: `user-tx-${index}-${Date.now()}`,
                date: row[dateKey] || new Date().toISOString().split('T')[0],
                description: String(row[descKey] || 'UNKNOWN').trim(),
                amount: Math.abs(rawAmount) || 0,
                category: 'Imported'
              };
            })
            .filter(t => t.amount > 0 && t.description.length > 1);

          if (parsedTransactions.length === 0) {
            throw new Error('No valid positive transaction amounts found in CSV.');
          }

          setPreviewCount(parsedTransactions.length);
          setTimeout(() => {
            onTransactionsLoaded(parsedTransactions);
            setParsing(false);
            onClose();
          }, 800);

        } catch (err: any) {
          setError(err?.message || 'Failed to parse CSV file.');
          setParsing(false);
        }
      },
      error: (err) => {
        setError(`CSV Parser error: ${err.message}`);
        setParsing(false);
      }
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-lg overflow-hidden p-5"
          style={{
            background: 'var(--gs-bg-primary)',
            border: '1px solid var(--gs-border)',
            borderRadius: 'var(--gs-radius-xl)',
            boxShadow: 'var(--gs-shadow-lg)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="p-2 rounded-lg"
                style={{ background: 'var(--gs-accent-subtle)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                <FileSpreadsheet className="w-4 h-4" style={{ color: 'var(--gs-accent)' }} />
              </div>
              <div>
                <h3 className="font-bold text-[14px]" style={{ color: 'var(--gs-text-primary)' }}>
                  Import Bank Statement
                </h3>
                <p className="text-[11px]" style={{ color: 'var(--gs-text-tertiary)' }}>
                  100% in-memory browser processing
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg cursor-pointer transition-colors"
              style={{ background: 'var(--gs-bg-tertiary)', color: 'var(--gs-text-tertiary)', border: '1px solid var(--gs-border)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drop Zone */}
          <label
            className="rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer text-center transition-all"
            style={{
              border: '2px dashed var(--gs-border-hover)',
              background: 'var(--gs-bg-secondary)',
            }}
          >
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={handleFileUpload}
              disabled={parsing}
            />
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--gs-accent-subtle)', border: '1px solid rgba(139,92,246,0.15)' }}
            >
              {parsing
                ? <RefreshCw className="w-5 h-5 animate-spin" style={{ color: 'var(--gs-accent)' }} />
                : <UploadCloud className="w-5 h-5" style={{ color: 'var(--gs-accent)' }} />
              }
            </div>
            <div>
              <span className="font-semibold block text-[13px]" style={{ color: 'var(--gs-text-primary)' }}>
                {parsing ? 'Parsing in memory...' : 'Drop your bank CSV here'}
              </span>
              <span className="text-[11px] mt-0.5 block" style={{ color: 'var(--gs-text-muted)' }}>
                Chase, BoA, Wells Fargo, Amex, Apple Card, Revolut
              </span>
            </div>
          </label>

          {/* Success */}
          {previewCount !== null && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-lg text-[12px] flex items-center gap-2"
              style={{ background: 'var(--gs-success-subtle)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--gs-success)' }}
            >
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Parsed {previewCount} transactions — running TabPFN...</span>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-lg text-[12px] flex items-start gap-2"
              style={{ background: 'var(--gs-danger-subtle)', border: '1px solid rgba(244,63,94,0.2)', color: 'var(--gs-danger)' }}
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Demo fallback */}
          <div
            className="mt-4 pt-3 flex items-center justify-between text-[12px]"
            style={{ borderTop: '1px solid var(--gs-border)' }}
          >
            <span style={{ color: 'var(--gs-text-muted)' }}>No CSV handy?</span>
            <button
              onClick={() => {
                onLoadDemo();
                onClose();
              }}
              className="font-semibold cursor-pointer transition-colors"
              style={{ color: 'var(--gs-accent)' }}
            >
              Load Demo Statement &rarr;
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
