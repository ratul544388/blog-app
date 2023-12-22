import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { title, description, image, category } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const blog = await db.blog.create({
      data: {
        userId: currentUser.id,
        title,
        description,
        image,
        category,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const cursor = searchParams.get("cursor");
//     const BATCH = 2;

//     const blogs = await db.blog.findMany({
//       where: {},
//       take: BATCH,
//       ...(cursor
//         ? {
//             skip: 1,
//             cursor: {
//               id: cursor,
//             },
//           }
//         : {}),
//     });

//     let nextCursor = null;

//     if (blogs.length === BATCH) {
//       nextCursor = blogs[BATCH - 1].id;
//     }

//     return { blogs, nextCursor };
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
