import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="flex items-start gap-5">
        <div className="relative aspect-square min-w-[200px] overflow-hidden rounded-lg">
          <Image
            src={user.imageUrl}
            alt="User Photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-5">
          <div className="">
            <h3 className="text-xl font-semibold leading-5">{user.name}</h3>
            <p className="text text-muted-foreground text-sm">Web developer</p>
          </div>
          <div className="">
            <p className="text-muted-foreground">About</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              eum harum voluptatibus. Soluta quaerat aspernatur, hic alias
              placeat dolor consequuntur corporis delectus, repellendus,
              asperiores adipisci accusantium sint fugiat ab at? Veritatis
              quidem a aspernatur?
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h1 className="text-center">Blogs</h1>
        <Separator />
        
      </div>
    </div>
  );
};

export default ProfilePage;
