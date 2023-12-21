"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Blog, User } from "@prisma/client";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  body: z.string().min(1),
});

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FullCommentType } from "@/types";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface ReplyFormProps {
  currentUser: User;
  blog: Blog;
  commentId: string;
  onCancelReplying: () => void;
}

export const ReplyForm = ({
  currentUser,
  blog,
  commentId,
  onCancelReplying,
}: ReplyFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/blogs/${blog.id}/comments/${commentId}/reply`, {
        ...values,
      });
      toast.success("Reply posted");
      form.reset();
      onCancelReplying();
      queryClient.invalidateQueries(["replies"] as InvalidateQueryFilters);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-4"
      >
        <Avatar image={currentUser.imageUrl} size={20} className="mt-2" />
        <div className="flex flex-col w-full gap-2">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-b rounded-none focus:border-foreground px-0"
                    placeholder="Add a comment"
                    autoFocus={true}
                    {...field}
                    disabled={isLoading}
                    rows={1}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-3 ml-auto">
            <Button
              onClick={onCancelReplying}
              className="rounded-full"
              variant="ghost"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading || !form.getValues("body").trim()}
              className="rounded-full"
            >
              Reply
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
