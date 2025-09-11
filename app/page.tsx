'use client'

import { Authenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full">
      <Authenticated>
        <Content />
      </Authenticated>
    </div>
  );
}

function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);
  return <div>Authenticated messages: {messages?.length}</div>;
}
