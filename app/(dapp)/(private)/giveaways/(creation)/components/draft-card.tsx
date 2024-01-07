"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit3 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
  description?: string;
  image: string;
}

const DraftCard = ({ id, title, description, image }: Props) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/giveaways/${id}`)}
      className="w-[300px] h-[230px] bg-background border-none hover:scale-105 transform transition-transform duration-300 ml-4 mb-6 flex flex-col justify-center cursor-pointer"
    >
      <CardContent className="space-y-4 p-0 flex flex-col ">
        <div className="relative w-full h-20">
          <Image
            src={image}
            alt="giveaway_img"
            quality={100}
            fill
            className="object-cover rounded-md"
            sizes="1000px"
            loading="eager"
          />
        </div>
        <div className="p-4">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-zinc-400">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Edit3 />
        <Badge className="mt-auto ms-auto">Unpublished</Badge>
      </CardFooter>
    </Card>
  );
};

export default DraftCard;
