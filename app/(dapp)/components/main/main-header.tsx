import LoginBtn from "@/app/(dapp)/components/main/components/login-btn";
import { Profile } from "@prisma/client";

const MainHeader = ({ user }: { user: Profile | null }) => {
  if (!user)
    return (
      <header className="sticky flex z-50 bg-background/60 backdrop-blur-md top-0 w-full px-4 md:px-8 items-center h-20">
        <div className="min-h-[6rem] flex items-center w-full">
          <div className="ml-auto">{!user && <LoginBtn />}</div>
        </div>
      </header>
    );
  return null;
};

export default MainHeader;
