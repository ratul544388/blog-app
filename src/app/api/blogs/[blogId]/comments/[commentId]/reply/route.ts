import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { blogId: string; commentId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    const { body } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const response = await db.comment.create({
      data: {
        body,
        userId: currentUser.id,
        blogId: params.blogId,
        replyToId: params.commentId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
