import { create } from "zustand";

export const useFeedbackStore = create((set) => ({
  result: null,
  setResult: (result) => set({result}),
}));