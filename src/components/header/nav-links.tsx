"use client";

import { navLinks } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = () => {

  const pathname = usePathname();
  return (
    <div className="gap-5 hidden lg:flex">
      {navLinks.map((route) => (
        <Link
          href={`/${route.href}`}
          key={route.label}
          className={cn(
            "capitalize",
            pathname.includes(route.href) && "font-semibold"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};
