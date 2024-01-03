import { cn, constructMetadata } from "@/lib/utils";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import { Toaster } from "sonner";
import LayoutProvider from "@/providers/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(poppins.className)} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          poppins.className,
          "relative flex w-full h-full antialiased"
        )}
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <LayoutProvider>{children}</LayoutProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
