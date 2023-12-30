"use client";

import { useModal } from "@/hooks/use-modal";
import useLoginStore from "../../../hooks/login-store";
import { useState } from "react";

declare const window: any;

import { Verifier } from "bip322-js";
import base58 from "bs58";
import SignMessage from "../components/SignMessage";
import { WalletAdd } from "../actions/wallet-add";
import { SIGNATURE_MESSAGE } from "@/config/global";

function bytesToBase64(bytes: any) {
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}

const SignaturePhantom = ({ address }: { address: string }) => {
  const { setSigned, reset, setSignature, isLinking } = useLoginStore();
  const { onClose } = useModal();
  const [loading, setLoading] = useState(false);

  const onSignMessageClick = async () => {
    if (!address) return alert("Address is required");
    try {
      setLoading(true);
      const message = new TextEncoder().encode(SIGNATURE_MESSAGE);
      const phantom = (window as any).phantom?.bitcoin;
      const { signature } = await phantom.signMessage(address, message);

      if (!signature) {
        return alert("Sign message error");
      }

      const verified = Verifier.verifySignature(
        address,
        new TextDecoder().decode(message),
        bytesToBase64(signature)
      );

      if (verified) {
        WalletAdd({
          address,
          signature: base58.encode(signature),
          symbol: "BTC",
          isLinking,
          setSigned,
          reset,
          setSignature,
          onClose,
        });
      }
    } catch (error) {
      console.log("[SignaturePhantom] onSignMessageClick error", error);
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

export default SignaturePhantom;
