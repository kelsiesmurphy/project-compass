// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  quiz_questions: defineTable({
    text: v.string(), // "What is the capital of France?"
    options: v.array(v.string()), // ["Paris", "Berlin", "Rome", "Madrid"]
    correctIndex: v.number(), // index in options[]
    category: v.optional(v.string()), // e.g. "capital", "flags"
    type: v.string(), // "multiple_choice" | "map_click"
    metadata: v.optional(v.any()), 
  }),

  quizzes: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    quizQuestionIds: v.array(v.id("quiz_questions")),
  }),

  quiz_sessions: defineTable({
    userId: v.string(),
    quizId: v.id("quizzes"),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    score: v.optional(v.number()),
  }),

  quiz_answers: defineTable({
    quizSessionId: v.id("quiz_sessions"),
    quizQuestionId: v.id("quiz_questions"),
    answer: v.string(), // JSON stringified (e.g. "2", or "{lat:...,lng:...}", or "NAMIBIA")
    isCorrect: v.boolean(),
    answeredAt: v.number(),
    metadata: v.optional(v.any()), 
  }).index("by_session", ["quizSessionId"]),
});
