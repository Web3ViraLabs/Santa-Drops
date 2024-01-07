"use server";

import Web3 from "web3";
import axios from "axios";

const web3 = new Web3(
  "https://mainnet.infura.io/v3/23e88dfca101447d884c3d2f22088654"
);

// Function to fetch token details from Trust Wallet's assets repository
async function fetchTokenDetails(contractAddress: string) {
  const checksumAddress = Web3.utils.toChecksumAddress(contractAddress);

  // Construct the URL to the token's logo in the Trust Wallet assets repo
  const url = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${checksumAddress}/info.json`;

  try {
    const response = await axios.get(url);
    console.log("Token details fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching token details:");
    return null;
  }
}

const fetchEthToken = async (
  contractAddress: string
): Promise<{ name: string; image: string }> => {
  let name = "";
  let image = "";

  const tokenDetails = await fetchTokenDetails(contractAddress);
  if (tokenDetails) {
    name = tokenDetails.name || "";
    image = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${contractAddress}/logo.png`;
  }

  if (!name) {
    const contract = new web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ],
      contractAddress
    );

    try {
      name = (await contract.methods.name().call()) as string;
    } catch (error) {
      console.log("Error fetching token name from contract:");
      return { name: "", image: "" };
    }
  }

  return { name, image };
};

export default fetchEthToken;
