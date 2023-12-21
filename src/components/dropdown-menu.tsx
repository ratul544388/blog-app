"use client";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LucideIcon, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export type DropdownMenuItemsType = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  isDestructive?: boolean;
};

interface DropdownMenuProps {
  items: DropdownMenuItemsType[];
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, className }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (onClick: () => void) => {
    onClick();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild className={cn("ml-auto", className)}>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-fit p-0 text-sm font-semibold")}
        align="end"
      >
        <Command>
          <CommandGroup>
            {items.map((item, index) => (
              <CommandItem
                key={index}
                disabled={item.disabled}
                onSelect={() => handleClick(item.onClick)}
                className={cn(
                  "pr-5",
                  item.isDestructive && "text-red-500 hover:text-red-500"
                )}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropdownMenu;
