"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Id } from "@/convex/_generated/dataModel";
import { use } from "react";
import MapQuestion from "@/components/map-question";

export default function PlayQuiz({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId: rawQuizId } = use(params);
  const quizId = rawQuizId as Id<"quizzes">;

  const { userId } = useAuth();
  const router = useRouter();

  const quiz = useQuery(api.quizzes.getQuizWithQuestions, { quizId });
  const start = useMutation(api.quizzes.startQuiz);
  const answer = useMutation(api.quizzes.answerQuestion);
  const complete = useMutation(api.quizzes.completeQuiz);

  const [quizSessionId, setQuizSessionId] =
    useState<Id<"quiz_sessions"> | null>(null);
  const [index, setIndex] = useState(0);

  if (!quiz) return <div>Loading…</div>;

  const questions = quiz.questions.filter(Boolean);
  const current = questions[index];

  if (!current) return <div>Loading question…</div>;

  async function handleStart() {
    if (!userId) {
      alert("You must be logged in to start the quiz!");
      return;
    }

    // Start returns just the session ID now
    const sessionId = await start({ quizId: quizId, userId });
    setQuizSessionId(sessionId);
  }

  async function handleAnswerGeneric(answerValue: string, metadata?: unknown) {
    if (!quizSessionId || !current) return;

    await answer({
      quizSessionId,
      quizQuestionId: current._id,
      answer: answerValue,
      metadata,
    });

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      await complete({ quizSessionId });
      router.push(
        `/quiz/${quizId}/results?quizSessionId=${quizSessionId.toString()}`
      );
    }
  }

  if (!quizSessionId) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">{quiz.title}</h1>
        <p>{quiz.description}</p>
        <Button onClick={handleStart} className="mt-4">
          Start Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 flex-1">
      <h2 className="text-lg font-semibold">
        Question {index + 1} of {questions.length}
      </h2>

      {current.type === "multiple_choice" && (
        <>
          <p className="text-xl">{current.text}</p>
          <div className="grid gap-2 mt-4">
            {current.options.map((opt: string, i: number) => (
              <Button
                key={i}
                variant="outline"
                onClick={() => handleAnswerGeneric(String(i))}
              >
                {opt}
              </Button>
            ))}
          </div>
        </>
      )}

      {current.type === "map_click" && (
        <MapQuestion
          question={current}
          onAnswer={(regionName) =>
            handleAnswerGeneric(regionName, { mapId: current.metadata?.mapId })
          }
        />
      )}
    </div>
  );
}
