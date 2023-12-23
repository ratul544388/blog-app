"use client";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <>
      <ClerkLoading>Loading...</ClerkLoading>
      <ClerkLoaded>
        <SignUp
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
      </ClerkLoaded>
    </>
  );
}