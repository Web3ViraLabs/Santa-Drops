"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NetworkBtn from "./components/network-btn";
import { NETWORKS } from "./config/networks";
import { useEffect, useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import WalletBtn from "./components/wallet-btn";
import Signature from "./components/signature";
import { LoginProvider, useLoginContext } from "./components/login-context";
import LoginCard from "./components/login-card";
import { Dialog, Transition } from "@headlessui/react";
import { useModal } from "@/hooks/use-modal";
import { X } from "lucide-react";

type NetworkID = 1 | 137;
const validEVMNetworks = [1, 137];

interface Network {
  address: `0x${string}`;
  chainID: number;
}

const LoginModal = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkID | null | 0>(
    null
  );
  const { signature, isSigned, setSignature, setSigned } = useLoginContext();
  const [currentNetwork, setCurrentNetwork] = useState<Network>();
  const [isNetwork, setIsNetwork] = useState(true);
  const { address } = useAccount({
    onDisconnect: () => {
      setIsNetwork(true);
      setCurrentNetwork(undefined);
      setSigned(false);
      setSignature("");
    },
  });
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
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "login";

  const handleClick = (id: NetworkID) => {
    disconnect();
    setSelectedNetwork(id);
  };

  useEffect(() => {
    disconnect();
    console.log("disconnected");
  }, [disconnect]);

  const handleWalletConnect = (connector: any) => {
    try {
      connect({ connector });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden backdrop-blur-md">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 flex items-center justify-center max-w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              <Transition.Child
                as={Fragment}
                enter="transition-transform duration-200 ease-out"
                enterFrom="scale-0"
                enterTo="scale-100"
                leave="transition-transform duration-200 ease-in"
                leaveFrom="scale-100"
                leaveTo="scale-0"
              >
                <Dialog.Panel className="relative pointer-events-auto w-screen max-w-lg  bg-transparent flex items-center justify-center">
                  <button
                    onClick={() => onClose()}
                    className="absolute right-2 top-2 focus:ring-1"
                  >
                    <X />
                    <span className="sr-only">Close Drawer</span>
                  </button>
                  <Card className="w-full md:w-[580px] px-4 md:px-8 lg:me-16 max-h-[600px]">
                    <CardHeader className="p-2 sm:p-6">
                      <CardTitle className="text-3xl text-center">
                        {!isSigned &&
                          (currentNetwork
                            ? "Verify wallet"
                            : "Select a network")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      key={selectedNetwork}
                      className="flex flex-col gap-4"
                    >
                      {isSigned && address && (
                        <LoginCard signature={signature} address={address!} />
                      )}
                      {currentNetwork &&
                        !isSigned &&
                        address === currentNetwork.address && (
                          <>
                            <Signature address={address} />
                            <Button
                              variant={"outline"}
                              onClick={() => {
                                disconnect();
                                setCurrentNetwork(undefined);
                                setSelectedNetwork(selectedNetwork);
                              }}
                            >
                              Change wallet
                            </Button>
                          </>
                        )}
                      {!currentNetwork &&
                        !isSigned &&
                        !selectedNetwork &&
                        isNetwork &&
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
                              !error &&
                              isLoading &&
                              pendingConnector?.id === connector.id
                            }
                            key={connector.id}
                            name={connector.name}
                            id={connector.id}
                            onClick={() => handleWalletConnect(connector)}
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
                    </CardContent>
                  </Card>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoginModal;
