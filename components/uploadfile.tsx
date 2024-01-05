"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

interface UploadFileProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "giveawayImage" | "tokenImage";
  className?: string;
}

export const UploadFile = ({
  onChange,
  value,
  endpoint,
  className,
}: UploadFileProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative">
        <div className={cn("relative h-60 w-full", className)}>
          <Image
            fill
            src={value}
            alt="upload"
            sizes={"100vw"}
            className={cn(
              " object-cover",
              className?.includes("rounded-full") && "rounded-full"
            )}
          />
        </div>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.log(err);
      }}
    />
  );
};
