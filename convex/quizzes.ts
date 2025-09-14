import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fetch all quizzes
export const getAllQuizzes = query({
  args: {},
  handler: async ({ db }) => {
    return await db.query("quizzes").collect();
  },
});

// Start a new quiz session
export const startQuiz = mutation({
  args: { quizId: v.id("quizzes"), userId: v.string() },
  handler: async ({ db }, { quizId, userId }) => {
    const quizSessionId = await db.insert("quiz_sessions", {
      userId,
      quizId,
      startedAt: Date.now(),
    });
    return quizSessionId;
  },
});

export const answerQuestion = mutation({
  args: {
    quizSessionId: v.id("quiz_sessions"),
    quizQuestionId: v.id("quiz_questions"),
    answer: v.string(), // user’s raw answer (stringified)
    metadata: v.optional(v.any()), // optional extra info
  },
  handler: async (
    { db },
    { quizSessionId, quizQuestionId, answer, metadata }
  ) => {
    const question = await db.get(quizQuestionId);
    if (!question) throw new Error("Question not found");

    let isCorrect = false;

    if (question.type === "multiple_choice") {
      // Multiple choice: check numeric index
      const chosenIndex = parseInt(answer, 10);
      isCorrect = chosenIndex === question.correctIndex;
    } else if (question.type === "map_click") {
      // Map click: check region name
      const correctRegion = (
        question.metadata as { correctRegion?: string }
      )?.correctRegion?.toUpperCase();
      isCorrect = answer.toUpperCase() === correctRegion;
    }

    return await db.insert("quiz_answers", {
      quizSessionId,
      quizQuestionId,
      answer, // raw string
      isCorrect,
      answeredAt: Date.now(),
      metadata,
    });
  },
});

// Complete quiz session
export const completeQuiz = mutation({
  args: { quizSessionId: v.id("quiz_sessions") },
  handler: async ({ db }, { quizSessionId }) => {
    const answers = await db
      .query("quiz_answers")
      .withIndex("by_session", (q) => q.eq("quizSessionId", quizSessionId))
      .collect();

    const score = answers.filter((a) => a.isCorrect).length;

    await db.patch(quizSessionId, {
      completedAt: Date.now(),
      score,
    });

    // Return just the session ID and score for frontend
    return { sessionId: quizSessionId, score, total: answers.length };
  },
});

// Fetch a quiz with its questions
export const getQuizWithQuestions = query({
  args: { quizId: v.id("quizzes") },
  handler: async ({ db }, { quizId }) => {
    const quiz = await db.get(quizId);
    if (!quiz) return null;

    const questions = await Promise.all(
      quiz.quizQuestionIds.map((id) => db.get(id))
    );

    return { ...quiz, questions };
  },
});

// Fetch a session with answers and questions
export const getSessionWithAnswers = query({
  args: { quizSessionId: v.id("quiz_sessions") },
  handler: async ({ db }, { quizSessionId }) => {
    const session = await db.get(quizSessionId);
    if (!session) return null;

    const answers = await db
      .query("quiz_answers")
      .withIndex("by_session", (q) => q.eq("quizSessionId", quizSessionId))
      .collect();

    const answersWithQ = await Promise.all(
      answers.map(async (a) => ({
        ...a,
        question: await db.get(a.quizQuestionId),
      }))
    );

    return { ...session, answers: answersWithQ };
  },
});

// Fetch past sessions for a user
export const getUserSessions = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    return await db
      .query("quiz_sessions")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
  },
});
