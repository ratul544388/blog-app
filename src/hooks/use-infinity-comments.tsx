import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useInfinityComments = ({
  blogId,
  commentId,
  queryKey,
}: {
  blogId: string;
  commentId?: string;
  queryKey: string;
}) => {
  const { inView, ref } = useInView();

  const fetchComments = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: `/api/blogs/${blogId}/comments`,
        query: {
          cursor: pageParam,
          commentId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    const res = await fetch(url);
    return res.json();
  };

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchComments,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    refetch,
    ref,
  };
};
