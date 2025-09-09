"use client";

import { ReactNode } from "react";
import useLenis from "@/lib/hooks/useLenis";

export default function LenisWrapper({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
