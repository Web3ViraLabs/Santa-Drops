"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { useTheme } from "next-themes";

type ThemeMode = "dark" | "light" | undefined;

const currentTheme = (): ThemeMode => {
  const theme = localStorage.getItem("theme");

  if (!theme) {
    return "dark";
  }

  if (theme === "dark") return "dark";
  if (theme === "light") return "light";
};

console.log(currentTheme());

const projectId =
  "da1e1dfd587399a80f9716faf9256f75" || process.env.NEXT_PUBLIC_PROJECT_ID!;

const wallets = {
  MetaMask: "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  "Trust Wallet":
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
  "Rainbow wallet":
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
  Phantom: "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
  Coinbase: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
  Exodus: "e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4",
};

const chains = [
  {
    chainId: 1, // Mainnet Ethereum
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  },
  {
    chainId: 56, // Mainnet Binance Smart Chain
    name: "Binance Smart Chain",
    currency: "BNB",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  {
    chainId: 137, // Mainnet Polygon
    name: "Polygon",
    currency: "MATIC",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com/",
  },
];

const metadata = {
  name: "Santa Drops",
  description: "Santa Drops description",
  url: "https://mywebsite.com",
  icons: ["/favicon.ico"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata, defaultChainId: 1 }),
  includeWalletIds: Object.values(wallets),
  chains,
  projectId,
  // themeMode: currentTheme(),
});

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return children;
}
