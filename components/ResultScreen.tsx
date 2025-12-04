import React from 'react';
import { QuizResult } from '../types';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { Trophy, RefreshCw, Home, Check, X } from 'lucide-react';

interface ResultScreenProps {
  result: QuizResult;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart, onHome }) => {
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  
  let message = "";
  let colorClass = "";
  
  if (percentage >= 90) {
    message = "Outstanding!";
    colorClass = "text-yellow-500";
  } else if (percentage >= 70) {
    message = "Great Job!";
    colorClass = "text-emerald-500";
  } else if (percentage >= 50) {
    message = "Good Effort!";
    colorClass = "text-blue-500";
  } else {
    message = "Keep Learning!";
    colorClass = "text-slate-500";
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-in zoom-in-95 duration-500">
      <div className="text-center mb-8">
        <div className="inline-block p-4 rounded-full bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 mb-4 shadow-xl shadow-yellow-500/10">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <h1 className={`text-4xl font-bold mb-2 ${colorClass}`}>{message}</h1>
        <p className="text-slate-500">You scored {result.correctAnswers} out of {result.totalQuestions}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <GlassCard className="p-6 flex flex-col items-center justify-center text-center col-span-3 md:col-span-1 shadow-md">
          <div className="text-6xl font-bold text-slate-800 mb-2">{percentage}%</div>
          <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Accuracy</div>
        </GlassCard>
        
        <GlassCard className="col-span-3 md:col-span-2 p-6 max-h-[400px] overflow-y-auto shadow-md">
          <h3 className="text-lg font-bold text-slate-800 mb-4 sticky top-0 bg-white/80 backdrop-blur p-2 -mx-2 -mt-2 rounded-t-lg z-10 border-b border-slate-100">
            Question Summary
          </h3>
          <div className="space-y-4">
            {result.history.map((item, idx) => (
              <div key={item.question.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-4 transition-colors hover:bg-slate-100">
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border
                  ${item.isCorrect ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-rose-100 border-rose-200 text-rose-600'}
                `}>
                  {item.isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-slate-800 mb-2 font-medium leading-relaxed">{idx + 1}. {item.question.questionText}</p>
                  <div className="flex flex-col sm:flex-row gap-2 text-xs font-medium">
                    {!item.isCorrect && (
                       <span className="text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100 w-fit">
                         You: {item.question.options[item.userSelected]}
                       </span>
                    )}
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 w-fit">
                      Correct: {item.question.options[item.question.correctAnswerIndex]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={onHome} variant="secondary" className="w-full sm:w-auto">
          <Home className="w-4 h-4" /> Home
        </Button>
        <Button onClick={onRestart} className="w-full sm:w-auto shadow-lg shadow-cyan-500/20">
          <RefreshCw className="w-4 h-4" /> Play Again
        </Button>
      </div>
    </div>
  );
};