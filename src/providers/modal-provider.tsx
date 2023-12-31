"use client";
import { AuthModal } from "@/components/modals/auth-modal";
import { DeleteBlogModal } from "@/components/modals/delete-blog-modal";
import { DeleteCommentModal } from "@/components/modals/delete-comment-modal";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <DeleteCommentModal />
      <DeleteBlogModal />
      <AuthModal />
    </>
  );
};

export default ModalProvider;
