// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  trivia_questions: defineTable({
    text: v.string(), // "What is the capital of France?"
    options: v.array(v.string()), // ["Paris", "Berlin", "Rome", "Madrid"]
    correctIndex: v.number(), // index in options[]
    category: v.optional(v.string()), // e.g. "capital", "flags"
  }),

  trivia_quizzes: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    triviaQuestionIds: v.array(v.id("trivia_questions")),
  }),

  trivia_sessions: defineTable({
    userId: v.string(),
    triviaQuizId: v.id("trivia_quizzes"),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    score: v.optional(v.number()), // calculated at the end
  }),

  trivia_answers: defineTable({
    triviaSessionId: v.id("trivia_sessions"),
    triviaQuestionId: v.id("trivia_questions"),
    chosenIndex: v.number(),
    isCorrect: v.boolean(),
    answeredAt: v.number(),
  }).index("by_session", ["triviaSessionId"]),
});
