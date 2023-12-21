import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { blogId: string; commentId: string } }
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
        commentId: params.commentId,
        isCommentVote: true,
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
                  commentId: params.commentId,
                  type,
                  isCommentVote: true,
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
