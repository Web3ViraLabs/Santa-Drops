"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface NavItemProps {
  label: string;
  icon: string | React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  onClick,
  isActive,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex p-3 rounded-md hover:bg-blue-500/20 hover:text-white bg-transparent",
        isActive && "text-blue-400"
      )}
    >
      <div className="w-6 h-6 relative">
        {typeof icon === "string" && (
          <Image src={icon} alt="menu-icon" fill sizes={"24px"} />
        )}
        {typeof icon !== "string" && icon}
      </div>
      <span className={cn("ml-4 text-base font-semibold")}>{label}</span>
    </button>
  );
};

export default NavItem;
