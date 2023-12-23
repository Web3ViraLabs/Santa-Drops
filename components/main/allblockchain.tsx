import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import { SUPPORTEDBLOCKCHAIN_CONFIG } from "@/config/supportedblockchain-config";

const AllBlockchains = () => {
  return (
    <>
      <section className="border-gray-200 bg-gray-50 dark:bg-background">
        <MaxWidthWrapper className="py-20">
          <div className="text-center relative mx-auto max-w-sm pb-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              all Chains{" "}
              <span className="text-blue-600 dark:text-blue-300">
                One Platform
              </span>
              .
            </h1>
          </div>
          <div className="grid p-2 grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-20 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-0">
            {SUPPORTEDBLOCKCHAIN_CONFIG.map((blockchain) => (
              <Card
                key={blockchain.name}
                className={cn("lg:w-[380px]", "md:w-[350px]", "w-full", "m-4")}
              >
                <CardHeader>
                  <div className="md:flex-shrink-0 flex py-5">
                    <div className="h-16 w-16 flex justify-start rounded-full bg-blue-100 text-blue-900">
                      <Image
                        src={blockchain.image}
                        width={600}
                        height={600}
                        alt={blockchain.name}
                      />
                    </div>
                  </div>
                  <CardTitle>{blockchain.name}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <CardDescription>{blockchain.description}.</CardDescription>
                </CardContent>
                <CardFooter>
                  <p className="text-sm font-medium leading-none">
                    {blockchain.status}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default AllBlockchains;
