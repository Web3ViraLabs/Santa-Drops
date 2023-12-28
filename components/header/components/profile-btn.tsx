import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import LogoutBtn from "./logout-btn";
import { useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";

const ProfileBtn = ({ image, name }: { image: string; name: string }) => {
  const router = useRouter();

  return (
    <Popover className="relative">
      <Popover.Button className="rounded-full">
        <div className="rounded-full focus:ring-2 focus:ring-[#07090a] transition">
          <div className="relative w-10 h-10 rounded-full">
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
        <Popover.Panel className="absolute left-[-15rem] w-[270px]">
          <div className="flex items-center justify-center space-y-2 bg-main border-none flex-col z-50 rounded-sm shadow-lg">
            <div className="flex flex-col items-center py-4 w-full">
              <Button
                onClick={() => router.push(`/user/${name}`)}
                className="w-full py-6 flex items-center gap-x-4"
                variant={"ghost"}
              >
                <UserCircle />
                <span className="text-lg">Profile</span>
              </Button>
              <LogoutBtn />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfileBtn;
