"use client";

import NavItem from "./nav-item";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Settings, User } from "lucide-react";
import { Profile } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const NavBar = ({ user }: { user: Profile | null }) => {
  const NAV_ITEMS = [
    {
      name: "Home",
      icon: <LayoutGrid />,
      href: "/home",
    },
  ];

  const router = useRouter();
  const path = usePathname();

  const isActive = (pathname: string) => {
    return path === pathname;
  };

  return (
    <nav className="h-full overflow-auto hidden lg:flex flex-col space-y-8 lg:w-[320px] 2xl:w-[380px]">
      <div className="w-full mt-6 flex items-center justify-center">
        <Link className="flex" href="/">
          <div className="relative w-10 h-10">
            <Image src={"/diamond.svg"} alt="logo" fill sizes={"48px"} />
          </div>
        </Link>
        <div>
          <h1 className="text-4xl font-semibold">AlphaZ</h1>
        </div>
      </div>
      <div className="flex flex-col p-2">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.name}
            label={item.name}
            icon={item.icon}
            isActive={isActive(item.href)}
            onClick={() => router.push(item.href)}
          />
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
