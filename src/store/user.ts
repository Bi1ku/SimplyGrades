import { Student, Teacher } from '@prisma/client';
import { create } from 'zustand';

export interface UserState {
  data: Teacher | Student | null;
  setData: (data: Teacher | Student | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  data: null,
  setData: (data: Teacher | Student | null) => set({ data }),
}));

export default useUserStore;
