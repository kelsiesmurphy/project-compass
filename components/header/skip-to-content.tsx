import React from "react";
import { Button } from "@/components/ui/button";

export default function SkipToContent() {
  return (
    <Button
      asChild
      className="absolute left-2 -top-12 focus:top-2 focus:outline-none focus:ring focus:ring-primary transition-all duration-200"
    >
      <a href="#content">Skip to Content</a>
    </Button>
  );
}
