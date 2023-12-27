import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "DigitalHippo - All in one Web3 Platform",
  description = "DigitalHippo is a platform for web3 assets",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ViraLabs",
    },
    icons,
    metadataBase: new URL("https://www.google.com/"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
