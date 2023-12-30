import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Button, buttonVariants } from "@/components/ui/button";
import LogoutBtn from "./logout-btn";
import { useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProfileBtn = ({ image, name }: { image: string; name: string }) => {
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
              <Link
                href={`/user/${name}`}
                className={cn(
                  "w-full py-3 flex items-center gap-x-4 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <UserCircle />
                <span className="text-lg">Profile</span>
              </Link>
              <LogoutBtn />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ProfileBtn;
