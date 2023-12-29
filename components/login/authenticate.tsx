import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import LoginCard from "./actions/register-account";
import Signature from "./actions/sign-in-wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import SignatureSolana from "./actions/sign-in-solana";
import { Loader2 } from "lucide-react";
import EVMWalletConnectionComponent from "./components/EVMWalletConnection";
import NetworkSelectionComponent from "./components/NetworkSelection";
import SolanaWalletConnectionComponent from "./components/SolanaWalletConnection";
import ChangeNetworkButtonComponent from "./components/ChangeNetworkButton";
import ChangeWalletButtonComponent from "./components/ChangeWalletButton";
import useLoginStore from "./config/login-store";
import XverseWallet from "./components/XVerseWalletConnection";
import SignatureXverse from "./actions/sign-in-xverse";
import BTCWalletConnection from "./components/BTCWalletConnection";
import SignatureLeather from "./actions/sign-in-hiro";
import SignatureUnisat from "./actions/sign-in-unisat";
import SignaturePhantom from "./actions/sign-in-phantom";

const Login = () => {
  const selectedEVMNetwork = useLoginStore((state) => state.selectedEVMNetwork);
  const otherNetworks = useLoginStore((state) => state.otherNetworks);
  const isNetwork = useLoginStore((state) => state.isNetwork);
  const isSigned = useLoginStore((state) => state.isSigned);
  const currentAddress = useLoginStore((state) => state.currentAddress);
  const selectedWallet = useLoginStore((state) => state.selectedWallet);
  const btcAddress = useLoginStore((state) => state.btcAddress);
  const setSelectedWallet = useLoginStore((state) => state.setSelectedWallet);
  const currentBtcWallet = useLoginStore((state) => state.currentBtcWallet);

  const { address } = useAccount();
  const { disconnect: EVMDisconnect } = useDisconnect();
  const {
    publicKey: solanaPublicKey,
    connecting: isSolanaWalletConnecting,
    disconnect: solanaDisconnect,
  } = useWallet();

  const { reset } = useLoginStore();

  // Disconnects EVM Wallet so user can login again from different wallet or chain
  useEffect(() => {
    EVMDisconnect();
  }, [EVMDisconnect, reset]);

  // Set solana selected wallet to false, so user can login again from different wallet

  useEffect(() => {
    setSelectedWallet(false);
  }, [selectedWallet]);

  useEffect(() => {
    solanaDisconnect();
  }, [reset]);

  // Below are the conditions required to show different states

  const NETWORK_TAB_CONDITION =
    !selectedEVMNetwork && !otherNetworks && isNetwork;

  const EVM_WALLET_CONDITION = selectedEVMNetwork && !otherNetworks;

  const SOLANA_WALLET_CONDITION =
    !selectedEVMNetwork && otherNetworks === "SOL";

  const BTC_WALLET_CONDITION = !selectedEVMNetwork && otherNetworks === "BTC";

  const CHANGE_NETWORK_CONDITION = otherNetworks || selectedEVMNetwork;

  return (
    <Card className="w-full md:w-[580px] px-4 md:px-8 lg:me-16 max-h-[600px]">
      <CardHeader className="p-2 sm:p-6">
        <CardTitle className="text-3xl text-center flex items-center gap-x-2 justify-center">
          <div>
            {!isSigned &&
              (currentAddress ? "Verify wallet" : "Select a network")}
          </div>
          <div>
            {isSolanaWalletConnecting && (
              <Loader2 className="animate-spin h-6 w-6 dark:text-white" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isSigned && (
          <>
            {address && <LoginCard address={address!} symbol="ETH" />}
            {solanaPublicKey && (
              <LoginCard address={solanaPublicKey.toBase58()} symbol="SOL" />
            )}
            {currentAddress && !address && !solanaPublicKey && (
              <LoginCard
                address={currentAddress.address}
                symbol="BTC"
                btcAddress={btcAddress ? btcAddress : undefined}
              />
            )}
          </>
        )}
        {!isSigned && (
          <>
            {currentAddress && (
              <>
                {address === currentAddress.address && (
                  <Signature address={address} />
                )}
                {solanaPublicKey?.toBase58() === currentAddress.address && (
                  <SignatureSolana publicKey={solanaPublicKey} />
                )}
                {currentBtcWallet && !solanaPublicKey && !address && (
                  <>
                    {currentBtcWallet === "xverse" && (
                      <SignatureXverse address={currentAddress.address} />
                    )}
                    {currentBtcWallet === "leather" && (
                      <SignatureLeather address={currentAddress.address} />
                    )}
                    {currentBtcWallet === "unisat" && (
                      <SignatureUnisat address={currentAddress.address} />
                    )}
                    {currentBtcWallet === "phantom" && (
                      <SignaturePhantom address={currentAddress.address} />
                    )}
                  </>
                )}

                <ChangeWalletButtonComponent />
              </>
            )}

            {!currentAddress && (
              <>
                {NETWORK_TAB_CONDITION && <NetworkSelectionComponent />}
                {EVM_WALLET_CONDITION && <EVMWalletConnectionComponent />}
                {SOLANA_WALLET_CONDITION && <SolanaWalletConnectionComponent />}
                {BTC_WALLET_CONDITION && <BTCWalletConnection />}
              </>
            )}
            {CHANGE_NETWORK_CONDITION && <ChangeNetworkButtonComponent />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Login;
