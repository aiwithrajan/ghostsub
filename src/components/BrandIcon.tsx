'use client';

import React from 'react';

interface BrandIconProps {
  name: string;
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ name, className = 'w-10 h-10' }) => {
  const normalized = name.toUpperCase();

  if (normalized.includes('ADOBE')) {
    return (
      <div className={`${className} rounded-xl bg-[#EB1000] flex items-center justify-center shrink-0 shadow-md shadow-red-950/40`}>
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" preserveAspectRatio="xMidYMid meet">
          <path d="M13.96 5.46L19.12 18H16.14L13.78 12.04H10.56L13.96 5.46ZM9.54 7.62L5.86 16.28H8.56L9.62 13.8H12.38L10.54 7.62H9.54ZM4.88 18L10.04 5.46H11.66L16.82 18H14.1L12.92 14.88H8.8L7.6 18H4.88Z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('SPOTIFY')) {
    return (
      <div className={`${className} rounded-full bg-[#1DB954] flex items-center justify-center shrink-0 shadow-md shadow-emerald-950/40`}>
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black" preserveAspectRatio="xMidYMid meet">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424a.627.627 0 01-.861.208c-2.355-1.439-5.32-1.764-8.814-.966a.625.625 0 01-.277-1.22c3.824-.873 7.106-.499 9.744 1.117a.628.628 0 01.208.861zm1.223-2.721a.784.784 0 01-1.08.258c-2.696-1.657-6.806-2.137-9.994-1.168a.785.785 0 01-.468-1.498c3.64-1.106 8.19-.571 11.284 1.328a.784.784 0 01.258 1.08zm.106-2.833C14.686 8.91 9.362 8.73 6.275 9.667a.94.94 0 01-.557-1.797c3.553-1.078 9.429-.868 13.255 1.402a.942.942 0 01-.858 1.598z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('PLANET FIT') || normalized.includes('FITNESS')) {
    return (
      <div className={`${className} rounded-xl bg-[#591C78] border border-amber-400/40 flex items-center justify-center shrink-0 shadow-md`}>
        <span className="text-amber-400 font-black font-sans text-xs tracking-tighter">PF</span>
      </div>
    );
  }

  if (normalized.includes('JOURNAL') || normalized.includes('WSJ')) {
    return (
      <div className={`${className} rounded-xl bg-black border border-white/20 flex items-center justify-center shrink-0 shadow-md`}>
        <span className="text-white font-serif font-black text-xs tracking-widest">WSJ</span>
      </div>
    );
  }

  if (normalized.includes('DISNEY')) {
    return (
      <div className={`${className} rounded-xl bg-[#113CCF] flex items-center justify-center shrink-0 shadow-md shadow-blue-950/40`}>
        <span className="text-white font-black font-sans text-xs tracking-tighter">D+</span>
      </div>
    );
  }

  if (normalized.includes('DROPBOX')) {
    return (
      <div className={`${className} rounded-xl bg-[#0061FF] flex items-center justify-center shrink-0 shadow-md shadow-blue-950/40`}>
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" preserveAspectRatio="xMidYMid meet">
          <path d="M7.06 3L2 6.47l5.06 3.47L12 6.47 7.06 3zM16.94 3L12 6.47l4.94 3.47L22 6.47 16.94 3zM2 13.41l5.06 3.47L12 13.41 7.06 9.94 2 13.41zm19.94 0l-5.06-3.47L12 13.41l4.94 3.47 5.06-3.47zM7.06 17.82L12 14.35l4.94 3.47L12 21.29l-4.94-3.47z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('AMAZON') || normalized.includes('AMZN')) {
    return (
      <div className={`${className} rounded-xl bg-[#131921] border border-[#FF9900]/40 flex items-center justify-center shrink-0 shadow-md`}>
        <span className="text-[#FF9900] font-black font-sans text-xs">prime</span>
      </div>
    );
  }

  if (normalized.includes('CLAUDE') || normalized.includes('ANTHROPIC')) {
    return (
      <div className={`${className} rounded-xl bg-[#D97757] flex items-center justify-center shrink-0 shadow-md shadow-orange-950/40`}>
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" preserveAspectRatio="xMidYMid meet">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('NETFLIX')) {
    return (
      <div className={`${className} rounded-xl bg-black border border-red-500/30 flex items-center justify-center shrink-0 shadow-md`}>
        <span className="text-[#E50914] font-black font-sans text-sm">N</span>
      </div>
    );
  }

  // Default fallback
  return (
    <div className={`${className} rounded-xl bg-[#1E2330] border border-white/10 flex items-center justify-center shrink-0 shadow-md`}>
      <span className="text-white font-bold font-mono text-xs">
        {name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
};
