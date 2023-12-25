import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useLoginContext } from "./login-context";
import LoginCard from "./create-account";
import Signature from "./sign-in-wagmi";
import { EVM_NETWORKS, OTHER_NETWORKS } from "../config/networks";
import NetworkBtn from "./network-btn";
import WalletBtn from "./wallet-btn";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";

type EVMNetworkID = 1 | 137;
const validEVMNetworks = [1, 137];

interface Network {
  address: `0x${string}`;
}

interface SolanaNetwork {
  address: string;
}

const Login = () => {
  const [selectedEVMNetwork, setSelectedEVMNetwork] =
    useState<EVMNetworkID | null>(null);
  const [otherNetworks, setOtherNetworks] = useState<1 | 2 | null>();
  const { signature, isSigned, setSignature, setSigned } = useLoginContext();
  const [currentNetwork, setCurrentNetwork] = useState<
    Network | SolanaNetwork
  >();
  const [isNetwork, setIsNetwork] = useState(true);
  const { address } = useAccount({
    onDisconnect: () => {
      setIsNetwork(true);
      setCurrentNetwork(undefined);
      setSigned(false);
      setSignature("");
    },
  });
  const { disconnect: EVMDisconnect } = useDisconnect();

  // When user connects their wallet, this event changes currentNetwork state
  const { connect, connectors, pendingConnector, error, isLoading } =
    useConnect({
      chainId: selectedEVMNetwork === null ? undefined : selectedEVMNetwork,
      onSuccess: (data) => {
        setCurrentNetwork({
          address: data.account,
        });
      },
    });

  const {
    wallets: solanaWallets,
    select: selectSolanaWallet,
    publicKey: solanaPublicKey,
    connect: solanaConnect,
    disconnect: solanaDisconnect,
  } = useWallet();

  useEffect(() => {
    EVMDisconnect();
    console.log("disconnected from evm");
  }, [EVMDisconnect]);

  const handleEVMNetworkClick = (id: EVMNetworkID) => {
    EVMDisconnect();
    setSelectedEVMNetwork(id);
  };

  const handleEVMWalletConnect = (connector: any) => {
    try {
      connect({ connector });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSolanaWalletConnect = (name: WalletName) => {
    try {
      // solanaDisconnect();
      selectSolanaWallet(name);
      solanaConnect();
      console.log(solanaPublicKey?.toBase58());
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeWallet = () => {
    EVMDisconnect();
    setCurrentNetwork(undefined);
    setSelectedEVMNetwork(selectedEVMNetwork);
  };

  const handleChangeNetwork = () => {
    setCurrentNetwork(undefined);
    setSelectedEVMNetwork(null);
    setOtherNetworks(null);
    solanaDisconnect();
    localStorage.removeItem("walletName");
    EVMDisconnect();
  };

  const NETWORK_TAB_CONDITION =
    !currentNetwork && !selectedEVMNetwork && !otherNetworks && isNetwork;

  const EVM_WALLET_CONDITION =
    !currentNetwork && selectedEVMNetwork && !otherNetworks;
  validEVMNetworks.includes(selectedEVMNetwork as EVMNetworkID);

  const SOLANA_WALLET_CONDITION =
    !currentNetwork && !selectedEVMNetwork && otherNetworks === 1;

  const CHANGE_NETWORK_CONDITION = otherNetworks || selectedEVMNetwork;

  return (
    <Card className="w-full md:w-[580px] px-4 md:px-8 lg:me-16 max-h-[600px]">
      <CardHeader className="p-2 sm:p-6">
        <CardTitle className="text-3xl text-center">
          {!isSigned && (currentNetwork ? "Verify wallet" : "Select a network")}
        </CardTitle>
      </CardHeader>
      <CardContent key={selectedEVMNetwork} className="flex flex-col gap-4">
        {isSigned && address && (
          <LoginCard signature={signature} address={address!} />
        )}
        {currentNetwork && !isSigned && address === currentNetwork.address && (
          <>
            <Signature address={address} />
            <Button variant={"outline"} onClick={handleChangeWallet}>
              Change wallet
            </Button>
          </>
        )}
        {!isSigned && (
          <>
            {NETWORK_TAB_CONDITION && (
              <>
                {OTHER_NETWORKS.map((network) => (
                  <NetworkBtn
                    icon={network.icon}
                    key={network.id}
                    name={network.name}
                    onClick={() => {
                      setOtherNetworks(network.id as 1 | 2);
                    }}
                  />
                ))}
                {EVM_NETWORKS.map((network, _) => (
                  <NetworkBtn
                    key={_}
                    name={network.name}
                    icon={network.icon}
                    onClick={() =>
                      handleEVMNetworkClick(network.id as EVMNetworkID)
                    }
                  />
                ))}
              </>
            )}
            {EVM_WALLET_CONDITION &&
              connectors.map((connector) => (
                <WalletBtn
                  icon={"/eth.png"}
                  isDisable={!connector.ready}
                  isLoading={
                    !error && isLoading && pendingConnector?.id === connector.id
                  }
                  key={connector.id}
                  name={connector.name}
                  id={connector.id}
                  onClick={() => handleEVMWalletConnect(connector)}
                />
              ))}
            {SOLANA_WALLET_CONDITION &&
              solanaWallets.map((wallet) => (
                <WalletBtn
                  icon={wallet.adapter.icon}
                  key={wallet.adapter.name}
                  name={wallet.adapter.name}
                  id={wallet.adapter.name}
                  onClick={() => handleSolanaWalletConnect(wallet.adapter.name)}
                  isDisable={false}
                  isLoading={false}
                />
              ))}
            {CHANGE_NETWORK_CONDITION && (
              <Button variant={"outline"} onClick={handleChangeNetwork}>
                Change network
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Login;
