import { getBlogs } from "@/actions/get-blogs";
import { BlogType } from "@/types";
import { Blog, User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export const useInfiniteBlogs = ({
  initialBlogs,
  category,
  limit,
  type,
  q,
}: {
  initialBlogs?: (Blog & {
    user: User;
  })[];
  category?: string;
  limit?: number;
  type?: BlogType;
  q?: string;
}) => {
  const { inView, ref } = useInView();
  const isMounted = useRef(false);
  const queryKey = type || "ALL";
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    status,
    hasNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    //@ts-ignore
    queryFn: async ({ pageParam = undefined }) => {
      const response = await getBlogs({
        cursor: pageParam,
        type,
        limit,
        category,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    ...(initialBlogs
      ? {
          initialData: () => {
            return {
              pages: [{ items: initialBlogs, nextCursor: null }],
              pageParams: [undefined],
            };
          },
        }
      : {
          initialPageParam: undefined,
        }),
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (isMounted.current && initialBlogs) {
      refetch();
    }
    isMounted.current = true;
  }, [initialBlogs, category, q, refetch]);

  const blogs = data?.pages.flatMap((page) => page.items);

  return {
    blogs,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    hasNextPage,
    status,
    ref,
  };
};
