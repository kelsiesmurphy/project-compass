// convex/quiz.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRandomQuestion = query({
  args: {},
  handler: async ({ db }) => {
    const questions = await db.query("questions").collect();
    if (questions.length === 0) return null;
    return questions[Math.floor(Math.random() * questions.length)];
  },
});

export const submitAnswer = mutation({
  args: {
    userId: v.string(),
    questionId: v.id("questions"),
    chosenIndex: v.number(),
  },
  handler: async ({ db }, { userId, questionId, chosenIndex }) => {
    const question = await db.get(questionId);
    if (!question) throw new Error("Question not found");

    const isCorrect = question.correctIndex === chosenIndex;

    await db.insert("quiz_attempts", {
      userId,
      questionId,
      chosenIndex,
      isCorrect,
      createdAt: Date.now(),
    });

    return { isCorrect };
  },
});
