"use client";

import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { Button } from "../ui/button";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const handleConnect = () => {
    if (!isConnected) {
      open();
    } else {
      open({ view: "Account" });
    }
  };

  return (
    <>
      <Button
        onClick={handleConnect}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto"
      >
        {isConnected ? "Account" : "Connect Wallet"}
      </Button>
      <Button onClick={() => open({ view: "Networks" })}>
        Open Network Modal
      </Button>
    </>
  );
}
