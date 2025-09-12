"use client";

import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full">
      <Authenticated>
        <p>Landing Page: signed in</p>
      </Authenticated>
      <Unauthenticated>
        <p>Landing Page: signed out</p>
      </Unauthenticated>
    </div>
  );
}
