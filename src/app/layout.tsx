import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/header/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/get-current-user";
import { ToastProvider } from "@/providers/toast-provider";
import { QueryProvider } from "@/providers/query-provider";
import ModalProvider from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuillQuest - Explore, Create, and Share",
  description: "Embark on a creative journey with QuillQuest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, "bg-accent/60")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <ToastProvider />
              <Navbar currentUser={currentUser} />
              <ModalProvider />
              <main className="min-h-screen h-full pt-[80px] pb-2">
                {children}
              </main>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
