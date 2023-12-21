"use client";

import { Blog, User } from "@prisma/client";
import Image from "next/image";
import { Description } from "../description";

import { cn, formatText } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DropdownMenu from "../dropdown-menu";
import { buttonVariants } from "../ui/button";

interface BlogsProps {
  blogs: Blog[];
  className?: string;
  currentUser: User | null;
}

export const Blogs = ({ blogs, currentUser, className }: BlogsProps) => {
  const router = useRouter();

  const handleDelete = async (blogId: string) => {
    try {
      await axios.delete(`/api/blogs/${blogId}`);
      toast.success("Post was deleted");
      router.refresh();
    } catch (error) {
      toast.error("Error while deleting the post");
    }
  };

  return (
    <section className={cn("space-y-8 w-full", className)}>
      <h1 className="text-xl font-bold">Recent Posts</h1>
      {blogs.map((blog) => (
        <div
          className="relative grid items-center grid-cols-2 gap-6"
          key={blog.id}
        >
          {blog.userId === currentUser?.id && (
            <DropdownMenu
              items={[
                {
                  label: "Edit",
                  icon: Edit,
                  onClick: () => router.push(`/blogs/${blog.id}/edit`),
                },
                {
                  label: "Delete",
                  icon: Trash2,
                  onClick: () => handleDelete(blog.id),
                },
              ]}
              className="absolute -top-1 right-0"
            />
          )}
          <div className="relative w-full aspect-[6/5] rounded-lg overflow-hidden">
            <Image src={blog.image} alt="photo" fill className="object-cover" />
          </div>
          <div className="flex flex-col xs:gap-3">
            <div className="space-y-2 xs:space-y-3">
              <div className="flex gap-1 items-center">
                <p className="text-sm text-muted-foreground">
                  {
                    //@ts-ignore
                    format(blog.createdAt, "dd-MM-yyyy")
                  }{" "}
                  -
                </p>
                <p className="text-rose-500 text-sm">
                  {formatText(blog.category)}
                </p>
              </div>
              <h1 className="font-bold xs:text-xl line-clamp-2">
                {blog.title}
              </h1>
              <Description text={blog.description} className="line-clamp-2" />
            </div>
            <Link
              href={`/blogs/${blog.id}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "underline decoration-rose-500 p-0 h-fit xs:h-auto"
              )}
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};
