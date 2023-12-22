import { AsideBlogs } from "@/app/blogs/_components/aside-blogs";
import { Blogs } from "@/app/blogs/_components/blogs";
import { Categories } from "@/components/categories";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "./actions/get-blogs";

export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const blog = await db.blog.findFirst({});
  const currentUser = await getCurrentUser();
  const category = searchParams.category
    ? searchParams.category.toUpperCase()
    : undefined;

  const blogs = await getBlogs({ category });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl leading-snug font-bold">
        Quell Quest:{" "}
        <span className="opacity-80 font-normal">
          Unveiling Creative Realms, Ideas, and Tech Discoveries
        </span>
      </h1>
      {blog && (
        <section className="flex md:items-center gap-8 md:flex-row flex-col">
          <div className="relative aspect-[6/5] w-full max-w-[400px] rounded-lg overflow-hidden">
            <Image
              src={blog.image}
              alt="Blog image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl">{blog.title}</h1>
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
      <Categories />
      <div className="grid grid-cols-8 md:gap-8 lg:gap-12">
        <Blogs
          initialBlogs={blogs}
          currentUser={currentUser}
          className="col-span-8 md:col-span-5"
        />
        <div className="hidden md:flex flex-col gap-10 col-span-3">
          <AsideBlogs type="POPULAR" about="What's hot" title="Pupular Posts" />
          <AsideBlogs
            type="EDITOR_CHOICE"
            about="Choosen by the editors"
            title="Editors Pick"
          />
        </div>
      </div>
    </div>
  );
}
