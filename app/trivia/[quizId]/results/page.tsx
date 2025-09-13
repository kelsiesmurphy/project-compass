"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel"; // 👈 import Id type

export default function ResultsPage() {
  const search = useSearchParams();
  const quizSessionId = search.get("quizSessionId");

  const session = useQuery(
    api.quizzes.getSessionWithAnswers,
    quizSessionId
      ? { quizSessionId: quizSessionId as Id<"quiz_sessions"> }
      : "skip"
  );

  if (!quizSessionId) {
    return <div>Missing session id.</div>;
  }

  if (!session) {
    return <div>Loading…</div>;
  }

  const answers = session.answers?.filter(Boolean) ?? [];

  return (
    <div className="p-4 flex-1 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Results</h1>
      <p>
        Score: {session.score}/{answers.length}
      </p>
      <div className="space-y-2">
        {answers.map((a) => {
          if (!a || !a.question) return null;

          return (
            <div key={a._id} className="p-2 border rounded">
              <p className="font-medium">{a.question.text}</p>
              <p className="text-sm">
                Your answer: {a.question.options[a.chosenIndex]}{" "}
                {a.isCorrect ? "✅" : "❌"}
              </p>
              {!a.isCorrect && (
                <p className="text-sm">
                  Correct: {a.question.options[a.question.correctIndex]}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
