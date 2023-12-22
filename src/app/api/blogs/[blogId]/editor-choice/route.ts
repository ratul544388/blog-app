import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

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
        ...(blog.isEditorChoice
          ? {
              isEditorChoice: false,
            }
          : {
              isEditorChoice: true,
            }),
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
