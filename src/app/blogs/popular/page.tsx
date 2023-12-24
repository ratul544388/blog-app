import { getBlogs } from "@/actions/get-blogs";
import { getCurrentUser } from "@/lib/get-current-user";
import { Blogs } from "../_components/blogs";
import { AsideBlogs } from "../_components/aside-blogs";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

const PopularBlogs = async () => {
  const blogs = await getBlogs({ type: "POPULAR" });

  const currentUser = await getCurrentUser();
  return (
    <MaxWidthWrapper className="w-full space-y-6">
      <h2 className="text-2xl font-bold">Popular Posts</h2>
      <div className="grid grid-cols-8 gap-8">
        <Blogs
          initialBlogs={blogs?.items}
          currentUser={currentUser}
          className="col-span-8 md:col-span-5"
        />
        <div className="hidden md:flex flex-col gap-10 col-span-3">
          <AsideBlogs about="What's new" title="Recent post" />
          <AsideBlogs
            type="EDITOR_CHOICE"
            about="Choosen by the editors"
            title="Editors Pick"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PopularBlogs;
