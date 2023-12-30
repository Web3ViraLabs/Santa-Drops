import React, { useEffect } from "react";
import WalletBtn from "../components/buttons/wallet-btn";
import { useWallet } from "@solana/wallet-adapter-react";
import useLoginStore from "../../../hooks/login-store";
import {
  WalletConnectionError,
  WalletName,
  WalletReadyState,
} from "@solana/wallet-adapter-base";

const SolanaWalletConnectionComponent: React.FC = () => {
  const selectedWallet = useLoginStore((state) => state.selectedWallet);
  const setSelectedWallet = useLoginStore((state) => state.setSelectedWallet);
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);
  const solanaAddress = useLoginStore((state) => state.solanaAddress);
  const setSolanaAddress = useLoginStore((state) => state.setSolanaAddress);

  const {
    wallets: solanaWallets,
    select: selectSolanaWallet,
    connected: isSolanaWalletConnected,
    publicKey: solanaPublicKey,
    connect: solanaConnect,
  } = useWallet();

  const handleSolanaConnect = async () => {
    try {
      await solanaConnect();
      console.log("Connecting to wallet...");
    } catch (error: any) {
      if (
        error instanceof WalletConnectionError &&
        error.message === "User rejected the request."
      ) {
        console.log("User rejected the connection request");
      } else {
        console.error("Wallet connection error:", error.message);
      }
    }
  };

  useEffect(() => {
    if (selectedWallet) {
      handleSolanaConnect();
    }
  }, [selectedWallet]);

  useEffect(() => {
    if (solanaPublicKey && solanaAddress) {
      setCurrentAddress({
        address: solanaPublicKey.toBase58(),
      });
    }
  }, [solanaPublicKey, solanaAddress]);

  const handleSolanaWalletConnect = async (name: WalletName) => {
    try {
      if (!isSolanaWalletConnected) {
        selectSolanaWallet(name);
        setSelectedWallet(true);
        setSolanaAddress(true);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return solanaWallets.map((wallet) => (
    <WalletBtn
      key={wallet.adapter.name}
      icon={wallet.adapter.icon}
      name={wallet.adapter.name}
      id={wallet.adapter.name}
      onClick={() => handleSolanaWalletConnect(wallet.adapter.name)}
      isDisable={wallet.readyState === WalletReadyState.NotDetected}
    />
  ));
};

export default SolanaWalletConnectionComponent;
