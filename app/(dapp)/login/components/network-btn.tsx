"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface NetworkProps {
  name: string;
  icon: string;
  onClick?: () => void;
  className?: string;
}

const NetworkBtn: React.FC<NetworkProps> = ({
  name,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full border rounded-md p-4 border-[#7d5eda] dark:hover:bg-[#7d5eda]/10",
        className
      )}
    >
      <div className="flex items-center justify-center mx-auto">
        <div className="relative w-6 h-6 mr-2">
          <Image src={icon} alt={name} fill sizes={"24px"} />
        </div>
        <div className="flex items-center justify-center">
          <span className="text-base">{name}</span>
        </div>
      </div>
    </button>
  );
};

export default NetworkBtn;
