"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import useBlockchain from "../../(routes)/[giveawayId]/components/logic/use-store";

interface TokenFormProps {
  loading: boolean;
  tokenName: string;
  regex: RegExp;
  placeholder: string;
}

const CryptoForm = ({
  tokenName,
  loading,
  regex,
  placeholder,
}: TokenFormProps & {}) => {
  const {
    selectedToken,
    setSelectedToken,
    setIsValid,
    isValid,
    address,
    setAddress,
  } = useBlockchain();
  const confirm = () => {
    setSelectedToken(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setAddress(input);
    if (regex.test(input)) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setSelectedToken(false);
    }
  };
  {
    /* TODO: Whitelist and Allowlist forms needs to planned more, pause them a bit*/
  }
  return (
    <div className="w-full lg:w-[60%] flex flex-col space-y-10 rounded-lg bg-background p-8 ml-8">
      <div className="relative flex flex-col space-y-2">
        <Label className="uppercase text-sm dark:text-zinc-400">
          Token contract address
        </Label>
        <Input
          className={cn(
            "w-full bg-main rounded-lg relative",
            isValid === false
              ? "border-red-500 focus:outline-none focus:ring-0 focus-visible:ring-0"
              : "dark:border-[#303030]"
          )}
          autoComplete="off"
          value={address}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {loading && (
          <span className="absolute -top-2 right-2 text-green-400">
            <Loader2 className=" w-4 h-4 animate-spin" />
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="uppercase text-sm dark:text-zinc-400">
          Token Name
        </Label>
        <Input
          disabled
          className="w-full bg-main rounded-lg dark:border-[#303030]"
          autoComplete="off"
          value={tokenName}
        />
      </div>
      {isValid && !loading && !selectedToken && tokenName && (
        <div className="flex flex-col items-center w-full space-y-2">
          <button
            onClick={confirm}
            className="rounded-full p-2 bg-neutral-600 hover:bg-neutral-500"
          >
            <Check className="w-6 h-6 text-green-400" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CryptoForm;
