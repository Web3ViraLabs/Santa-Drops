import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import LogoutBtn from "./logout-btn";
import { useRouter } from "next/navigation";

const ProfileBtn = ({ image, name }: { image: string; name: string }) => {
  const router = useRouter();

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="rounded-full focus:ring-2 focus:ring-[#315e9c] transition">
          <div className="relative w-10 h-10">
            <Image
              src={image || "/diamond.svg"}
              alt={name}
              fill
              sizes={"24px"}
              className="rounded-full border"
            />
          </div>
        </div>
      </Popover.Button>
      <Transition
        enter="transition duration-400 ease-in"
        enterFrom="transform scale-65 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute left-[-10rem] z-50 w-[200px]">
          <div className="flex items-center justify-center space-y-2  bg-background border flex-col flex-1 p-2 z-50">
            <div className="bg-[#262729] w-full p-2 text-center rounded-lg">
              <span>{name}</span>
            </div>
            <Button
              onClick={() => router.push(`/user/${name}`)}
              className="w-full"
              variant={"ghost"}
            >
              Profile
            </Button>
            <LogoutBtn />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfileBtn;
