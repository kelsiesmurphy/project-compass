import { SignUp } from "@clerk/nextjs";
import { Users, BarChart2, LockOpen, Globe } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="grid flex-1 lg:grid-cols-2">
      <div className="hidden flex-1 items-center justify-end p-6 md:p-10 lg:flex">
        <ul className="max-w-sm space-y-8">
          <li>
            <div className="flex items-center gap-2">
              <BarChart2 className="size-4" />
              <p className="font-semibold">Track Your Progress</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Save your quiz results, streaks, and achievements so you can see
              how much you’ve improved over time.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              <p className="font-semibold">Challenge Friends</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Add friends, send quizzes, and compete on leaderboards to make
              learning fun and social.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <LockOpen className="size-4" />
              <p className="font-semibold">Unlock Personalized Features</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Get access to tailored practice, targeted training, and
              recommendations based on your strengths and weaknesses.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Globe className="size-4" />
              <p className="font-semibold">Join the Community</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Be part of a global network of explorers, earn badges, and
              participate in special events and competitions.
            </p>
          </li>
        </ul>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 md:p-10 lg:justify-start">
        <SignUp />
      </div>
    </div>
  );
}
