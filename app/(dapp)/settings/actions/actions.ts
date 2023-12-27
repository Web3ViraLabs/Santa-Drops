"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setStateCookie(state: string) {
  cookies().set("state", state, {
    maxAge: 21600,
  });
}

export async function removeProvider(id: string) {
  try {
    const account = await db.account.delete({
      where: {
        id,
      },
    });

    if (!account) {
      return null;
    }

    revalidatePath("/settings");
    return account;
  } catch (error) {
    console.log("[REMOVE_PROVIDER] ", error);
  }
}
