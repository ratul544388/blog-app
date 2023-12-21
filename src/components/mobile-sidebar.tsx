"use client";

import { useNavLinks } from "@/hooks/use-nav-links";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { BadgeCheck, Menu, UsersRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./header/logo";
import { Button } from "./ui/button";
import { ThemeToggler } from "./theme-toggler";

const MobileSidebar = ({ currentUser }: { currentUser: User | null }) => {
  const [open, setOpen] = useState(false);
  const { navLinks } = useNavLinks();

  return (
    <div className="md:hidden">
      <Menu
        onClick={() => setOpen(true)}
        className={cn("h-6 w-6 cursor-pointer")}
      />
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 backdrop-blur-sm pointer-events-none opacity-0 transition-opacity duration-500 z-[80]",
          open && "pointer-events-auto opacity-100"
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "bg-background py-3 pb-6 flex flex-col absolute max-w-[420px] w-3/4 inset-y-0 border-r-[1.5px] transition-all duration-500 left-0 -translate-x-full",
            open && "translate-x-0"
          )}
        >
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            size="icon"
            className="h-8 w-8 absolute top-2 right-2"
          >
            <X className="h-4 w-4 text-primary" />
          </Button>
          <div className="flex flex-col py-2">
            <Logo className="ml-10" />
            <div className="mt-5 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  onClick={() => setOpen(false)}
                  href={link.href}
                  key={link.href}
                  className={cn(
                    "pl-10 relative flex items-center gap-4 py-3 hover:bg-primary/5 font-medium",
                    link.active && "bg-primary/5 font-semibold"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                  <div
                    className={cn(
                      "absolute right-0 h-full w-[5px] bg-primary rounded-full hidden",
                      link.active && "block"
                    )}
                  />
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/blogs/popular"
                className="font-medium flex items-center gap-4 hover:bg-primary/5 pl-10 py-3"
              >
                <UsersRound className="h-5 w-5 " />
                <p>Popular Posts</p>
              </Link>
              <Link
                href="/blogs/editor-choice"
                className="font-medium flex items-center gap-4 hover:bg-primary/5 pl-10 py-3"
              >
                <BadgeCheck className="h-5 w-5 " />
                <p>Editor choice</p>
              </Link>
            </div>
          </div>
          <ThemeToggler className="mt-auto ml-10" />
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
