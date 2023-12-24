"use client";

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const icons = [
    {
      icon: Facebook,
      href: "/",
    },
    {
      icon: Twitter,
      href: "/",
    },
    {
      icon: Linkedin,
      href: "/",
    },
    {
      icon: Instagram,
      href: "/",
    },
  ];

  const labels = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blogs",
      href: "/",
    },
    {
      label: "Contact",
      href: "/",
    },
    {
      label: "About",
      href: "/",
    },
    {
      label: "Help",
      href: "/",
    },
  ];

  return (
    <footer className="flex mt-[150px] flex-col gap-3 items-center bg-background pt-12">
      <div className="flex gap-3">
        {icons.map((item, index) => (
          <Link
            key={index}
            href={pathname}
            className={cn(
              buttonVariants({
                size: "icon",
              }),
              "rounded-full"
            )}
          >
            <item.icon className="h-4 w-4" />
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {labels.map((item, index) => (
          <Link
            key={index}
            href={pathname}
            className="font-semibold hover:underline text-sm"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex px-3 flex-col mt-8 w-full gap-2 py-4 items-center bg-gradient-to-r from-rose-100 dark:from-zinc-800 to-teal-100">
        <h1 className="text-sm font-semibold">
          Indulge in Every Word, Crafted with Joy
        </h1>
        <p className="text-sm text-center">
          QuillQuest Chronicles © 2023. Nourishing Minds, Safeguarded by Design
        </p>
      </div>
    </footer>
  );
};

export default Footer;
