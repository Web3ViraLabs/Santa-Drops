import { getCurrentUser } from "@/lib/get-current-user";
import ProfileBorder from "./components/profile-border";
import { useUser } from "./actions/useUser";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({ title: "Profile" });

const UserPage = async ({ params }: { params: { user: string } }) => {
  const paramUsername = params.user;
  const currentUser = await getCurrentUser();
  const user = await useUser(paramUsername);

  return (
    <div className="flex flex-col w-full h-full  p-2">
      {user && (
        <ProfileBorder
          username={user.name}
          isCurrentUser={currentUser?.name === user.name}
        />
      )}
      {!user && (
        <div className="w-full py-4 bg-red-500/80 rounded-lg">
          <h2 className="pl-6 text-2xl">User not found</h2>
        </div>
      )}
    </div>
  );
};

export default UserPage;
