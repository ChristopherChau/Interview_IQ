import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFeedbackStore = create(
  persist(
    (set) => ({
      result: null,
      setResult: (result) => set({ result }),

      question: null,
      setQuestion: (question) => set({ question }),

      response: null,
      setResponse: (response) => set({ response }),

      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: "feedback-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
