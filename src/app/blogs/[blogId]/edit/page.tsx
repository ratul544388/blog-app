import { getCurrentUser } from "@/lib/get-current-user";
import { BlogForm } from "../../_components/blog-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

const NewBlogPage = async ({ params }: { params: { blogId: string } }) => {
  const currentUser = await getCurrentUser();
  const blog = await db.blog.findUnique({
    where: {
      id: params.blogId,
    },
  });

  if (!currentUser || !blog || currentUser.id !== blog.userId) {
    notFound();
  }

  return (
    <MaxWidthWrapper>
      <BlogForm blog={blog} />
    </MaxWidthWrapper>
  );
};

export default NewBlogPage;
