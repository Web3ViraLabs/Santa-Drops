"use client";

import { LoginProvider } from "../login/components/context/login-context";
import { ModalProvider } from "./modal-provider";
import { SolanaProvider } from "./solana-provider";
import { ThemeProvider } from "./theme-provider";
import WagmiProvider from "./wagmi-provider";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <WagmiProvider>
        <SolanaProvider>
          <LoginProvider>
            <ModalProvider />
            {children}
          </LoginProvider>
        </SolanaProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
