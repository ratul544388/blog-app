import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    const { type } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const existingVote = await db.vote.findFirst({
      where: {
        userId: currentUser.id,
        blogId: params.blogId,
        isCommentVote: false,
      },
    });

    const response = await db.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        votes: {
          ...(existingVote
            ? {
                delete: {
                  id: existingVote.id,
                },
              }
            : {}),
          ...(existingVote?.type !== type
            ? {
                create: {
                  userId: currentUser.id,
                  type,
                },
              }
            : {}),
        },
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
