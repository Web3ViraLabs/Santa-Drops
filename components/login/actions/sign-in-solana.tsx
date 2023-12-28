"use client";

import { Button } from "@/components/ui/button";
import { useLoginContext } from "../context/login-context";
import base58 from "bs58";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useWallet } from "@solana/wallet-adapter-react";
import nacl from "tweetnacl";
import { type PublicKey } from "@solana/web3.js";
import { WalletSignMessageError } from "@solana/wallet-adapter-base";
import useLoginStore from "../config/login-store";
import { existAddress, linkWallet, loginAccount } from "./actions";

const MESSAGE_TO_SIGN = "Alphagini";

const SignatureSolana = ({ publicKey }: { publicKey: PublicKey }) => {
  const { onClose } = useModal();
  const { setSigned, reset, setSignature, isLinking } = useLoginStore();
  const { signMessage, disconnect } = useWallet();

  const handleClose = () => {
    reset();
    onClose();
    disconnect();
  };

  const sign = async () => {
    const message = new TextEncoder().encode(MESSAGE_TO_SIGN);
    if (!signMessage)
      throw new Error("Wallet does not support message signing");
    try {
      const uint8arraySignature = await signMessage(message);
      const walletIsSigner = nacl.sign.detached.verify(
        message,
        uint8arraySignature,
        publicKey.toBuffer()
      );

      if (walletIsSigner) {
        const isAddressRegistered = await existAddress(publicKey.toBase58());

        if (isLinking) {
          if (!isAddressRegistered) {
            const linkNewWallet = await linkWallet({
              address: publicKey.toBase58(),
              signature: base58.encode(uint8arraySignature),
              symbol: "SOL",
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
          setSignature(base58.encode(uint8arraySignature));
          setSigned(true);
          return;
        }

        const user = await loginAccount(publicKey.toBase58());

        if (user) {
          // login(user);

          reset();
          onClose();
          return;
        }
      }
    } catch (error) {
      if (error instanceof WalletSignMessageError) {
        if (error.message.includes("not connected")) {
          handleClose();
        }
      }
    }
  };

  // const { isLoading, signMessage } = useSignMessage({
  //   message: "Alphagini",
  //   onSuccess: async (signData) => {
  //     const { data, status } = await axios.post("/api/account/login", {
  //       address,
  //     });

  //     const user: User = data.user;

  //     if (status === 200 && user) {
  //       login(user);
  //       onClose();
  //       return router.push("/");
  //     }

  //     setSigned(true);
  //     // setSignature(data);
  //   },
  // });

  return (
    <div className="flex flex-col space-y-4 items-center w-full">
      <div>
        <h1 className="text-lg font-semibold">
          Sign in to prove wallet ownership
        </h1>
      </div>
      <div>
        <div className="flex mx-auto items-center justify-center w-full bg-[#7d5eda]/40 px-4 py-0.5 rounded-lg">
          <span>
            {publicKey.toString().replace(/^(.{4}).*(.{4})$/, "$1...$2")}
          </span>
        </div>
      </div>

      <Button className="px-10 dark:text-white" onClick={sign}>
        Sign Message
      </Button>
    </div>
  );
};

export default SignatureSolana;
