import { getBlogs } from "@/actions/get-blogs";
import { Blogs } from "@/app/blogs/_components/blogs";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeading } from "@/components/page-heading";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const blogs = await getBlogs({ userId: currentUser.id });

  return (
    <MaxWidthWrapper className="flex flex-col gap-3">
      <PageHeading label="My blogs" showBackButton />
      <Blogs currentUser={currentUser} isGrid initialBlogs={blogs?.items} />
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
