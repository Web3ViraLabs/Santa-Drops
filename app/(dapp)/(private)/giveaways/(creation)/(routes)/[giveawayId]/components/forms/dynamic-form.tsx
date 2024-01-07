"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormCard from "../form-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlockchainType, GiveawayType } from "@prisma/client";
import BlockchainAddressInput from "./token/blockchain-form";
import useStore from "./logic/use-store";
import { useEffect } from "react";
import fetchEthToken from "../../utils/eth/get-eth-token";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import fetchMaticToken from "../../utils/eth/get-matic-token";
import fetchSolanaTokenMetadata from "../../utils/eth/get-solana-token";
import fetchSolanaToken from "../../utils/eth/get-solana-token";
import AmountField from "./coins/amount-field";
import NftGiveaway from "./nft/nft-eth-form";
import { fetchEthNftDetails } from "../../utils/nft/fetch-nft-eth";
import { fetchMaticNftDetails } from "../../utils/nft/fetch-nft-matic";
import NftSolana from "./nft/nft-sol-form";

const DynamicForm = ({
  control,
  isLoading,
  blockchainType,
  giveawayType,
}: {
  control: any;
  isLoading: boolean;
  blockchainType: BlockchainType;
  giveawayType: GiveawayType;
}) => {
  const { reset } = useStore();

  useEffect(() => {
    reset();
  }, [blockchainType, giveawayType]);

  const { isValid, address, tokenData } = useStore();

  return (
    <FormCard>
      <FormField
        control={control}
        name="giveawayType"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="uppercase text-sm dark:text-zinc-400">
              Giveaway Type
            </FormLabel>
            <Select
              disabled={isLoading}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-main border-0 focus-visible:ring-0 w-full focus-visible:ring-offset-0 capitalize dark:text-zinc-400 outline-none">
                  <SelectValue placeholder="Select giveaway type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-main border-[#303030]">
                {Object.values(GiveawayType).map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="capitalize bg-main"
                  >
                    {type.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="blockchainType"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="uppercase text-sm dark:text-zinc-400">
              Blockchain Type
            </FormLabel>
            <Select
              disabled={isLoading}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-main border-0 focus-visible:ring-0 w-full focus-visible:ring-offset-0 capitalize dark:text-zinc-400 outline-none">
                  <SelectValue placeholder="Select blockchain type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-main border-[#303030]">
                {Object.values(BlockchainType).map((type) => (
                  <SelectItem
                    disabled={
                      type === BlockchainType.BITCOIN &&
                      GiveawayType.TOKEN === giveawayType
                    }
                    key={type}
                    value={type}
                    className="capitalize bg-main"
                  >
                    {type.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {giveawayType === GiveawayType.TOKEN && (
        <>
          {blockchainType === BlockchainType.ETHEREUM && (
            <>
              <BlockchainAddressInput
                fetchToken={fetchEthToken}
                regex={/^(0x)?[0-9a-fA-F]{40}$/}
                placeholder="0x..."
              />
            </>
          )}
          {blockchainType === BlockchainType.POLYGON && (
            <BlockchainAddressInput
              fetchToken={fetchMaticToken}
              regex={/^(0x)?[0-9a-fA-F]{40}$/}
              placeholder="0x..."
            />
          )}
          {blockchainType === BlockchainType.SOLANA && (
            <BlockchainAddressInput
              fetchToken={fetchSolanaToken}
              regex={/^[1-9A-HJ-NP-Za-km-z]{32,44}$/}
              placeholder="SOL..."
            />
          )}
          {address && isValid && tokenData && tokenData.name.length > 0 && (
            <>
              <FormField
                control={control}
                name="tokens"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="uppercase text-sm dark:text-zinc-400">
                      Amount of tokens
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        type="number"
                        className="w-full bg-main rounded-lg dark:border-[#303030]"
                        autoComplete="off"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="1000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button">Initiate Transaction</Button>
            </>
          )}
        </>
      )}
      {giveawayType === GiveawayType.COIN && (
        <>
          {blockchainType === BlockchainType.ETHEREUM && (
            <>
              <AmountField
                control={control}
                isLoading={isLoading}
                placeholder="0.005eth"
              />
            </>
          )}
          {blockchainType === BlockchainType.POLYGON && (
            <>
              <AmountField
                control={control}
                isLoading={isLoading}
                placeholder="0.005matic"
              />
            </>
          )}
          {blockchainType === BlockchainType.BITCOIN && (
            <>
              <AmountField
                control={control}
                isLoading={isLoading}
                placeholder="1000 satoshis"
              />
            </>
          )}
          {blockchainType === BlockchainType.SOLANA && (
            <>
              <AmountField
                control={control}
                isLoading={isLoading}
                placeholder="1000 lamports"
              />
            </>
          )}
        </>
      )}
      {giveawayType === GiveawayType.NFT && (
        <>
          {blockchainType === BlockchainType.ETHEREUM && (
            <NftGiveaway
              regex={/^(0x)?[0-9a-fA-F]{40}$/}
              placeholder="0x..."
              fetchNft={fetchEthNftDetails}
            />
          )}
          {blockchainType === BlockchainType.POLYGON && (
            <NftGiveaway
              regex={/^(0x)?[0-9a-fA-F]{40}$/}
              placeholder="0x..."
              fetchNft={fetchMaticNftDetails}
            />
          )}
          {blockchainType === BlockchainType.SOLANA && <NftSolana />}
        </>
      )}
    </FormCard>
  );
};

export default DynamicForm;
