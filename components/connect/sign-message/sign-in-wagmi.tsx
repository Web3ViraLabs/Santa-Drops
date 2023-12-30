import { Address } from "@/lib/types";
import { useSignMessage } from "wagmi";
import { useModal } from "@/hooks/use-modal";
import useLoginStore from "../../../hooks/login-store";
import SignMessage from "../components/SignMessage";
import { WalletAdd } from "../actions/wallet-add";
import { SIGNATURE_MESSAGE } from "@/config/global";

const SignatureWagmi = ({ address }: Address) => {
  const { setSigned, reset, setSignature, isLinking } = useLoginStore();
  const { onClose } = useModal();

  const { isLoading, signMessage } = useSignMessage({
    message: SIGNATURE_MESSAGE,
    onSuccess: async (signData) => {
      WalletAdd({
        address,
        signature: signData,
        symbol: "ETH",
        isLinking,
        setSigned,
        reset,
        setSignature,
        onClose,
      });
    },
  });

  return (
    <SignMessage
      address={address}
      onSignMessageClick={() => signMessage()}
      loading={isLoading}
    />
  );
};

export default SignatureWagmi;
