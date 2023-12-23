"use client";

import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { Button } from "../../ui/button";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";

export default function ConnectButton({ className }: { className?: string }) {
  const { open } = useWeb3Modal();
  const { onOpen } = useModal();
  const { isConnected } = useWeb3ModalAccount();

  const handleConnect = () => {
    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      {!isConnected ? (
        <Button
          onClick={handleConnect}
          className={cn(
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto",
            className
          )}
        >
          Connect to wallet
        </Button>
      ) : (
        <Button onClick={() => onOpen("profileDrawer")}>Account</Button>
      )}
    </div>
  );
}
