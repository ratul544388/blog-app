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
    <MaxWidthWrapper className="flex items-center justify-center">
      <div className="space-y-4">
        <PageHeading label="Profile" showBackButton />
        <UserProfile />
      </div>
    </MaxWidthWrapper>
  );
};

export default ProfilePage;
