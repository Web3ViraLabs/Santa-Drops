import { getCurrentUser } from "@/lib/get-current-user";
import Main from "./components/main/main";
import NavBar from "./components/nav/desktop-nav";

const Dapp = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <>
      <NavBar user={user} />
      <Main user={user}>{children}</Main>
    </>
  );
};

export default Dapp;
