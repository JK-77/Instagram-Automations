import axios from 'axios';

const DEEPSEEK_API_KEY = 'sk-731e6e0b3267479baa0fe89fa8ad7170'; // Replace with your DeepSeek API key
const DEEPSEEK_API_URL = 'https://api.deepseek.com'; // Replace with the actual DeepSeek API endpoint

export const deepseekClient = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json',
  },
});