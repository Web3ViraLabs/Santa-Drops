import { useEffect, useState } from "react";
import WalletBtn from "./buttons/wallet-btn";
import useLoginStore from "../config/login-store";

type BtcAccount = {
  address: string;
  addressType: "p2tr" | "p2wpkh" | "p2sh" | "p2pkh";
  publicKey: string;
  purpose: "payment" | "ordinals";
};

const PhantomBTCWallet = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);
  const setBtcAddress = useLoginStore((state) => state.setBtcAddress);
  const setCurrentBtcWallet = useLoginStore(
    (state) => state.setCurrentBtcWallet
  );

  useEffect(() => {
    async function checkPhantom() {
      let phantom = (window as any).phantom?.bitcoin;

      for (let i = 1; i < 10 && !phantom; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        phantom = (window as any).phantom?.bitcoin;
      }

      if (phantom) {
        setIsInstalled(true);
      } else if (!phantom) {
        alert("Phantom wallet not found");
        return;
      }
    }
    checkPhantom().then();
  }, []);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const phantom = (window as any).phantom?.bitcoin;
      const accounts: BtcAccount[] = await phantom?.requestAccounts();
      if (accounts) {
        const paymentAddress = accounts.find(
          (account) => account.purpose === "payment"
        );
        const ordinalsAddress = accounts.find(
          (account) => account.purpose === "ordinals"
        );

        if (paymentAddress && ordinalsAddress) {
          setCurrentAddress({
            address: ordinalsAddress.address,
          });
          setBtcAddress(paymentAddress.address);
          setCurrentBtcWallet("phantom");
        }
      }
    } catch (error) {
      console.log("[PhantomBTCWallet]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletBtn
      id="4"
      name="Phantom"
      icon="/phantom_icon.svg"
      isLoading={isLoading}
      onClick={handleClick}
      isDisable={!isInstalled}
    />
  );
};

export default PhantomBTCWallet;
