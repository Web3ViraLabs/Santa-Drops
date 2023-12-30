import { showConnect } from "@stacks/connect";
import WalletBtn from "../components/buttons/wallet-btn";
import { userSession } from "@/providers/stacks-provider";
import { useState } from "react";
import useLoginStore from "../../../hooks/login-store";
import icon from "@/config/image-provider";
import { APPNAME } from "@/config/global";

const LeatherWallet = () => {
  const [loading, setLoading] = useState(false);
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);
  const setBtcAddress = useLoginStore((state) => state.setBtcAddress);
  const setCurrentBtcWallet = useLoginStore(
    (state) => state.setCurrentBtcWallet
  );

  const connect = async () => {
    setLoading(true);
    console.log(userSession.isSignInPending());

    try {
      await showConnect({
        appDetails: {
          name: APPNAME,
          icon: "/favicon.ico",
        },
        onFinish: () => {
          console.log(userSession.loadUserData());
          setCurrentAddress({
            address: userSession.loadUserData().profile.btcAddress.p2tr.mainnet,
          });
          setBtcAddress(
            userSession.loadUserData().profile.btcAddress.p2wpkh.mainnet
          );
          setCurrentBtcWallet("leather");

          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
        userSession,
      });
    } catch (error) {
      console.log("[LeatherWalletConnection]", error);
    }
  };

  return (
    <WalletBtn
      name="Leather"
      id="2"
      onClick={connect}
      isLoading={loading}
      icon={icon("wallet").find((i) => i.name === "Leather")?.image!}
    />
  );
};

export default LeatherWallet;
