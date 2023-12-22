"use client";

import * as dateFns from "date-fns";
import { cn, formatText } from "@/lib/utils";
import { Blog, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Description } from "../../../components/description";
import { buttonVariants } from "../../../components/ui/button";
import BlogDropdownMenu from "./blog-dropdown-menu";

interface SingleBlogProps {
  blog: Blog;
  currentUser: User | null;
  queryKey?: string;
}

export const SingleBlog = ({
  blog,
  currentUser,
  queryKey,
}: SingleBlogProps) => {
  return (
    <div
      className="relative grid items-center xs:grid-cols-2 gap-6 bg-background p-4 rounded-xl shadow"
      key={blog.id}
    >
      <BlogDropdownMenu
        currentUser={currentUser}
        blog={blog}
        className="hidden xs:flex absolute top-1 right-1"
        queryKey={queryKey}
      />
      <div className="relative w-full aspect-[6/5] rounded-lg overflow-hidden">
        <Image src={blog.image} alt="photo" fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="space-y-3">
          <div className="flex gap-1 items-center">
            <p className="text-sm text-muted-foreground">
              {dateFns.format(blog.createdAt, "dd-MM-yyyy")} -
            </p>
            <p className="text-rose-500 text-sm">{formatText(blog.category)}</p>
            <BlogDropdownMenu
              currentUser={currentUser}
              blog={blog}
              className="xs:hidden ml-auto"
            />
          </div>
          <h1 className="font-bold xs:text-xl line-clamp-2">{blog.title}</h1>
          <Description text={blog.description} className="line-clamp-2" />
        </div>
        <Link
          href={`/blogs/${blog.id}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "underline decoration-rose-500 p-0 h-fit xs:h-auto"
          )}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
