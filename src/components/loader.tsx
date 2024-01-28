"use client";

import { Loader2 } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className="fixed bg-background/20 transition-all inset-0 flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
    </div>
  );
};
