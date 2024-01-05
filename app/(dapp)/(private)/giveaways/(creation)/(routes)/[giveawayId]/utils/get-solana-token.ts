"use server";

import axios from "axios";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { AccountInfo, ParsedAccountData } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

const SOLANA_MAINNET_ENDPOINT = "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_MAINNET_ENDPOINT);

const fetchSolanaToken = async (mintAddress: string) => {
  try {
    const metaplex = Metaplex.make(connection);
    const mintPublicKey = new PublicKey(mintAddress);
    const metadataPda = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: mintPublicKey });
    const account = await Metadata.fromAccountAddress(connection, metadataPda);
    console.log(account);

    return {
      name: account.data.name,
      image: account.data.uri.startsWith("http") ? account.data.uri : "",
    };
  } catch (error) {
    console.log("couldnt fetch solana token", error);
    return {
      name: "",
      image: "",
    };
  }
};

export default fetchSolanaToken;
