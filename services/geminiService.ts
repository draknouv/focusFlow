
import { GoogleGenAI } from "@google/genai";
import { BacklogItem } from "../types";

export const generateStudyPlan = async (backlog: BacklogItem[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const pendingItems = backlog.filter(i => !i.isCompleted);
  
  if (pendingItems.length === 0) return "No pending backlog items! Time to relax or start a new chapter.";

  const prompt = `
    I am a JEE student with the following backlog of chapters:
    ${pendingItems.map(i => `- ${i.subject}: ${i.title} (${i.priority} priority, ${i.estimatedHours}h estimated)`).join('\n')}
    
    Can you generate a highly efficient 3-day study plan to clear the most critical backlogs first? 
    Focus on Physics, Chemistry, and Maths balance. Be encouraging and brief. 
    Use a student-friendly tone like a senior mentor.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Couldn't generate a plan. Try again later.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI mentor is busy preparing questions for the next mock test. Please try again later.";
  }
};
