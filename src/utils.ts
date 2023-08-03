import { Student, Teacher } from '@prisma/client';
import useNotificationStore from './store/notification';

export const formatContactNumber = (number: string) => {
  var cleaned = ('' + number).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
};

export const formatFullName = (user: Teacher | Student | null) =>
  `${user?.firstName} ${user?.lastName}`;

export const notify = (
  message: string,
  severity: 'success' | 'error' = 'success',
) => {
  useNotificationStore.getState().setOpen(true);
  useNotificationStore.getState().setMessage(message);
  useNotificationStore.getState().setSeverity(severity);
};

export const generalizeError = (error: string) => {
  if (error.length < 50) return error;
  return 'Something went wrong.';
};
