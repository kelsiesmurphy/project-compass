"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constants/navigation-items";

export default function DesktopNavigation() {
  return (
    <div className="hidden md:flex items-center gap-x-4">
      <Unauthenticated>
        {navItems.map((item) => (
          <Button variant="ghost" asChild key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
        <SignInButton>
          <Button variant="outline">Sign in</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>

      <Authenticated>
        <UserButton />
      </Authenticated>
    </div>
  );
}
