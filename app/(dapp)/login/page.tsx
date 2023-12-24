"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NetworkBtn from "./components/network-btn";
import { NETWORKS } from "./config/networks";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
  useSignMessage,
  useSwitchNetwork,
} from "wagmi";
import WalletBtn from "./components/wallet-btn";
import Signature from "./components/signature";
import { LoginProvider, useLoginContext } from "./components/login-context";
import LoginCard from "./components/login-card";

type NetworkID = 1 | 137;
const validEVMNetworks = [1, 137];

interface Network {
  address: `0x${string}`;
  chainID: number;
}

const Login = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkID | null | 0>(
    null
  );
  const [currentNetwork, setCurrentNetwork] = useState<Network>();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, pendingConnector, error, isLoading } =
    useConnect({
      chainId: selectedNetwork === null ? undefined : selectedNetwork,
      onSuccess: (data) => {
        setCurrentNetwork({
          address: data.account,
          chainID: data.chain.id,
        });
      },
    });
  const { signature, isSigned } = useLoginContext();

  const handleClick = (id: NetworkID) => {
    setSelectedNetwork(id);
  };

  useEffect(() => {
    disconnect();
  }, [disconnect]);

  const handleWalletConnect = (connector: any, selectedNetwork: NetworkID) => {
    try {
      connect({ connector });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center w-full h-full p-2">
      <Card className="w-full md:w-[580px] px-4 md:px-8 lg:me-16 max-h-[600px]">
        <CardHeader className="p-2 sm:p-6">
          <CardTitle className="text-3xl text-center">
            {!isSigned &&
              (currentNetwork ? "Verify wallet" : "Select a network")}
          </CardTitle>
        </CardHeader>
        <CardContent key={selectedNetwork} className="flex flex-col gap-4">
          {isSigned && <LoginCard signature={signature} address={address!} />}
          {currentNetwork &&
            !isSigned &&
            address === currentNetwork.address && (
              <>
                <Signature address={address} />
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setCurrentNetwork(undefined);
                    setSelectedNetwork(selectedNetwork);
                    disconnect();
                  }}
                >
                  Change wallet
                </Button>
              </>
            )}
          {!currentNetwork &&
            !isSigned &&
            selectedNetwork === null &&
            NETWORKS.map((network, _) => (
              <NetworkBtn
                key={_}
                name={network.name}
                icon={network.icon}
                onClick={() => handleClick(network.id as NetworkID)}
              />
            ))}
          {!currentNetwork &&
            !isSigned &&
            selectedNetwork &&
            validEVMNetworks.includes(selectedNetwork) &&
            connectors.map((connector) => (
              <WalletBtn
                icon={"/eth.png"}
                isDisable={!connector.ready}
                isLoading={
                  !error && isLoading && pendingConnector?.id === connector.id
                }
                key={connector.id}
                name={connector.name}
                id={connector.id}
                onClick={() => handleWalletConnect(connector, selectedNetwork)}
              />
            ))}
          {selectedNetwork !== null && !isSigned && (
            <Button
              variant={"outline"}
              onClick={() => {
                setCurrentNetwork(undefined);
                setSelectedNetwork(null);
                disconnect();
              }}
            >
              Change network
            </Button>
          )}
          {error && <div className="text-red-500">{error.message}</div>}
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
