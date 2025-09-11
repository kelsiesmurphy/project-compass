// convex/seed.ts
import { mutation } from "./_generated/server";

export const seedQuestions = mutation({
  args: {},
  handler: async ({ db }) => {
    const questions = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctIndex: 0,
        category: "capital",
      },
      {
        question:
          "Which country has the flag with a red circle on a white background?",
        options: ["Japan", "Bangladesh", "South Korea", "China"],
        correctIndex: 0,
        category: "flag",
      },
      {
        question: "Which continent is Brazil in?",
        options: ["Africa", "Asia", "Europe", "South America"],
        correctIndex: 3,
        category: "geography",
      },
    ];

    for (const q of questions) {
      await db.insert("questions", q);
    }

    return { inserted: questions.length };
  },
});
