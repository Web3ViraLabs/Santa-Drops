type image = "wallet" | "coins" | "connections" | "user" | "demo";

const COINS_ICON = [
  { name: "Bitcoin", image: "/assets/coins/btc.png" },
  { name: "Ethereum", image: "/assets/coins/eth.png" },
  { name: "Solana", image: "/assets/coins/sol.png" },
  { name: "Polygon", image: "/assets/coins/matic.png" },
];

const USER_ICON = [
  { name: "Red", image: "/assets/user/red_diamond.svg" },
  { name: "Yellow", image: "/assets/user/yellow_diamond.svg" },
  { name: "Blue", image: "/assets/user/blue_diamond.svg" },
  { name: "Orange", image: "/assets/user/orange_diamond.svg" },
];

const CONNECTIONS_ICON = [
  { name: "Discord", image: "/assets/connections/discord.svg" },
  { name: "Twitter Light", image: "/assets/connections/twitter.svg" },
  { name: "Twitter Dark", image: "/assets/connections/twitter_light.svg" },
];

const WALLET_ICON = [
  { name: "Metamask", image: "/assets/wallets/metamask.webp" },
  { name: "Coinbase Wallet", image: "/assets/wallets/coinbase.png" },
  { name: "WalletConnect", image: "/assets/wallets/walletconnect.png" },
  { name: "Phantom", image: "/assets/wallets/phantom.svg" },
  { name: "Unisat", image: "/assets/wallets/unisat.png" },
  { name: "Xverse", image: "/assets/wallets/xverse.png" },
  { name: "Leather", image: "/assets/wallets/leather.png" },
];

const DEMO_IMAGES = Array.from({ length: 11 }, (_, i) => ({
  name: `Demo ${i + 1}`,
  image: `/assets/demo_images/${i + 1}.png`,
}));

export default function icon(image: image) {
  switch (image) {
    case "wallet":
      return WALLET_ICON;
    case "coins":
      return COINS_ICON;
    case "connections":
      return CONNECTIONS_ICON;
    case "user":
      return USER_ICON;
    case "demo":
      return DEMO_IMAGES;
  }
}
