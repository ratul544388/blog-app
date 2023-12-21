"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatText } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface SelectProps {
  items: string[];
  value?: string;
  onChange: (value?: string) => void;
  placeholder: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  items,
  placeholder,
  disabled,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild onClick={() => setOpen(true)} disabled={disabled}>
        <div
          className={cn(
            "flex bg-background items-center gap-2 border select-none hover:bg-accent cursor-pointer rounded-md w-full h-10 px-3 text-sm"
          )}
        >
          {value ? (
            formatText(value)
          ) : (
            <p className="text-muted-foreground">{placeholder}</p>
          )}
          <ChevronDown className="h-4 w-4 ml-auto" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 max-h-[50vh] overflow-y-auto">
        {items.map((item) => (
          <div
            onClick={() => handleClick(item)}
            key={item}
            className="p-3 flex items-center gap-5 hover:bg-accent transition-colors"
          >
            <p className="font-semibold text-sm">{formatText(item)}</p>
            {value === item && (
              <Check className="h-4 w-4 ml-auto text-muted-foreground" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default Select;
