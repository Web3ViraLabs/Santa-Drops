import React, { useState } from "react";
import WalletBtn from "../components/buttons/wallet-btn";
import { Connector, useAccount, useConnect } from "wagmi";
import useLoginStore from "../../../hooks/login-store";
import icon from "@/config/image-provider";

const EVMWalletConnectionComponent: React.FC = ({}) => {
  const selectedEVMNetwork = useLoginStore((state) => state.selectedEVMNetwork);
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);
  const setIsNetwork = useLoginStore((state) => state.setIsNetwork);
  const setSigned = useLoginStore((state) => state.setSigned);
  const setSignature = useLoginStore((state) => state.setSignature);

  useAccount({
    onDisconnect: () => {
      setIsNetwork(true);
      setCurrentAddress(null);
      setSigned(false);
      setSignature("");
      console.log("Disconnected");
    },
  });

  const { connect, connectors, pendingConnector, error, isLoading } =
    useConnect({
      chainId:
        selectedEVMNetwork === null
          ? undefined
          : selectedEVMNetwork === "ETH"
          ? 1
          : 137,
      onSuccess: (data) => {
        setCurrentAddress({
          address: data.account,
        });
      },
    });

  const handleEVMWalletConnect = (connector: Connector) => {
    try {
      connect({ connector });
    } catch (error) {
      console.log(error);
    }
  };

  return connectors.map((connector) => (
    <WalletBtn
      key={connector.id}
      icon={
        icon("wallet").find(
          (i) => i.name.toLowerCase() === connector.name.toLowerCase()
        )?.image!
      }
      isDisable={!connector.ready}
      isLoading={!error && isLoading && pendingConnector?.id === connector.id}
      name={connector.name}
      id={connector.id}
      onClick={() => handleEVMWalletConnect(connector)}
    />
  ));
};

export default EVMWalletConnectionComponent;
