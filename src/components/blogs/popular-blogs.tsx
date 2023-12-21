"use client";

import { colorMap } from "@/lib/constant";
import { cn, formatText } from "@/lib/utils";
import { Blog, User } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { Dot } from "../dot";
import { CreatedAt } from "../created-at";

interface PopularBlogsProps {
  blogs: (Blog & {
    user: User;
  })[];
  className?: string;
}

export const PopularBlogs = ({ blogs, className }: PopularBlogsProps) => {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <div>
        <p className="text-muted-foreground leading-3">What&apos;s hot</p>
        <h3 className="text-xl font-bold">Most Popular</h3>
      </div>
      {blogs.map((blog, index) => (
        <Link key={blog.id} href={`/blogs/${blog.id}`}>
          <div
            className={cn(
              colorMap[`bg_${index % 7}` as keyof typeof colorMap],
              "text-white w-fit rounded-full text-xs font-bold px-2 py-0.5"
            )}
          >
            {formatText(blog.category)}
          </div>
          <h3 className="text-xl font-semibold line-clamp-2">{blog.title}</h3>
          <div className="flex items-center text-sm gap-1 mt-1">
            <h5 className="font-semibold">{blog.user.name}</h5>
            <Dot />
            <CreatedAt date={blog.createdAt} />
          </div>
        </Link>
      ))}
    </section>
  );
};
