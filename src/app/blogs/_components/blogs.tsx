"use client";

import { Blog, User } from "@prisma/client";

import { useInfiniteBlogs } from "@/hooks/use-infinity-blogs";
import { cn } from "@/lib/utils";
import { Loader } from "../../../components/loader";
import { SingleBlog } from "./single-blog";
import { BlogType } from "@/types";

interface BlogsProps {
  initialBlogs: Blog[];
  type?: BlogType;
  className?: string;
  currentUser: User | null;
}

export const Blogs = ({
  initialBlogs,
  currentUser,
  className,
  type,
}: BlogsProps) => {
  const { blogs, isFetchingNextPage, hasNextPage, ref } = useInfiniteBlogs({
    initialBlogs,
    type,
  });

  return (
    <div className={cn("space-y-8 w-full", className)}>
      {blogs?.map((blog) => (
        <SingleBlog
          blog={blog}
          currentUser={currentUser}
          key={blog.id}
          queryKey={type}
        />
      ))}
      {hasNextPage ? (
        <Loader />
      ) : (
        <p className="text-muted-foreground w-full text-center">
          No more blog to load
        </p>
      )}
      <div ref={ref} />
    </div>
  );
};
