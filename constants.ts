import { Difficulty } from './types';

export const CATEGORIES = [
  { id: 'general', label: 'General Knowledge', icon: 'Globe', color: 'text-blue-500', hoverBg: 'hover:bg-blue-50', activeBorder: 'border-blue-400', activeBg: 'bg-blue-50' },
  { id: 'science', label: 'Science & Nature', icon: 'Atom', color: 'text-emerald-500', hoverBg: 'hover:bg-emerald-50', activeBorder: 'border-emerald-400', activeBg: 'bg-emerald-50' },
  { id: 'history', label: 'History', icon: 'Hourglass', color: 'text-amber-500', hoverBg: 'hover:bg-amber-50', activeBorder: 'border-amber-400', activeBg: 'bg-amber-50' },
  { id: 'tech', label: 'Technology', icon: 'Cpu', color: 'text-indigo-500', hoverBg: 'hover:bg-indigo-50', activeBorder: 'border-indigo-400', activeBg: 'bg-indigo-50' },
  { id: 'cars', label: 'Cars & Automotive', icon: 'Car', color: 'text-red-500', hoverBg: 'hover:bg-red-50', activeBorder: 'border-red-400', activeBg: 'bg-red-50' },
  { id: 'entertainment', label: 'Movies & Music', icon: 'Film', color: 'text-purple-500', hoverBg: 'hover:bg-purple-50', activeBorder: 'border-purple-400', activeBg: 'bg-purple-50' },
  { id: 'geography', label: 'Geography', icon: 'Map', color: 'text-cyan-500', hoverBg: 'hover:bg-cyan-50', activeBorder: 'border-cyan-400', activeBg: 'bg-cyan-50' },
  { id: 'coding', label: 'Programming', icon: 'Code', color: 'text-slate-600', hoverBg: 'hover:bg-slate-50', activeBorder: 'border-slate-400', activeBg: 'bg-slate-100' },
];

export const DIFFICULTIES = [
  { value: Difficulty.EASY, label: 'Easy', color: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200' },
  { value: Difficulty.MEDIUM, label: 'Medium', color: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-200' },
  { value: Difficulty.HARD, label: 'Hard', color: 'bg-rose-500', text: 'text-rose-700', border: 'border-rose-200' },
];

export const QUESTIONS_PER_QUIZ = 10;