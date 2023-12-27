import { Button } from "@/components/ui/button";
import useLoginStore from "../config/login-store";
import { useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";

const ChangeWalletButtonComponent: React.FC = () => {
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);
  const setSelectedEVMNetwork = useLoginStore(
    (state) => state.setSelectedEVMNetwork
  );
  const setSelectedWallet = useLoginStore((state) => state.setSelectedWallet);
  const setSolanaAddress = useLoginStore((state) => state.setSolanaAddress);
  const selectedEVMNetwork = useLoginStore((state) => state.selectedEVMNetwork);

  const { disconnect: EVMDisconnect } = useDisconnect();
  const { disconnect: solanaDisconnect } = useWallet();

  const handleChangeWallet = useCallback(() => {
    setCurrentAddress(null);
    setSelectedEVMNetwork(selectedEVMNetwork);
    solanaDisconnect();
    setSelectedWallet(false);
    setSolanaAddress(false);
    EVMDisconnect();
  }, [
    setCurrentAddress,
    setSelectedEVMNetwork,
    solanaDisconnect,
    setSelectedWallet,
    setSolanaAddress,
    EVMDisconnect,
  ]);

  return (
    <Button variant={"outline"} onClick={handleChangeWallet}>
      Change wallet
    </Button>
  );
};

export default ChangeWalletButtonComponent;
