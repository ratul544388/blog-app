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
      await axios.post(`/api/blogs/${blog.id}/views`).then(() => {
        toast.success("You viewd the blog");
      });
    };

    if (!isViewed) {
      addView();
    }
  }, [blog.id]);

  return (
    <div className="bg-background rounded-full p-2 px-3 flex items-center gap-1.5">
      <p className="font-semibold">{blog.views}</p>
      {blog.views > 1 ? "views" : "view"}
    </div>
  );
};
