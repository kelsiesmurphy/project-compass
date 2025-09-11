// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  questions: defineTable({
    question: v.string(),
    options: v.array(v.string()),
    correctIndex: v.number(),
    category: v.optional(v.string()),
  }),

  quiz_attempts: defineTable({
    userId: v.string(),
    questionId: v.id("questions"),
    chosenIndex: v.number(),
    isCorrect: v.boolean(),
    createdAt: v.number(),
  }),

  messages: defineTable({
    author: v.string(),
    content: v.string(),
  }),
});
