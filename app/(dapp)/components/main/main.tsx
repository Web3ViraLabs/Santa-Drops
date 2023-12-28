"use client";

import MainHeader from "./main-header";
import { Profile } from "@prisma/client";

interface MainProps {
  children: React.ReactNode;
  user: Profile | null;
}

const Main = ({ children, user }: MainProps) => {
  return (
    <div className="relative flex flex-col flex-1 h-screen overflow-y-auto">
      <MainHeader user={user} />
      <div className="bg-main">{children}</div>
    </div>
  );
};

export default Main;
