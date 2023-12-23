"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const AuthModal = () => {
  const { isOpen, onClose, data, type } = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const open = isOpen && type === "AUTH_MODAL";

  return (
    <div
      onClick={onClose}
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
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 absolute top-1 right-1"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="w-full px-5">
          <h4 className="font-bold">Login or Register now</h4>
          <p className="text-muted-foreground text-sm">
            Inorder to create blogs, votes, comments you must sign in to
            QuellQuest.
          </p>
          <div className="mt-5 flex items-center justify-center gap-6">
            <Button
              variant="outline"
              onClick={() => {
                router.push(`/sign-up?redirect_url=${pathname}`);
                onClose();
              }}
            >
              Sign up
            </Button>
            <Button
              onClick={() => {
                router.push(`/sign-in?redirect_url=${pathname}`);
                onClose();
              }}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
