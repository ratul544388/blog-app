"use client";

import { useTheme } from "next-themes";
import DarkModeToggle from "react-dark-mode-toggle";

export function ThemeToggler() {
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
      onChange={onChange}
      checked={theme === "dark"}
      size={45}
    />
  );
}
