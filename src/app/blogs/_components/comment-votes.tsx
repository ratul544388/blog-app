"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Vote, VoteType } from "@prisma/client";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { toast } from "sonner";

interface CommentVotesProps {
  blogId: string;
  votes: (Vote & {
    user: User;
  })[];
  currentUser: User | null;
  commentId: string;
}

export const CommentVotes = ({
  blogId,
  votes,
  currentUser,
  commentId,
}: CommentVotesProps) => {
  const queryClient = useQueryClient();

  const isUserVoted = votes.find((vote) => {
    return vote.userId === currentUser?.id;
  });

  const upVotes = votes.reduce((total, vote) => {
    if (vote.type === "UP") {
      return (total = total + 1);
    } else {
      return total;
    }
  }, 0);

  const downVotes = votes.reduce((total, vote) => {
    if (vote.type === "DOWN") {
      return (total = total + 1);
    } else {
      return total;
    }
  }, 0);

  const { mutate, isPending } = useMutation({
    mutationFn: async (type: VoteType) => {
      await axios.post(`/api/blogs/${blogId}/comments/${commentId}/vote`, {
        type,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "comments",
        "replies",
      ] as InvalidateQueryFilters);
      toast.success("Success");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center group cursor-pointer">
        <Button
          onClick={() => mutate("UP")}
          className={cn(
            "rounded-full text-muted-foreground group-hover:bg-accent h-8 w-8",
            isUserVoted?.type === "UP" && "text-foreground"
          )}
          size="icon"
          variant="ghost"
        >
          {isUserVoted?.type === "UP" ? (
            <FaThumbsUp className={cn("h-4 w-4")} />
          ) : (
            <FaRegThumbsUp className={cn("h-4 w-4")} />
          )}
        </Button>
        <p className="text-muted-foreground text-sm">{upVotes}</p>
      </div>
      <div className="flex items-center group cursor-pointer">
        <Button
          onClick={() => mutate("DOWN")}
          className={cn(
            "rounded-full text-muted-foreground group-hover:bg-accent h-8 w-8",
            isUserVoted?.type === "DOWN" && "text-foreground"
          )}
          size="icon"
          variant="ghost"
        >
          {isUserVoted?.type === "DOWN" ? (
            <FaThumbsDown className={cn("h-4 w-4")} />
          ) : (
            <FaRegThumbsDown className={cn("h-4 w-4")} />
          )}
        </Button>
        <p className="text-muted-foreground text-sm">{downVotes}</p>
      </div>
    </div>
  );
};
