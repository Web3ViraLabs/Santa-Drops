import { getCurrentUser } from "@/lib/get-current-user";
import { useUser } from "../user/[user]/actions/useUser";
import { constructMetadata } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ConnectionTable from "./components/connection-table";

export const metadata = constructMetadata({ title: "Settings" });

const Settings = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="w-full">
        <h1 className="text-3xl pl-4 opacity-80">Settings</h1>
      </div>
      <div className="w-[80%] h-1 ml-4 bg-gray-500 rounded-lg my-4"></div>
      <div className="w-full p-4">
        <Card className="w-full border-none rounded-lg dark:bg-[#09141B] p-4">
          <CardTitle className="text-xl">Connections</CardTitle>
          <CardContent className="mt-4 ps-0">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <ConnectionTable connectedOauth={currentUser.connections} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
