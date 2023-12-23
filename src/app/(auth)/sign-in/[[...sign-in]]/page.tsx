"use client";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <>
      <ClerkLoading>Loading...</ClerkLoading>
      <ClerkLoaded>
        <SignIn
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
          afterSignInUrl="/"
        />
      </ClerkLoaded>
    </>
  );
}