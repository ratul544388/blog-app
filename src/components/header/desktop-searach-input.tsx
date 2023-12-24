"use client";

import { Search, X } from "lucide-react";
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

export const DesktopSearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 400);
  const [results, setResults] = useState<Blog[]>();
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const [openCard, setOpenCard] = useState(false);

  useOnClickOutside(containerRef, () => setOpenCard(false));

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const res = await getBlogs({ q: value, limit: 5 });
      setResults(res?.items);
      setIsLoading(false);
    };

    if (debouncedValue) {
      fetchResults();
    }
  }, [debouncedValue]);

  const handleClick = (url: string) => {
    setOpenCard(false);
    router.push(url);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/blogs/search?q=${value}`);
      }}
      ref={containerRef}
      className="hidden sm:block relative w-full max-w-[500px] border border-input rounded-full"
    >
      <input
        className="w-full bg-transparent outline-none h-10 pl-3 pr-20"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setOpenCard(true)}
      />
      <Button
        size="icon"
        type="button"
        onClick={() => handleClick(`/blogs/search?q=${value}`)}
        className="absolute right-0 top-0 rounded-none rounded-r-full"
      >
        <Search className="h-5 w-5" />
      </Button>
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
              color={"#D73A49"}
              loading={isLoading}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="ml-auto"
            />
          </div>
          {results?.map((blog) => (
            <div
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
                <h3 className="font-bold text-lg line-clamp-1">{blog.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatText(blog.category)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};
