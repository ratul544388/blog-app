"use client";

import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import DropdownMenu from "../dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface BlogDropdownMenuProps {
  blogId: string;
}

const BlogDropdownMenu: React.FC<BlogDropdownMenuProps> = ({ blogId }) => {
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <DropdownMenu
      items={[
        {
          label: "Edit",
          icon: EditIcon,
          onClick: () => router.push(`/blogs/${blogId}/edit`),
        },
        {
          label: "Delete",
          icon: TrashIcon,
          onClick: () => onOpen("DELETE_BLOG_MODAL", { blogId }),
          isDestructive: true,
        },
      ]}
    />
  );
};

export default BlogDropdownMenu;
