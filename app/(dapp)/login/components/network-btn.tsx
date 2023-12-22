"use client";

import Image from "next/image";

interface NetworkProps {
  name: string;
  icon: string;
  onClick?: () => void;
}

const NetworkBtn: React.FC<NetworkProps> = ({ name, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full border rounded-md p-4 border-[#7d5eda]"
    >
      <div className="relative w-6 h-6">
        <Image src={icon} alt={name} fill sizes={"24px"} />
      </div>
      <span>{name}</span>
    </button>
  );
};

export default NetworkBtn;
