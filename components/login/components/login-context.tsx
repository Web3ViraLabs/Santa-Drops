import { User } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LoginContextProps {
  isSigned: boolean;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (userData: User) => void;
  logout: () => void;
}

const LoginContext = createContext<LoginContextProps | null>(null);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSigned, setSigned] = useState(false);
  const [signature, setSignature] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("USER_SESSION", JSON.stringify(userData)); // Store user data
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("USER_SESSION"); // Clear user data
  };

  // Function to check local storage and update state
  useEffect(() => {
    const userData = localStorage.getItem("USER_SESSION");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        setSigned,
        isSigned,
        signature,
        setSignature,
        user,
        setUser,
        login,
        logout,
      }}
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
