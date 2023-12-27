"use server";

import { db } from "@/lib/db";

export async function useUser(name: string) {
  try {
    const user = await db.profile.findFirst({
      where: {
        name,
      },
      select: {
        name: true,
        image: true,
        registered: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log("[useUser] error", error);
    return null;
  }
}
