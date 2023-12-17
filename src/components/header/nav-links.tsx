"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = () => {
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Login",
      href: "/login",
    },
  ];
  const pathname = usePathname();
  return (
    <div className="flex gap-5">
      {routes.map((route) => (
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
