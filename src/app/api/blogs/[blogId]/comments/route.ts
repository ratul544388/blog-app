import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const commentId = searchParams.get("commentId");

    const BATCH = 10;

    const total = await db.comment.count({
      where: {
        blogId: params.blogId,
        replyTo: null,
      },
    });

    const comments = await db.comment.findMany({
      where: {
        blogId: params.blogId,
        ...(commentId
          ? {
              replyToId: commentId,
            }
          : { replyTo: null }),
      },
      take: BATCH,
      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }
        : {}),
      include: {
        user: true,
        votes: {
          include: {
            user: true,
          },
        },
        replies: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let nextCursor = null;

    if (comments.length === BATCH) {
      nextCursor = comments[BATCH - 1].id;
    }

    return NextResponse.json({ items: comments, nextCursor, total });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { body } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const comment = await db.comment.create({
      data: {
        blogId: params.blogId,
        userId: currentUser.id,
        body,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
