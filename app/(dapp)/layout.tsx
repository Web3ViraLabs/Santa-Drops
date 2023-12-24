"use client";

import Main from "./components/main/main";
import NavBar from "./components/nav/desktop-nav";
import { LoginProvider } from "./login/components/login-context";
import WagmiProvider from "./login/providers/wagmi-provider";

const Dapp = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider>
      <LoginProvider>
        <div className="h-full w-full flex dark:bg-[#09141B]">
          <NavBar />
          <Main>{children}</Main>
        </div>
      </LoginProvider>
    </WagmiProvider>
  );
};

export default Dapp;
