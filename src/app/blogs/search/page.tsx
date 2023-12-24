import { getBlogs } from "@/actions/get-blogs";
import { redirect } from "next/navigation";
import React from "react";
import { Blogs } from "../_components/blogs";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const q = searchParams.q;
  if (!q) {
    redirect("/");
  }

  const blogs = await getBlogs({ q });

  return (
    <MaxWidthWrapper className="flex flex-col gap-3">
      <h3 className="text-xl font-bold">
        <span className="text-muted-foreground">Search results for</span>{" "}
        {`"${q}"`}
      </h3>
      <Blogs currentUser={null} q={q} isGrid initialBlogs={blogs?.items} />
    </MaxWidthWrapper>
  );
};

export default SearchPage;
