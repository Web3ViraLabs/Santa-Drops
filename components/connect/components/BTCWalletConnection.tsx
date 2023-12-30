import LeatherWallet from "../wallets/LeatherWalletConnection";
import PhantomBTCWallet from "../wallets/PhantomBTCWalletConnection";
import UnisatWallet from "../wallets/UnisatWalletConnection";
import XverseWallet from "../wallets/XVerseWalletConnection";

const BTCWalletConnection = () => {
  return (
    <>
      <XverseWallet />
      <LeatherWallet />
      <UnisatWallet />
      <PhantomBTCWallet />
    </>
  );
};

export default BTCWalletConnection;
