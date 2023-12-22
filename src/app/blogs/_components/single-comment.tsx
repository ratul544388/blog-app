"use client";

import { Avatar } from "@/components/avatar";
import DropdownMenu, {
  DropdownMenuItemsType,
} from "@/components/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { FullCommentType } from "@/types";
import { Blog, User } from "@prisma/client";
import * as dateFns from "date-fns";
import { EditIcon, Pin, PinOff, TrashIcon } from "lucide-react";
import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { CommentForm } from "./comment-form";
import { ReplyForm } from "./reply-form";
import { CommentVotes } from "./comment-votes";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Replies } from "./replies";
import { cn } from "@/lib/utils";

interface SingleCommentProps {
  blog: Blog & {
    user: User;
  };
  comment: FullCommentType;
  currentUser: User | null;
  isReply?: boolean;
}

export const SingleComment = ({
  comment,
  blog,
  currentUser,
  isReply,
}: SingleCommentProps) => {
  const { onOpen } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const queryClient = useQueryClient();

  let dropdownMenuItems: DropdownMenuItemsType[] = [
    {
      label: "Edit",
      icon: EditIcon,
      onClick: () => setIsEditing(true),
    },
    {
      label: "Delete",
      icon: TrashIcon,
      onClick: () =>
        onOpen("DELETE_COMMENT_MODAL", {
          blogId: blog.id,
          commentId: comment.id,
        }),
      isDestructive: true,
    },
  ];

  if (blog.userId === currentUser?.id) {
    dropdownMenuItems.unshift({
      label: comment.isPinned ? "Unpin the comment" : "Pin the comment",
      icon: comment.isPinned ? PinOff : Pin,
      onClick: () => mutate(),
      disabled: false,
    });
  }

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/blogs/${blog.id}/comments/${comment.id}/pin`);
    },
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries(["comments"] as InvalidateQueryFilters);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return isEditing && currentUser ? (
    <CommentForm
      comment={comment}
      blogId={blog.id}
      currentUser={currentUser}
      onCancelEditing={() => setIsEditing(false)}
    />
  ) : (
    <div className="flex items-start gap-3 relative py-2">
      <Avatar image={comment.user.imageUrl} size={isReply ? 24 : undefined} />
      <div className="space-y-1 w-full">
        <div className="space-y-1 w-full">
          {comment.isPinned && (
            <div className="text-xs text-muted-foreground flex items-center">
              <Pin className="h-3 w-3 mr-2" />
              pinned by {comment.user.name}
            </div>
          )}
          <div className="flex items-center gap-2">
            <h5 className="font-semibold text-sm">{comment.user.name}</h5>
            <p className="text-muted-foreground text-xs">
              {dateFns.formatDistanceStrict(
                new Date(),
                new Date(comment.createdAt)
              )}{" "}
              ago
            </p>
            {comment.isEdited && (
              <p className="text-muted-foreground text-xs">(edited)</p>
            )}
            {comment.userId === currentUser?.id && (
              <DropdownMenu
                items={dropdownMenuItems}
                className="absolute right-0 top-0"
              />
            )}
          </div>
          <p className="text-sm">{comment.body}</p>
          <div className="flex items-center gap-3">
            <CommentVotes
              currentUser={currentUser}
              votes={comment.votes}
              blogId={blog.id}
              commentId={comment.id}
            />
            <Button
              onClick={() => setIsReplying(true)}
              variant="ghost"
              className={cn("text-xs h-8 rounded-full", isReply && "hidden")}
            >
              Reply
            </Button>
          </div>
          {!!comment.replies.length && (
            <Button
              onClick={() => setShowReplies(!showReplies)}
              className="h-8 rounded-full hover:bg-sky-500/20 text-xs font-bold text-sky-500 hover:text-sky-500"
              variant="ghost"
            >
              <IoMdArrowDropup className="h-4 w-4 mr-2" />
              {comment.replies.length} replies
            </Button>
          )}
          {showReplies && (
            <Replies
              blog={blog}
              commentId={comment.id}
              currentUser={currentUser}
            />
          )}
        </div>
        {currentUser && isReplying && (
          <ReplyForm
            blog={blog}
            currentUser={currentUser}
            commentId={comment.id}
            onCancelReplying={() => setIsReplying(false)}
          />
        )}
      </div>
    </div>
  );
};
