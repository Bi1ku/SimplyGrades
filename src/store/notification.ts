import { create } from 'zustand';

export interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  setOpen: (open: boolean) => void;
  setMessage: (message: string) => void;
  setSeverity: (severity: 'success' | 'error') => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  open: false,
  message: '',
  severity: 'success',
  setOpen: (open: boolean) => set({ open }),
  setMessage: (message: string) => set({ message }),
  setSeverity: (severity: 'success' | 'error') => set({ severity }),
}));

export default useNotificationStore;
