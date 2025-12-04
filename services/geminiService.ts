import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, Question } from '../types';
import { QUESTIONS_PER_QUIZ } from '../constants';

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateQuizQuestions = async (category: string, difficulty: Difficulty): Promise<Question[]> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const prompt = `Generate ${QUESTIONS_PER_QUIZ} multiple-choice quiz questions about "${category}" at a "${difficulty}" difficulty level. 
  Each question must have 4 options and exactly one correct answer. 
  Provide a short explanation for the correct answer.
  Ensure the questions are engaging and factually accurate.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Unique identifier for the question" },
              questionText: { type: Type.STRING, description: "The question text" },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "An array of 4 possible answers" 
              },
              correctAnswerIndex: { 
                type: Type.INTEGER, 
                description: "The index (0-3) of the correct answer in the options array" 
              },
              explanation: { type: Type.STRING, description: "A brief explanation of why the answer is correct" }
            },
            required: ["id", "questionText", "options", "correctAnswerIndex", "explanation"],
          },
        },
      },
    });

    if (!response.text) {
      throw new Error("No data received from Gemini.");
    }

    const questions = JSON.parse(response.text) as Question[];
    return questions;

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};