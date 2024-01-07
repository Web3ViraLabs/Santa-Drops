"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import useStore from "../../logic/use-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchBtcNft } from "./actions/fetch-nft-btc";

const NftBitcoin = () => {
  const { setIsValid, isValid, address, setAddress, tokenData, setTokenData } =
    useStore();
  const [loading, setLoading] = useState(false);
  const [blurred, setBlurred] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setAddress(input);
    if (
      /^-?([1-9]\d{0,8}|1\d{9}|20\d{8}|21[0-3]\d{7}|214[0-6]\d{6}|2147[0-3]\d{5}|21474[0-7]\d{4}|214748[0-2]\d{3}|2147483[0-5]\d{2}|21474836[0-3]\d|214748364[0-7]|0)$/.test(
        input
      )
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setTokenData({ name: "", image: "" });
    }
  };

  const fetchNftFunc = async () => {
    setLoading(true);
    try {
      console.log("initiate");

      const data = await fetchBtcNft(address);
      console.log(data);

      setTokenData({
        name: data.name,
        image: data.image,
      });
    } catch (error) {
      console.log("[fetchNftBitcoin_client] ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValid && blurred) {
      try {
        fetchNftFunc();
      } catch (error) {
        console.log("[fetchNftBitcoin_client] ", error);
      }
    }
  }, [isValid, address, blurred]);

  return (
    <>
      <div className="relative flex flex-col space-y-2 w-full">
        <Label className="uppercase text-sm dark:text-zinc-400">
          Inscription number
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
          onChange={(e) => {
            handleInputChange(e);
            setBlurred(false);
          }}
          onBlur={() => setBlurred(true)}
          placeholder={"Enter your inscription number"}
        />
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
              {tokenData.image && tokenData.image.startsWith("http") ? (
                <div className="relative h-32 w-32">
                  <Image
                    src={"/api/images?url=" + tokenData.image}
                    alt={tokenData.name || "Token image"}
                    fill
                    sizes="100%"
                    className="rounded-lg object-cover"
                  />
                </div>
              ) : (
                <p>Not a nft</p>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default NftBitcoin;
