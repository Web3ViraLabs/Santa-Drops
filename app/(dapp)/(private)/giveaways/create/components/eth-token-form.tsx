import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState, useEffect } from 'react';
// import fetchTokenName from "../logic/get-eth-token";
import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import useBlockchain from '../logic/use-store';
import TokenForm from './type-forms/token-form';

const EthereumAddressInput = () => {
  const [tokenName, setTokenName] = useState('');
  const [loading, setLoading] = useState(false);
  const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  const { address, isValid } = useBlockchain();

  const fetchName = async () => {
    try {
      setLoading(true);
      // const name = await fetchTokenName(address);
      // setTokenName(name);
    } catch (error) {
      console.log('[TOKEN_FETCH] ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      console.log(`Auto-submitting valid address: ${address}`);
      fetchName();
    }
    setTokenName('');
  }, [isValid, address]);

  return (
    <TokenForm
      tokenName={tokenName}
      loading={loading}
      regex={ethAddressRegex}
      placeholder="0x0000000000000000000000000000000000000000"
    />
  );
};

export default EthereumAddressInput;
