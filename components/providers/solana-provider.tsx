import {
  WalletAdapterNetwork,
  WalletError,
  WalletWindowClosedError,
} from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";

import {
  PhantomWalletAdapter,
  CoinbaseWalletAdapter,
  WalletConnectWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, ReactNode, useCallback, useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useModal } from "@/hooks/use-modal";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new CoinbaseWalletAdapter(),
      new WalletConnectWalletAdapter({
        network,
        options: {
          projectId: "da1e1dfd587399a80f9716faf9256f75",
        },
      }),
    ],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    try {
      console.log(error);

      // if (error instanceof WalletWindowClosedError) {
      //   onClose();
      // }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const SolanaProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <WalletContextProvider>{children}</WalletContextProvider>;
};
