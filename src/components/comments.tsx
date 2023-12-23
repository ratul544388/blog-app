"use client";

import { CommentForm } from "@/app/blogs/_components/comment-form";
import { SingleComment } from "@/app/blogs/_components/single-comment";
import { useInfinityComments } from "@/hooks/use-infinity-comments";
import { FullCommentType } from "@/types";
import { Blog, User } from "@prisma/client";
import Link from "next/link";
import { observe, useInView } from "react-intersection-observer";
import { Loader } from "./loader";
import { LoadingError } from "./loading-error";
import { buttonVariants } from "./ui/button";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CommentsProps {
  blog: Blog & {
    user: User;
  };
  currentUser: User | null;
}

export const Comments = ({ currentUser, blog }: CommentsProps) => {
  const observer = useInView();

  const { status, data, isFetchingNextPage, ref } = useInfinityComments({
    blogId: blog.id,
    queryKey: "comments",
  });

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "error") {
    return <LoadingError />;
  }

  return (
    <div className="flex flex-col gap-6" ref={observer.ref}>
      <h2 className="font-bold text-xl">{data?.pages[0].total} Comments</h2>
      {currentUser ? (
        <CommentForm currentUser={currentUser} blogId={blog.id} />
      ) : (
        <Link
          href={`/sign-in?redirect_url=blogs/${blog.id}`}
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "underline"
          )}
        >
          Login to add your comments
        </Link>
      )}
      <div>
        {data?.pages?.map((page, index) => (
          <Fragment key={index}>
            {page?.items?.map((comment: FullCommentType) => (
              <SingleComment
                key={comment.id}
                comment={comment}
                blog={blog}
                currentUser={currentUser}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {isFetchingNextPage && <Loader />}
      <div ref={ref} />
    </div>
  );
};
