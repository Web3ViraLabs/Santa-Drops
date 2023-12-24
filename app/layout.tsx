import { ThemeProvider } from "@/components/providers/theme-provider";

import Navbar from "@/components/header/Navbar";
import { cn, constructMetadata } from "@/lib/utils";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";

import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";

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
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ModalProvider />
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
