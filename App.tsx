import React, { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { generateQuizQuestions } from './services/geminiService';
import { AppState, Question, QuizConfig, QuizResult } from './types';
import { GlassCard } from './components/GlassCard';
import { AlertTriangle } from 'lucide-react';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SETUP);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (selectedConfig: QuizConfig) => {
    setConfig(selectedConfig);
    setAppState(AppState.LOADING);
    setError(null);

    try {
      const generatedQuestions = await generateQuizQuestions(
        selectedConfig.category,
        selectedConfig.difficulty
      );
      setQuestions(generatedQuestions);
      setAppState(AppState.QUIZ);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate questions. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleFinishQuiz = (history: any[]) => {
    const correctCount = history.filter(h => h.isCorrect).length;
    setResult({
      score: correctCount,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      history: history
    });
    setAppState(AppState.RESULT);
  };

  const handleRestart = () => {
    if (config) {
      handleStartQuiz(config);
    } else {
      setAppState(AppState.SETUP);
    }
  };

  const handleHome = () => {
    setAppState(AppState.SETUP);
    setQuestions([]);
    setConfig(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen text-slate-800 relative overflow-hidden font-sans bg-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Abstract Background Blobs - Light Theme */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="fixed top-[40%] left-[40%] w-[30%] h-[30%] bg-pink-200/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {appState === AppState.SETUP && (
          <SetupScreen onStart={handleStartQuiz} />
        )}

        {appState === AppState.LOADING && config && (
          <LoadingScreen category={config.category} />
        )}

        {appState === AppState.QUIZ && (
          <QuizScreen questions={questions} onFinish={handleFinishQuiz} />
        )}

        {appState === AppState.RESULT && result && (
          <ResultScreen result={result} onRestart={handleRestart} onHome={handleHome} />
        )}

        {appState === AppState.ERROR && (
          <GlassCard className="p-8 max-w-md w-full text-center border-red-200">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <Button onClick={handleHome} variant="secondary">
              Go Back Home
            </Button>
          </GlassCard>
        )}
      </div>
      
      {/* Footer */}
      <footer className="fixed bottom-4 w-full text-center text-slate-400 text-xs pointer-events-none">
        <p>Powered by Gemini AI • Glassmorphism UI</p>
      </footer>
    </div>
  );
};

export default App;