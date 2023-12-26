import { Button } from "@/components/ui/button";
import React from "react";
import useLoginStore from "../config/login-store";
import { useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";

const ChangeNetworkButtonComponent: React.FC = () => {
  const {
    setCurrentAddress,
    setSelectedEVMNetwork,
    setOtherNetworks,
    setSelectedWallet,
  } = useLoginStore();

  const { disconnect: EVMDisconnect } = useDisconnect();
  const { disconnect: solanaDisconnect } = useWallet();

  const handleChangeNetwork = () => {
    setCurrentAddress(null);
    setSelectedEVMNetwork(null);
    setOtherNetworks(null);
    solanaDisconnect();
    setSelectedWallet(false);
    EVMDisconnect();
  };
  return (
    <Button variant={"outline"} onClick={handleChangeNetwork}>
      Change network
    </Button>
  );
};

export default ChangeNetworkButtonComponent;
