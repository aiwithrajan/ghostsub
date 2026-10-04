'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  kbd?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'sm',
  icon,
  kbd,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = size === 'sm' 
    ? 'text-[12px] h-8 px-2.5 gap-1.5' 
    : 'text-[13px] h-9 px-3.5 gap-2';

  const variantStyles = {
    primary: 'bg-[#8B7CFF] text-white hover:bg-[#7A69FA] shadow-[0_0_16px_rgba(139,124,255,0.3)] active:scale-[0.98]',
    secondary: 'bg-[#14161A] text-[#F4F4F6] border border-white/[0.08] hover:border-white/[0.16] hover:bg-[#191B20] active:scale-[0.98]',
    ghost: 'text-[#8E929B] hover:text-[#F4F4F6] hover:bg-white/[0.04] active:scale-[0.98]',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 active:scale-[0.98]',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {kbd && (
        <kbd className="ml-1 text-[9px] px-1 py-0.5 rounded bg-white/[0.08] text-[#8E929B] border border-white/[0.1]">
          {kbd}
        </kbd>
      )}
    </button>
  );
};
