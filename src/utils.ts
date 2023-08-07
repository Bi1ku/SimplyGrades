import useNotificationStore from './hooks/notification';
import { User, dummyUser } from './hooks/user';

export const formatContactNumber = (number: string) => {
  const cleaned = ('' + number).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
};

export const formatFullName = (user: User) =>
  `${user.firstName} ${user.lastName}`;

export const notify = (
  message: string,
  severity: 'success' | 'error' = 'success',
) => {
  useNotificationStore.getState().setOpen(true);
  useNotificationStore.getState().setMessage(message);
  useNotificationStore.getState().setSeverity(severity);
};

export const generalizeError = (error: string) =>
  error.length < 50 ? error : 'Something went wrong.';

export const checkUser = (user: User) =>
  JSON.stringify(user) === JSON.stringify(dummyUser) ? false : true;
