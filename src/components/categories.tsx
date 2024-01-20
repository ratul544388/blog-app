"use client";

import { categories } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const Categories = ({ category }: { category?: string }) => {
  const router = useRouter();
  const isActive = (item: (typeof categories)[number]) => {
    if (item === "ALL" && !category) {
      return true;
    }
    return item === category?.toUpperCase();
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {categories.map((item) => (
        <Button
          onClick={() =>
            router.push(
              item === "ALL" ? `/` : `/?category=${item.toLowerCase()}`,
              {
                scroll: false,
              }
            )
          }
          variant="outline"
          key={item}
          className={cn("relative rounded-lg hover:bg-primary/10")}
        >
          <span
            className={cn(
              "capitalize z-20",
              isActive(item) && "text-white dark:text-black transition-colors duration-500"
            )}
          >
            {item.toLowerCase()}
          </span>
          {isActive(item) && (
            <motion.span
              layoutId="activeCategory"
              className="absolute inset-0 z-10 bg-primary rounded-lg"
            />
          )}
        </Button>
      ))}
    </div>
  );
};
