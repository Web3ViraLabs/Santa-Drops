"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import useStore from "../logic/use-store";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TokenFormProps {
  regex: RegExp;
  placeholder: string;
  fetchNft: (
    address: string,
    tokenId: string
  ) => Promise<{ name: string; image: string }>;
}

const NftGiveaway = ({ regex, placeholder, fetchNft }: TokenFormProps & {}) => {
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
  const [blurred, setBlurred] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setAddress(input);
    if (regex.test(input)) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setTokenId("");
      setTokenData({ name: "", image: "" });
    }
  };

  const fetchNftFunc = async () => {
    setLoading(true);
    try {
      const data = await fetchNft(address, tokenId);
      setTokenData({
        name: data.name,
        image: data.image,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValid && tokenId && blurred) {
      try {
        fetchNftFunc();
      } catch (error) {
        console.log("[fetchNft_client] ", error);
      }
    }
  }, [isValid, address, blurred]);

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
            onChange={(e) => {
              setBlurred(false);
              setTokenId(e.target.value);
            }}
            onBlur={() => setBlurred(true)}
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
                    src={"/api/images?url=" + tokenData.image}
                    alt={tokenData.name || "Token image"}
                    fill
                    sizes="100%"
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default NftGiveaway;
