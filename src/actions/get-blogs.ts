"use server";

import { db } from "@/lib/db";
import { BlogType } from "@/types";

export async function getBlogs({
  type,
  limit,
  category,
  cursor,
  q,
  userId,
}: {
  type?: BlogType;
  limit?: number;
  category?: string;
  cursor?: string;
  q?: string;
  userId?: string;
} = {}) {
  try {
    const take = limit || 8;

    const blogs = await db.blog.findMany({
      where: {
        ...(category
          ? { category }
          : type === "EDITOR_CHOICE"
          ? {
              isEditorChoice: true,
            }
          : q
          ? {
              OR: [
                {
                  category: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  title: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : userId
          ? {
              userId,
            }
          : {}),
      },
      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }
        : {}),
      take,
      include: {
        user: true,
      },
      orderBy: {
        ...(type === "POPULAR"
          ? {
              views: "desc",
            }
          : {}),
      },
    });

    let nextCursor = null;

    if (blogs.length === take) {
      nextCursor = blogs[take - 1].id;
    }

    return { items: blogs, nextCursor };
  } catch (error) {
    console.log(error);
  }
}
