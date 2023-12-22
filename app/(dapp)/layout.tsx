import Main from "./components/main/main";
import NavBar from "./components/nav/desktop-nav";

const Dapp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex dark:bg-[#09141B]">
      <NavBar />
      <Main>{children}</Main>
    </div>
  );
};

export default Dapp;
