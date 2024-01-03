"use server";

import { db } from "@/lib/db";

export async function useGiveaway(id: string) {
  try {
    const giveaway = await db.giveaway.findUnique({
      where: {
        id,
      },
      include: {
        tokenDetails: true,
      },
    });

    if (!giveaway) {
      return null;
    }

    return giveaway;
  } catch (error) {
    console.log("[USE_GIVEAWAY_SERVER] ", error);
  }
}
