"use client";

import { Blog, User } from "@prisma/client";

import { useInfiniteBlogs } from "@/hooks/use-infinity-blogs";
import { cn } from "@/lib/utils";
import { BlogType } from "@/types";
import { SingleBlog } from "./single-blog";
import { useEffect, useRef } from "react";

interface BlogsProps {
  initialBlogs?: (Blog & {
    user: User;
  })[];
  type?: BlogType;
  queryKey: string;
  className?: string;
  currentUser: User | null;
  isGrid?: boolean;
  category?: string;
  q?: string;
}

export const Blogs = ({
  initialBlogs,
  currentUser,
  className,
  category,
  isGrid,
  queryKey,
  type,
  q,
}: BlogsProps) => {
  const { blogs, hasNextPage, ref } = useInfiniteBlogs({
    queryKey: [queryKey, category as string, q as string],
    initialBlogs,
    category,
    type,
    q,
  });

  if (!blogs?.length) {
    return (
      <p className="text-muted-foreground w-full text-center">
        No blogs found!{" "}
      </p>
    );
  }

  return (
    <div className={cn("space-y-8 w-full", className)}>
      <div
        className={cn(
          "grid gap-6",
          isGrid && "xl:grid-cols-2 gap-6 max-w-screen-md xl:max-w-full"
        )}
      >
        {blogs?.map((blog) => (
          <SingleBlog
            blog={blog}
            currentUser={currentUser}
            key={blog.id}
            queryKey={type}
          />
        ))}
      </div>
      {hasNextPage ? (
        <Blogs.Skeletons />
      ) : (
        <p className="text-muted-foreground w-full text-center">
          No more blogs to load
        </p>
      )}
      <div ref={ref} />
    </div>
  );
};

Blogs.Skeletons = function BlogsSkeletons() {
  return (
    <section className="space-y-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <SingleBlog.Skeleton key={index} />
      ))}
    </section>
  );
};
