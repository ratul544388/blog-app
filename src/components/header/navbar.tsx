"use client";

import Link from "next/link";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { ThemeToggler } from "../theme-toggler";
import { NavLinks } from "./nav-links";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  return (
    <MaxWidthWrapper className="fixed inset-x-0 py-2 flex items-center justify-between border-b shadow z-50">
      <Link href="/" className="font-bold text-lg">
        QuillQuest
      </Link>
      <div className="flex items-center gap-3">
        <ThemeToggler />
        <NavLinks />
      </div>
    </MaxWidthWrapper>
  );
};
