import axios from 'axios';
import { generalizeError, notify } from './utils';
import { BASE_URL } from './constants';

const a = axios.create({
  baseURL: `${BASE_URL}/api`,
});

a.interceptors.response.use((response): any => {
  if (!response.data?.error) return response;
  notify(generalizeError(response.data.error), 'error');
  return { data: null };
});

export default a;
