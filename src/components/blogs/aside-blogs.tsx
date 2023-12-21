"use client";

import { colorMap } from "@/lib/constant";
import { cn, formatText } from "@/lib/utils";
import { Blog, User } from "@prisma/client";
import Link from "next/link";
import { Dot } from "../dot";
import { CreatedAt } from "../created-at";
import Image from "next/image";
import { buttonVariants } from "../ui/button";

interface AsideBlogsProps {
  blogs: (Blog & {
    user: User;
  })[];
  about: string;
  title: string;
  seeMoreUrl?: string;
}

export const AsideBlogs = ({
  blogs,
  about,
  title,
  seeMoreUrl,
}: AsideBlogsProps) => {
  return (
    <section className={cn("md:flex hidden flex-col gap-5 col-span-3")}>
      <div>
        <p className="text-muted-foreground leading-3">{about}</p>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      {blogs.map((blog, index) => (
        <Link
          key={blog.id}
          href={`/blogs/${blog.id}`}
          className="flex items-center gap-2"
        >
          <div className="relative min-w-[80px] aspect-square rounded-lg overflow-hidden">
            <Image src={blog.image} alt="Image" fill className="object-cover" />
          </div>
          <div>
            <div
              className={cn(
                colorMap[`bg_${index % 7}` as keyof typeof colorMap],
                "text-white w-fit rounded-full text-xs font-bold px-2 py-0.5"
              )}
            >
              {formatText(blog.category)}
            </div>
            <h3 className="text-xl font-semibold line-clamp-1">{blog.title}</h3>
            <div className="flex items-center text-sm gap-1 mt-1">
              <h5 className="font-semibold">{blog.user.name}</h5>
              <Dot />
              <CreatedAt date={blog.createdAt} />
            </div>
          </div>
        </Link>
      ))}
      {seeMoreUrl && (
        <Link
          href={seeMoreUrl}
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "p-0 h-fit"
          )}
        >
          See more...
        </Link>
      )}
    </section>
  );
};
