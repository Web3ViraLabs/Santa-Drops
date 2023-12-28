"use client";

import useLoginStore from "@/components/login/config/login-store";
import { useModal } from "@/hooks/use-modal";
import { PlusCircle } from "lucide-react";

const AddWalletBtn = () => {
  const { onOpen } = useModal();
  const { setIsLinking } = useLoginStore();

  const handleClick = () => {
    setIsLinking(true);
    onOpen("login");
  };

  return (
    <button onClick={handleClick}>
      <PlusCircle className="w-5 h-5 mt-0.5" />
    </button>
  );
};

export default AddWalletBtn;
