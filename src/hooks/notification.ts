import { create } from 'zustand';

type Severity = 'success' | 'error' | 'info';

export interface NotificationState {
  open: boolean;
  message: string;
  severity: Severity;
  setOpen: (open: boolean) => void;
  setMessage: (message: string) => void;
  setSeverity: (severity: Severity) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  open: false,
  message: '',
  severity: 'success',
  setOpen: (open: boolean) => set({ open }),
  setMessage: (message: string) => set({ message }),
  setSeverity: (severity: Severity) => set({ severity }),
}));

export default useNotificationStore;
