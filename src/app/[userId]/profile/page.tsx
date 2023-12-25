import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeading } from "@/components/page-heading";
import { db } from "@/lib/db";
import { isValidObjectId } from "@/lib/utils";
import { UserProfile } from "@clerk/nextjs";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  if (!isValidObjectId(params.userId)) {
    notFound();
  }
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <MaxWidthWrapper className="space-y-3">
      <PageHeading label="Profile" showBackButton />
      <div className="w-fit mx-auto">
        <UserProfile />
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
