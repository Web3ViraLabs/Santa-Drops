"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import useLoginStore from "../config/login-store";
import { existAddress, linkWallet, loginAccount } from "./actions";
import { useState } from "react";
import { verifyMessage } from "@unisat/wallet-utils";

const MESSAGE = "Alphagini";
declare const window: any;

import { Verifier } from "bip322-js";
import base58 from "bs58";

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
      const message = new TextEncoder().encode(MESSAGE);
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

      console.log(base58.encode(signature));

      if (verified) {
        const isAddressRegistered = await existAddress(address);

        if (isLinking) {
          if (!isAddressRegistered) {
            const linkNewWallet = await linkWallet({
              address,
              signature: base58.encode(signature),
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
          setSignature(base58.encode(signature));
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

export default SignaturePhantom;
