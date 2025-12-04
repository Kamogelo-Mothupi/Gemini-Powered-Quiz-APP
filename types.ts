export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum AppState {
  SETUP = 'SETUP',
  LOADING = 'LOADING',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  ERROR = 'ERROR',
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizConfig {
  category: string;
  difficulty: Difficulty;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  history: {
    question: Question;
    userSelected: number;
    isCorrect: boolean;
  }[];
}