import { create } from "zustand";

type Blockchain = "ethereum" | "solana" | "bitcoin" | "polygon";

interface StoreState {
  address: string;
  isValid: boolean;
  selectedBlockchain: Blockchain | null;
  selectedToken: boolean;
  savedGwId: string;
}

interface StoreActions extends StoreState {
  setAddress: (address: string) => void;
  setIsValid: (isValid: boolean) => void;
  setSelectedBlockchain: (store: Blockchain | null) => void;
  setSelectedToken: (token: boolean) => void;
  setSavedGwId: (id: string) => void;
  reset: () => void;
}

const initialState: StoreState = {
  address: "",
  isValid: false,
  selectedBlockchain: null,
  selectedToken: false,
  savedGwId: "",
};

const useStore = create<StoreState & StoreActions>((set) => ({
  ...initialState,
  setAddress: (address) => set({ address }),
  setIsValid: (isValid) => set({ isValid }),
  setSelectedBlockchain: (blockchain) =>
    set({ selectedBlockchain: blockchain }),
  setSelectedToken: (token) => set({ selectedToken: token }),
  setSavedGwId: (savedGwId) => set({ savedGwId }),
  reset: () => set(initialState),
}));

export default useStore;
