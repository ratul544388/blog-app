"use client";

import { Dot } from "@/components/dot";
import { cn, formatText } from "@/lib/utils";
import { Blog, User } from "@prisma/client";
import * as dateFns from "date-fns";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Description } from "../../../components/description";
import { buttonVariants } from "../../../components/ui/button";
import BlogDropdownMenu from "./blog-dropdown-menu";

interface BlogBoxProps {
  blog: Blog;
  currentUser: User | null;
  queryKey?: string;
}

export const BlogBox = ({ blog, currentUser, queryKey }: BlogBoxProps) => {
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
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <p className="text-sm text-muted-foreground">
                {dateFns.format(blog.createdAt, "dd-MM-yyyy")} -
              </p>
              <p className="text-rose-500 text-sm">
                {formatText(blog.category)}
              </p>
            </div>
            <div className="flex items-center gap-2 xs:hidden sm:flex md:hidden lg:flex">
              <Dot />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <p className="font-semibold">{blog.views}</p>
                <p className="line-clamp-1">
                  {blog.views > 1 ? "views" : "view"}
                </p>
              </div>
              {blog.isEditorChoice && (
                <>
                  <Dot />
                  <BadgeCheck className="h-4 w-4 text-blue-500" />
                </>
              )}
            </div>
            <BlogDropdownMenu
              currentUser={currentUser}
              blog={blog}
              className="xs:hidden ml-auto"
              queryKey={queryKey}
            />
          </div>
          <h1 className="font-bold xs:text-xl line-clamp-2">{blog.title}</h1>
          <Description text={blog.description} className="line-clamp-2" />
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={`/blogs/${blog.id}`}
            className={cn(
              buttonVariants({ variant: "link" }),
              "underline decoration-rose-500 p-0"
            )}
          >
            Read More
          </Link>
          <div className="hidden xs:flex sm:hidden md:flex lg:hidden items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <p className="font-semibold">{blog.views}</p>
              <p className="line-clamp-1">
                {blog.views > 1 ? "views" : "view"}
              </p>
            </div>
            {blog.isEditorChoice && (
              <>
                <Dot />
                <BadgeCheck className="h-4 w-4 text-blue-500" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// SingleBlog.Skeleton = function SingleBlogSkeleton() {
//   return (
//     <div className="grid gap-6 items-center xs:grid-cols-2 p-5 rounded-xl bg-background shadow">
//       <Skeleton className="w-full aspect-[6/5]" />
//       <div className="">
//         <Skeleton className="w-full h-5" />
//         <Skeleton className="w-full h-7 mt-4" />
//         <Skeleton className="w-3/4 h-7 mt-1.5" />
//         <Skeleton className="w-full h-3.5 mt-4" />
//         <Skeleton className="w-[90%] h-3.5 mt-1.5" />
//         <Skeleton className="w-24 h-4 mt-6" />
//       </div>
//     </div>
//   );
// };
