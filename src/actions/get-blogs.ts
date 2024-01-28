"use server";

import { db } from "@/lib/db";
import { BlogType } from "@/types";

export async function getBlogs({
  type,
  take = 10,
  category,
  q,
  userId,
  page = 1,
}: {
  type?: BlogType;
  take?: number;
  category?: string;
  q?: string;
  userId?: string;
  page?: number;
} = {}) {
  const skip = (page - 1) * take;
  const blogs = await db.blog.findMany({
    where: {
      ...(category
        ? {
            category: {
              equals: category,
              mode: "insensitive",
            },
          }
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
    take,
    skip: skip,
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

  return blogs;
}
