import { create } from "zustand";

type EVMSymbol = "ETH" | "MATIC";
type NONEVMSymbol = "SOL";

interface Network {
  address: `0x${string}`;
}

interface SolanaNetwork {
  address: string;
}

interface LoginStoreState {
  selectedEVMNetwork: EVMSymbol | null;
  otherNetworks: NONEVMSymbol | null;
  currentAddress: Network | SolanaNetwork | null;
  isNetwork: boolean;
  address: string | null;
  signature: string;
  isSigned: boolean;
  selectedWallet: boolean;
}

interface LoginStoreActions extends LoginStoreState {
  setSelectedEVMNetwork: (id: EVMSymbol | null) => void;
  setOtherNetworks: (value: NONEVMSymbol | null) => void;
  setCurrentAddress: (network: Network | SolanaNetwork | null) => void;
  setIsNetwork: (value: boolean) => void;
  setAddress: (value: string) => void;
  setSignature: (value: string) => void;
  setSigned: (value: boolean) => void;
  setSelectedWallet: (value: boolean) => void;
}

const useLoginStore = create<LoginStoreState & LoginStoreActions>((set) => ({
  selectedEVMNetwork: null,
  otherNetworks: null,
  currentAddress: null,
  isNetwork: true,
  address: null,
  signature: "",
  isSigned: false,
  selectedWallet: false,

  setSelectedEVMNetwork: (id) => set({ selectedEVMNetwork: id }),
  setOtherNetworks: (value) => set({ otherNetworks: value }),
  setCurrentAddress: (network) => set({ currentAddress: network }),
  setIsNetwork: (value) => set({ isNetwork: value }),
  setAddress: (value) => set({ address: value }),
  setSignature: (value) => set({ signature: value }),
  setSigned: (value) => set({ isSigned: value }),
  setSelectedWallet: (value) => set({ selectedWallet: value }),
}));

export default useLoginStore;
