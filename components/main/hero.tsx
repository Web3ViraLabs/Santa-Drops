import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl dark:text-white dark:bg-background">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Unlock the World of{" "}
            <span className="text-blue-600 dark:text-blue-300">BlockChain</span>
            .
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground dark:text-white capitalize">
            Unlock blockchain&apos;s potential with our Web3 platform. A
            user-friendly all-in-one utility solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="#" className={cn(buttonVariants(), "dark:text-white")}>
              Get Started
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Hero;
