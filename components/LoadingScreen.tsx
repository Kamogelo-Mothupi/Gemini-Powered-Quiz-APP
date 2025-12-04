import React from 'react';
import { Loader2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface LoadingScreenProps {
  category: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ category }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full max-w-md mx-auto p-4 animate-in fade-in duration-500">
      <GlassCard className="p-10 w-full flex flex-col items-center text-center shadow-2xl">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-10 animate-pulse"></div>
          <Loader2 className="w-16 h-16 text-indigo-500 animate-spin relative z-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Constructing Quiz</h2>
        <p className="text-slate-500">
          Gemini AI is crafting unique <span className="font-semibold text-indigo-600">{category}</span> questions just for you...
        </p>
      </GlassCard>
    </div>
  );
};