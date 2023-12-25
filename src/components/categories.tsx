"use client";

import { categories, colorMap } from "@/lib/constant";
import { cn, formatText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  InvalidateQueryFilters,
  QueryFilters,
  RefetchQueryFilters,
  useQueryClient,
} from "@tanstack/react-query";

export const Categories = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-bold text-xl">Categories</h1>
      <div className="flex items-center gap-5 scrollbar-thin overflow-x-auto pb-3">
        {categories.map((category) => (
          <Button
            onClick={() => {
              router.push(
                category === "ALL"
                  ? "/"
                  : `/?category=${category.toLowerCase()}`,
                {
                  scroll: false,
                }
              );
            }}
            key={category}
            className={cn(
              colorMap[category as keyof typeof colorMap],
              "text-white"
            )}
          >
            {formatText(category)}
          </Button>
        ))}
      </div>
    </section>
  );
};
