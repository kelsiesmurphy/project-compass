// convex/seed.ts
import { mutation } from "./_generated/server";

// Seed: World Capitals Quiz
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

// Seed: General Country Trivia Quiz
export const seedGeneralCountryTrivia = mutation({
  args: {},
  handler: async ({ db }) => {
    const questions = [
      {
        text: "Which country has the largest population in the world?",
        options: ["India", "China", "United States", "Indonesia"],
        correctIndex: 1,
        category: "population",
      },
      {
        text: "Which is the largest country by land area?",
        options: ["Canada", "China", "Russia", "United States"],
        correctIndex: 2,
        category: "land_area",
      },
      {
        text: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "South Korea", "Japan", "Thailand"],
        correctIndex: 2,
        category: "nickname",
      },
      {
        text: "Which continent is Egypt located in?",
        options: ["Asia", "Europe", "Africa", "Middle East"],
        correctIndex: 2,
        category: "continent",
      },
      {
        text: "Which country has the most time zones?",
        options: ["United States", "France", "Russia", "Australia"],
        correctIndex: 1,
        category: "timezones",
      },
    ];

    const triviaQuestionIds = [];
    for (const q of questions) {
      const id = await db.insert("trivia_questions", q);
      triviaQuestionIds.push(id);
    }

    const quiz = await db.insert("trivia_quizzes", {
      title: "General Country Trivia",
      description: "How much do you know about countries around the world?",
      triviaQuestionIds,
    });

    return { quiz, questions: triviaQuestionIds.length };
  },
});
