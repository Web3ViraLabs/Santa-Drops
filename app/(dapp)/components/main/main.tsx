"use client";

import MainHeader from "./main-header";
import { Profile } from "@prisma/client";

interface MainProps {
  children: React.ReactNode;
  user: Profile | null;
}

const Main = ({ children, user }: MainProps) => {
  return (
    <main className="relative flex flex-col flex-1 min-h-screen">
      <MainHeader user={user} />
      {children}
    </main>
  );
};

export default Main;
