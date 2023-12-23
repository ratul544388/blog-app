"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as dateFns from "date-fns";

interface CreatedAtProps {
  date: Date;
  className?: string;
}

export const CreatedAt = ({ date, className }: CreatedAtProps) => {
  return (
    <p className={cn("text-muted-foreground text-sm line-clamp-1", className)}>
      {dateFns.format(date, "dd-MMM-yyyy")}
    </p>
  );
};
