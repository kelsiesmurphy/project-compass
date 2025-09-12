// convex/seed.ts
import { mutation } from "./_generated/server";

export const seedCapitalTrivia = mutation({
  args: {},
  handler: async ({ db }) => {
    const questions = [
      {
        text: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctIndex: 0,
        category: "capitals",
      },
      {
        text: "What is the capital of Japan?",
        options: ["Seoul", "Tokyo", "Kyoto", "Osaka"],
        correctIndex: 1,
        category: "capitals",
      },
      {
        text: "What is the capital of Brazil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correctIndex: 2,
        category: "capitals",
      },
      {
        text: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correctIndex: 2,
        category: "capitals",
      },
      {
        text: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctIndex: 2,
        category: "capitals",
      },
    ];

    const triviaQuestionIds = [];
    for (const q of questions) {
      const id = await db.insert("trivia_questions", q);
      triviaQuestionIds.push(id);
    }

    const quiz = await db.insert("trivia_quizzes", {
      title: "World Capitals Quiz",
      description: "Test your knowledge of world capitals!",
      triviaQuestionIds,
    });

    return { quiz, questions: triviaQuestionIds.length };
  },
});
