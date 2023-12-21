"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  image: string;
  size?: number;
  className?: string;
}

export const Avatar = ({ image, size = 36, className }: AvatarProps) => {
  return (
    <div
      className={cn(
        "relative aspect-square rounded-full overflow-hidden",
        className
      )}
      style={{ minWidth: `${size}px` }}
    >
      <Image src={image} alt="Avatar" fill className="object-cover" />
    </div>
  );
};
