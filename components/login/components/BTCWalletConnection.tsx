import HiroWallet from "./HiroWalletConnection";
import UnisatWallet from "./UnisatWalletConnection";
import XverseWallet from "./XVerseWalletConnection";

const BTCWalletConnection = () => {
  return (
    <>
      <XverseWallet />
      <HiroWallet />
      <UnisatWallet />
    </>
  );
};

export default BTCWalletConnection;
