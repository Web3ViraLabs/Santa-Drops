"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { classNames } from "uploadthing/client";

interface NavItemProps {
  label: string;
  icon?: string | React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  href?: string;
  disableSelector?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  isActive,
  className,
  disableSelector,
}) => {
  return (
    <div
      className={cn(
        "group  flex relative w-full items-center py-2 px-6 rounded-md text-neutral-400",
        isActive && "text-primary",
        className
      )}
    >
      {!disableSelector && (
        <div
          className={cn(
            "absolute left-0 bg-green-400 transition-all h-0 w-[4px]",
            !isActive && "group-hover:h-[15px] rounded-full duration-100 ",
            isActive && "h-[calc(100%-10px)]"
          )}
        />
      )}
      {icon && (
        <div
          className={cn(
            "w-6 h-6 relative",
            !isActive && "dark:hover:text-white"
          )}
        >
          {typeof icon === "string" && (
            <Image src={icon} alt="menu-icon" fill sizes={"24px"} />
          )}
          {typeof icon !== "string" && icon}
        </div>
      )}
      <span
        className={cn("ml-4 text-base font-semibold dark:hover:text-white")}
      >
        {label}
      </span>
    </div>
  );
};

export default NavItem;
