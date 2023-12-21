import { Quill } from "@/components/quill";
import { getCurrentUser } from "@/lib/get-current-user";
import { BlogForm } from "../_components/blog-form";

const NewBlogPage = async () => {
  // const currentUser = await getCurrentUser();
  return <BlogForm />;
};

export default NewBlogPage;
