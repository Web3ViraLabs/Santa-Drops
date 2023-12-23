"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";
import Main from "./components/main/main";
import NavBar from "./components/nav/desktop-nav";
import { Web3ModalProvider } from "@/components/providers/web3-modal";
import WalletProvider from "./login/providers/wallet-provider";
import WagmiProvider from "./login/providers/wagmi-provider";

const Dapp = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider>
      <div className="h-full w-full flex dark:bg-[#09141B]">
        <NavBar />
        <Main>{children}</Main>
      </div>
    </WagmiProvider>
  );
};

export default Dapp;
