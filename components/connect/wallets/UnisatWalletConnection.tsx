import { useEffect, useState } from "react";
import WalletBtn from "../components/buttons/wallet-btn";
import useLoginStore from "../../../hooks/login-store";
import icon from "@/config/image-provider";
declare const window: any;

const UnisatWallet = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);
  const setCurrentBtcWallet = useLoginStore(
    (state) => state.setCurrentBtcWallet
  );

  const demoHandle = (d: any) => {
    console.log("changed", d[0]);
    setCurrentAddress({ address: d[0] });
    setCurrentBtcWallet("unisat");
  };

  useEffect(() => {
    async function checkUnisat() {
      let unisat = (window as any).unisat;

      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = (window as any).unisat;
      }

      if (unisat) {
        setIsInstalled(true);
      } else if (!unisat) return;

      unisat.on("accountsChanged", demoHandle);
      unisat.on("networkChanged", demoHandle);

      return () => {
        unisat.removeListener("accountsChanged", demoHandle);
        unisat.removeListener("networkChanged", demoHandle);
      };
    }

    checkUnisat().then();
  }, []);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      const accounts = await window.unisat.requestAccounts();

      if (accounts && accounts.length > 0) {
        setCurrentBtcWallet("unisat");
        setCurrentAddress({
          address: accounts[0],
        });
      }
    } catch (error: any) {
      if (error.code === 4001) {
        alert("rejected the request");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletBtn
      id="3"
      name="Unisat Wallet"
      icon={icon("wallet").find((i) => i.name === "Unisat")?.image!}
      isLoading={isLoading}
      onClick={handleConnect}
      isDisable={!isInstalled}
    />
  );
};

export default UnisatWallet;
