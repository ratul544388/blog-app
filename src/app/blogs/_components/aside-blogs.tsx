"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatText } from "@/lib/utils";
import { Blog, User } from "@prisma/client";
import { BadgeCheck, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CreatedAt } from "../../../components/created-at";
import { Dot } from "../../../components/dot";
import { buttonVariants } from "@/components/ui/button";

interface AsideBlogsProps {
  about: string;
  title: string;
  blogs: (Blog & {
    user: User;
  })[];
  seeMoreUrl?: string;
}

export const AsideBlogs = ({
  about,
  title,
  blogs,
  seeMoreUrl,
}: AsideBlogsProps) => {
  return (
    <section
      className={cn(
        "md:flex hidden flex-col h-fit gap-3 col-span-3 bg-background shadow rounded-xl py-4"
      )}
    >
      <div className="pl-3">
        <p className="text-muted-foreground text-sm leading-5">{about}</p>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      {blogs?.map((blog) => (
        <Link
          key={blog.id}
          href={`/blogs/${blog.id}`}
          className="flex items-center gap-2 hover:bg-accent p-3"
        >
          <div className="relative min-w-[80px] aspect-square rounded-lg overflow-hidden">
            <Image src={blog.image} alt="Image" fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "text-white w-fit rounded-full text-xs font-bold px-2 py-0.5"
                )}
              >
                {formatText(blog.category)}
              </div>
              {blog.isEditorChoice && (
                <BadgeCheck className="h-4 w-4 text-blue-500" />
              )}
              <Dot />
              <div className="flex items-center gap-1 text-sm text-muted-foreground line-clamp-1">
                <p className="font-semibold">{blog.views}</p>
                <Eye className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-xl font-semibold line-clamp-1">{blog.title}</h3>
            <div className="flex items-center text-sm gap-1 mt-1 line-clamp-1">
              <h5 className="font-semibold line-clamp-1">{blog.user.name}</h5>
              <Dot />
              <CreatedAt date={blog.createdAt} />
            </div>
          </div>
        </Link>
      ))}
      {seeMoreUrl && (
        <Link className={buttonVariants({ variant: "link" })} href={seeMoreUrl}>
          See more
        </Link>
      )}
    </section>
  );
};
