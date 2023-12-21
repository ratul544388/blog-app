"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import DarkModeToggle from "react-dark-mode-toggle";

interface ThemeTogglerProps {
  className?: string;
}

export function ThemeToggler({ className }: ThemeTogglerProps) {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <DarkModeToggle
      className={cn("min-w-[50px]", className)}
      onChange={onChange}
      checked={theme === "dark"}
      size={45}
    />
  );
}
