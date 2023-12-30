"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { Symbol } from "@prisma/client";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface LinkAccountProps {
  address: string;
  symbol: Symbol;
  signature: string;
}

interface AccountCreationProps extends LinkAccountProps {
  name: string;
  image: string;
  btcAddress?: string;
}

export async function existUser(name: string) {
  try {
    const users = await db.profile.findMany({
      where: {
        name: {
          mode: "insensitive",
          equals: name.toLowerCase(),
        },
      },
      select: {
        name: true,
        registered: true,
      },
    });

    const isDuplicate = users.length > 0;

    return isDuplicate;
  } catch (error) {
    console.log("[EXIST_USERNAME] ", error);
    return null;
  }
}

export async function existAddress(address: string) {
  const isWalletRegistered = await db.wallet.findFirst({
    where: {
      address,
    },
    select: {
      registered: true,
    },
  });

  if (!isWalletRegistered) {
    return false;
  }

  return isWalletRegistered.registered;
}

export async function loginAccount(address: string) {
  try {
    const user = await db.profile.findFirst({
      where: {
        wallets: {
          some: {
            address,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    cookies().set("token", user.token, {
      // httpOnly: true,
      // secure: true,
      // sameSite: "strict",
    });

    return user;
  } catch (error) {
    console.log("[LOGIN_ACCOUNT] ", error);
    return null;
  }
}

export async function createAccount({
  address,
  symbol,
  image,
  btcAddress,
  signature,
  name,
}: AccountCreationProps) {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    const user = await db.profile.create({
      data: {
        name,
        token,
        image,
        registered: true,
        wallets: {
          create: {
            address,
            signature,
            symbol,
            btcAddress,
            registered: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    cookies().set("token", user.token, {
      // httpOnly: true,
      // secure: true,
      // sameSite: "strict",
    });

    return user;
  } catch (error) {
    console.log("[CREATE_ACCOUNT] ", error);
    return null;
  }
}

export async function linkWallet({
  address,
  symbol,
  signature,
}: LinkAccountProps) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const linkWallet = await db.profile.update({
      where: {
        id: currentUser.id,
      },
      data: {
        wallets: {
          create: {
            address,
            symbol,
            signature,
            registered: true,
          },
        },
      },
      select: {
        wallets: {
          where: {
            address,
          },
          select: {
            id: true,
            address: true,
          },
        },
      },
    });

    if (!linkWallet) {
      return null;
    }

    revalidatePath("/");

    return linkWallet;
  } catch (error) {
    console.log("[LINK_ACCOUNT] ", error);
  }
}
