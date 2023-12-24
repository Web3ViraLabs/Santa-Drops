import { cn, constructMetadata } from "@/lib/utils";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import LayoutProvider from "@/components/providers/layout-provider";

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
    <html lang="en" className="h-full " suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "relative h-full font-sans antialiased",
          poppins.className
        )}
      >
        <LayoutProvider>{children}</LayoutProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
