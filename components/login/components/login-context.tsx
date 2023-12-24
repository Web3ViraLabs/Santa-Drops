import React, { createContext, useContext, useState } from "react";

interface LoginContextProps {
  isSigned: boolean;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSigned, setSigned] = useState(false);
  const [signature, setSignature] = useState("");

  return (
    <LoginContext.Provider
      value={{ setSigned, isSigned, signature, setSignature }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("useLoginContext must be used within a LoginContext");
  }

  return context;
};
