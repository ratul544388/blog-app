import { getBlogs } from "@/actions/get-blogs";
import { BlogType } from "@/types";
import { Blog } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useInfiniteBlogs = ({
  initialBlogs,
  type,
  limit,
}: {
  initialBlogs?: Blog[];
  type?: BlogType;
  limit?: number;
}) => {
  const { inView, ref } = useInView();
  const [hasNextPage, setHasNextPage] = useState(true);
  const queryKey = type || "ALL";
  const { data, fetchNextPage, isFetchingNextPage, status } =
    //@ts-ignore
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getBlogs({ pageParam, type, limit });
        if (response.length === 0) {
          setHasNextPage(false);
        }
        return response;
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      ...(initialBlogs
        ? {
            initialData: () => {
              return {
                pages: [initialBlogs],
                pageParams: [1],
              };
            },
          }
        : { initialPageParam: 1 }),
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const blogs = data?.pages.flatMap((page) => page);

  return {
    blogs,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    ref,
  };
};
