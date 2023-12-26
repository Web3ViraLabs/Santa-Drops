import { Button } from "@/components/ui/button";
import { Address } from "@/lib/types";
import { useSignMessage } from "wagmi";
import { useLoginContext } from "../context/login-context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { User } from "@prisma/client";

const Signature = ({ address }: Address) => {
  const { setSigned, login } = useLoginContext();
  const router = useRouter();
  const { onClose } = useModal();

  const { isLoading, signMessage } = useSignMessage({
    message: "Alphagini",
    onSuccess: async (signData) => {
      const { data, status } = await axios.post("/api/account/login", {
        address,
      });

      const user: User = data.user;

      if (status === 200 && user) {
        login(user);
        onClose();
        return router.push("/");
      }

      setSigned(true);
      // setSignature(data);
    },
  });

  return (
    <div className="flex flex-col space-y-4 items-center w-full">
      <div>
        <h1 className="text-lg font-semibold">
          Sign in to prove wallet ownership
        </h1>
      </div>
      <div>
        <div className="flex mx-auto items-center justify-center w-full bg-[#7d5eda]/40 px-4 py-0.5 rounded-lg">
          <span>{address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}</span>
        </div>
      </div>

      <Button
        className="px-10 dark:text-white"
        disabled={isLoading}
        onClick={() => signMessage()}
      >
        Sign Message {isLoading && <span>(signing...)</span>}
      </Button>
    </div>
  );
};

export default Signature;
