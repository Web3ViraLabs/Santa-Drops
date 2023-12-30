"use client";

import { ModalProvider } from "./modal-provider";
import { SolanaProvider } from "./solana-provider";
import StacksProvider from "./stacks-provider";
import { ThemeProvider } from "./theme-provider";
import WagmiProvider from "./wagmi-provider";
import { Connect } from "@stacks/connect-react";
export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <WagmiProvider>
        <SolanaProvider>
          <ModalProvider />
          <StacksProvider>{children}</StacksProvider>
        </SolanaProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
