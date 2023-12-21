"use client";

import { categories, colorMap } from "@/lib/constant";
import { cn, formatText } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CategoriesProps {}

export const Categories = ({}: CategoriesProps) => {
  const router = useRouter();

  const handleClick = (category: string) => {
    if (category === "ALL") {
      router.push("/", { scroll: false });
    } else {
      router.push(`/?category=${category}`, { scroll: false });
    }
  };
  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-bold text-xl">Categories</h1>
      <div className="flex items-center gap-5 scrollbar-thin overflow-x-auto pb-3">
        {categories.map((category, index) => (
          <div
            onClick={() => handleClick(category)}
            key={category}
            className={cn(
              colorMap[`bg_${index % 7}` as keyof typeof colorMap],
              "text-white px-3 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-all"
            )}
          >
            {formatText(category)}
          </div>
        ))}
      </div>
    </section>
  );
};
