"use client";

import NavItem from "./nav-item";
import { usePathname, useRouter } from "next/navigation";
import { Group, Home, Settings, User } from "lucide-react";
import { Profile } from "@prisma/client";
import Link from "next/link";

const NavBar = ({ user }: { user: Profile | null }) => {
  const NAV_ITEMS = [
    {
      name: "Home",
      icon: <Home />,
      href: "/home",
    },
    {
      name: "Events",
      icon: <User />,
      href: "/events",
    },
    {
      name: "Stats",
      icon: <Group />,
      href: "/stats",
    },
  ];

  const router = useRouter();
  const path = usePathname();

  const isActive = (pathname: string) => {
    return path === pathname;
  };

  return (
    <nav className="border-r h-full overflow-auto hidden lg:flex justify-end lg:w-[320px] 2xl:w-[380px]">
      <div className="flex flex-col mr-4 w-48 p-4 pt-2 text-zinc-400">
        <div className="my-4">
          <h1 className="text-xl font-bold opacity-90 dark:text-white">
            AlphaGini
          </h1>
        </div>
        {NAV_ITEMS.map((item) => (
          <Link className="w-full" key={item.name} href={item.href}>
            <NavItem
              key={item.name}
              label={item.name}
              icon={item.icon}
              isActive={isActive(item.href)}
              // onClick={() => router.push(item.href)}
            />
          </Link>
        ))}
        {user && (
          <>
            <NavItem
              label={"Profile"}
              icon={<User />}
              isActive={isActive(`/user/${user.name}`)}
              onClick={() => router.push(`/user/${user.name}`)}
            />
            <NavItem
              label={"Settings"}
              icon={<Settings />}
              isActive={isActive(`/settings`)}
              onClick={() => router.push(`/settings`)}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
