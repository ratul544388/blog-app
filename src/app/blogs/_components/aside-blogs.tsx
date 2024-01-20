"use client";

import { useInfiniteBlogs } from "@/hooks/use-infinity-blogs";
import { cn, formatText } from "@/lib/utils";
import { BlogType } from "@/types";
import { BadgeCheck, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CreatedAt } from "../../../components/created-at";
import { Dot } from "../../../components/dot";
import { Loader } from "../../../components/loader";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface AsideBlogsProps {
  about: string;
  title: string;
  type?: BlogType;
  category?: string;
  queryKey: string;
}

export const AsideBlogs = ({
  about,
  title,
  type,
  category,
  queryKey,
}: AsideBlogsProps) => {
  const limit = 10;
  const { blogs, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
    useInfiniteBlogs({
      type,
      limit,
      category,
      queryKey: [queryKey, category as string],
    });

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
      {status === "pending" ? (
        <AsideBlogs.Skeletons />
      ) : (
        <>
          {blogs?.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="flex items-center gap-2 hover:bg-accent p-3"
            >
              <div className="relative min-w-[80px] aspect-square rounded-lg overflow-hidden">
                <Image
                  src={blog.image}
                  alt="Image"
                  fill
                  className="object-cover"
                />
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
                <h3 className="text-xl font-semibold line-clamp-1">
                  {blog.title}
                </h3>
                <div className="flex items-center text-sm gap-1 mt-1 line-clamp-1">
                  <h5 className="font-semibold line-clamp-1">
                    {blog.user.name}
                  </h5>
                  <Dot />
                  <CreatedAt date={blog.createdAt} />
                </div>
              </div>
            </Link>
          ))}
          {hasNextPage ? (
            isFetchingNextPage ? (
              <Loader />
            ) : (
              <Button variant="link" onClick={() => fetchNextPage()}>
                Load more...
              </Button>
            )
          ) : (
            <p className="text-center w-full text-muted-foreground">
              No more blogs to load
            </p>
          )}
        </>
      )}
    </section>
  );
};

AsideBlogs.Skeletons = function AsideBlogSkeletons() {
  return (
    <div className="w-full">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex items-center w-full gap-3 p-3">
          <Skeleton className="min-h-[80px] min-w-[80px]" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};
