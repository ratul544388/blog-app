import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { blogId: string; commentId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const pinnedComment = await db.comment.findFirst({
      where: {
        blogId: params.blogId,
        replyTo: null,
        isPinned: true,
      },
    });

    if (pinnedComment) {
      await db.comment.update({
        where: {
          id: pinnedComment.id,
        },
        data: {
          isPinned: false,
        },
      });
    }

    const response = await db.comment.update({
      where: {
        id: params.commentId,
      },
      data: {
        ...(!pinnedComment || pinnedComment.id !== params.commentId
          ? {
              isPinned: true,
            }
          : {}),
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
