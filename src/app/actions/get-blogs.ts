"use server";

import { db } from "@/lib/db";

export async function getBlogs({ category }: { category?: string } = {}) {
  try {
    const blogs = await db.blog.findMany({
      where: {
        ...(category ? { category } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return blogs;
  } catch (error) {
    console.log(error);
    return [];
  }
}
