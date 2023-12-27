import React from "react";
import WalletBtn from "./buttons/wallet-btn";
import { useAccount, useConnect } from "wagmi";
import useLoginStore from "../config/login-store";

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

  const handleEVMWalletConnect = (connector: any) => {
    try {
      connect({ connector });
    } catch (error) {
      console.log(error);
    }
  };

  return connectors.map((connector) => (
    <WalletBtn
      key={connector.id}
      icon={"/eth.png"}
      isDisable={!connector.ready}
      isLoading={!error && isLoading && pendingConnector?.id === connector.id}
      name={connector.name}
      id={connector.id}
      onClick={() => handleEVMWalletConnect(connector)}
    />
  ));
};

export default EVMWalletConnectionComponent;
