"use client";

import { BitcoinNetworkType, signMessage } from "sats-connect";
import { useModal } from "@/hooks/use-modal";
import useLoginStore from "../../../hooks/login-store";
import { useState } from "react";
import SignMessage from "../components/SignMessage";
import { WalletAdd } from "../actions/wallet-add";
import { SIGNATURE_MESSAGE } from "@/config/global";

const SignatureXverse = ({ address }: { address: string }) => {
  const { setSigned, reset, setSignature, isLinking } = useLoginStore();
  const { onClose } = useModal();
  const [loading, setLoading] = useState(false);

  const onSignMessageClick = async () => {
    if (!address) return alert("Address is required");
    try {
      setLoading(true);
      await signMessage({
        payload: {
          network: {
            type: BitcoinNetworkType.Mainnet,
          },
          address,
          message: SIGNATURE_MESSAGE,
        },
        onFinish: async (response) => {
          WalletAdd({
            address,
            signature: response,
            symbol: "BTC",
            isLinking,
            setSigned,
            reset,
            setSignature,
            onClose,
          });
        },
        onCancel: () => alert("Canceled"),
      });
    } catch (error) {
      console.log("[SignatureXverse] onSignMessageClick error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignMessage
      address={address}
      onSignMessageClick={onSignMessageClick}
      loading={loading}
    />
  );
};

export default SignatureXverse;
