import { GoogleGenerativeAI } from '@google/generative-ai';


const GEMINI_API_KEY='AIzaSyC50BqWHoaTqFcBQZqDVwf4NR7TfLEMcb4';


export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
