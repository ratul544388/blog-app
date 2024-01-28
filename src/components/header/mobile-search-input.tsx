"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { getBlogs } from "@/actions/get-blogs";
import { Blog } from "@prisma/client";
import Image from "next/image";
import { formatText } from "@/lib/utils";
import PulseLoader from "react-spinners/PulseLoader";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useRouter } from "next/navigation";

export const MobileSearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 400);
  const [results, setResults] = useState<Blog[]>();
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const [openCard, setOpenCard] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(containerRef, () => {
    setOpenSearch(false);
    setOpenCard(false);
  });

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const res = await getBlogs({ q: debouncedValue, take: 5 });
      setResults(res);
      setIsLoading(false);
    };

    if (debouncedValue) {
      fetchResults();
    }
  }, [debouncedValue]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [openSearch]);

  const handleClick = (url: string) => {
    setOpenCard(false);
    router.push(url);
  };

  return (
    <div className="sm:hidden">
      {openSearch ? (
        <div
          ref={containerRef}
          className="fixed top-0 flex px-3 items-center inset-x-0 h-[65px] bg-background z-[100]"
        >
          <Button
            onClick={() => setOpenSearch(false)}
            variant="ghost"
            size="icon"
            type="button"
            className="rounded-full min-w-[40px]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <form
            onSubmit={() => {
              router.push(`/blogs/search?q=${value}`);
              setOpenCard(false);
              setOpenSearch(false);
            }}
            className="relative w-full border border-input rounded-full"
          >
            <input
              className="w-full bg-transparent outline-none h-10 pl-3 pr-20"
              placeholder="Search..."
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value && (
              <Button
                onClick={() => setValue("")}
                variant="ghost"
                size="icon"
                type="button"
                className="rounded-full absolute top-0 right-10"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
            <Button
              size="icon"
              type="button"
              onClick={() => handleClick(`/blogs/search?q=${value}`)}
              className="absolute right-0 top-0 rounded-none rounded-r-full"
            >
              <Search className="h-5 w-5" />
            </Button>
            {value && openCard && (
              <div className="absolute w-full bg-background shadow-lg top-[105%] rounded-xl py-3">
                <div
                  onClick={() => handleClick(`/blogs/search?q=${value}`)}
                  className="flex text-muted-foreground items-center gap-2 p-3 hover:bg-accent transition-colors"
                  role="button"
                >
                  <Search className="h-6 w-6" />
                  Search for {`"${value}"`}
                  <PulseLoader
                    color={"#1F1F1F"}
                    loading={isLoading}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className="ml-auto"
                  />
                </div>
                {results?.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => handleClick(`/blogs/${blog.id}`)}
                    className="flex items-center gap-2 p-3 hover:bg-accent"
                    role="button"
                  >
                    <div className="relative min-w-[60px] aspect-[6/5] overflow-hidden rounded-md">
                      <Image
                        src={blog.image}
                        alt="image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg line-clamp-1">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatText(blog.category)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      ) : (
        <Button
          onClick={() => {
            setOpenSearch(true);
            setOpenCard(true);
          }}
          variant="ghost"
          size="icon"
          type="button"
          className="rounded-full"
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};
