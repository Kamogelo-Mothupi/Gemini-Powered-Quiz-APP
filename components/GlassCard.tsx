import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden ${className}`}>
      {children}
    </div>
  );
};