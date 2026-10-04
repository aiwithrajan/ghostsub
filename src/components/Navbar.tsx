'use client';

import React from 'react';
import { Ghost, ShieldCheck, UploadCloud, RefreshCw, Lock, Search, BookOpen } from 'lucide-react';

interface NavbarProps {
  onLoadDemo: () => void;
  onOpenPrivacyModal: () => void;
  onOpenUploadModal: () => void;
  onOpenCommandPalette: () => void;
  isAnalyzing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoadDemo,
  onOpenPrivacyModal,
  onOpenUploadModal,
  onOpenCommandPalette,
  isAnalyzing
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#000000]/80 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between">
        
        {/* Left: Linear Brand Icon */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-white/[0.08] border border-white/[0.12] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
              <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 9v-7h7v7h-7z" opacity="0.3" />
              <path d="M4 4h7v7H4V4zm9 9h7v7h-7v-7z" fill="white" />
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-white font-sans">
            GhostSub
          </span>
          <span className="text-[10px] font-mono text-[#525660] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            v2.0
          </span>
        </div>

        {/* Center: Subtle Status Badges (Linear style) */}
        <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-[#8A8F98]">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>TabPFN Core</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
            <span>Gemma-2 Legal</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <Lock className="w-3 h-3 text-[#525660]" />
            <span>100% In-Memory</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] text-[#8A8F98] bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] hover:text-white transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="text-[10px] text-[#525660] bg-white/[0.06] px-1 rounded">⌘K</kbd>
          </button>

          {/* Manifesto Modal */}
          <button
            onClick={onOpenPrivacyModal}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] text-[#8A8F98] hover:text-white transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Why Open</span>
          </button>

          {/* Upload CSV */}
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#8A8F98] hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload CSV</span>
          </button>

          {/* Exact Linear White Pill Button */}
          <button
            onClick={onLoadDemo}
            className="linear-btn-white flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>Load Demo</span>
          </button>
        </div>

      </div>
    </header>
  );
};
