import { Blog, Comment, User, Vote } from "@prisma/client";

export type FullCommentType = Comment & {
  user: User;
  votes: (Vote & {
    user: User;
  })[];
  replies: (Comment & {
    user: User;
    votes: (Vote & {
      user: User;
    })[];
  })[];
};

export type InitialBlogs = {
  blogs: (Blog & {
    user: User;
  })[];
  nextCursor?: string | null;
};

export type BlogType = "POPULAR" | "EDITOR_CHOICE" | "SIMILAR_CATEGORY";
