import { GoogleGenerativeAI } from '@google/generative-ai';


const GEMINI_API_KEY='AIzaSyBwwoxY6WNrKPePkOIqNt4z0kjhdVPM9_Y';


export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
