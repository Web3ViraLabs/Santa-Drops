import { Profile } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LoginContextProps {
  user: Profile | null;
  setUser: React.Dispatch<React.SetStateAction<Profile | null>>;
  login: (userData: Profile) => void;
  logout: () => void;
}

const LoginContext = createContext<LoginContextProps | null>(null);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);

  const login = (userData: Profile) => {
    setUser(userData);
    localStorage.setItem("USER_SESSION", JSON.stringify(userData));
    // Store user data
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
