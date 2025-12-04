import React, { useState } from 'react';
import { CATEGORIES, DIFFICULTIES } from '../constants';
import { Difficulty, QuizConfig } from '../types';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { Globe, Atom, Hourglass, Cpu, Car, Film, Map, Code, BrainCircuit, Sparkles } from 'lucide-react';

interface SetupScreenProps {
  onStart: (config: QuizConfig) => void;
}

const IconMap: Record<string, React.ElementType> = {
  Globe, Atom, Hourglass, Cpu, Car, Film, Map, Code
};

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].id);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);

  const handleStart = () => {
    onStart({
      category: CATEGORIES.find(c => c.id === selectedCategory)?.label || 'General Knowledge',
      difficulty: selectedDifficulty,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-white shadow-xl shadow-indigo-100">
          <BrainCircuit className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-2 tracking-tight">
          Gemini Quiz
        </h1>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">
          Challenge yourself with AI-generated questions across various topics.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Select Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = IconMap[cat.icon] || Globe;
              const isSelected = selectedCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    group flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border
                    ${isSelected 
                      ? `${cat.activeBg} ${cat.activeBorder} shadow-lg scale-[1.02]` 
                      : `bg-white border-slate-100 ${cat.hoverBg} hover:border-slate-300 hover:shadow-md`
                    }
                  `}
                >
                  <div className={`
                    p-3 rounded-full mb-3 transition-colors duration-300
                    ${isSelected ? 'bg-white shadow-sm' : 'bg-slate-50 group-hover:bg-white group-hover:shadow-sm'}
                  `}>
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <span className={`text-sm font-semibold transition-colors ${isSelected ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Select Difficulty</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {DIFFICULTIES.map((diff) => {
              const isSelected = selectedDifficulty === diff.value;
              return (
                <button
                  key={diff.value}
                  onClick={() => setSelectedDifficulty(diff.value)}
                  className={`
                    flex-1 py-4 px-4 rounded-xl font-semibold transition-all duration-300 border flex items-center justify-center gap-2
                    ${isSelected
                      ? `${diff.color} border-transparent text-white shadow-lg shadow-black/5 transform -translate-y-1`
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
                    }
                  `}
                >
                  {diff.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleStart} className="w-full md:w-auto md:px-12 py-4 text-lg shadow-xl shadow-cyan-500/20">
            Start Quiz
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};