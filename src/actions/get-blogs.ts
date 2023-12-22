"use server";

import { db } from "@/lib/db";
import { BlogType } from "@/types";

export async function getBlogs({
  pageParam = 1,
  type,
  limit,
  category,
}: {
  pageParam?: number;
  type?: BlogType;
  limit?: number;
  category?: string;
} = {}) {
  try {
    const take = limit || 8;

    const skip = (pageParam - 1) * 2;

    const blogs = await db.blog.findMany({
      where: {
        ...(type === "SIMILAR_CATEGORY" && category
          ? {
              category,
            }
          : {}),
      },
      skip,
      take,
      include: {
        user: true,
      },
      orderBy: {
        ...(type === "POPULAR"
          ? {
              views: "desc",
            }
          : type === "EDITOR_CHOICE"
          ? {
              isEditorChoice: "desc",
            }
          : {}),
      },
    });

    return blogs;
  } catch (error) {
    console.log(error);
    return [];
  }
}
