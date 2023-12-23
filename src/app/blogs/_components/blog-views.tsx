"use client";

import { Blog } from "@prisma/client";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

interface BlogViewsProps {
  blog: Blog;
}

export const BlogViews = ({ blog }: BlogViewsProps) => {
  useEffect(() => {
    const isViewed = sessionStorage.getItem(blog.id) === "viewed";
    sessionStorage.setItem(blog.id, "viewed");
    const addView = async () => {
      await axios.post(`/api/blogs/${blog.id}/views`);
    };

    if (!isViewed) {
      addView();
    }
  }, [blog.id]);

  return (
    <div className="bg-background rounded-full p-2 px-3 flex items-center gap-1.5">
      <p className="font-semibold">{blog.views}</p>
      <p className="line-clamp-1">{blog.views > 1 ? "views" : "view"}</p>
    </div>
  );
};
