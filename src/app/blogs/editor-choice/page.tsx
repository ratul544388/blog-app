import { getBlogs } from "@/actions/get-blogs";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeading } from "@/components/page-heading";
import { Pagination } from "@/components/pagination";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { AsideBlogs } from "../_components/aside-blogs";
import { Blogs } from "../_components/blogs";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const currentUser = await getCurrentUser();

  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;

  const take = 10;
  const totalBlogs = await db.blog.count();
  const totalPages = Math.ceil(totalBlogs / take);
  const blogs = await getBlogs({ category, take, page, type: "EDITOR_CHOICE" });

  const recentPosts = await getBlogs({});
  const popularPosts = await getBlogs({ type: "POPULAR" });

  return (
    <MaxWidthWrapper className="w-full space-y-6">
      <PageHeading label="Popular posts" showBackButton />
      <div className="grid grid-cols-8 gap-8">
        <Blogs
          blogs={blogs}
          currentUser={currentUser}
          className="col-span-8 md:col-span-5"
        />
        <div className="hidden md:flex flex-col gap-10 col-span-3">
          <AsideBlogs
            blogs={recentPosts}
            about="What's new"
            title="Recent post"
            seeMoreUrl="/"
          />
          <AsideBlogs
            blogs={popularPosts}
            about="Choosen by the editors"
            title="Editors Pick"
            seeMoreUrl="/blogs/popular"
          />
        </div>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </MaxWidthWrapper>
  );
}
