"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NetworkBtn from "./components/network-btn";
import { NETWORKS } from "./config/networks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/ethers/react";
import ConnectButton from "@/components/modals/components/authenticate";
import { Web3ModalProvider } from "@/components/providers/web3-modal";
import { useSDK } from "@metamask/sdk-react";

type NetworkID = 1 | 2 | 3 | 4;

const Login = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkID | null>(
    null
  );

  const { sdk } = useSDK();

  const handleClick = (id: NetworkID) => {
    setSelectedNetwork(id);
  };

  const connect = async () => {
    try {
      const accounts = sdk?.connect();
      console.log(accounts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <WalletProvider>
    <main className="flex justify-center w-full h-full p-2">
      <Card className="w-full md:w-[580px] px-4 md:px-8 max-h-[600px]">
        <CardHeader className="p-2 sm:p-6">
          <CardTitle className="text-3xl text-center">
            Select a network
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {selectedNetwork === null &&
            NETWORKS.map((network, _) => (
              <NetworkBtn
                key={_}
                name={network.name}
                icon={network.icon}
                onClick={() => handleClick(network.id as NetworkID)}
              />
            ))}
          {selectedNetwork === 1 && (
            <>
              <Button onClick={connect}>Connect with metamask</Button>
              <Button onClick={() => sdk?.disconnect()}>Disconnect</Button>
            </>
          )}
        </CardContent>
      </Card>
    </main>
    // </WalletProvider>
  );
};

export default Login;
