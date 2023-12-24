"use client";

import Link from "next/link";
import NavItems from "./NavItems";
import { Button, buttonVariants } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { Icons } from "../Icons";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { ModeToggle } from "../mode-toggle";
import { useModal } from "@/hooks/use-modal";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { onOpen } = useModal();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get<User>("/api/users/me", {
        headers: {
          Authorization: localStorage.getItem("TOKEN"),
        },
      });
      setUser(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="background sticky z-50 top-0 inset-x-0 h-16 bg-white dark:bg-background">
      <header className="relative background">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
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

                  <Link
                    href="#"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Products
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
                    Features
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
                    {user ? (
                      "Welcome " + user.name
                    ) : (
                      <Button
                        onClick={() => onOpen("login")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto"
                      >
                        Connect Your Wallet
                      </Button>
                    )}
                  </div>
                  <ModeToggle />
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
