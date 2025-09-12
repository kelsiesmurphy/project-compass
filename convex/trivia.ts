import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fetch all quizzes
export const getAllQuizzes = query({
  args: {},
  handler: async ({ db }) => {
    return await db.query("trivia_quizzes").collect();
  },
});

// Start a new trivia session
export const startTrivia = mutation({
  args: { triviaQuizId: v.id("trivia_quizzes"), userId: v.string() },
  handler: async ({ db }, { triviaQuizId, userId }) => {
    const triviaSessionId = await db.insert("trivia_sessions", {
      userId,
      triviaQuizId,
      startedAt: Date.now(),
    });
    return triviaSessionId;
  },
});

// Answer a question
export const answerQuestion = mutation({
  args: {
    triviaSessionId: v.id("trivia_sessions"),
    triviaQuestionId: v.id("trivia_questions"),
    chosenIndex: v.number(),
  },
  handler: async (
    { db },
    { triviaSessionId, triviaQuestionId, chosenIndex }
  ) => {
    const q = await db.get(triviaQuestionId);
    if (!q) throw new Error("Question not found");

    return await db.insert("trivia_answers", {
      triviaSessionId,
      triviaQuestionId,
      chosenIndex,
      isCorrect: chosenIndex === q.correctIndex,
      answeredAt: Date.now(),
    });
  },
});

// Complete trivia session
export const completeTrivia = mutation({
  args: { triviaSessionId: v.id("trivia_sessions") },
  handler: async ({ db }, { triviaSessionId }) => {
    const answers = await db
      .query("trivia_answers")
      .withIndex("by_session", (q) => q.eq("triviaSessionId", triviaSessionId))
      .collect();

    const score = answers.filter((a) => a.isCorrect).length;

    await db.patch(triviaSessionId, {
      completedAt: Date.now(),
      score,
    });

    // Return just the session ID and score for frontend
    return { sessionId: triviaSessionId, score, total: answers.length };
  },
});

// Fetch a quiz with its questions
export const getQuizWithQuestions = query({
  args: { quizId: v.id("trivia_quizzes") },
  handler: async ({ db }, { quizId }) => {
    const quiz = await db.get(quizId);
    if (!quiz) return null;

    const questions = await Promise.all(
      quiz.triviaQuestionIds.map((id) => db.get(id))
    );

    return { ...quiz, questions };
  },
});

// Fetch a session with answers and questions
export const getSessionWithAnswers = query({
  args: { triviaSessionId: v.id("trivia_sessions") },
  handler: async ({ db }, { triviaSessionId }) => {
    const session = await db.get(triviaSessionId);
    if (!session) return null;

    const answers = await db
      .query("trivia_answers")
      .withIndex("by_session", (q) => q.eq("triviaSessionId", triviaSessionId))
      .collect();

    const answersWithQ = await Promise.all(
      answers.map(async (a) => ({
        ...a,
        question: await db.get(a.triviaQuestionId),
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
      .query("trivia_sessions")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
  },
});
