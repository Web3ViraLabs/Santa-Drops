"use client";

import { Edit2 } from "lucide-react";
import Image from "next/image";

interface ProfileBorderProps {
  username: string;
  isCurrentUser?: boolean;
  image: string;
}

const ProfileBorder = ({
  username,
  isCurrentUser,
  image,
}: ProfileBorderProps) => {
  return (
    <>
      <div className="w-[80%] mt-2 p-4">
        <div className="bg-background flex p-8 rounded-lg shadow-lg">
          <div className="relative rounded-full w-[200px] h-[200px] ring-gray-500">
            <Image
              className="object-cover rounded-full"
              src={image}
              alt="user"
              fill
              sizes="200px"
              priority
            />
          </div>
          <div className="flex-1 flex-col pl-20">
            <div className="flex items-center">
              <h3 className="text-5xl font-semibold">{username}</h3>
              {isCurrentUser && (
                <button aria-label="Edit" onClick={() => {}}>
                  <Edit2 className="w-8 h-8  text-blue-400 hover:opacity-80" />
                </button>
              )}
            </div>
            <div className="flex pt-6">
              <button className="px-4 py-2 hover:opacity-80">Followers</button>
              <div className="w-0.5 h-6 bg-gray-600 mt-2"></div>
              <button className=" px-4 py-2 hover:opacity-80">
                Followings
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-[80%] mx-auto my-4 h-0.5 bg-gray-600 "></div> */}
    </>
  );
};

export default ProfileBorder;
