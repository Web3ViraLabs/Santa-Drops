"use client";

import { Button } from "@/components/ui/button";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

const Account = () => {
  const { isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  return (
    <div className="w-full flex flex-col items-center pt-20">
      {isConnected && (
        <>
          <h1 className="text-2xl">Account</h1>
          <div className="flex flex-col items-center mt-5 space-y-4">
            <w3m-account-button />
            <Button onClick={() => open({ view: "Networks" })}>
              Change Network
            </Button>
          </div>
        </>
      )}

      {!isConnected && <Button onClick={() => open()}>Connect</Button>}
    </div>
  );
};

export default Account;
