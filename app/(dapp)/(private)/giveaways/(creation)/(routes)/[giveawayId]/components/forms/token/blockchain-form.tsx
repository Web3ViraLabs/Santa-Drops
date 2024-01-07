import React, { useState, useEffect } from "react";
import useBlockchain from "../../logic/use-store";
import TokenForm from "./token-form";

interface BlockchainFormProps {
  fetchToken: (address: string) => Promise<{ name: string; image: string }>;
  regex: RegExp;
  placeholder: string;
}

const BlockchainAddressInput = ({
  fetchToken,
  regex,
  placeholder,
}: BlockchainFormProps) => {
  const [loading, setLoading] = useState(false);
  const { address, isValid, setTokenData } = useBlockchain();

  const fetchName = async () => {
    try {
      setLoading(true);
      const token = await fetchToken(address);
      setTokenData(token);
    } catch (error) {
      console.log("[TOKEN_FETCH] ", error);
      setTokenData({
        name: "",
        image: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      console.log(`Auto-submitting valid address: ${address}`);
      fetchName();
    } else {
      setTokenData({
        name: "",
        image: "",
      });
    }
  }, [isValid, address, fetchToken]);

  return (
    <TokenForm loading={loading} regex={regex} placeholder={placeholder} />
  );
};

export default BlockchainAddressInput;
