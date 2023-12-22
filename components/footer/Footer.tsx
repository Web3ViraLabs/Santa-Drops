'use client';

import { usePathname } from 'next/navigation';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Icons } from '../Icons';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const pathname = usePathname();

  /* const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in']; */

  return (
    <footer className="bg-white flex-grow-0 dark:bg-background">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200">
          {/*   {pathsToMinimize.includes(pathname) ? null : ( */}
          <div className="pb-8 pt-16">
            <div className="flex justify-center">
              <Icons.logo className="h-12 w-auto" />
            </div>
          </div>
          {/*  )} /* }

          {/* {pathsToMinimize.includes(pathname) ? null : ( */}
          <div>
            <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div
                  aria-hidden="true"
                  className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90  dark:bg-background"
                />
              </div>

              <div className="text-center relative mx-auto max-w-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Create a Giveaway
                </h3>
                <p className="mt-2 text-sm text-muted-foreground dark:text-white">
                  If you&apos;d like to create a Giveaway for your community,
                  you can do so in minutes.{' '}
                  <Link
                    href="#"
                    className="whitespace-nowrap font-medium text-black hover:text-zinc-900 dark:text-white"
                  >
                    Get started &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/*    )} */}
        </div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground dark:text-white">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600 dark:text-white"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600 dark:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600 dark:text-white"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
