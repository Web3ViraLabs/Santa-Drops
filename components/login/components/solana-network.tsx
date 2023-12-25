const SolanaNetwork = () => {

    
  const { wallets, select, publicKey } = useWallet();
  console.log(wallets);

  const handleSolanaWalletConnect = (walletName: WalletName) => {
    select(walletName);
    setCurrentNetwork({
      address: publicKey?.toBase58()!,
    });
    console.log(walletName);
  };
    return ( 
        {!currentNetwork &&
          !isSigned &&
          selectedNetwork === 99 &&
          wallets.map((wallet) => (
            <WalletBtn
              icon={wallet.adapter.icon}
              key={wallet.adapter.name}
              name={wallet.adapter.name}
              id={wallet.adapter.name}
              onClick={() => handleSolanaWalletConnect(wallet.adapter.name)}
              isDisable={false}
              isLoading={false}
            />
          ))}
     );
}
 
export default SolanaNetwork;