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
      <div className="w-full h-full bg-main overflow-y-auto p-4 flex flex-col space-y-6">
        {children}
      </div>
    </main>
  );
};

export default Main;
