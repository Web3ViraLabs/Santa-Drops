"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.className = cn(ref.current.className, "scale-110");
    }
  }, []);

  return (
    <button
      ref={ref}
      key={name}
      onClick={onClick}
      className={cn(
        "flex w-full border rounded-md p-4 border-[#7d5eda] dark:hover:bg-[#7d5eda]/10 transition-all duration-300 ease-in-out transform hover:scale-105",
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
