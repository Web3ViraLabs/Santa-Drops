import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import useLoginStore from "../../../../hooks/login-store";
import { useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";

const ChangeNetworkButtonComponent: React.FC = () => {
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);
  const setSelectedEVMNetwork = useLoginStore(
    (state) => state.setSelectedEVMNetwork
  );
  const setOtherNetworks = useLoginStore((state) => state.setOtherNetworks);
  const setSelectedWallet = useLoginStore((state) => state.setSelectedWallet);

  const { disconnect: EVMDisconnect } = useDisconnect();
  const { disconnect: solanaDisconnect } = useWallet();

  const handleChangeNetwork = useCallback(() => {
    setCurrentAddress(null);
    setSelectedEVMNetwork(null);
    setOtherNetworks(null);
    solanaDisconnect();
    setSelectedWallet(false);
    EVMDisconnect();
  }, [
    setCurrentAddress,
    setSelectedEVMNetwork,
    setOtherNetworks,
    solanaDisconnect,
    setSelectedWallet,
    EVMDisconnect,
  ]);
  return (
    <Button variant={"outline"} onClick={handleChangeNetwork}>
      Change network
    </Button>
  );
};

export default ChangeNetworkButtonComponent;
