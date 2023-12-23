"use client";

import { useDebounce } from "use-debounce";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn, formatText } from "@/lib/utils";
import { ArrowLeft, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Blog } from "@prisma/client";
import axios from "axios";
import { getBlogs } from "@/actions/get-blogs";
import PulseLoader from "react-spinners/PulseLoader";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface SearchInputProps {
  className?: string;
}

export const SearchInput = ({ className }: SearchInputProps) => {
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const [deboucedValue] = useDebounce(value, 400);
  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState<number | undefined>(0);
  const [results, setResults] = useState<Blog[]>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useOnClickOutside(containerRef, () => setOpenSearch(false));

  useEffect(() => {
    if (openSearch) {
      inputRef?.current?.focus();
      setCardWidth(inputRef?.current?.clientWidth);
    }
  }, [openSearch]);

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      const response = await getBlogs({ q: deboucedValue, limit: 5 });
      setResults(response?.items);
      setIsLoading(false);
    };

    if (deboucedValue) {
      handleSearch();
    }
  }, [deboucedValue]);

  useEffect(() => {
    setOpenSearch(false);
  }, [pathname]);

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
          <Button
            onClick={() => router.push(`/search/blogs/?q=${value}`)}
            className="absolute right-0 top-0 rounded-none"
            size="icon"
          >
            <Search className="h-5 w-5" />
          </Button>
          {value && (
            <div
              className="fixed z-[5000] bg-background flex flex-col shadow-md rounded-xl mt-[10px] py-3"
              style={{ width: `${cardWidth}px` }}
            >
              <div
                onClick={() => router.push(`/blogs/search/?q=${value}`)}
                className="text-muted-foreground p-3 hover:bg-accent cursor-pointer flex items-center gap-2"
              >
                <Search className="h-6 w-6" />
                Show results for {`"${value}"`}
                <PulseLoader
                  color="#D73A49"
                  loading={isLoading}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="ml-auto"
                />
              </div>
              {results?.map((blog) => (
                <div
                  onClick={() => router.push(`/blogs/${blog.id}`)}
                  key={blog.id}
                  className="flex cursor-pointer items-center gap-2 p-3 hover:bg-accent transition-colors"
                >
                  <div className="relative min-w-[50px] aspect-[6/5] rounded-md overflow-hidden">
                    <Image
                      src={blog.image}
                      alt="Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="line-clamp-1 font-semibold">{blog.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {formatText(blog.category)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
