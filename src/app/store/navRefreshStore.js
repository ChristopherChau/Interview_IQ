import { create } from 'zustand';

export const useNavStore = create((set) => ({
  refreshKey: 0,
  bump: () => set((s) => ({ refreshKey: s.refreshKey + 1 })),
}));
