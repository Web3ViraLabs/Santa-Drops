"use server";

import { ethers } from "ethers";
import { convertToHttpUrl } from "../../../../utils/utils";

const nftContractABI = [
  "function tokenURI(uint256 tokenId) external view returns (string)",
  "function uri(uint256 tokenId) external view returns (string)",
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
    const provider = new ethers.InfuraProvider(
      "mainnet",
      "23e88dfca101447d884c3d2f22088654"
    );

    const contract = new ethers.Contract(
      contractAddress,
      nftContractABI,
      provider
    );

    let tokenUri: string;
    try {
      tokenUri = await contract.tokenURI(tokenId);
    } catch (error) {
      tokenUri = await contract.uri(tokenId);
    }

    const httpUrl = convertToHttpUrl(tokenUri);
    const metadataResponse = await fetch(httpUrl);
    const metadata = await metadataResponse.json();
    console.log(metadata);
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
