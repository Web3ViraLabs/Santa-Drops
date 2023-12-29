import HiroWallet from "./HiroWalletConnection";
import PhantomBTCWallet from "./PhantomBTCWalletConnection";
import UnisatWallet from "./UnisatWalletConnection";
import XverseWallet from "./XVerseWalletConnection";

const BTCWalletConnection = () => {
  return (
    <>
      <XverseWallet />
      <HiroWallet />
      <UnisatWallet />
      <PhantomBTCWallet />
    </>
  );
};

export default BTCWalletConnection;
