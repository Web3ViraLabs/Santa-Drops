import React from "react";
import NetworkBtn from "./buttons/network-btn";
import useLoginStore from "../../../hooks/login-store";
import { useDisconnect } from "wagmi";
import { EVM_NETWORKS } from "../config/networks";
import icon from "@/config/image-provider";

type EVMSymbol = "ETH" | "MATIC";

const NetworkSelectionComponent: React.FC = ({}) => {
  const setOtherNetworks = useLoginStore((state) => state.setOtherNetworks);
  const setSelectedEVMNetwork = useLoginStore(
    (state) => state.setSelectedEVMNetwork
  );
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);

  const { disconnect: EVMDisconnect } = useDisconnect();

  const handleEVMNetworkClick = (symbol: EVMSymbol) => {
    EVMDisconnect();
    setSelectedEVMNetwork(symbol);
  };

  const handleSolanaNetworkClick = () => {
    setCurrentAddress(null);
    setOtherNetworks("SOL");
  };

  const handleBitcoinNetworkClick = () => {
    setCurrentAddress(null);
    setOtherNetworks("BTC");
  };

  return (
    <>
      <NetworkBtn
        key={"SOL"}
        icon={icon("coins").find((i) => i.name === "Solana")?.image!}
        name={"Solana"}
        onClick={handleSolanaNetworkClick}
      />
      <NetworkBtn
        key={"BTC"}
        icon={icon("coins").find((i) => i.name === "Bitcoin")?.image!}
        name={"Bitcoin"}
        onClick={handleBitcoinNetworkClick}
      />
      {EVM_NETWORKS.map((network) => (
        <NetworkBtn
          key={network.symbol}
          icon={icon("coins").find((i) => i.name === network.name)?.image!}
          name={network.name}
          onClick={() => handleEVMNetworkClick(network.symbol as EVMSymbol)}
        />
      ))}
    </>
  );
};

export default NetworkSelectionComponent;
