import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";
import { modules } from "./test.setup";

async function seedQuiz(t: ReturnType<typeof convexTest>) {
  const q1 = await t.run(({ db }) =>
    db.insert("quiz_questions", {
      text: "What is the capital of France?",
      options: ["Paris", "Berlin", "Rome", "Madrid"],
      correctIndex: 0,
      category: "capitals",
    })
  );

  const q2 = await t.run(({ db }) =>
    db.insert("quiz_questions", {
      text: "What is the capital of Japan?",
      options: ["Seoul", "Tokyo", "Kyoto", "Osaka"],
      correctIndex: 1,
      category: "capitals",
    })
  );

  const quiz = await t.run(({ db }) =>
    db.insert("quizzes", {
      title: "Test Quiz",
      description: "Testing capitals",
      quizQuestionIds: [q1, q2],
    })
  );

  return { quiz, questions: [q1, q2] };
}

test("start a quiz session", async () => {
  const t = convexTest(schema, modules);
  const { quiz } = await seedQuiz(t);

  const sessionId = await t.mutation(api.quizzes.startQuiz, {
    quizId: quiz,
    userId: "user123",
  });

  const session = await t.run(({ db }) => db.get(sessionId));
  expect(session).toMatchObject({
    userId: "user123",
    quizId: quiz,
  });
});

test("answer questions and complete session", async () => {
  const t = convexTest(schema, modules);
  const { quiz, questions } = await seedQuiz(t);

  const sessionId = await t.mutation(api.quizzes.startQuiz, {
    quizId: quiz,
    userId: "user123",
  });

  // Answer first correctly
  await t.mutation(api.quizzes.answerQuestion, {
    quizSessionId: sessionId,
    quizQuestionId: questions[0],
    answer: "0", // correct
  });

  // Answer second incorrectly
  await t.mutation(api.quizzes.answerQuestion, {
    quizSessionId: sessionId,
    quizQuestionId: questions[1],
    answer: "0", // wrong
  });

  const result = await t.mutation(api.quizzes.completeQuiz, {
    quizSessionId: sessionId,
  });

  expect(result.score).toBe(1);
  expect(result.total).toBe(2);

  const session = await t.run(({ db }) => db.get(sessionId));
  expect(session?.score).toBe(1);
  expect(session?.completedAt).toBeTypeOf("number");
});

test("get quiz with questions", async () => {
  const t = convexTest(schema, modules);
  const { quiz, questions } = await seedQuiz(t);

  const fullQuiz = await t.query(api.quizzes.getQuizWithQuestions, {
    quizId: quiz,
  });

  expect(fullQuiz?.title).toBe("Test Quiz");
  expect(fullQuiz?.questions.map((q) => q?._id)).toEqual(questions);
});

test("get session with answers", async () => {
  const t = convexTest(schema, modules);
  const { quiz, questions } = await seedQuiz(t);

  const sessionId = await t.mutation(api.quizzes.startQuiz, {
    quizId: quiz,
    userId: "user123",
  });

  await t.mutation(api.quizzes.answerQuestion, {
    quizSessionId: sessionId,
    quizQuestionId: questions[0],
    answer: "0",
  });

  const session = await t.query(api.quizzes.getSessionWithAnswers, {
    quizSessionId: sessionId,
  });

  expect(session?.answers.length).toBe(1);
  expect(session?.answers[0].question?.text).toContain("France");
});

test("get user sessions", async () => {
  const t = convexTest(schema, modules);
  const { quiz } = await seedQuiz(t);

  await t.mutation(api.quizzes.startQuiz, {
    quizId: quiz,
    userId: "user123",
  });

  const sessions = await t.query(api.quizzes.getUserSessions, {
    userId: "user123",
  });

  expect(sessions.length).toBe(1);
  expect(sessions[0].userId).toBe("user123");
});
