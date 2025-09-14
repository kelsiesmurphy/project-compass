// convex/seed.ts
import { mutation } from "./_generated/server";

// Seed: World Capitals Quiz
export const seedCapitalQuiz = mutation({
  args: {},
  handler: async ({ db }) => {
    const questions = [
      {
        text: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctIndex: 0,
        category: "capitals",
        type: "multiple_choice",
      },
      {
        text: "What is the capital of Japan?",
        options: ["Seoul", "Tokyo", "Kyoto", "Osaka"],
        correctIndex: 1,
        category: "capitals",
        type: "multiple_choice",
      },
      {
        text: "What is the capital of Brazil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correctIndex: 2,
        category: "capitals",
        type: "multiple_choice",
      },
      {
        text: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correctIndex: 2,
        category: "capitals",
        type: "multiple_choice",
      },
      {
        text: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctIndex: 2,
        category: "capitals",
        type: "multiple_choice",
      },
    ];

    const quizQuestionIds = [];
    for (const q of questions) {
      const id = await db.insert("quiz_questions", q);
      quizQuestionIds.push(id);
    }

    const quiz = await db.insert("quizzes", {
      title: "World Capitals Quiz",
      description: "Test your knowledge of world capitals!",
      quizQuestionIds,
    });

    return { quiz, questions: quizQuestionIds.length };
  },
});

// Seed: General Country Quiz
export const seedGeneralCountryQuiz = mutation({
  args: {},
  handler: async ({ db }) => {
    const questions = [
      {
        text: "Which country has the largest population in the world?",
        options: ["India", "China", "United States", "Indonesia"],
        correctIndex: 1,
        category: "population",
        type: "multiple_choice",
      },
      {
        text: "Which is the largest country by land area?",
        options: ["Canada", "China", "Russia", "United States"],
        correctIndex: 2,
        category: "land_area",
        type: "multiple_choice",
      },
      {
        text: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "South Korea", "Japan", "Thailand"],
        correctIndex: 2,
        category: "nickname",
        type: "multiple_choice",
      },
      {
        text: "Which continent is Egypt located in?",
        options: ["Asia", "Europe", "Africa", "Middle East"],
        correctIndex: 2,
        category: "continent",
        type: "multiple_choice",
      },
      {
        text: "Which country has the most time zones?",
        options: ["United States", "France", "Russia", "Australia"],
        correctIndex: 1,
        category: "timezones",
        type: "multiple_choice",
      },
    ];

    const quizQuestionIds = [];
    for (const q of questions) {
      const id = await db.insert("quiz_questions", q);
      quizQuestionIds.push(id);
    }

    const quiz = await db.insert("quizzes", {
      title: "General Country Quiz",
      description: "How much do you know about countries around the world?",
      quizQuestionIds,
    });

    return { quiz, questions: quizQuestionIds.length };
  },
});

export const seedMapQuiz = mutation({
  args: {},
  handler: async ({ db }) => {
    const q = await db.insert("quiz_questions", {
      text: "Click on Namibia on the map of Africa",
      options: [], // not needed for map questions
      correctIndex: -1, // not applicable
      category: "maps",
      type: "map_click",
    });

    const quiz = await db.insert("quizzes", {
      title: "African Countries Map Quiz",
      description:
        "Test your knowledge of African geography by clicking the right country!",
      quizQuestionIds: [q],
    });

    // Patch metadata separately since schema requires `v.any()`
    await db.patch(q, {
      metadata: { mapId: "africa", correctRegion: "NAMIBIA" },
    });

    return quiz;
  },
});
