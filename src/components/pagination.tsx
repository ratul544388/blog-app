"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = (page: number) => {
    const currentQuery = qs.parse(params.toString());
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        ...currentQuery,
        page,
      },
    });

    router.push(url, { scroll: false });
  };

  const handlePageClick = (event: { selected: number }) => {
    // onOpen();
    const newPageNumber = event.selected + 1;
    handleClick(newPageNumber);
  };

  return (
    <>
      <ReactPaginate
        className="flex gap-5 font-semibold text-foreground/60 items-center flex-wrap justify-center bg-accent w-fit mx-auto rounded-lg py-2 px-3 transition-all"
        breakLabel="..."
        breakClassName=""
        nextLabel=">"
        nextClassName={cn(
          "font-extrabold",
          currentPage === totalPages && "pointer-events-none opacity-50"
        )}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        activeClassName="bg-primary px-3 py-1 text-white rounded-md"
        pageClassName=""
        previousLabel="<"
        previousClassName={cn(
          "font-extrabold",
          currentPage === 1 && "pointer-events-none opacity-50"
        )}
        initialPage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </>
  );
};
