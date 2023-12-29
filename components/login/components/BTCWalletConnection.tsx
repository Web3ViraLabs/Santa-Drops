import HiroWallet from "./HiroWalletConnection";
import XverseWallet from "./XVerseWalletConnection";

const BTCWalletConnection = () => {
  return (
    <>
      <XverseWallet />
      <HiroWallet />
    </>
  );
};

export default BTCWalletConnection;
