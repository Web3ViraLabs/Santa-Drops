import { getCurrentUser } from "@/lib/get-current-user";
import Main from "./components/main/main";
import NavBar from "./components/nav/desktop-nav";

const Dapp = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <div className="h-full w-full flex dark:bg-[#09141B]">
      <NavBar user={user} />
      <Main user={user}>{children}</Main>
    </div>
  );
};

export default Dapp;
