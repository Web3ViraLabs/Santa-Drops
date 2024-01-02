const apiKey = "YourEtherscanApiKey";
const tokenAddress = "TokenContractAddress";
const url = `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${tokenAddress}&apikey=${apiKey}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log("Token Name:", data.result[0].tokenName);
  })
  .catch((error) => console.error("Error fetching token name:", error));
