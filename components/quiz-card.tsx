// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { api } from "@/convex/_generated/api";
// import { useQuery, useMutation } from "convex/react";
// import { useUser } from "@clerk/nextjs";

// export default function Quiz() {
//   const { user } = useUser();
//   const question = useQuery(api.quiz,);
//   const submitAnswer = useMutation(api.quizzes.submitAnswer);

//   const [feedback, setFeedback] = useState<string | null>(null);

//   if (!question) return <p>Loading...</p>;

//   const handleAnswer = async (i: number) => {
//     const res = await submitAnswer({
//       userId: user!.id,
//       questionId: question._id,
//       chosenIndex: i,
//     });
//     setFeedback(res.isCorrect ? "✅ Correct!" : "❌ Wrong!");
//   };

//   return (
//     <Card className="max-w-lg mx-auto mt-10">
//       <CardHeader>
//         <h2 className="text-xl font-bold">{question.question}</h2>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-2">
//         {question.options.map((opt: string, i: number) => (
//           <Button
//             key={i}
//             onClick={() => handleAnswer(i)}
//             variant="outline"
//             className="w-full"
//           >
//             {opt}
//           </Button>
//         ))}
//         {feedback && <p className="mt-4 text-center">{feedback}</p>}
//       </CardContent>
//     </Card>
//   );
// }
