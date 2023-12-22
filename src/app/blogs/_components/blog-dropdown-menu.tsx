"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Blog, User } from "@prisma/client";
import { BadgeAlert, BadgeCheck, EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import DropdownMenu, { DropdownMenuItemsType } from "../../../components/dropdown-menu";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface BlogDropdownMenuProps {
  blog: Blog;
  className?: string;
  currentUser: User | null;
  queryKey?: string;
}

const BlogDropdownMenu: React.FC<BlogDropdownMenuProps> = ({
  blog,
  className,
  currentUser,
  queryKey,
}) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/blogs/${blog.id}/editor-choice`);
    },
    onSuccess: () => {
      if (blog.isEditorChoice) {
        toast.success("Blog removed has been removed from editor choice");
      } else {
        toast.success("The blog is added to editor choice");
      }
      if (queryKey) {
        queryClient.invalidateQueries([queryKey] as InvalidateQueryFilters);
      } else {
        router.refresh();
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  let dropdownItems: DropdownMenuItemsType[] = [];

  if (blog.userId === currentUser?.id) {
    dropdownItems = [
      {
        label: "Edit",
        icon: EditIcon,
        onClick: () => router.push(`/blogs/${blog.id}/edit`),
      },
      {
        label: "Delete",
        icon: TrashIcon,
        onClick: () => onOpen("DELETE_BLOG_MODAL", { blogId: blog.id }),
        isDestructive: true,
      },
    ];
  }

  if (currentUser?.isAdmin) {
    dropdownItems.unshift({
      label: blog.isEditorChoice
        ? "Remove from editor choice"
        : "Make it editor choice",
      icon: blog.isEditorChoice ? BadgeAlert : BadgeCheck,
      onClick: () => mutate(),
      disabled: isPending,
      isDestructive: true,
    });
  }

  return <DropdownMenu className={cn(className)} items={dropdownItems} />;
};

export default BlogDropdownMenu;
