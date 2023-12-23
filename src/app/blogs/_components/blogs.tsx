"use client";

import { Blog, User } from "@prisma/client";

import { useInfiniteBlogs } from "@/hooks/use-infinity-blogs";
import { cn } from "@/lib/utils";
import { Loader } from "../../../components/loader";
import { SingleBlog } from "./single-blog";
import { BlogType } from "@/types";

interface BlogsProps {
  initialBlogs?: (Blog & {
    user: User;
  })[];
  type?: BlogType;
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
  type,
  q,
}: BlogsProps) => {
  const { blogs, hasNextPage, ref } = useInfiniteBlogs({
    initialBlogs,
    category,
    type,
    q,
  });

  return (
    <div className={cn("space-y-8 w-full", className)}>
      <div
        className={cn(
          "grid space-y-8",
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
