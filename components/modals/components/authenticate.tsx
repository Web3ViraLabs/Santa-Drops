"use client";

import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { Button } from "../../ui/button";
import { useModal } from "@/hooks/use-modal";

export default function ConnectButton() {
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
    <div className="flex space-x-3">
      {!isConnected ? (
        <Button
          onClick={handleConnect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto"
        >
          Connect
        </Button>
      ) : (
        <Button onClick={() => onOpen("profileDrawer")}>Account</Button>
      )}
    </div>
  );
}
