"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import useStore from "../logic/use-store";
import Image from "next/image";
import { UploadFile } from "@/components/uploadfile";
import { useEffect, useState } from "react";
import { fetchNftDetails } from "../../../utils/ERC-721";

interface TokenFormProps {
  regex: RegExp;
  placeholder: string;
}

const NftGiveaway = ({ regex, placeholder }: TokenFormProps & {}) => {
  const {
    setIsValid,
    isValid,
    address,
    setAddress,
    tokenData,
    setTokenData,
    tokenId,
    setTokenId,
  } = useStore();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setAddress(input);
    if (regex.test(input)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const fetchNft = async () => {
    setLoading(true);
    try {
      const data = await fetchNftDetails(address, tokenId);
      setTokenData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValid && tokenId) {
      fetchNft();
      try {
      } catch (error) {}
    }
  }, [isValid, tokenId, address]);

  const onImageChange = (url: string | undefined) => {
    setTokenData({
      name: tokenData?.name || "",
      image: url || "",
    });
  };
  return (
    <>
      <div className="relative flex flex-col space-y-2 w-full">
        <Label className="uppercase text-sm dark:text-zinc-400">
          Nft Collection contract address
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
        <div className="flex flex-col space-y-2 w-full">
          <Label className="uppercase text-sm dark:text-zinc-400">
            Nft token id
          </Label>
          <Input
            className="w-full bg-main rounded-lg dark:border-[#303030]"
            autoComplete="off"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="0"
          />
        </div>
        {loading && (
          <span className="absolute -top-2 right-2 text-green-400">
            <Loader2 className=" w-4 h-4 animate-spin" />
          </span>
        )}
      </div>
      {address &&
        isValid &&
        !loading &&
        tokenData &&
        tokenData.name.length > 0 && (
          <>
            <div className="flex flex-col space-y-2 w-full">
              <Label className="uppercase text-sm dark:text-zinc-400">
                Nft name
              </Label>
              <Input
                disabled
                className="w-full bg-main rounded-lg dark:border-[#303030]"
                autoComplete="off"
                value={tokenData.name}
              />
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <Label className="uppercase text-sm dark:text-zinc-400">
                Nft Image
              </Label>
              {tokenData.image && tokenData.image.startsWith("http") && (
                <div className="relative h-32 w-32">
                  <Image
                    src={tokenData.image}
                    alt={tokenData.name || "Token image"}
                    fill
                    sizes="100%"
                    className="rounded-full object-cover"
                  />
                  {/* <button
                    onClick={() => {
                      setTokenData({
                        name: tokenData?.name || "",
                        image: "",
                      });
                    }}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button> */}
                </div>
              )}
              {/* {!tokenData.image && (
                <UploadFile
                  endpoint="tokenImage"
                  onChange={onImageChange}
                  value={tokenData?.image || ""}
                  className="h-32 w-32 rounded-full"
                />
              )} */}
            </div>
          </>
        )}
      {/* {isValid &&
        !loading &&
        !selectedToken &&
        tokenData &&
        tokenData.image &&
        tokenData.name && (
          <div className="flex flex-col items-center w-full space-y-2">
            <button
              onClick={confirm}
              className="rounded-full p-2 bg-neutral-600 hover:bg-neutral-500"
            >
              <Check className="w-6 h-6 text-green-400" />
            </button>
          </div>
        )} */}
    </>
  );
};

export default NftGiveaway;
