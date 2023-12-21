"use client";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Edit, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { SearchInput } from "../search-input";
import { ThemeToggler } from "../theme-toggler";
import { buttonVariants } from "../ui/button";
import { UserButton } from "../user-button";
import { NavLinks } from "./nav-links";
import { Logo } from "./logo";
import MobileSidebar from "../mobile-sidebar";

interface NavbarProps {
  currentUser: User | null;
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 border-b h-[65px] bg-background z-50">
      <MaxWidthWrapper className="h-full flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <MobileSidebar currentUser={currentUser} />
          <Logo />
        </div>
        <SearchInput />
        <div className="flex items-center justify-end gap-5">
          <ThemeToggler className="hidden lg:block" />
          <NavLinks />
          {currentUser ? (
            <>
              {pathname.includes("new") || pathname.includes("edit") ? (
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({
                      variant: "destructive",
                    })
                  )}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Link>
              ) : (
                <Link href="/blogs/new" className={cn(buttonVariants())}>
                  <Edit className="h-4 w-4 mr-2" />
                  Write
                </Link>
              )}
              <UserButton currentUser={currentUser} />
            </>
          ) : (
            <Link href="sign-in" className={cn(buttonVariants())}>
              Login
            </Link>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
