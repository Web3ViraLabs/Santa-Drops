import React from "react";
import NetworkBtn from "./buttons/network-btn";
import useLoginStore from "../config/login-store";
import { useDisconnect } from "wagmi";
import { EVM_NETWORKS, OTHER_NETWORKS } from "../config/networks";

type EVMSymbol = "ETH" | "MATIC";

const NetworkSelectionComponent: React.FC = ({}) => {
  const setOtherNetworks = useLoginStore((state) => state.setOtherNetworks);
  const setSelectedEVMNetwork = useLoginStore(
    (state) => state.setSelectedEVMNetwork
  );
  const { disconnect: EVMDisconnect } = useDisconnect();

  const handleEVMNetworkClick = (symbol: EVMSymbol) => {
    EVMDisconnect();
    setSelectedEVMNetwork(symbol);
  };

  const handleSolanaNetworkClick = () => {
    setOtherNetworks("SOL");
  };

  return (
    <>
      {OTHER_NETWORKS.map((network) => (
        <NetworkBtn
          key={network.symbol}
          icon={network.icon}
          name={network.name}
          onClick={handleSolanaNetworkClick}
        />
      ))}
      {EVM_NETWORKS.map((network) => (
        <NetworkBtn
          key={network.symbol}
          icon={network.icon}
          name={network.name}
          onClick={() => handleEVMNetworkClick(network.symbol as EVMSymbol)}
        />
      ))}
    </>
  );
};

export default NetworkSelectionComponent;
