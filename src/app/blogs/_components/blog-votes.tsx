"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { User, Vote, VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { toast } from "sonner";

interface BlogVotesProps {
  blogId: string;
  votes: (Vote & {
    user: User;
  })[];
  currentUser: User | null;
}

export const BlogVotes = ({ blogId, votes, currentUser }: BlogVotesProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const isUserVoted = votes.find((vote) => {
    return vote.userId === currentUser?.id && !vote.isCommentVote;
  });

  const upVotes = votes.reduce((total, vote) => {
    if (vote.type === "UP" && !vote.isCommentVote) {
      return (total = total + 1);
    } else {
      return total;
    }
  }, 0);

  const downVotes = votes.reduce((total, vote) => {
    if (vote.type === "DOWN" && !vote.isCommentVote) {
      return (total = total + 1);
    } else {
      return total;
    }
  }, 0);

  const { mutate, isPending } = useMutation({
    mutationFn: async (type: VoteType) => {
      if (!currentUser) {
        return onOpen("AUTH_MODAL");
      }
      await axios.post(`/api/blogs/${blogId}/vote`, {
        type,
      });
    },
    onSuccess: () => {
      if (!currentUser) return;
      router.refresh();
      toast.success("Success");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="flex items-center gap-3 rounded-full bg-background w-fit">
      <div className="flex items-center cursor-pointer">
        <Button
          onClick={() => mutate("UP")}
          className={cn("rounded-full")}
          size="icon"
          variant="ghost"
        >
          {isUserVoted?.type === "UP" ? (
            <FaThumbsUp className={cn("h-5 w-5")} />
          ) : (
            <FaRegThumbsUp className={cn("h-5 w-5")} />
          )}
        </Button>
        <p className="text-muted-foreground text-sm font-semibold">{upVotes}</p>
      </div>
      <div className="flex items-center cursor-pointer">
        <p className="text-muted-foreground text-sm font-semibold">
          {downVotes}
        </p>
        <Button
          onClick={() => mutate("DOWN")}
          className={cn("rounded-full")}
          size="icon"
          variant="ghost"
        >
          {isUserVoted?.type === "DOWN" ? (
            <FaThumbsDown className={cn("h-5 w-5")} />
          ) : (
            <FaRegThumbsDown className={cn("h-5 w-5")} />
          )}
        </Button>
      </div>
    </div>
  );
};
