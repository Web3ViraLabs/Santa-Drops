import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { PhantomConnector } from "phantom-wagmi-connector";
import { avalanche, polygon } from "viem/chains";
import { APPNAME } from "@/config/global";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: APPNAME,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "da1e1dfd587399a80f9716faf9256f75",
      },
    }),
    new PhantomConnector({ chains }),
  ],
  // TODO: Change to infura in production
  publicClient,
  webSocketPublicClient,
});

export default function WagmiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
