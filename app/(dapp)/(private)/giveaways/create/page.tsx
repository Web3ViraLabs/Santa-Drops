"use client";

import { Card } from "@/components/ui/card";
import icon from "@/config/image-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GIVEAWAY_TYPES = [
  {
    name: "TOKEN",
    route: "/tokengiveaway",
  },
];

const GiveawayCreateOptionsPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center space-y-6 flex-col w-full h-full bg-main p-6">
      <div>
        <h1 className="text-4xl">Select Giveaway Type</h1>
      </div>
      <div className="flex w-full items-center">
        {GIVEAWAY_TYPES.map((type) => (
          <Card
            key={type.name}
            onClick={() => router.push("/giveaways/create/" + type.route)}
            className="w-[250px] h-[200px] bg-background border-none transition transform hover:scale-105 flex flex-col space-y-3 items-center p-4 hover:opacity-70"
          >
            <div className="relative w-20 h-20">
              <Image
                src={
                  icon("demo")[Math.floor(Math.random() * icon("demo").length)]
                    .image
                }
                alt="token_img"
                quality={100}
                fill
                className="object-cover rounded-md"
                sizes="1000px"
                loading="eager"
              />
            </div>
            <div>
              <span className="text-2xl">Tokens</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GiveawayCreateOptionsPage;
