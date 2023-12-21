"use client";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import { ArrowLeft, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface SearchInputProps {
  className?: string;
}

export const SearchInput = ({ className }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);

  useOnClickOutside(containerRef, () => setOpenSearch(false));

  useEffect(() => {
    if (openSearch) {
      inputRef?.current?.focus();
    }
  }, [openSearch]);

  return (
    <div
      className={cn(
        "ml-auto md:ml-0 flex md:w-full justify-center items-center",
        openSearch && "fixed h-[65px] px-3 bg-background z-[60] inset-x-0"
      )}
    >
      {!openSearch && (
        <Button
          onClick={() => {
            setOpenSearch(true);
          }}
          variant="ghost"
          className="rounded-full md:hidden"
          size="icon"
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
      <div
        ref={containerRef}
        className={cn(
          "md:flex w-full hidden relative max-w-[450px]",
          openSearch && "flex w-full max-w-full"
        )}
      >
        {openSearch && (
          <Button
            variant="ghost"
            onClick={() => setOpenSearch(false)}
            size="icon"
            className="rounded-full min-w-[40px]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="relative border-[1.5px] w-full rounded-full overflow-hidden">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search blogs..."
            className="border-none bg-transparent w-full h-10 outline-none pl-3 pr-[85px] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button className="absolute right-0 top-0 rounded-none" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          {value && (
            <Button
              onClick={() => setValue("")}
              variant="ghost"
              className="absolute right-10 top-0 rounded-full"
              size="icon"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
