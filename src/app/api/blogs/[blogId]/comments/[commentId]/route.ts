import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string; commentId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { body } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const comment = await db.comment.update({
      where: {
        id: params.commentId,
      },
      data: {
        blogId: params.blogId,
        userId: currentUser.id,
        body,
        isEdited: true,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const comment = await db.comment.delete({
      where: {
        id: params.commentId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
