"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { navItems } from "@/lib/constants/navigation-items";
import { Authenticated, Unauthenticated } from "convex/react";

export default function MobileNavigation() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 p-4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Unauthenticated>
            {navItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Button variant="ghost" asChild>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </SheetClose>
            ))}
            <hr className="my-2" />
            <SignInButton>
              <SheetClose asChild>
                <Button variant="outline">Sign in</Button>
              </SheetClose>
            </SignInButton>
            <SignUpButton>
              <SheetClose asChild>
                <Button>Sign up</Button>
              </SheetClose>
            </SignUpButton>
          </Unauthenticated>

          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </SheetContent>
    </Sheet>
  );
}
