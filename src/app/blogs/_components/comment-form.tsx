"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
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

interface CommentFormProps {
  comment?: FullCommentType;
  currentUser: User;
  blogId: string;
  onCancelEditing?: () => void;
}

export const CommentForm = ({
  currentUser,
  blogId,
  comment,
  onCancelEditing,
}: CommentFormProps) => {
  const queryClient = useQueryClient();
  const [isCommenting, setIsCommenting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  useEffect(() => {
    if (comment) {
      form.setValue("body", comment.body);
      setIsCommenting(true);
    }
  }, [form, comment]);

  const handleCancel = () => {
    if (onCancelEditing) {
      onCancelEditing();
    }
    setIsCommenting(false);
  };

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (comment) {
        await axios.patch(`/api/blogs/${blogId}/comments/${comment.id}`, {
          ...values,
        });
        toast.success("Comment was updated");
        onCancelEditing?.();
      } else {
        await axios.post(`/api/blogs/${blogId}/comments`, {
          ...values,
        });
        toast.success("Comment was posted");
      }
      setIsCommenting(false);
      form.reset();
      queryClient.invalidateQueries(["comments"] as InvalidateQueryFilters);
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
        <Avatar image={currentUser.imageUrl} />
        <div className="flex flex-col w-full gap-2">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-b rounded-none focus:border-foreground px-0 bg-transparent"
                    placeholder="Add a comment"
                    onFocus={() => setIsCommenting(true)}
                    autoFocus={!!comment}
                    {...field}
                    disabled={isLoading}
                    rows={1}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isCommenting && (
            <div className="flex gap-3 ml-auto">
              <Button
                onClick={handleCancel}
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
                {comment ? "Save" : "Comment"}
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};
