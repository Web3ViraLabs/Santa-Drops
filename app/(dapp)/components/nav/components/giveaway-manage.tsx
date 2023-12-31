import { Component, CornerDownRight, Plus } from "lucide-react";
import NavItem from "../nav-item";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  isActive: (path: string) => boolean;
}

const GiveawayManagement = ({ isActive }: Props) => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <button onClick={() => setIsClicked(!isClicked)}>
        <NavItem
          label="Giveaway Managment"
          icon={<Component />}
          isActive={isActive("/giveaways")}
        />
      </button>
      {isClicked && (
        <>
          <button
            className="flex items-center"
            onClick={() => router.push("/giveaways/create")}
          >
            <CornerDownRight className="ml-12" />
            <NavItem
              disableSelector
              label="Create Giveaway"
              isActive={isActive("/giveaways/create")}
              className="px-2"
            />
          </button>
          <button
            className="flex items-center"
            onClick={() => router.push("/giveaways/manage")}
          >
            <CornerDownRight className="ml-12" />
            <NavItem
              className="px-2"
              disableSelector
              label="Manage Giveaways"
              isActive={isActive("/giveaways/manage")}
            />
          </button>
        </>
      )}
    </>
  );
};

export default GiveawayManagement;
