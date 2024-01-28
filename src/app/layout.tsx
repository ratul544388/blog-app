import { Navbar } from "@/components/header/navbar";
import { getCurrentUser } from "@/lib/get-current-user";
import { cn } from "@/lib/utils";
import ModalProvider from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

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
              <ModalProvider />
              <Navbar currentUser={currentUser} />
              <main className="min-h-screen pt-[80px] pb-10">{children}</main>
              <Footer />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
