import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExamQuestions = create(
  persist(
    (set, get) => ({
      questions: [],
      questionIndex: 0,
      setQuestions: (questions) => set(() => ({ questions, questionIndex: 0 })),
      setQuestionIndex: (questionIndex) => set(() => ({ questionIndex })),
      reset: () => set(() => ({ questions: [], questionIndex: 0 })),
    }),
    {
      name: "zustand-exam-questions",
    }
  )
);
