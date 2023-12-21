import { Comment, User, Vote } from "@prisma/client";

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
