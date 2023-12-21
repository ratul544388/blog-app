"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { LogOut, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "./avatar";
import { Separator } from "./ui/separator";

export function UserButton({ currentUser }: { currentUser: User }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (onClick: () => void) => {
    onClick();
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger>
        <Avatar image={currentUser?.imageUrl} />
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-72 py-3 p-0 text-sm font-semibold",
          !currentUser && "w-36"
        )}
        align="end"
      >
        <div className="flex items-center gap-3 px-3 py-2.5">
          <Avatar image={currentUser.imageUrl} />
          <div className="flex flex-col">
            <h1 className="line-clamp-1">{currentUser.email}</h1>
            <p className="text-muted-foreground font-normal line-clamp-1">
              {currentUser.name}
            </p>
          </div>
        </div>
        <div
          onClick={() =>
            handleClick(() => router.push(`/profile/${currentUser.id}`))
          }
          className="p-3 cursor-pointer flex items-center gap-2 hover:bg-accent"
        >
          <User2 className="h-4 w-4" />
          Profile
        </div>
        <SignOutButton>
          <div
            onClick={() => setOpen(false)}
            className="p-3 cursor-pointer flex items-center gap-2 hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </div>
        </SignOutButton>
      </PopoverContent>
    </Popover>
  );
}
