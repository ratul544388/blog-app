"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";
import { Fragment } from "react";
import { SingleComment } from "./single-comment";
import { FullCommentType } from "@/types";
import { Blog, User } from "@prisma/client";
import { useInfinityComments } from "@/hooks/use-infinity-comments";
import { Loader } from "@/components/loader";
import { LoadingError } from "@/components/loading-error";
import { Button } from "@/components/ui/button";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

interface RepliesProps {
  blog: Blog & {
    user: User;
  };
  commentId: string;
  currentUser: User | null;
}

export const Replies = ({ blog, commentId, currentUser }: RepliesProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfinityComments({
      blogId: blog.id,
      commentId,
      queryKey: "replies",
    });

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "error") {
    return <LoadingError />;
  }

  return (
    <div className="w-full">
      {data?.pages?.map((page, index) => (
        <Fragment key={index}>
          {page?.items?.map((comment: FullCommentType) => (
            <SingleComment
            key={comment.id}
              isReply
              comment={comment}
              blog={blog}
              currentUser={currentUser}
            />
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <>
          {isFetchingNextPage ? (
            <Loader />
          ) : (
            <Button
              onClick={() => fetchNextPage()}
              className="h-8 rounded-full hover:bg-sky-500/20 text-xs font-bold text-sky-500 hover:text-sky-500"
              variant="ghost"
            >
              <MdOutlineSubdirectoryArrowRight className="h-4 w-4 mr-2" />
              show more replies
            </Button>
          )}
        </>
      )}
    </div>
  );
};
