"use client";

import MainHeader from "./main-header";
import { Profile } from "@prisma/client";

interface MainProps {
  children: React.ReactNode;
  user: Profile | null;
}

const Main = ({ children, user }: MainProps) => {
  return (
    <div className="relative flex flex-col flex-1 h-full">
      <MainHeader user={user} />
      {children}
    </div>
  );
};

export default Main;
