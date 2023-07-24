import axios from 'axios';
import useNotificationStore from './store/notification';
const notification = useNotificationStore((state) => state);

const a = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.example.com'
      : 'http://localhost:3000',
  timeout: 10000,
});

a.interceptors.response.use((response) => {
  if (!response.data.error) return response.data;
  notification.setOpen(true);
  notification.setMessage(response.data.error);
  notification.setSeverity('error');
  return { data: null };
});

export default a;
