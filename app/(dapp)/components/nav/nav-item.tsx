"use client";

import Image from "next/image";

interface NavItemProps {
  label: string;
  icon: string | React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon }) => {
  return (
    <button className="flex p-3 rounded-md hover:bg-blue-500/20 hover:text-white bg-transparent">
      <div className="w-6 h-6 relative">
        {typeof icon === "string" ? (
          <Image src={icon} alt="menu-icon" fill sizes={"24px"} />
        ) : (
          icon
        )}
      </div>
      <span className="ml-4 text-base font-semibold">{label}</span>
    </button>
  );
};

export default NavItem;
