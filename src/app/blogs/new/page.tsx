import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { BlogForm } from "../_components/blog-form";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

const NewBlogPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }
  
  return (
    <MaxWidthWrapper className="h-full">
      <BlogForm />
    </MaxWidthWrapper>
  );
};

export default NewBlogPage;
