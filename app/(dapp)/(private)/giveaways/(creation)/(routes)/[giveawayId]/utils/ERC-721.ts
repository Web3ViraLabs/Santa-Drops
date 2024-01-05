"use server";

import { ethers } from "ethers";

const nftContractABI = [
  "function tokenURI(uint256 tokenId) external view returns (string)",
];

function convertIpfsUrl(ipfsUrl: string): string {
  if (!ipfsUrl) {
    return ""; // or some default image URL
  }

  // Check if it's an IPFS URL
  if (ipfsUrl.startsWith("ipfs://")) {
    // Use a public IPFS gateway to convert the IPFS URL to an HTTP URL
    const ipfsHash = ipfsUrl.split("ipfs://")[1];
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  } else {
    // If it's already an HTTP URL, return as is
    return ipfsUrl;
  }
}

export async function fetchNftDetails(
  contractAddress: string,
  tokenId: string
): Promise<{ name: string; image: string }> {
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

    const tokenUri = await contract.tokenURI(tokenId);
    const response = await fetch(tokenUri);
    const metadata = await response.json();

    console.log("Token details fetched successfully:", metadata);

    return {
      name: "#" + tokenId,
      image: convertIpfsUrl(metadata.image),
    };
  } catch (error) {
    console.error("Error fetching NFT details:", error);
    return {
      name: "",
      image: "",
    };
  }
}
