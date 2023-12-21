import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Web3ModalProvider } from "@/context/web3-modal";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/modal-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Santa Drop",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className, "min-w-[150px] w-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ModalProvider />
          <Web3ModalProvider>{children}</Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
