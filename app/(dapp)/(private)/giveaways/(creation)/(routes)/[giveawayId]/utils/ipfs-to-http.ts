export function convertToHttpUrl(uri: string): string {
  if (uri.startsWith("ipfs://")) {
    if (uri.startsWith("ipfs://ipfs/")) {
      return `https://ipfs.io/ipfs/${uri.split("ipfs://ipfs/")[1]}`;
    }

    const ipfsHash = uri.split("ipfs://")[1];
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  }

  return uri;
}
