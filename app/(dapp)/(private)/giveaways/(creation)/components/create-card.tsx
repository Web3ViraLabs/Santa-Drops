"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateCard = () => {
  const router = useRouter();

  return (
    <Card className="w-[300px] h-[200px] bg-background border-none hover:scale-105 transform transition-transform duration-300 ml-8">
      <CardHeader>
        <CardTitle className="text-2xl">Create giveaway</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <button onClick={() => router.push("/giveaways/new")}>
          <div className="border-dotted border-2 border-spacing-4 border-main px-20 py-10">
            <Plus />
          </div>
        </button>
      </CardContent>
    </Card>
  );
};

export default CreateCard;
