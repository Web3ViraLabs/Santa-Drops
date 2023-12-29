"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import useLoginStore from "../config/login-store";
import { existAddress, linkWallet, loginAccount } from "./actions";
import { useState } from "react";
import { verifyMessage } from "@unisat/wallet-utils";

const MESSAGE = "Alphagini";
declare const window: any;

const SignatureUnisat = ({ address }: { address: string }) => {
  const { setSigned, reset, setSignature, isLinking } = useLoginStore();
  const { onClose } = useModal();
  const [loading, setLoading] = useState(false);

  const onSignMessageClick = async () => {
    if (!address) return alert("Address is required");
    try {
      setLoading(true);
      let signature = await window.unisat.signMessage(MESSAGE);
      const pubKey = await window.unisat.getPublicKey();

      if (!signature) {
        return alert("Sign message error");
      }

      if (!pubKey) {
        return alert("Public key error");
      }

      const verified = verifyMessage(pubKey, MESSAGE, signature);
      console.log("verified", verified);

      if (verified) {
        const isAddressRegistered = await existAddress(address);

        if (isLinking) {
          if (!isAddressRegistered) {
            const linkNewWallet = await linkWallet({
              address,
              signature,
              symbol: "BTC",
            });

            if (!linkNewWallet) {
              return null;
            }

            console.log("Linked wallet", linkNewWallet);

            reset();
            onClose();
            return;
          }

          reset();
          onClose();
          return console.log("Wallet already linked");
        }

        if (!isAddressRegistered) {
          setSignature(signature);
          setSigned(true);
          return;
        }

        const user = await loginAccount(address);

        if (user) {
          reset();
          onClose();
          return;
        }
      }
    } catch (error) {
      console.log("[SignatureXverse] onSignMessageClick error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 items-center w-full">
      <div>
        <h1 className="text-lg font-semibold">
          Sign in to prove wallet ownership
        </h1>
      </div>
      <div>
        <div className="flex mx-auto items-center justify-center w-full bg-[#7d5eda]/40 px-4 py-0.5 rounded-lg">
          <span>{address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}</span>
        </div>
      </div>

      <Button
        className="px-10 dark:text-white"
        disabled={loading}
        onClick={onSignMessageClick}
      >
        Sign Message {loading && <span>(signing...)</span>}
      </Button>
    </div>
  );
};

export default SignatureUnisat;
