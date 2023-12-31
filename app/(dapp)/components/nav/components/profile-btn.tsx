import { ChevronUp, Component, LogOut, UserCircle } from "lucide-react";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import NavItem from "../nav-item";
import { logout } from "../../main/actions/logout";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const ProfileBtn = ({ name, image }: { name: string; image: string }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <Popover className="mt-auto w-full relative">
      <Popover.Button
        className={"py-2 px-6 bg-main w-full hover:bg-main/70 rounded-lg "}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-10 h-10 relative rounded-full">
            <Image
              src={image}
              alt="profile"
              fill
              sizes={"40px"}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="dark:text-white text-md font-semibold ">{name}</p>
          </div>
          <div className="ml-auto mt-1">
            <ChevronUp className="ui-open:rotate-180 ui-open:transform transition duration-200" />
          </div>
        </div>
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="w-full space-y-2 p-2 absolute bottom-full mb-20 bg-main rounded-md">
          <Popover.Button
            className="w-full"
            onClick={() => router.push(`/user/${name}`)}
          >
            <NavItem label="Profile" icon={<UserCircle />} />
          </Popover.Button>
          <Popover.Button
            className="w-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <NavItem
              label={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              icon={<Component />}
            />
          </Popover.Button>
          <Popover.Button className="w-full" onClick={() => logout()}>
            <NavItem label="Logout" icon={<LogOut />} />
          </Popover.Button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfileBtn;
