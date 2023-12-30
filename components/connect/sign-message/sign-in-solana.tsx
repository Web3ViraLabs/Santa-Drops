"use client";

import base58 from "bs58";
import { useModal } from "@/hooks/use-modal";
import { useWallet } from "@solana/wallet-adapter-react";
import nacl from "tweetnacl";
import { type PublicKey } from "@solana/web3.js";
import { WalletSignMessageError } from "@solana/wallet-adapter-base";
import useLoginStore from "../../../hooks/login-store";
import { useState } from "react";
import SignMessage from "../components/SignMessage";
import { WalletAdd } from "../actions/wallet-add";
import { SIGNATURE_MESSAGE } from "@/config/global";

const SignatureSolana = ({ publicKey }: { publicKey: PublicKey }) => {
  const { onClose } = useModal();
  const { setSigned, reset, setSignature, isLinking } = useLoginStore();
  const { signMessage, disconnect } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    reset();
    onClose();
    disconnect();
  };

  const sign = async () => {
    const message = new TextEncoder().encode(SIGNATURE_MESSAGE);
    if (!signMessage)
      throw new Error("Wallet does not support message signing");
    try {
      setLoading(true);
      const uint8arraySignature = await signMessage(message);
      const walletIsSigner = nacl.sign.detached.verify(
        message,
        uint8arraySignature,
        publicKey.toBuffer()
      );

      if (walletIsSigner) {
        WalletAdd({
          address: publicKey.toBase58(),
          signature: base58.encode(uint8arraySignature),
          symbol: "SOL",
          isLinking,
          setSigned,
          reset,
          setSignature,
          onClose,
        });
      }
    } catch (error) {
      if (error instanceof WalletSignMessageError) {
        if (error.message.includes("not connected")) {
          handleClose();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignMessage
      address={publicKey.toBase58()}
      onSignMessageClick={sign}
      loading={loading}
    />
  );
};

export default SignatureSolana;
