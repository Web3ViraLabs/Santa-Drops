import LoginBtn from "@/components/header/components/login-btn";
import ProfileBtn from "@/components/header/components/profile-btn";
import { Profile } from "@prisma/client";

const MainHeader = ({ user }: { user: Profile | null }) => {
  return (
    <div className="sticky flex z-50 bg-background/60 backdrop-blur-md top-0 w-full px-4 md:px-8 items-center h-20">
      <div className="min-h-[6rem] flex items-center w-full">
        <div className="ml-auto">
          {user ? (
            <ProfileBtn image={user.image!} name={user.name} />
          ) : (
            <LoginBtn />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
