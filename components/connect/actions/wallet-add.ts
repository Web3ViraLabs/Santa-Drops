// walletUtils.js
import useLoginStore from "@/hooks/login-store";
import { existAddress, linkWallet, loginAccount } from "./actions";
import { Symbol } from "@prisma/client";

export async function WalletAdd({
  address,
  signature,
  symbol,
  isLinking,
  setSigned,
  reset,
  setSignature,
  onClose,
}: {
  address: string;
  signature: string;
  symbol: Symbol;
  isLinking: boolean;
  setSigned: (value: boolean) => void;
  reset: () => void;
  setSignature: (value: string) => void;
  onClose: () => void;
}) {
  const isAddressRegistered = await existAddress(address);

  if (isLinking) {
    if (!isAddressRegistered) {
      const linkNewWallet = await linkWallet({
        address,
        signature,
        symbol,
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
