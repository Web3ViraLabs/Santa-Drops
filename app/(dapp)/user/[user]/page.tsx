import { getCurrentUser } from "@/lib/get-current-user";
import ProfileBorder from "./components/profile-border";
import { useUser } from "./actions/useUser";
import { constructMetadata } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ConnectionTable from "./components/connection-table";
import AddWalletBtn from "./components/buttons/add-wallet-btn";
import WalletTable from "./components/wallets-table";

export const metadata = constructMetadata({ title: "Profile" });

const UserPage = async ({ params }: { params: { user: string } }) => {
  const paramUsername = params.user;
  const currentUser = await getCurrentUser();
  const user = await useUser(paramUsername);

  return (
    <div className="flex flex-col w-full h-full p-2 pr-8 ">
      {currentUser && currentUser.name === paramUsername && (
        <>
          <ProfileBorder
            username={currentUser.name}
            image={currentUser.image!}
            isCurrentUser={true}
          />
          <div className="w-full p-4 flex flex-col space-y-6">
            <Card className="w-full border-none rounded-lg shadow-lg  p-4">
              <CardTitle className="text-xl">
                Connections ({currentUser.connections.length})
              </CardTitle>
              <CardContent className="mt-4 ps-0">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <ConnectionTable connectedOauth={currentUser.connections} />
                </div>
              </CardContent>
            </Card>
            <Card className="w-full border-none rounded-lg shadow-lg p-4">
              <CardTitle className="text-xl flex items-center space-x-4">
                <span>Wallets ({currentUser.wallets.length})</span>
                <AddWalletBtn />
              </CardTitle>
              <CardContent className="mt-4 ps-0">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <WalletTable wallets={currentUser.wallets} />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      {user && currentUser?.name !== paramUsername && (
        <ProfileBorder username={user.name} image={user.image!} />
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
