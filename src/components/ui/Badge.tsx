'use client';

import React from 'react';

interface BadgeProps {
  variant?: 'extreme' | 'warning' | 'creep' | 'zombie' | 'neutral' | 'success' | 'tabpfn';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className = '',
}) => {
  const styles = {
    extreme: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    creep: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    zombie: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    neutral: 'bg-white/[0.04] text-[#8E929B] border-white/[0.08]',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    tabpfn: 'bg-[#8B7CFF]/10 text-[#8B7CFF] border-[#8B7CFF]/20 font-mono',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase border select-none ${styles} ${className}`}
    >
      {children}
    </span>
  );
};
