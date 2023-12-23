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
import WagmiProvider from "./providers/wagmi-provider";
import {
  useAccount,
  useConnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

type NetworkID = 1 | 2 | 3 | 4;

const Login = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkID | null>(
    null
  );

  const handleClick = (id: NetworkID) => {
    setSelectedNetwork(id);
  };

  const { connect, connectors, pendingConnector } = useConnect();
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
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
          {selectedNetwork === 1 &&
            connectors.map((connector) => (
              <>
                <Button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                </Button>
                {chain && <div>Connected to {chain.name}</div>}
                {chains.map((x) => (
                  <button
                    disabled={!switchNetwork || x.id === chain?.id}
                    key={x.id}
                    onClick={() => switchNetwork?.(x.id)}
                  >
                    {x.name}
                    {isLoading && pendingChainId === x.id && " (switching)"}
                  </button>
                ))}

                <div>{error && error.message}</div>
              </>
            ))}
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
