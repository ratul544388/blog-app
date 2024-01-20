"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn("mx-auto max-w-screen-xl px-4 xs:px-6 sm:px-8", className)}
    >
      {children}
    </div>
  );
};
