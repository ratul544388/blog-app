"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const DeleteBlogModal = () => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, data, type } = useModal();
  const router = useRouter();

  const open = isOpen && type === "DELETE_BLOG_MODAL";

  const { blogId } = data;

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/blogs/${blogId}`);
    },
    onSuccess: () => {
      toast.success("BLog was deleted");
      onClose();
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div
      onClick={handleClose}
      className={cn(
        "fixed z-50 inset-0 bg-background/80 backdrop-blur-sm opacity-0 pointer-events-none",
        open && "opacity-100 pointer-events-auto"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "max-w-[350px] w-full py-3 shadow-lg overflow-hidden rounded-xl bg-background border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all opacity-20",
          open && "opacity-100"
        )}
      >
        <Button
          onClick={handleClose}
          disabled={isPending}
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 absolute top-1 right-1"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="w-full px-5">
          <h4 className="font-bold">Delete Blog?</h4>
          <p className="text-muted-foreground text-sm">
            This will delete the blog permanently
          </p>
        </div>
        <div className="flex gap-3 mt-5 pr-3 items-center justify-end">
          <Button disabled={isPending} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={() => mutate()}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
