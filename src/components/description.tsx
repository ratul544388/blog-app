"use client";

import { cn } from "@/lib/utils";

interface DescriptionProps {
  text: string;
  className?: string;
}

export const Description = ({ text, className }: DescriptionProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: text }}
      className={cn("text-muted-foreground", className)}
    />
  );
};
