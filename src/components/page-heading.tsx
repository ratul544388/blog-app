"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface PageHeadingProps {
  label: string;
  showBackButton?: boolean;
  backButtonUrl?: string;
}

export const PageHeading = ({
  label,
  showBackButton,
  backButtonUrl = "/",
}: PageHeadingProps) => {
  return (
    <div className="flex items-center gap-2">
      {showBackButton && (
        <Link
          href={backButtonUrl}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      )}
      <h2 className="text-2xl font-bold">{label}</h2>
    </div>
  );
};
