"use client";

import { Blog, User } from "@prisma/client";
import { BlogBox } from "./blog-box";
import { cn } from "@/lib/utils";

interface BlogsProps {
  blogs: (Blog & {
    user: User;
  })[];
  currentUser: User | null;
  className?: string;
}

export const Blogs = ({ blogs, currentUser, className }: BlogsProps) => {
  return (
    <div className={cn("grid gap-6", className)}>
      {blogs?.map((blog) => (
        <BlogBox blog={blog} currentUser={currentUser} key={blog.id} />
      ))}
    </div>
  );
};
