'use client';

import NavItem from './nav-item';
import { usePathname, useRouter } from 'next/navigation';
import {
  BadgeDollarSign,
  BadgePlus,
  Bitcoin,
  Component,
  Currency,
  FileKey,
  Gift,
  Heart,
  ImageIcon,
  LayoutGrid,
  LayoutList,
  Settings,
  User,
} from 'lucide-react';
import { Profile } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import ProfileBtn from './components/profile-btn';
import GiveawayManagement from './components/giveaway-manage';

const NavBar = ({ user }: { user: Profile | null }) => {
  const CATEGORY_1 = [
    {
      name: 'Home',
      icon: <LayoutGrid />,
      href: '/',
    },
    {
      name: 'Tokens Giveaway',
      icon: <Currency />,
      href: '/tokens-giveaway',
    },
    {
      name: 'Crypto Giveaway',
      icon: <Bitcoin />,
      href: '/crypto-giveaway',
    },
    {
      name: 'Nfts Giveaway',
      icon: <ImageIcon />,
      href: '/nfts-giveaway',
    },
    {
      name: 'Allowlists Giveaway',
      icon: <BadgeDollarSign />,
      href: '/allowlists-giveaway',
    },
    {
      name: 'Whitelists Giveaway',
      icon: <LayoutList />,
      href: `/whitelists-giveaway`,
    },
  ];

  const CATEGORY_2 = [
    {
      name: 'Participated Giveaways',
      icon: <Gift />,
      href: '/participated',
    },
    {
      name: 'Liked Giveaways',
      icon: <Heart />,
      href: '/liked',
    },
    {
      name: 'Private Giveaways',
      icon: <FileKey />,
      href: '/private-giveaways',
    },
  ];

  const router = useRouter();
  const path = usePathname();

  const isActive = (pathname: string) => {
    return path === pathname;
  };

  return (
    <nav className="relative h-full overflow-auto hidden lg:flex flex-col space-y-8 lg:min-w-[320px] 2xl:min-w-[380px] border-main border-r">
      <div className="w-full mt-6 flex items-center justify-center">
        <Link className="flex" href="/">
          <div className="relative w-10 h-10">
            <Image src={'/favicon.ico'} alt="logo" fill sizes={'48px'} />
          </div>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">Santa Giveaway</h1>
        </div>
      </div>
      <div className="flex flex-col h-full p-2">
        {CATEGORY_1.map((item) => (
          <Link key={item.name} href={item.href}>
            <NavItem
              label={item.name}
              icon={item.icon}
              isActive={isActive(item.href)}
            />
          </Link>
        ))}
        <Separator className="bg-main my-4 h-0.5 w-[80%] mx-auto ms-4" />
        {user && (
          <>
            {CATEGORY_2.map((item) => (
              <Link key={item.name} href={item.href}>
                <NavItem
                  label={item.name}
                  icon={item.icon}
                  isActive={isActive(item.href)}
                />
              </Link>
            ))}
            <Separator className="bg-main my-4 h-0.5 w-[80%] mx-auto ms-4" />
            <GiveawayManagement isActive={isActive} />
            <div className="my-4" />
            <ProfileBtn name={user.name} image={user.image!} />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
