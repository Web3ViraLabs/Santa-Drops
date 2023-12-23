"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";
import { MetaMaskSDKOptions } from "@metamask/sdk";

const SDK_OPTIONS: MetaMaskSDKOptions = {
  dappMetadata: {
    name: "AlphaGini",
    url: "localhost:3000",
  },
};

export default function MMProivder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MetaMaskProvider sdkOptions={SDK_OPTIONS} debug>
      {children}
    </MetaMaskProvider>
  );
}
