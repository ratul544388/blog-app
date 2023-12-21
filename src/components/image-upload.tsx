"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  return (
    <div className="relative max-w-[500px]">
      {value && (
        <div className="absolute aspect-[6/5] h-full left-1/2 -translate-x-1/2 z-40">
          <Image fill src={value} alt="Upload" className="object-cover" />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <UploadDropzone
        endpoint="imageUpload"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error) => {
          console.log(error);
          toast.error("Error while uploading photo");
        }}
      />
    </div>
  );
};
