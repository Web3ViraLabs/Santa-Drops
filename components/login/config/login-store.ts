import { create } from "zustand";

type EVMSymbol = "ETH" | "MATIC";
type NONEVMSymbol = "SOL" | "BTC";

interface Network {
  address: `0x${string}`;
}

interface OtherNetworks {
  address: string;
}

type BTCWallet = "leather" | "xverse";

interface LoginStoreState {
  selectedEVMNetwork: EVMSymbol | null;
  otherNetworks: NONEVMSymbol | null;
  currentAddress: Network | OtherNetworks | null;
  currentBtcWallet: BTCWallet | null;
  btcAddress: string | null;
  isNetwork: boolean;
  address: string | null;
  signature: string;
  isSigned: boolean;
  selectedWallet: boolean;
  solanaAddress: boolean;
  isLinking: boolean;
}

interface LoginStoreActions extends LoginStoreState {
  setSelectedEVMNetwork: (id: EVMSymbol | null) => void;
  setOtherNetworks: (value: NONEVMSymbol | null) => void;
  setCurrentAddress: (network: Network | OtherNetworks | null) => void;
  setCurrentBtcWallet: (wallet: BTCWallet | null) => void;
  setBtcAddress: (value: string) => void;
  setIsNetwork: (value: boolean) => void;
  setAddress: (value: string) => void;
  setSignature: (value: string) => void;
  setSigned: (value: boolean) => void;
  setSelectedWallet: (value: boolean) => void;
  setSolanaAddress: (value: boolean) => void;
  setIsLinking: (value: boolean) => void;

  // New reset function
  reset: () => void;
}

const initialState: LoginStoreState = {
  selectedEVMNetwork: null,
  otherNetworks: null,
  currentAddress: null,
  currentBtcWallet: null,
  btcAddress: null,
  isNetwork: true,
  address: null,
  signature: "",
  isSigned: false,
  selectedWallet: false,
  solanaAddress: true,
  isLinking: false,
};

const useLoginStore = create<LoginStoreState & LoginStoreActions>((set) => ({
  ...initialState,

  setSelectedEVMNetwork: (id) => set({ selectedEVMNetwork: id }),
  setOtherNetworks: (value) => set({ otherNetworks: value }),
  setCurrentAddress: (network) => set({ currentAddress: network }),
  setCurrentBtcWallet: (wallet) => set({ currentBtcWallet: wallet }),
  setBtcAddress: (value) => set({ btcAddress: value }),
  setIsNetwork: (value) => set({ isNetwork: value }),
  setAddress: (value) => set({ address: value }),
  setSignature: (value) => set({ signature: value }),
  setSigned: (value) => set({ isSigned: value }),
  setSelectedWallet: (value) => set({ selectedWallet: value }),
  setSolanaAddress: (value) => set({ solanaAddress: value }),
  setIsLinking: (value) => set({ isLinking: value }),

  // Implementation of the reset function
  reset: () => set(initialState),
}));

export default useLoginStore;
