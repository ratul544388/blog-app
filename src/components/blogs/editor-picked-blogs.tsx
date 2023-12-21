"use client";

import { colorMap } from "@/lib/constant";
import { cn, formatText } from "@/lib/utils";
import { Blog, User } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { Dot } from "../dot";

interface EditorPickedBlogsProps {
  blogs: (Blog & {
    user: User;
  })[];
  className?: string;
}

export const EditorPickedBlogs = ({ blogs, className }: EditorPickedBlogsProps) => {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <div>
        <p className="text-muted-foreground leading-3">
          Choosen by the editors
        </p>
        <h3 className="text-xl font-bold">Editor Pick</h3>
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
            <p className="text-muted-foreground">
              {
                //@ts-ignore
                format(blog.createdAt, "dd-MMM-yyyy")
              }
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
};
