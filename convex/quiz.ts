// // convex/quiz.ts
// import { mutation, query } from "./_generated/server";

// export const getRandomQuestion = query(async ({ db }) => {
//   const questions = await db.query("questions").collect();
//   return questions[Math.floor(Math.random() * questions.length)];
// });

// export const submitAnswer = mutation(
//   async ({ db }, { userId, questionId, chosenIndex }) => {
//     const question = await db.get("questions", questionId);
//     const isCorrect = question.correctIndex === chosenIndex;

//     await db.insert("quiz_attempts", {
//       userId,
//       questionId,
//       chosenIndex,
//       isCorrect,
//       createdAt: Date.now(),
//     });

//     return { isCorrect };
//   }
// );
