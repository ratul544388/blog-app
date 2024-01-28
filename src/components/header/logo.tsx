"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-lg font-bold bg-gradient-to-r to-green-500 from-emerald-600 bg-clip-text text-transparent",
        className
      )}
    >
      QuillQuest
    </Link>
  );
};
