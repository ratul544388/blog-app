import { getBlogs } from "@/actions/get-blogs";
import { getCurrentUser } from "@/lib/get-current-user";
import { Blogs } from "../_components/blogs";
import { AsideBlogs } from "../_components/aside-blogs";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeading } from "@/components/page-heading";
import { cn } from "@/lib/utils";

const PopularBlogs = async () => {
  const blogs = await getBlogs({ type: "EDITOR_CHOICE" });

  const currentUser = await getCurrentUser();
  return (
    <MaxWidthWrapper className="w-full space-y-6">
      <PageHeading label="Editor choice" showBackButton />
      <div className="grid grid-cols-8 gap-8">
        <Blogs
          type="EDITOR_CHOICE"
          queryKey="editor-choice"
          initialBlogs={blogs?.items}
          currentUser={currentUser}
          className="col-span-8 md:col-span-5"
        />
        <div
          className={cn(
            "hidden md:flex flex-col gap-10 col-span-3",
            !blogs && "hidden"
          )}
        >
          <AsideBlogs
            about="What's new"
            title="Recent post"
            queryKey="recent-posts"
          />
          <AsideBlogs
            type="POPULAR"
            about="What's hot"
            title="Popular Posts"
            queryKey="popular"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PopularBlogs;
