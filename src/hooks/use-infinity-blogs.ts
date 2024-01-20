import { getBlogs } from "@/actions/get-blogs";
import { BlogType } from "@/types";
import { Blog, User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useInfiniteBlogs = ({
  initialBlogs,
  category,
  limit,
  type,
  q,
  queryKey,
}: {
  initialBlogs?: (Blog & {
    user: User;
  })[];
  category?: string;
  limit?: number;
  type?: BlogType;
  q?: string;
  queryKey: string[];
}) => {
  const { inView, ref } = useInView();

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    status,
    hasNextPage,

  } = useInfiniteQuery({
    queryKey,
    //@ts-ignore
    queryFn: async ({ pageParam = undefined }) => {
      const response = await getBlogs({
        cursor: pageParam,
        q,
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
    staleTime: Infinity,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const blogs = data?.pages.flatMap((page) => page.items);

  return {
    blogs,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    ref,
  };
};
