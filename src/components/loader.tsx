"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return <Loader2 className={cn("h-8 w-8 mx-auto animate-spin", className)} />;
};
