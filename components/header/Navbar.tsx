"use client";

import Link from "next/link";
import NavItems from "./NavItems";
import { Button, buttonVariants } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { Icons } from "../Icons";
import MaxWidthWrapper from "../MaxWidthWrapper";

const Navbar = () => {
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            q
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/*  {user ? null : (  */}
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link
                    href="#"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Participated Giveaways
                  </Link>
                  {/*  )} */}

                  {/* {user ? null : ( */}
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  {/*  )} */}

                  {/*  {user ? ( 
                        <UserAccountNav user={user} />
                      ) : ( */}
                  <Link
                    href="#"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Manage Giveaway&apos;s
                  </Link>
                  {/*    )} */}

                  {/*  {user ? ( *
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                     ) : null} */}

                  {/* {user ? null : ( */}
                  <div className="flex lg:ml-6">
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  </div>
                  {/*   )} */}

                  {/* TODO: Connect this with Wallet Sheet component or give it a Complete route*/}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link
                      href={"/login"}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto"
                    >
                      Connect Your Wallet
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
