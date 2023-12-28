import { getCurrentUser } from "@/lib/get-current-user";
import { constructMetadata } from "@/lib/utils";

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
    </div>
  );
};

export default Settings;
