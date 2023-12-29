import { showConnect } from "@stacks/connect";
import WalletBtn from "./buttons/wallet-btn";
import { userSession } from "@/components/providers/stacks-provider";
import { useState } from "react";
import useLoginStore from "../config/login-store";

const HiroWalletConnection = () => {
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
          name: "AlphaZ",
          icon: window.location.origin + "/diamond.svg",
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
      console.log("[HiroWalletConnection]", error);
    }
  };

  return (
    <WalletBtn
      name="Hiro"
      id="2"
      onClick={connect}
      isLoading={loading}
      icon="/hiro_icon.png"
    />
  );
};

export default HiroWalletConnection;
