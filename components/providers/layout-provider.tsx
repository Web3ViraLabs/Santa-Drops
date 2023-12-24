"use client";

import { LoginProvider } from "../login/components/login-context";
import { ModalProvider } from "./modal-provider";
import { ThemeProvider } from "./theme-provider";
import WagmiProvider from "./wagmi-provider";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <WagmiProvider>
          <LoginProvider>
            <ModalProvider />
            {children}
          </LoginProvider>
        </WagmiProvider>
      </ThemeProvider>
    </>
  );
}
