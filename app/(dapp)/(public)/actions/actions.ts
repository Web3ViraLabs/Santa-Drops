"use server";

import { db } from "@/lib/db";
import { GiveawayType } from "@prisma/client";

interface GiveawayProps {
  giveawayType: GiveawayType;
}

export async function getGiveaways({ giveawayType }: GiveawayProps) {
  try {
    const giveaways = await db.giveaway.findMany({
      where: {
        giveawayType,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        name: true,
        image: true,
        description: true,
        endsAt: true,
      },
    });

    return giveaways;
  } catch (error) {
    console.log("[GET_GIVEAWAYS] ", error);
  }
}
