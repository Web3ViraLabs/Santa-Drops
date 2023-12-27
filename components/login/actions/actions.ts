"use server";

import { db } from "@/lib/db";
import { Symbol } from "@prisma/client";
import crypto from "crypto";
import { cookies } from "next/headers";

interface AccountCreationProps {
  name: string;
  address: string;
  symbol: Symbol;
  signature: string;
}

export async function existUser(name: string) {
  try {
    const user = await db.profile.findFirst({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        registered: true,
      },
    });

    if (!user) {
      return false;
    }

    const isDuplicate = name.toLowerCase() === user.name.toLowerCase();
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

  return isWalletRegistered?.registered;
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
      httpOnly: true,
      secure: true,
      sameSite: "strict",
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
  signature,
  name,
}: AccountCreationProps) {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    const user = await db.profile.create({
      data: {
        name,
        token,
        registered: true,
        wallets: {
          create: {
            address,
            signature,
            symbol,
            registered: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    cookies().set("token", user.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return user;
  } catch (error) {
    console.log("[CREATE_ACCOUNT] ", error);
    return null;
  }
}
