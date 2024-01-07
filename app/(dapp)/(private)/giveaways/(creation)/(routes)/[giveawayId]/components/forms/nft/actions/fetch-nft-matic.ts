"use server";

import Web3 from "web3";
import { convertToHttpUrl } from "../../../../utils/utils";

const web3: any = new Web3(
  new Web3.providers.HttpProvider(
    "https://polygon-mainnet.infura.io/v3/3f7f6eaab87146919e9cca89650729cf"
  )
);

const tokenURIABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const tokenURIABI2 = [
  // ERC-721 tokenURI method
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  // ERC-1155 uri method
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "uri",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export async function fetchMaticNftDetails(
  contractAddress: string,
  tokenId: string
): Promise<{ name: string; image: string }> {
  const contract = new web3.eth.Contract(tokenURIABI2, contractAddress);

  try {
    let tokenUri: string;
    try {
      tokenUri = await contract.methods.tokenURI(tokenId).call();
    } catch (error) {
      console.log("Trying ERC-1155 uri method");
      tokenUri = await contract.methods.uri(tokenId).call();
    }

    console.log(tokenUri);

    const ipfsURL = convertToHttpUrl(tokenUri);

    const request = new Request(ipfsURL);
    const response = await fetch(request);
    const metadata = await response.json();

    return {
      name: metadata.name || "#" + tokenId,
      image: convertToHttpUrl(metadata.image || metadata.image_url || ""),
    };
  } catch (error) {
    console.log(error);
    return {
      name: "",
      image: "",
    };
  }
}
