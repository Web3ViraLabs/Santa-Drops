"use server";

import Web3 from "web3";

const web3 = new Web3(
  "https://mainnet.infura.io/v3/23e88dfca101447d884c3d2f22088654"
);

const fetchTokenName = async (contractAddress: string): Promise<string> => {
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

  let name: string;

  try {
    name = (await contract.methods.name().call()) as string;
  } catch (error) {
    console.log("Error fetching token name:", error);
    return "";
  }
  return name;
};

export default fetchTokenName;
