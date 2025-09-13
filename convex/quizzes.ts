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

// Answer a question
export const answerQuestion = mutation({
  args: {
    quizSessionId: v.id("quiz_sessions"),
    quizQuestionId: v.id("quiz_questions"),
    chosenIndex: v.number(),
  },
  handler: async ({ db }, { quizSessionId, quizQuestionId, chosenIndex }) => {
    const q = await db.get(quizQuestionId);
    if (!q) throw new Error("Question not found");

    return await db.insert("quiz_answers", {
      quizSessionId,
      quizQuestionId,
      chosenIndex,
      isCorrect: chosenIndex === q.correctIndex,
      answeredAt: Date.now(),
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
