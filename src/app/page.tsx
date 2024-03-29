import { getBlogs } from "@/actions/get-blogs";
import { Blogs } from "@/app/blogs/_components/blogs";
import { Categories } from "@/components/categories";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Pagination } from "@/components/pagination";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import Image from "next/image";
import Link from "next/link";
import { AsideBlogs } from "./blogs/_components/aside-blogs";

export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const blog = await db.blog.findFirst({});
  const currentUser = await getCurrentUser();
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const take = 10;
  const totalBlogs = await db.blog.count();
  const totalPages = Math.ceil(totalBlogs / take);
  const blogs = await getBlogs({ category, take, page });

  const popularBlogs = await getBlogs({ type: "POPULAR" });
  const editorChoiceBlogs = await getBlogs({ type: "EDITOR_CHOICE" });

  return (
    <MaxWidthWrapper className="space-y-8 pt-5 pb-10">
      <h1 className="text-4xl font-bold">
        Quell Quest:{" "}
        <span className="opacity-80 font-normal">
          Unveiling Creative Realms, Ideas, and Tech Discoveries
        </span>
      </h1>
      {blog && (
        <section className="flex md:items-center gap-8 md:flex-row flex-col">
          <div className="relative aspect-[6/5] w-full min-w-[300px] max-w-[400px] rounded-lg overflow-hidden">
            <Image
              src={blog.image}
              alt="Blog image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl hidden xs:block">{blog.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: blog.description }}
              className="text-muted-foreground line-clamp-3"
            />
            <Link href={`blogs/${blog.id}`} className={buttonVariants()}>
              Read more
            </Link>
          </div>
        </section>
      )}
      <Categories category={category} />
      <div className="grid grid-cols-8 md:gap-5 lg:gap-12">
        <div className="space-y-5 w-full col-span-8 md:col-span-5">
          <h3 className="text-xl font-bold hidden xs:block">Recent Posts</h3>
          <Blogs blogs={blogs} currentUser={currentUser} />
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
        <div className="hidden md:flex flex-col gap-10 col-span-3">
          <AsideBlogs
            blogs={popularBlogs}
            about="What's hot"
            title="Pupular Posts"
            seeMoreUrl="/blogs/popular"
          />
          <AsideBlogs
            blogs={editorChoiceBlogs}
            about="Choosen by the editors"
            title="Editors Pick"
            seeMoreUrl="/blogs/editor-choice"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
