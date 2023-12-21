import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoFocus?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoFocus, ...props }) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const value = props.value as string;

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    }, [value]);

    React.useEffect(() => {
      if (autoFocus) {
        inputRef?.current?.focus();
      }
    }, [autoFocus]);

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex w-full resize-none overflow-y-hidden rounded-md bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={inputRef}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
