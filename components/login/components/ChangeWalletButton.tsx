import { Button } from "@/components/ui/button";
import useLoginStore from "../config/login-store";
import { useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";

const ChangeWalletButtonComponent: React.FC = () => {
  const {
    setCurrentAddress,
    setSelectedEVMNetwork,
    setSelectedWallet,
    selectedEVMNetwork,
    otherNetworks,
    currentAddress,
  } = useLoginStore();

  const { disconnect: EVMDisconnect } = useDisconnect();
  const { disconnect: solanaDisconnect } = useWallet();

  const handleChangeWallet = () => {
    EVMDisconnect();
    setSelectedEVMNetwork(selectedEVMNetwork);
    solanaDisconnect();
    setSelectedWallet(false);
    console.log(
      "Selected an evm network: ",
      selectedEVMNetwork,
      "Selected SOL?: ",
      otherNetworks,
      "Current Address: ",
      currentAddress
    );
  };

  return (
    <Button variant={"outline"} onClick={handleChangeWallet}>
      Change wallet
    </Button>
  );
};

export default ChangeWalletButtonComponent;
