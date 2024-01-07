"use server";

import Web3 from "web3";
import axios from "axios";

// Initialize Web3 with a Polygon network provider from Infura
const web3 = new Web3(
  "https://polygon-mainnet.infura.io/v3/23e88dfca101447d884c3d2f22088654" // Replace with your Infura Project ID
);

// Function to fetch token details from the contract on Polygon
const fetchMaticToken = async (
  contractAddress: string
): Promise<{ name: string; image: string }> => {
  let name = "";
  let image = "";

  // Trust Wallet asset directory structure for Polygon might differ,
  // adjust the base URL as necessary or use another trusted token directory for Polygon.
  const checksumAddress = Web3.utils.toChecksumAddress(contractAddress);
  const url = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/${checksumAddress}/info.json`;

  try {
    // Fetching the token details from the Trust Wallet asset repository or another source
    const response = await axios.get(url);
    if (response.data) {
      name = response.data.name || "";
      // Construct image URL from the repository or use response data if available
      image = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/${checksumAddress}/logo.png`;
    }
    console.log("Token details fetched successfully:", response.data);
  } catch (error) {
    console.error("Error fetching Polygon token details:", error);
  }

  // Fall back to fetching the token name from the contract directly if necessary
  if (!name) {
    const contract = new web3.eth.Contract(
      [
        // ABI for ERC-20 token name function
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
      console.log("Error fetching token name from Polygon contract:");
      return { name: "", image: "" }; // Return empty details if both methods fail
    }
  }

  return { name, image };
};

export default fetchMaticToken;
