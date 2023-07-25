import axios from 'axios';
import { generalizeError, notify } from './utils';

const a = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.example.com'
      : 'http://localhost:3000/api',
  timeout: 10000,
});

a.interceptors.response.use((response) => {
  if (!response.data.error) return response.data;
  notify(generalizeError(response.data.error), 'error');
  return null;
});

export default a;
