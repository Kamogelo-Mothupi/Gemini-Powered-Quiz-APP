import React, { useState } from 'react';
import { Question } from '../types';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (history: any[]) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  
  const currentQuestion = questions[currentQuestionIdx];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    // Save result immediately so it feels responsive
    const result = {
      question: currentQuestion,
      userSelected: index,
      isCorrect: index === currentQuestion.correctAnswerIndex
    };
  };

  const handleNext = () => {
    // Only push to history on next to avoid duplicates if user clicks around (though options are disabled)
    // Actually simpler to just track history
    const result = {
        question: currentQuestion,
        userSelected: selectedOption!,
        isCorrect: selectedOption === currentQuestion.correctAnswerIndex
    };
    
    const newHistory = [...history, result];
    setHistory(newHistory);

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onFinish(newHistory);
    }
  };

  // Render logic for option styling in light theme
  const getOptionStyles = (index: number) => {
    if (!isAnswered) {
      return "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm hover:shadow-md hover:border-slate-300";
    }

    if (index === currentQuestion.correctAnswerIndex) {
      return "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-[0_0_0_1px_rgba(16,185,129,0.1)]";
    }

    if (selectedOption === index && index !== currentQuestion.correctAnswerIndex) {
      return "bg-rose-50 border-rose-500 text-rose-700";
    }

    return "bg-slate-50 border-slate-200 text-slate-400 opacity-70";
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 animate-in slide-in-from-right-8 duration-500">
      {/* Progress Bar */}
      <div className="mb-6 relative h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-out rounded-r-full"
          style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-6 text-sm font-semibold text-slate-500 uppercase tracking-wider">
        <span>Question {currentQuestionIdx + 1} / {questions.length}</span>
        <span className="bg-white/50 backdrop-blur px-3 py-1 rounded-full border border-slate-200 text-slate-600 shadow-sm">
          {history.length > 0 ? history.filter(h => h.isCorrect).length : 0} Correct
        </span>
      </div>

      <GlassCard className="p-6 md:p-10 mb-6 min-h-[400px] flex flex-col">
        <div className="flex-grow">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
            {currentQuestion.questionText}
          </h2>

          <div className="grid gap-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`
                  w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden
                  ${getOptionStyles(idx)}
                `}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <span className={`
                    w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold border transition-colors
                    ${isAnswered && idx === currentQuestion.correctAnswerIndex ? 'bg-emerald-500 border-emerald-500 text-white' : 
                      isAnswered && idx === selectedOption ? 'bg-rose-500 border-rose-500 text-white' : 
                      'bg-slate-100 border-slate-200 text-slate-500 group-hover:bg-white group-hover:border-slate-300'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
                
                {isAnswered && idx === currentQuestion.correctAnswerIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 relative z-10" />
                )}
                {isAnswered && selectedOption === idx && idx !== currentQuestion.correctAnswerIndex && (
                  <XCircle className="w-5 h-5 text-rose-500 relative z-10" />
                )}
              </button>
            ))}
          </div>
        </div>

        {isAnswered && (
          <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start gap-4 mb-6 bg-blue-50/50 border border-blue-100 rounded-xl p-5">
              <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 mb-1">Explanation</h4>
                <p className="text-sm text-blue-700/80 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleNext} className="group shadow-xl shadow-cyan-500/20">
                {currentQuestionIdx === questions.length - 1 ? 'See Results' : 'Next Question'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};