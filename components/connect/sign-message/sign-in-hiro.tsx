"use client";

import { useModal } from "@/hooks/use-modal";
import useLoginStore from "../../../hooks/login-store";
import { openSignatureRequestPopup } from "@stacks/connect";
import { useState } from "react";
import { verifyMessageSignatureRsv } from "@stacks/encryption";
import { StacksMainnet } from "@stacks/network";
import SignMessage from "../components/SignMessage";
import { WalletAdd } from "../actions/wallet-add";
import { APPNAME, SIGNATURE_MESSAGE } from "@/config/global";

const SignatureLeather = ({ address }: { address: string }) => {
  const { setSigned, reset, setSignature, isLinking } = useLoginStore();
  const { onClose } = useModal();
  const [loading, setLoading] = useState(false);

  const onSignMessageClick = async () => {
    if (!address) return alert("Address is required");
    try {
      setLoading(true);
      openSignatureRequestPopup({
        message: SIGNATURE_MESSAGE,
        network: new StacksMainnet(),
        appDetails: {
          name: APPNAME,
          icon: "/favicon.ico",
        },
        onFinish: async ({ publicKey, signature }) => {
          const verified = verifyMessageSignatureRsv({
            message: SIGNATURE_MESSAGE,
            publicKey,
            signature,
          });

          if (verified) {
            WalletAdd({
              address,
              signature,
              symbol: "SOL",
              isLinking,
              setSigned,
              reset,
              setSignature,
              onClose,
            });
          }
        },
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

export default SignatureLeather;
