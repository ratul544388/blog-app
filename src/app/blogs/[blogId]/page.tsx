import { Avatar } from "@/components/avatar";
import { AsideBlogs } from "@/app/blogs/_components/aside-blogs";
import BlogDropdownMenu from "@/app/blogs/_components/blog-dropdown-menu";
import { Comments } from "@/components/comments";
import { CreatedAt } from "@/components/created-at";
import { Description } from "@/components/description";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogVotes } from "../_components/blog-votes";
import { isValidObjectId } from "@/lib/utils";
import { BlogViews } from "../_components/blog-views";

const Page = async ({ params }: { params: { blogId: string } }) => {
  const currentUser = await getCurrentUser();

  if (!isValidObjectId(params.blogId)) {
    notFound();
  }

  const blog = await db.blog.findUnique({
    where: {
      id: params.blogId,
    },
    include: {
      user: true,
      comments: true,
      votes: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid sm:grid-cols-2 items-center gap-8 max-w-[800px]">
        <div className="space-y-10">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Avatar image={blog.user.imageUrl} />
              <div className="flex flex-col">
                <h4 className="font-semibold">{blog.user.name}</h4>
                <CreatedAt date={blog.createdAt} />
              </div>
              <BlogDropdownMenu blog={blog} currentUser={currentUser} />
            </div>
            <div className="flex items-center gap-3">
              <BlogVotes
                blogId={blog.id}
                votes={blog.votes}
                currentUser={currentUser}
              />
              <BlogViews blog={blog} />
            </div>
          </div>
        </div>
        <div className="order-first sm:order-last relative w-full max-w-[500px] aspect-[6/4] rounded-lg overflow-hidden">
          <Image src={blog.image} alt="Photo" fill className="object-cover" />
        </div>
      </div>
      <div className="grid grid-cols-8 gap-8 lg:gap-12">
        <div className="col-span-8 md:col-span-5 space-y-8">
          <Description text={blog.description} className="text-foreground" />
          <Comments blog={blog} currentUser={currentUser} />
        </div>
        <AsideBlogs
          type="SIMILAR_CATEGORY"
          about="You Might Interested"
          title="Similar Cateogry"
        />
      </div>
    </div>
  );
};

export default Page;
