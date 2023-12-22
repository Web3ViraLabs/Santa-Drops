import { Group, Home, User } from "lucide-react";
import NavItem from "./nav-item";

const NavBar = () => {
  return (
    <nav className="border hidden lg:flex justify-end lg:w-[320px] xl:w-[400px] 2xl:w-[800px]">
      <div className="flex flex-col mr-4 w-48 p-4 pt-2 text-zinc-400">
        <div className="my-4">
          <h1 className="text-xl font-bold opacity-90 dark:text-white">
            AlphaGini
          </h1>
        </div>
        <NavItem label="Home" icon={<Home />} />
        <NavItem label="Stats" icon={<User />} />
        <NavItem label="Events" icon={<Group />} />
      </div>
    </nav>
  );
};

export default NavBar;
