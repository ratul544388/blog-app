import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const blog = await db.blog.findUnique({
      where: {
        id: params.blogId,
      },
    });

    if (!blog) {
      return new NextResponse("Blog not found", { status: 400 });
    }

    const response = await db.blog.update({
      where: {
        id: blog.id,
      },
      data: {
        views: blog.views + 1,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
