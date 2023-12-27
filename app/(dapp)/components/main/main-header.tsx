import LoginBtn from "@/components/header/components/login-btn";
import ProfileBtn from "@/components/header/components/profile-btn";
import { Profile } from "@prisma/client";

const MainHeader = ({ user }: { user: Profile | null }) => {
  return (
    <div className="sticky flex top-0 max-w-[1080px] px-4 md:px-8 items-center h-20">
      <div className="ms-auto">
        <div className="ml-4 flow-root lg:ml-6">
          {user ? (
            <ProfileBtn image={user.image || "/diamond.svg"} name={user.name} />
          ) : (
            <LoginBtn />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
