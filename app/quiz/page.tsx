// app/quiz/page.tsx
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuizPage() {
  const quizzes = useQuery(api.quizzes.getAllQuizzes, {});

  if (!quizzes) return <div>Loading…</div>;

  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full max-w-xl p-4 space-y-4">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        {quizzes.map((quiz) => (
          <Card key={quiz._id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{quiz.description}</p>
              <Button asChild>
                <Link href={`/quiz/${quiz._id}`}>Go to Quiz</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
