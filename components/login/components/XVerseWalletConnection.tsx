import type { Capability } from "sats-connect";
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  getCapabilities,
} from "sats-connect";

import { useEffect, useState } from "react";
import WalletBtn from "./buttons/wallet-btn";
import useLoginStore from "../config/login-store";

function XverseWallet() {
  const [loading, setLoading] = useState(false);
  const setCurrentAddress = useLoginStore((state) => state.setCurrentAddress);
  const setBtcAddress = useLoginStore((state) => state.setBtcAddress);

  const [capabilityState, setCapabilityState] = useState<
    "loading" | "loaded" | "missing" | "cancelled"
  >("loading");
  const [capabilities, setCapabilities] = useState<Set<Capability>>();

  useEffect(() => {
    const runCapabilityCheck = async () => {
      let runs = 0;
      const MAX_RUNS = 20;
      setCapabilityState("loading");
      while (runs < MAX_RUNS) {
        try {
          await getCapabilities({
            onFinish(response) {
              setCapabilities(new Set(response));
              setCapabilityState("loaded");
            },
            onCancel() {
              setCapabilityState("cancelled");
            },
            payload: {
              network: {
                type: BitcoinNetworkType.Mainnet,
              },
            },
          });
        } catch (e) {
          runs++;
          if (runs === MAX_RUNS) {
            setCapabilityState("missing");
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    runCapabilityCheck();
  }, []);

  const onConnectClick = async () => {
    try {
      setLoading(true);
      await getAddress({
        payload: {
          purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
          message: "Connect with AlphaZ",
          network: {
            type: BitcoinNetworkType.Mainnet,
          },
        },
        onFinish: (response) => {
          const paymentAddressItem = response.addresses.find(
            (address) => address.purpose === AddressPurpose.Payment
          );
          const ordinalsAddressItem = response.addresses.find(
            (address) => address.purpose === AddressPurpose.Ordinals
          );

          if (paymentAddressItem && ordinalsAddressItem) {
            setCurrentAddress({
              address: ordinalsAddressItem.address,
            });
            setBtcAddress(paymentAddressItem.address);
            return;
          }

          return console.log("No addresses found (Xverse)");
        },
        onCancel: () => {},
      });
    } catch (error) {
      console.log("[XverseWallet] onConnectClick error", error);
    } finally {
      setLoading(false);
    }
  };

  //   const capabilityMessage =
  //     capabilityState === "loading"
  //       ? "Checking capabilities..."
  //       : capabilityState === "cancelled"
  //       ? "Capability check cancelled by wallet. Please refresh the page and try again."
  //       : capabilityState === "missing"
  //       ? "Could not find an installed Sats Connect capable wallet. Please install a wallet and try again."
  //       : !capabilities
  //       ? "Something went wrong with getting capabilities"
  //       : undefined;

  return (
    <WalletBtn
      id="1"
      name="Xverse"
      icon="/xverse_icon.png"
      onClick={onConnectClick}
      isDisable={capabilityState === "missing"}
      isLoading={loading}
    />
  );
}

export default XverseWallet;
