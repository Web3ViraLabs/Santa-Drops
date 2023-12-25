import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

const LoginBtn = () => {
  const { onOpen } = useModal();
  return (
    <Button
      onClick={() => onOpen("login")}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto"
    >
      Connect Your Wallet
    </Button>
  );
};

export default LoginBtn;
