import { create } from "zustand";

type Blockchain = "ethereum" | "solana" | "bitcoin" | "polygon";

interface StoreState {
  address: string;
  isValid: boolean;
  selectedBlockchain: Blockchain | null;
  selectedToken: boolean;
  savedGwId: string;
  tokenData: null | { name: string; image: string };
  tokenId: string;
}

interface StoreActions extends StoreState {
  setAddress: (address: string) => void;
  setIsValid: (isValid: boolean) => void;
  setSelectedBlockchain: (store: Blockchain | null) => void;
  setSelectedToken: (token: boolean) => void;
  setSavedGwId: (id: string) => void;
  setTokenData: (data: { name: string; image: string }) => void;
  setTokenId: (id: string) => void;
  reset: () => void;
}

const initialState: StoreState = {
  address: "",
  isValid: false,
  selectedBlockchain: null,
  selectedToken: false,
  savedGwId: "",
  tokenData: {
    name: "",
    image: "",
  },
  tokenId: "",
};

const useStore = create<StoreState & StoreActions>((set) => ({
  ...initialState,
  setAddress: (address) => set({ address }),
  setIsValid: (isValid) => set({ isValid }),
  setSelectedBlockchain: (blockchain) =>
    set({ selectedBlockchain: blockchain }),
  setSelectedToken: (token) => set({ selectedToken: token }),
  setSavedGwId: (savedGwId) => set({ savedGwId }),
  setTokenData(data) {
    set({
      tokenData: {
        name: data.name,
        image: data.image,
      },
    });
  },
  setTokenId: (tokenId) => set({ tokenId }),
  reset: () => set(initialState),
}));

export default useStore;
