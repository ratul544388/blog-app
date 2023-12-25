import { getBlogs } from "@/actions/get-blogs";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/get-current-user";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Blogs } from "../_components/blogs";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const currentUser = await getCurrentUser();
  const q = searchParams.q;
  if (!q) {
    redirect("/");
  }

  const blogs = await getBlogs({ q });

  return (
    <MaxWidthWrapper className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "min-w-[40px]"
          )}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h3 className="text-xl font-bold">
          <span className="text-muted-foreground">Search results for</span>{" "}
          {`"${q}"`}
        </h3>
      </div>
      <Blogs
        currentUser={currentUser}
        q={q}
        isGrid
        initialBlogs={blogs?.items}
      />
    </MaxWidthWrapper>
  );
};

export default SearchPage;
