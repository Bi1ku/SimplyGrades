import axios from 'axios';
import { generalizeError, notify } from './utils';
import { BASE_URL } from './constants';

const a = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

a.interceptors.response.use((response) => {
  if (!response.data?.error) return response.data;
  notify(generalizeError(response.data.error), 'error');
  return null;
});

export default a;
