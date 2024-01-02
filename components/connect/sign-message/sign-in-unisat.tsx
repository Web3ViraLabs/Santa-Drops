"use client";

import { useModal } from "@/hooks/use-modal";
import useLoginStore from "../../../hooks/login-store";
import { useState } from "react";
import SignMessage from "../components/SignMessage";
import { WalletAdd } from "../actions/wallet-add";
import { SIGNATURE_MESSAGE } from "@/config/global";
import { verifyMessage } from "@unisat/wallet-utils";

declare const window: any;

const SignatureUnisat = ({ address }: { address: string }) => {
  const { setSigned, reset, setSignature, isLinking } = useLoginStore();
  const { onClose } = useModal();
  const [loading, setLoading] = useState(false);

  const onSignMessageClick = async () => {
    if (!address) return alert("Address is required");
    try {
      setLoading(true);
      let signature = await window.unisat.signMessage(SIGNATURE_MESSAGE);
      const pubKey = await window.unisat.getPublicKey();

      if (!signature) {
        return alert("Sign message error");
      }

      if (!pubKey) {
        return alert("Public key error");
      }

      // const verify = verifyMessage(pubKey, SIGNATURE_MESSAGE, signature);
      // console.log(verify);
      const verify = true;

      if (verify === true) {
        WalletAdd({
          address,
          signature,
          symbol: "BTC",
          isLinking,
          setSigned,
          reset,
          setSignature,
          onClose,
        });
        return console.log("success");
      }

      return console.log("failed signed message unisat");
    } catch (error) {
      console.log("[SignatureUinverse] onSignMessageClick error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignMessage
      address={address}
      loading={loading}
      onSignMessageClick={onSignMessageClick}
    />
  );
};

export default SignatureUnisat;
