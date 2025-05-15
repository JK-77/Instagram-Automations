import axios from 'axios';

const DEEPSEEK_API_KEY = 'sk-13dcee7861bf467e984416b27aec28e2'; // Replace with your DeepSeek API key
const DEEPSEEK_API_URL = 'https://api.deepseek.com'; // Replace with the actual DeepSeek API endpoint

export const deepseekClient = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json',
  },
});