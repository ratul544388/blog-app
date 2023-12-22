"use server";

import { db } from "@/lib/db";
import { BlogType } from "@/types";

export async function getBlogs({
  category,
  type,
}: { category?: string; type?: BlogType } = {}) {
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
