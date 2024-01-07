"use server";

import { ethers } from "ethers";
import { convertToHttpUrl } from "../ipfs-to-http";

// Minimal ABI to include ERC-721 and ERC-1155 tokenURI methods
const nftContractABI = [
  "function tokenURI(uint256 tokenId) external view returns (string)", // ERC-721
  "function uri(uint256 tokenId) external view returns (string)", // ERC-1155
];

type NftDetails = {
  name: string;
  image: string;
};

export async function fetchEthNftDetails(
  contractAddress: string,
  tokenId: string
): Promise<NftDetails> {
  try {
    // Setup the provider
    const provider = new ethers.InfuraProvider(
      "mainnet",
      "23e88dfca101447d884c3d2f22088654"
    );

    // Connect to the contract
    const contract = new ethers.Contract(
      contractAddress,
      nftContractABI,
      provider
    );

    // Attempt to fetch the token URI (try ERC-721 first, then ERC-1155)
    let tokenUri: string;
    try {
      tokenUri = await contract.tokenURI(tokenId);
    } catch (error) {
      // If ERC-721 method fails, try ERC-1155 method
      tokenUri = await contract.uri(tokenId);
    }

    const httpUrl = convertToHttpUrl(tokenUri);

    // Fetch the metadata from the URI
    const metadataResponse = await fetch(httpUrl);

    const metadata = await metadataResponse.json();

    // Return the name and image from the metadata
    return {
      name: metadata.name || "#" + tokenId,
      image: convertToHttpUrl(metadata.image || metadata.image_url || ""),
    };
  } catch (error) {
    console.error("Error fetching NFT details:", error);
    return {
      name: "",
      image: "",
    };
  }
}
