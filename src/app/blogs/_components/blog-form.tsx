"use client";

import "react-quill/dist/quill.snow.css";
import { Blog } from "@prisma/client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "@uploadthing/react/styles.css";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import { ImageUpload } from "@/components/image-upload";
import { useEffect } from "react";
import Select from "@/components/select";
import { categories } from "@/lib/constant";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, {
      message: "Title is required",
    })
    .max(200, { message: "Title must be within 200 characters" }),
  category: z.string({ required_error: "Category is missing" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),
  image: z.string({ required_error: "Image is required" }),
});

interface BlogFormProps {
  blog?: Blog;
}

export const BlogForm = ({ blog }: BlogFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      image: "",
      description: "",
    },
  });

  useEffect(() => {
    if (blog) {
      form.setValue("title", blog.title);
      form.setValue("description", blog.description);
      form.setValue("image", blog.image);
    }
  }, [form, blog]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (blog) {
        await axios.patch(`/api/blogs/${blog.id}`, {
          ...values,
        });
        toast.success("Blog was posted");
      } else {
        await axios.post("/api/blogs", {
          ...values,
        });
        toast.success("Blog was updated");
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="What's your blog title?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  items={categories.slice(1)}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a category"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  className={cn(isLoading && "pointer-events-none opacity-70")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="ml-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
};
